import express from "express";
import { userRouter, categoryRouter, postRouter, replyRouter } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", postRouter);
app.use("/api", replyRouter);

// 실험 페이지
app.get("/", (req, res) => {
  res.send("<h1>백엔드 페이지<h1>");
});

export { app };
