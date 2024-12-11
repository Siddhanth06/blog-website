import express from "express";
import "dotenv/config";
const app = express();
console.log(process.env.test);

app.listen(3000, () => {
  console.log("running");
});
