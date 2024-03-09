const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const User=require('../models/usersModel')



//@descREgister a user
//@route POST /api/users/register
//access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body
    if(!username|| !email || !password){
        res.status(400);
        throw new Error('All Fields are mandatory')
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash the password
    const hashedPassword= await bcrypt.hash(password,10)
    // console.log('Hashed password:',hashedPassword )
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })

    // console.log(user);
    if(user){
        res.status(201)
        .json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error('User Data is not valid')
    }

    // res.json({message:'Register the user'});
});

//@desc login a user
//@route POST /api/users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
  const {email,password}= req.body
  if(!email|| !password){
    res.status(400)
    throw new Error("All Fileds are mandatory")
  }
  const user= await User.findOne({email})

  //compare password with hashedPassword
  if(user&&(await bcrypt.compare(password,user.password))){
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'1m'}
    );
    res.status(200).json({accessToken})
  }else{
    res.status(401)
    throw new Error('Email or password are not valid ')
  }

  res.json({ message: "Login the user" });
});

//@desc Current user info
//@route POST /api/users/current
//access public

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports={registerUser,loginUser,currentUser} 