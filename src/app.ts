import "./connections";

import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";

import corsConfigs from "./configs/corsConfig";
import router from "./routes";

const app = express(); // 啟動 Web 應用程式:

app.use(morgan("dev")); // 啟動 morgan，紀錄後端接收與回傳資訊
app.use(router); // 引入路由配置
app.use(cors(corsConfigs)); // 檢查 API 請求是否符合跨域設定
app.use(express.urlencoded({ extended: true })); // 載入解析 HTTP 資訊: body-parser(包含表單)
app.use(express.json()); // HTTP 夾帶資訊轉成 JSON 格式

// 處理 Server 錯誤訊息:
app.use((err: any, _: Request, res: Response) => {
  console.log("Server Error: ", err);
  res.status(500).json("Music Application Server Error!");
});

app.listen(3000, () => console.log("Server is running!"));
