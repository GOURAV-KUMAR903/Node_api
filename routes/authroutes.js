const express = require('express');
const router = express.Router();

 
 const AuthController = require('../Dashboard/controller/AuthController');
 const Report = require('../Admin/controller/Report');



router.post('/register',AuthController.register);

router.post('/login',AuthController.login);

router.post('/allusers',Report.Users);




module.exports = router;