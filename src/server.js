const express = require("express");
const app = express();
const { userRouter, blogRouter } = require("./routes");
const mongoose = require("mongoose");
const { generateFakeData } = require("../faker2");

const MONGO_URI =
  "mongodb+srv://admin:K04PC96M2DB51kgO@mongodbtutorial.btkwvzf.mongodb.net/BlogService?retryWrites=true&w=majority";
const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // mongoose.set("debug", true);
    console.log("MongoDB connected");
    app.use(express.json());

    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.listen(3000, async () => {
      console.log("server listening on port 3000");
      // await generateFakeData(3, 10, 30);

      // for (let i = 0; i < 20; i++) {
      //   await generateFakeData(10, 1, 10);
      // }
    });
  } catch (err) {
    console.log(err);
  }
};

server();
