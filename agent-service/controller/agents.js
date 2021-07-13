const { User } = require("../models");
const { addUser } = require("../logic/user.logic");

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

module.exports = { createUser };
