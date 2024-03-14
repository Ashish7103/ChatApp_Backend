var express = require('express');
var router = express.Router();
const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    message:String,
    name:String,
    timeStamp:{type:String,default:new Date().toUTCString()},
    received: { type: Boolean, default: true },
    seenByReceiver: { type: Boolean, default: false } 
})
module.exports=mongoose.model("Message",MessageSchema)