require("dotenv").config();
const express = require("express");
const mongoConnect = require("./db");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

async function main() {
  const app = express();

  // Using Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  // View Engine
  app.set("view engine", "ejs");

  app.use("/posts", postRouter);
  app.use("/users", userRouter);
  // Routes
  app.use("/", (req, res) => {
    console.log("API WORKS");
    res.send("API WORKS");
  });

  // Listening to port
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server Connected on localhost:${PORT}`);
    mongoConnect();
  });
}

console.clear();
main().catch((err) => console.log(err));
