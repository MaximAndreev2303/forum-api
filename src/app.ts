import express from "express";

import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

const app = express();

app.use(express.json());

const repository = createPostRepository();
const service = createPostService(repository);
const handlers = createPostHandlers(service);
const postRouter = createPostRouter(handlers);

app.use(postRouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});