const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");

const g2Page = (req, res) => {
  if (req.session.userType === "admin") {
    res.redirect("/");
  } else {
    fetchPersonalInfo(req, res);
  }
};

// const formatDate = (date) => {
//   return new Promise((resolve, reject) => {
//     resolve(moment(date).format("YYYY-MM-DD"));
//   });
// };

const fetchPersonalInfo = async (req, res) => {
  try {
    let personalInfo = await PersonalInfo.findById(req.session.userId).lean();
    // if (personalInfo && personalInfo.firstName) {
      console.log(personalInfo, "personalInfo");
      bcrypt.compare("Default", personalInfo.licenseNumber, (err, same) => {
        console.log(same, "same");
        if (same) {
          personalInfo = {
            _id: personalInfo._id,
            firstName: null,
            lastName: null,
            licenseNumber: null,
            age: null,
            carDetails: {
              make: null,
              model: null,
              year: null,
              plateNo: null,
            },
            disablePersonalInfoFields: false,
          };
          global.disablePersonalInfoFields = false;
        } else {
          personalInfo.disablePersonalInfoFields = true;
          global.disablePersonalInfoFields = true;
        }
        if (req.url === "/g_test") {
          res.render("g_test", { personalInfo });
        } else {
          res.render("g2_test", { personalInfo });
        }
      });
    // } else {
    //   const obj = { userNotFound: true };
    //   if (req.url === "/g") {
    //     res.render("g", { personalInfo: obj });
    //   } else {
    //     res.render("g2", { personalInfo });
    //   }
    // }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { g2Page, fetchPersonalInfo };
