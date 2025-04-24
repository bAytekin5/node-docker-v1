const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../db/models/Users");
const config = require("../config");
const UserRoles = require("../db/models/UserRoles");
const RolePrivileges = require("../db/models/RolePrivileges");
const privs = require("../config/rolePrivileges");
const Response = require("./Response");
const { HTTP_CODES } = require("../config/Enum");
const CustomError = require("./Error");
const i18n = new (require("./i18n"))(config.DEFAULT_LANG);



module.exports = function () {
  let strategy = new Strategy(
    {
      secretOrKey: config.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        let user = await User.findOne({ _id: payload.id });
        if (user) {
          let userRoles = await UserRoles.find({ user_id: payload.id });
          let rolePrivileges = await RolePrivileges.find({
            role_id: { $in: userRoles.map((ur) => ur.role_id) },
          });
          let privileges = rolePrivileges.map((rp) =>
            privs.privileges.find((x) => x.key == rp.permission)
          );

          done(null, {
            id: user._id,
            roles: privileges,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            language: user.language,
            exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME,
          });
        } else {
          done(new Error("User not found"), null);
        }
      } catch (err) {
        done(err, null);
      }
    }
  );
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", { session: false });
    },
    checkRoles: function (...expectedRoles) {
      return (req, res, next) => {
        let i = 0;
        let privileges = req.user.roles.map((x) => x.key);

        while (
          i < expectedRoles.length &&
          !privileges.includes(expectedRoles[i])
        )
          i++;
        if (i >= expectedRoles.length) {
          let response = Response.errorResponse(
            new CustomError(
              HTTP_CODES.UNAUTHORIZED,
              i18n.translate("COMMON.NEED_PERMISSIONS", config.DEFAULT_LANG),
              i18n.translate("COMMON.NEED_PERMISSIONS", config.DEFAULT_LANG)
            )
          );
          return res.status(response.code).json(response);
        }
        return next(); //Authorized
      };
    },
  };
};
