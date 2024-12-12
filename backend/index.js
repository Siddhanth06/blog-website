import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/comment.route.js";

const app = express();

app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("running");
});
