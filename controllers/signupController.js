const PersonalInfo = require("../models/PersonalInfo");

const signUp = (req, res) => {
  const showErrorMsg = false;
  res.render("signup", { showErrorMsg });
};

const createUser = (req, res) => {
  try {
    if (req.body.password === req.body.repeatPassword) {
      const obj = {
        userName: req.body.firstName,
        password: req.body.password,
        role: req.body.type,
      };
      PersonalInfo.create(obj);
      res.redirect("/login");
    } else {
      const showErrorMsg = true;
      res.render("signup", { showErrorMsg });
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { signUp, createUser };