const express = require("express");
const mongoose=require('mongoose');
const app = express();
const cors=require('cors');
const dotenv=require('dotenv').config();
const cookieParser=require('cookie-parser');
const userRouter=require('./routers/userRouter');

try { 
    mongoose.connect(process.env.MONGO);
  } catch (error) { 
    console.log(error);
  } 

   
app.use(express.json());
app.use(cookieParser());
app.use('/api',userRouter)
  
mongoose.connection.once("open", () => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("Server on port 3000");
    });
  });
 

