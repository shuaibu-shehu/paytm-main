const express=require('express');
const router=express.Router();
const {verifyUser}=require('../middlewares');
const {deposit, getBalance, transfer}=require('../controllers/accountControllers');

router.post('/account/deposit/:id',verifyUser,deposit);
router.get('/account/balance/:id',verifyUser,getBalance);
router.post('/account/transfer/:id',verifyUser,transfer);

module.exports=router;