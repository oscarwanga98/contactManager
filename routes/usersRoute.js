const express =require('express');
const { registerUser, loginUser,currentUser } = require('../controllers/usersController');

const router=express.Router()
//register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);


//Current user
router.post("/current", currentUser);

module.exports=router