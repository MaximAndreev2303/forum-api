import express from "express";

import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

import { createCategoryRepository } from "./repositories/category.js";
import { createCategoryService } from "./services/category.js";
import { createCategoryRouter } from "./transport/routers/category.js";

const app = express();

app.use(express.json());

// Для постов
const postRepository = createPostRepository();
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

// Для категорий
const categoryRepository = createCategoryRepository();
const categoryService = createCategoryService(categoryRepository);
const categoryRouter = createCategoryRouter(categoryService);

app.use(postRouter);
app.use(categoryRouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});