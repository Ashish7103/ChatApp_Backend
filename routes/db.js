const mongoose=require("mongoose");
const Pusher = require("pusher");
// connect with mongodb atalas
const connectionUrl="mongodb+srv://Whatsapp-mern-Bakend:roar@ashish7103.scqctsd.mongodb.net/WhatsappDb?retryWrites=true&w=majority"

mongoose.connect(connectionUrl);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

// const Pusher = require('pusher');

db.once("open", () => {
  console.log("MongoDB connected successfully");
  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();
  
  changeStream.on("change", (change) => {
    console.log('Change occurred', change);

    if (change.operationType === "insert") {
      const messageDetail = change.fullDocument;
  const pusher = new Pusher({
    appId: "1751416",
    key: "2e8e79fd5b0e0b5a6534",
    secret: "9cdfd643960197ca5fe5",
    cluster: "ap2",
    useTLS: true
  });
  

      pusher.trigger("messages", "inserted", {
        name: messageDetail.name,
        message: messageDetail.message,
       timeStamp:messageDetail.timeStamp,
       recived:messageDetail.recived,
        
        
      }
      ,console.log('sucessfully trigger'));
    } else {
      console.log('Error in triggering Pusher');
    }
  });
}
);

    
  // })


// write in App.js file
// to manually decidde which port your server run
