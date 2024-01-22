const express=require('express');
const {signup, signin, updateUser,signout, getUsers}=require('../controllers/userControllers');
const router=express.Router();
const { verifyUser} =require('../middlewares');

router.post('/user/signup',signup,) 
router.post('/user/signin',signin,) 
router.put('/user/update/:id',verifyUser,updateUser)
router.get('/user/signout',signout)
router.get('/users/',verifyUser,getUsers)
module.exports=router; 
      