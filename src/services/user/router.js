const router = require('express').Router();

const UserController = require('./controllers');

router.route('/login').post(UserController.login);
// router.route('/register').post(UserController.register);

module.exports = router;
