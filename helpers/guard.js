const passport = require("passport");
const { HTTPCode } = require("./constants");

require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    let token = null;

    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }

    if (!user || error || token !== user.token) {
      return res.status(HTTPCode.UNAUTHORIZED).json({
        status: "error",
        code: HTTPCode.UNAUTHORIZED,
        message: "Access is denied!",
      });
    }

    req.user = user;

    return next();
  })(req, res, next);
};

module.exports = guard;
