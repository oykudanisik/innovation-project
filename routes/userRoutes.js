const express = require('express');
const { loginUser, logoutUser, addUser, signupView, manual, userManual, downloadUserManual, addPlant } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/register', addUser);
router.get('/signup', signupView);
router.get('/manual', manual);
router.get('/addPlant', addPlant);
router.get('/usermanual', userManual);
router.get('/downloadUserManual', downloadUserManual);

module.exports = {
    routes: router
}