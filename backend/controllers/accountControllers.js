const User = require("../model/User");
const Account = require("../model/Account");
const mongoose = require("mongoose");

const deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;
  try {
    if (userId !== req.params.id)
      return res.status(400).json({ msg: "You can only update your account" });
    if (!amount)
      return res.status(400).json({ msg: "Please fill in all fields" });
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const accountExists = await Account.findOne({ userId });
    if (accountExists) {
      const account = await Account.findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true }
      );
      return res.status(200).json({ account });
    }
    const account = await Account.create({ userId, balance: amount });
    return res.status(200).json({ account });
  } catch (error) {
    console.log(error);
  } 
};

const getBalance = async (req, res) => {
  try {
    console.log('getBalance is reached');
    const userId = req.user.id;
    console.log('userid',userId);
    console.log(req.params.id);
    if (userId !== req.params.id)
      return res
        .status(400)
        .json({ msg: "You can only see your account's balance" });
    const account = await Account.findOne({ userId });
    if (!account)
      return res.status(400).json({ msg: "Account does not exist" });
    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.log(error);
  }
};

const transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount } = req.body;

  const userId = req.user.id;

  const receiverId = req.params.id;

  try {
    if (!amount)
      return res.status(400).json({ msg: "Please fill in all fields" });

    const user = await User.findById(userId).session(session);

    const accountExists = await Account.findOne({ userId }).session(session);

    if (!user || !accountExists) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid user" });
    }

    const receiver = await User.findById(receiverId).session(session);

    const receiverAccount = await Account.findOne({ userId: receiverId }).session(session);
    if (!receiver || !receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid Receiver account" });
    }

    const account = await Account.findOne({ userId }).session(session);
    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient funds" });
    }
    account.balance -= amount;
    await account.save();
    receiverAccount.balance += amount;
    await receiverAccount.save();
    await session.commitTransaction();
    return res.status(200).json({ account, receiverAccount });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deposit, getBalance, transfer };
