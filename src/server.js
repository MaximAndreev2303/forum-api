import express from "express";
import postRouter from "./routers/post.js";

const app = express();

app.use(express.json());
app.use(postRouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});