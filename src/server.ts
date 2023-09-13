import { corsConfigs } from "./configs/corsConfig";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";

// 引入環境變數
dotenv.config();

// 啟動 Web 應用程式:
const app = express();

// 啟動 morgan，紀錄後端接收與回傳資訊
app.use(morgan("tiny"));


// 檢查 API 請求是否符合跨域設定
app.use(cors(corsConfigs));


// 載入解析 HTTP 資訊: body-parser(包含表單)
app.use(bodyParser.urlencoded({extended: true}));

// HTTP 夾帶資訊轉成 JSON 格式
app.use(express.json());

// 引入路徑分流
app.use("/users", userRoutes);


// 處理錯誤訊息 middleware
app.use((err, req, res) => {
    
})


// 監聽
app.listen(3000, () => {
    console.log("Server is running!")
})