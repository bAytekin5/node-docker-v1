const mongoose = require("mongoose");
const { PASS_LENGTH, HTTP_CODES } = require("../../config/Enum");
const is = require("is_js");
const CustomError = require("../../lib/Error");
const bcrypt = require("bcryptjs");
const config = require("../../config")
const DEFAULT_LANG = require("../../config");
const i18n = new (require("../../lib/i18n"))(config.DEFAULT_LANG);
const schema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    language: { type: String, default: DEFAULT_LANG },
  },
  {
    versionKey: false,
    timestapms: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

class Users extends mongoose.Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  static validateFieldsBeforeAuth(email, password) {
    email = String(email || "").trim();
    password = String(password || "");

    if (
      typeof password !== "string" ||
      password.length < PASS_LENGTH ||
      is.not.email(email)
    ) {
      throw new CustomError(
        HTTP_CODES.UNAUTHORIZED,
        i18n.translate("COMMON.VALIDATION_ERROR_TITLE", config.DEFAULT_LANG),
        i18n.translate("USERS.AUTH_ERROR", config.DEFAULT_LANG)
      );
    }

    return null;
  }
}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);
