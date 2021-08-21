const { User } = require("../models");
const { sanitize } = require("../utils/sanitize");
const { hash, validate } = require("../utils/bcrypt");
const Redis = require("../helper/redis");
const Rabbit = require("../helper/rabbit");
const _ = require("lodash");
const { generateToken, verifyToken } = require("../utils/jwt");

const userStatuses = ["ACTIVE", "AWAY"];

const addUser = async ({ email = "", name = "", password = "" }) => {
  let userData = {
    email,
  };
  let userObj = {
    email,
    name,
    password: await hash(password),
    username: sanitize(email),
    authToken: await generateToken(),
  };

  let isRegistered = await User.findOne({ email }).catch((err) => {
    return false;
  });
  if (isRegistered) {
    return Promise.reject("User already registered");
  }
  userObj = new User(userObj);
  let userSaved = await userObj.save().catch((err) => {
    return false;
  });
  if (!userSaved) {
    return Promise.reject("Something went wrong");
  }
  return Promise.resolve(userSaved);
};

const updateUser = async (data) => {
  if (typeof data !== "object") {
    return false;
  }

  let { userId, workspaces } = data;
  let user = await User.findOne({ userId });

  user.workspaces.push(workspaces);
  data.workspaces = user.workspaces;

  Object.assign(user, data);

  let updatedUser = new User(user);
  let result = await updatedUser.save();
  return result;
};

const updateUserStatus = (userId, status) => {
  return new Promise(async (resolve, reject) => {
    let listOfAgents = await Redis.get("list_of_agents")
      .then(JSON.parse)
      .catch((err) => []);

    let userPos = _.findIndex(listOfAgents, { userId });
    if (userPos !== -1 && userStatuses.includes(status.toUpperCase())) {
      listOfAgents[userPos].agentStatus = status.toUpperCase();
      await Redis.set("list_of_agents", listOfAgents);
      Rabbit.publish("agents-updated", listOfAgents);
      return resolve("Successfully updated agent status");
    } else {
      return reject("Unable to update agent status");
    }
  });
}; 

const verifyUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userDetails = await User.findOne({ email }).catch((err) => reject(err));

    if (!userDetails) return reject("User not found");

    let isAuth = await validate(password, userDetails.password).catch((err) =>
      reject(err)
    );
    if (!isAuth) return reject();
    return resolve({ token: userDetails.authToken });
  });
};
module.exports = { addUser, updateUser, updateUserStatus, verifyUserLogin };
