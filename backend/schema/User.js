const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  buildName: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  emailAddres: {
    type: String,
  },
  telNo: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  kiraMiktari: {
    type: Number,
  },
  aidatMiktari: {
    type: Number,
  },
  aidatTarihi: {
    type: Date,
  },
  kiraTarihi: {
    type: Date,
  },
  kiraCheckbox: {
    type: Boolean,
    default: false,
  },
  aidatCheckbox: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "User",
  },
});

// Middleware to check email and assign admin role
UserSchema.pre("save", function (next) {
  const adminEmails = [
    "oguzhanuyar531@gmail.com",
    "suatsenlug@hotmail.com",
    "senlug38@gmail.com",
  ];
  if (adminEmails.includes(this.emailAddres)) {
    this.role = "Admin";
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
