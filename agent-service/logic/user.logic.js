const { User } = require("../models");
const { sanitize } = require("../utils/sanitize");
const { hash } = require("../utils/bcrypt");
const Redis = require("../helper/redis");
const Rabbit = require("../helper/rabbit");
const _ = require("lodash");

const userStatuses = ["ACTIVE", "AWAY"];

const addUser = async ({ email = "", name = "", password = "" }) => {
  let userObj = {
    email,
    name,
    password: await hash(password),
    userId: Date.now(),
    username: sanitize(email),
  };

  let isRegistered = await User.findOne({ email }).catch((err) => {
    return false;
  });
  if (isRegistered) {
    return { isRegistered: false, message: "User already registered" };
  }
  userObj = new User(userObj);
  let userSaved = await userObj.save().catch((err) => {
    return false;
  });
  if (userSaved) {
    return { isRegistered: true, data: userSaved };
  }
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
    console.log(userPos);
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

module.exports = { addUser, updateUser, updateUserStatus };
