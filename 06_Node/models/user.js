const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenforUser } = require("../config/authentication");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
      default: "./images/default - man.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Pre Function that exexute before data save
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

// Virtual Function
userSchema.static("matchPasswordAndGenerateToken",async function (email, password) {
  const user = await this.findOne({ email });

  // console.log(user);
  

  if (!user) throw new Error("User Not Found");

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashPassword !== userProvidedHash)
    throw new Error("Incorrect Credentials");

  const token = createTokenforUser(user);

  return token;
});

const User = mongoose.model("user", userSchema);
module.exports = User;

// Refernece : https://nodejs.org/api/crypto.html
// Reference : https://mongoosejs.com/docs/middleware.html
