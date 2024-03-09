const express =require('express');
const { registerUser, loginUser,currentUser } = require('../controllers/usersController');
const validateToken = require('../middleware/validateTokenHandler');

const router=express.Router()
//register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);


//Current user
router.get("/current",validateToken, currentUser);

module.exports=router