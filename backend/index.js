import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./src/app";

// 환경변수 사용
dotenv.config();
const port = process.env.SERVER_PORT;

app.set("port", process.env.PORT || 8080);

// DB 만들고 연결할 주소
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
mongoose.connection.on("error", () => {
  console.error("MongoDB Connect Failed");
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기중 🚀`);
});
