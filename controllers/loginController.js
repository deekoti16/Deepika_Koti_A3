const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");
const { application } = require("express");

const login = (req, res) => {
  const showErrorMsg = false;
  res.render("login", { showErrorMsg });
};

const validateUser = (req, res) => {
  try {
  const { username, password } = req.body;
  console.log(username, password, 'user')
  PersonalInfo.findOne({ userName: username }, (err, user) => {
    console.log(user, err, 'user')
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        console.log(same, 'same')
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.role;
          global.loggedIn = true;
          if (user.role === "driver") {
            showAuthenticatedRoutes = true;
          } else {
            showAuthenticatedRoutes = false;
          }

          res.render("dashboard");
        } else {
          const showErrorMsg = true;
          global.loggedIn = false;
          res.render("login", { showErrorMsg });
        }
      });
    } else {
      res.redirect("login");
    }
  });
} catch(e) {
  console.log(e, 'eeeeee')
}
}

module.exports = { login, validateUser };
