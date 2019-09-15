const validate = require("mongoose-validator");
const bcrypt = require("bcrypt-nodejs");

module.exports = mongoose => {
  const User = new mongoose.Schema({
    id: {
      type: mongoose.Schema.ObjectId
    },
    nickname: {
      type: String,
      index: true,
      required: true,
      validate: validate({
        validator: "isLength",
        arguments: [6, undefined],
        message: "Nickname length should be minimum {ARGS[0]} symbols"
      })
    },
    email: {
      type: String,
      index: true,
      required: true,
      validate: validate({
        validator: "isEmail",
        message: "Invalid email"
      })
    },
    // password: {
    //   type: String,
    //   required: true,
    //   validate: validate({
    //     validator: "isLength",
    //     arguments: [8, 30],
    //     message:
    //       "Password length should be between {ARGS[0]} and {ARGS[1]} symbols"
    //   })
    // },
    hash: {
      type: String,
      required: true
    },
    createdOn: {
      type: Date
    }
  });

  User.virtual("password")
    .set(function(password) {
      this._password = password;
      this.hash = this.encryptPassword(password);
    })
    .get(function() {
      return this._password;
    });

  User.methods = {
    encryptPassword: password => {
      if (!password) return "";

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return hash;
    }
  };

  User.statics = {
    authenticate: (user, password) => {
      return bcrypt.compareSync(password, user.hash);
    }
  };

  return User;
};
