const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

//register

usersSchema.statics.register = async function (name, email, password) {
  let userInfo = await this.findOne({ email });
  if (userInfo) {
    throw new Error("user exist");
  }
  let salt = await bcrypt.genSalt();
  let hashValue = await bcrypt.hash(password, salt);
  let user = await this.create({ name, email, password: hashValue });

  return user;
};

//login

usersSchema.statics.login = async function (email, password) {
  let user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email does not match in our record, Try Again...");
  }
  let passwordStatus = await bcrypt.compare(password, user.password);

  if (passwordStatus) {
    return user;
  } else {
    throw new Error("Password is incorrect. Try Agian...");
  }
};

module.exports = mongoose.model("User", usersSchema);
