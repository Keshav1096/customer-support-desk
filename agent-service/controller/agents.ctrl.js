const { User } = require("../models");
const {
  addUser,
  updateUserStatus,
  verifyUserLogin,
} = require("../functions/user.logic");

const createUser = async (req, res) => {
  let { body } = req;
  let { email, password, name } = body;
  if (!email || !password || !name) {
    return res.publish({ status: 400, message: "Required params missing" });
  }
  let userObj = {
    email,
    name,
    password,
  };

  addUser(userObj)
    .then((userSaved) => res.publish({ status: 200, data: userSaved }))
    .catch((err) => res.publish({ success: false, status: 200, message: err }));
};

const updateAgentStatus = (req, res) => {
  let { body } = req;
  let { userId, status } = body;

  if (!userId || !status)
    return res.publish({
      status: 400,
      message: "Missing params",
      data: {},
    });

  // call updateStatus function
  updateUserStatus(userId, status)
    .then((data) => {
      return res.publish({
        status: 200,
        message: "",
        data,
      });
    })
    .catch((err) => {
      return res.status(200).json({ success: true, err });
    });
};

const loginAgent = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.publish({
      status: 400,
      message: "Missing params",
      data: {},
    });
  verifyUserLogin(email, password)
    .then((data) => {
      res.publish({
        status: 200,
        message: "User authenticated!",
        data,
      });
    })
    .catch((err) => {
      res.publish({
        success: false,
        status: 401,
        message: "Unauthorised!",
      });
    });
};

module.exports = { createUser, updateAgentStatus, loginAgent };
