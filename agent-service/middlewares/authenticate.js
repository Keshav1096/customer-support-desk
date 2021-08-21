const { verifyToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let isAuth = await verifyToken(token).catch((err) => false);
  if (!isAuth)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorised", data: {} });
  next();
};
