const express=require('express');
const router=express.Router();
const {verifyUser}=require('../middlewares');
const {deposit, getBalance}=require('../controllers/accountControllers');

router.post('/account/deposit/:id',verifyUser,deposit);
router.get('/account/balance/:id',verifyUser,getBalance);

module.exports=router;