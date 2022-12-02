const PersonalInfo = require("../models/PersonalInfo");
const { fetchPersonalInfo } = require("./g2PageController");
const bcrypt = require('bcrypt');

const gPage = (req, res) => {
  if(req.session.userType === 'admin') {
    res.redirect('/')
  } else {
    fetchPersonalInfo(req, res);
  }
};

const updatePersonalInfo = async (req, res) => {
  console.log(disablePersonalInfoFields, req.body, 'disablePersonalInfoFields');
  let licenseNumber = req.body.lnumber;
  let obj = {
    carDetails: {
      make: req.body.iemake,
      model: req.body.model,
      year: req.body.year,
      plateNo: req.body.pnumber,
    },
  };
  if(!disablePersonalInfoFields) {
    licenseNumber = await bcrypt.hash(req.body.lnumber, 10);
    obj = {
      firstName: req.body.fname,
      lastName: req.body.lname,
      licenseNumber: licenseNumber,
      age: req.body.age,
      carDetails: {
        make: req.body.iemake,
        model: req.body.model,
        year: req.body.year,
        plateNo: req.body.pnumber,
      },
    };
  }
  const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.body.id, obj);
  if (req.url === "/g_test") {
    res.redirect("/g_test");
  } else {
    res.redirect("/g_test");
  }
};

module.exports = { gPage, updatePersonalInfo };
