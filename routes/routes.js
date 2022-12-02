const express = require('express')
const router = express.Router()

const {dashboard, g_test, g2_test, login } =require('../controllers/controllers.js')
// const test=require('../views/partials/test.ejs')

router.get('/', dashboard);
router.get('/g_test', g_test);
router.get('/g2_test', g2_test);
router.get('/login', login);

module.exports = router;