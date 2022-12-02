const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose');
const expressSession = require("express-session");
// const moment = require("moment");
// const router = require('./routes/routes.js');
// const { cloneDeep, reject } = require("lodash");
// const { resolve } = require("path");
// const path = require("path");
const bcrypt = require("bcrypt");
const PersonalInfo = require("./models/PersonalInfo");
const { signUp, createUser } = require("./controllers/signupController");
const { g2Page, fetchPersonalInfo} = require("./controllers/g2PageController");
const { gPage, updatePersonalInfo } = require("./controllers/gPageController");
const { login, validateUser } = require("./controllers/loginController");

const app = new express();
// app.use('/', router);
app.use(express.json());
app.use(express.static('public'));
app.use(expressSession({ secret: "deepu123", resave: false, saveUninitialized: true }))
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://deepi:deepika123@cluster0.rs53wl8.mongodb.net/gtests?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
        if (error) {
            console.log(error);
            console.log("Connection failed");
        } else {
            console.log("Connected to the database");
        }
    });

global.showAuthenticatedRoutes = false;
global.loggedIn = false;

app.get("/", (req, res) => {
    res.render("dashboard");
  });

app.get("/g_test", gPage);

app.get("/g2_test", g2Page);

app.get("/login", login);

app.post("/fetchpersonalInfo", fetchPersonalInfo);

app.post("/updatePersonalInfo", updatePersonalInfo);

app.get("/signup", signUp);

app.post("/createData", createUser);

app.post("/checkUser", validateUser);

app.get("/signout", (req, res) => {
  global.loggedIn = false;
  showAuthenticatedRoutes = false;
  const showErrorMsg = false;
  res.render("login", { showErrorMsg });
})

app.listen(3600,()=>{
    console.log("App is listening at port 3600!!!")
})
// const formatDate = (date) => {
//     return new Promise((resolve, reject) => {
//         resolve(moment(date).format('YYYY-MM-DD'));
//     })
// }

// app.post("/posts/personalInfo", async (req, res) => {
//     try {
//         const obj = {
//         firstName: req.body.fname,
//         lastName: req.body.lname,
//         licenseNumber: req.body.lnumber,
//         age: req.body.age,
//         dob: new Date(req.body.dob).toISOString(),
//         sin: req.body.sin,
//         carDetails: {
//             make: req.body.iemake,
//             model: req.body.model,
//             year: req.body.year,
//             plateNo: req.body.pnumber,
//         },
//         };
//         console.log(obj, 'obj');
//         PersonalInfo.create(obj);
//         res.redirect("/");
//     } catch (e) {
//         console.log(e);
//     }
// });
      
// app.post("/fetchpersonalInfo", async (req, res) => {
//     try {
//         console.log(req.body, '63');
//         const personalInfo = await PersonalInfo.findOne({
//             licenseNumber: req.body.lnumber,
//         }).lean();
//         console.log(personalInfo, '67');
//         if(personalInfo && personalInfo.firstName) {
//         const updatedDate = personalInfo.dob.toISOString();
//         personalInfo.dob = await formatDate(updatedDate);
//         res.render("g_test", { personalInfo });
//         } else {
//         const obj = {userNotFound: true};
//         res.render("g_test", { personalInfo: obj });
//         }
//     } catch (e) {
//         console.log(e);
//     }
// });
      
// app.post("/updatePersonalInfo", async (req, res) => {
//     console.log(req.body, '82');
//     const obj = {
//         carDetails: {
//         make: req.body.iemake,
//         model: req.body.model,
//         year: req.body.year,
//         plateNo: req.body.pnumber,
//         },
//     };
//     const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.body.id, obj);
//     res.redirect('/g_test');
// })
