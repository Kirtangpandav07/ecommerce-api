var express = require('express');
var router = express.Router();
const Alluser=require('../controller/user')


/* GET users listing. */




router.post('/signup',Alluser.allsighnupuser);


router.post('/login',Alluser.allloginuser);


router.get('/alluser',Alluser.alluser);








module.exports = router;
