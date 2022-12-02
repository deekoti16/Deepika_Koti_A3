const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const PersonalInfoSchema = new Schema({
  firstName: {type: String, default: "Default"},
  lastName: {type: String, default: "Default"},
  licenseNumber: {type: String, default: "Default"},
  age: {type: Number, default: 0},
  password: {type: String, default: "demo"},
  role: {type: String, default: "driver"},
  userName: {type: String, default: "demo"},
  carDetails: {
    make: {type: String, default: "Default"},
    model: {type: String, default: "Default"},
    year: {type: Number, default: 0},
    plateNo: {type: String, default: "Default"}
    },
    createdDate: {type: Date, default: new Date()}
});

PersonalInfoSchema.pre("save", function (next) {
  const personalInfo = this;
  bcrypt.hash(personalInfo.sin, 10, (error, hash) => {
    personalInfo.sin = hash;
    next();
  });
});

PersonalInfoSchema.pre("save", function(next){
  const personalInfoDetails = this;
  bcrypt.hash(personalInfoDetails.licenseNumber, 10, (err, hashLicenseNumber) => {
    personalInfoDetails.licenseNumber = hashLicenseNumber;
    // next();      
    bcrypt.hash(personalInfoDetails.password, 10, (err, hashPassword) => {
      personalInfoDetails.password = hashPassword;
      next();      
    })
  })
})


const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);

module.exports = PersonalInfo;