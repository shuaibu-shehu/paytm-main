const User = require("../model/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = require("../model/Account");

const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({ msg: "Please fill in all fields" });
    const userExists= await User.findOne({email});
    if(userExists) return res.status(400).json({msg:"User already exists"});
    const hashedPassword=await bcrypt.hash(password,10); 
    const user=await User.create({ name, password:hashedPassword, email });
    const random=Math.floor(Math.random()*1000);
      console.log(random);
    const account=await Account.create({userId:user._id, balance:random});
    return res.status(200).json( {success:"user succesfully created"} );   
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill in all fields" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const {password:pass, ...rest}=user._doc;
    return res.cookie('token',token).status(200).json( rest );
  } catch (error) { 
    console.log(error);
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({msg:"Logged out successfully"});
  } catch (error) {
    console.log(error);
  }
}

const updateUser = async (req, res) => {
  try {
    const userId=req.user.id;
    console.log(userId);
    if(userId!==req.params.id) return res.status(400).json({msg:"You can only update your account"})
    let { name, password, email } = req.body;
  if(password){
       password=await bcrypt.hash(password,10); 
  }
    const user=await User.findByIdAndUpdate(req.params.id,{ name, password, email });
    return res.status(200).json({ user });   
  } catch (error) {
    console.log(error);
  }
};

const getUsers =async (req,res)=>{
  try {
    const users= await User.find();
    console.log(users);
    const usersWithoutPassword=users.map(user=>{
      const {password, ...rest}=user._doc;
      return rest;
    })
    return res.status(200).json({users:usersWithoutPassword});
  } catch (error) {
    console.log(error);
  }
}
module.exports = { signup, signin, updateUser, signout, getUsers };
