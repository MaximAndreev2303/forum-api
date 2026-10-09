import { Router } from "express";
import { PostHandlers } from "../handlers/post.js";

export const createPostRouter = (handlers: PostHandlers) => {
  const router = Router();

  router.get("/posts", handlers.getAllPosts);
  router.get("/posts/:id", handlers.getOnePost);
  router.post("/posts", handlers.createNewPost);

  return router;
};