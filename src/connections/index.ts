import dotenv from "dotenv";
import mongoose from "mongoose";

// 引入環境變數
dotenv.config();

// 連結 mongoDB
mongoose
  .connect(process.env.MONGO_DB_LOCAL_URL!)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.log("Connection Fail: ", err);
  });
