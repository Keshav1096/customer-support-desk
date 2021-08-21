const jwt = require("jsonwebtoken");
const privateKey = require("../config").jwt_token;

module.exports = {
  generateToken: () => {
    return new Promise((resolve, reject) => {
      let token = null;
      try {
        token = jwt.sign({}, privateKey);
        return resolve(token);
      } catch (e) {
        return reject(e);
      }
    });
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      let data = {};
      try {
        data = jwt.verify(token, privateKey);
        return resolve(data);
      } catch (e) {
        return reject(e);
      }
    });
  },
};
