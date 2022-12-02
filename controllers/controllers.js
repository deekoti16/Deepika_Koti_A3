const path = require('path');
const dashboard = (req, res) => {
    // res.sendFile(path.join(process.cwd(), 'public', 'dashboard'));
    res.render('dashboard');
}
const g_test = (req, res) => {
    const personalInfo = {};
    res.render('g_test', { personalInfo });
}
const g2_test = (req, res) => {
    res.render('g2_test');
}
const login = (req, res) => {
    res.render('login');
}

module.exports = { dashboard, g_test, g2_test, login };