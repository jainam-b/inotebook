const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = () => {
  console.log("connected to mongo successfully");
  mongoose.connect(mongoURI, { useNewUrlParser: true });
};

module.exports = connectToMongo;
