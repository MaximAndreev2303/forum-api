import { Router } from "express";

import {
  getAllPosts,
  getOnePost,
  createNewPost
} from "../handlers/post.js";

const router = Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getOnePost);
router.post("/posts", createNewPost);

export default router;