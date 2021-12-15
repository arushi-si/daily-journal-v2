const mongoose = require("mongoose");

function mongoConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✨ MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoConnect;
