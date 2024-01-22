const express=require('express');
const {signup, signin, updateUser,signout}=require('../controllers/userControllers');
const router=express.Router();
const { verifyUser} =require('../middlewares');

router.post('/user/signup',signup,) 
router.get('/user/signin',signin,) 
router.put('/user/update/:id',verifyUser,updateUser)
router.get('/user/signout',signout)
module.exports=router; 
      