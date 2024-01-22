const User=require('../model/User')
const Account=require('../model/Account')

const deposit=async(req,res)=>{
    const {amount}=req.body;
    const userId=req.user.id;
    try {
        if(userId!==req.params.id) return res.status(400).json({msg:"You can only update your account"})
        if(!amount) return res.status(400).json({msg:"Please fill in all fields"});
        const user=await User.findById(userId);
        if(!user) return res.status(400).json({msg:"User does not exist"});
        const accountExists=await Account.findOne({userId});
        if(accountExists){
            const account=await Account.findOneAndUpdate({userId},{$inc:{balance:amount}},{new:true});
            return res.status(200).json({account});
        }
        const account=await Account.create({userId, balance:amount});
        return res.status(200).json({account});
    } catch (error) {
        console.log(error);
    }
}

const getBalance=async(req,res)=>{
    const userId=req.user.id;
    try {
        if(userId!==req.params.id) return res.status(400).json({msg:"You can only see your account's balance"})
        const account=await Account.findOne({userId});
        if(!account) return res.status(400).json({msg:"Account does not exist"});
        return res.status(200).json({balance:account.balance});
    } catch (error) {
        console.log(error);
    }
}

module.exports={deposit,getBalance}