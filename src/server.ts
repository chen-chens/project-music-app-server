import mongoose from "mongoose";

import app from "./app";

// 連結 mongoDB
mongoose
  .connect(process.env.MONGO_DB_REMOTE_URL!)
  .then(() => {
    console.log("MongoDB is connected!");

    // WEB 應用程式開啟監聽
    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => {
    console.log("Connection Fail: ", err);
  });
