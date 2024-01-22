const express=require('express');
const router=express.Router();
const {verifyUser}=require('../middlewares');

router.get('/account/balance',verifyUser);