const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const verifyResend = require("./verifyResend");
module.exports = {
  signup,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  verifyResend,
};
