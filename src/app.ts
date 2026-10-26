import express from "express";

import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

import { createCategoryRepository } from "./repositories/category.js";
import { createCategoryService } from "./services/category.js";
import { createCategoryRouter } from "./transport/routers/category.js";

import { createUserRepository } from "./repositories/user.js";
import { createUserService } from "./services/user.js";
import { createUserHandlers } from "./transport/handlers/user.js";
import { createUserRouter } from "./transport/routers/user.js";

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

// Для пользователей (регистрация и вход)
const userRepository = createUserRepository();
const userService = createUserService(userRepository);
const userHandlers = createUserHandlers(userService);
const userRouter = createUserRouter(userHandlers);

app.use(postRouter);
app.use(categoryRouter);
app.use(userRouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
