const { User } = require("../models");
const { sanitize } = require("../utils/sanitize");
const { hash } = require("../utils/bcrypt");

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
module.exports = { addUser, updateUser };
