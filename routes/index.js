var express = require('express');
var router = express.Router();
var MessageModel=require("./Message")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post("/messages/new", async function(req, res) {
  try {
    const dbMessage = req.body;
    const message = new MessageModel(dbMessage);
    const savedMessage = await message.save();
    res.status(201).send(savedMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/messages/sync", async function(req, res) {
  try {
    const allMessages = await MessageModel.find({});
    
    res.status(200).send(allMessages);
  } catch (error) {
    res.status(500).send(error);
  }
});




module.exports = router;
