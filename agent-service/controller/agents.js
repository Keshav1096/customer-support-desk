const { User } = require("../models");
const {
  addUser,
  updateUserStatus,
  verifyUserLogin,
} = require("../logic/user.logic");

const createUser = async (req, res) => {
  let { body } = req;
  let { email, password, name } = body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, err: "Required params missing" });
  }
  let userObj = {
    email,
    name,
    password,
  };
  let userSaved = await addUser(userObj);

  if (!userSaved) {
    return res.status(500).json({
      success: false,
      err: "something went wrong",
    });
  }
  return res.status(201).json({ success: true, data: userSaved });
};

const updateAgentStatus = (req, res) => {
  let { body } = req;
  let { userId, status } = body;

  if (!userId || !status)
    // return res
    //   .status(400)
    //   .json({ success: false, err: "Required params missing" });
    return res.publish({
      status: 400,
      message: "Missing params",
      data: {},
    });

  // call updateStatus function
  updateUserStatus(userId, status)
    .then((data) => {
      // return res.status(200).json({ success: true, data });
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
    .then(() => {
      res.publish({
        status: 200,
        message: "User authenticated!",
      });
    })
    .catch((err) => {
      res.publish({
        status: 403,
        message: "Forbiden!",
      });
    });
};

module.exports = { createUser, updateAgentStatus, loginAgent };
