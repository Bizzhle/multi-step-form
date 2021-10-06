const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: "string",
      required: true,
      trim: true,
    },
    last_name: {
      type: "string",
      required: true,
      trim: true,
    },
    user_email: {
      type: "string",
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error("Email is not valid.");
        }
      },
    },
    user_password: {
      type: "string",
      required: true,
      trim: true,
      minLength: 6,
    },
    country: {
      type: "string",
      required: true,
      trim: true,
    },
    state: {
      type: "string",
      required: true,
      trim: true,
    },
    city: {
      type: "string",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
