const { User } = require("../models");
const { addUser, updateUserStatus } = require("../logic/user.logic");

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
    return res
      .status(400)
      .json({ success: false, err: "Required params missing" });

  // call updateStatus function
  updateUserStatus(userId, status)
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(200).json({ success: true, err });
    });
};

module.exports = { createUser, updateAgentStatus };
