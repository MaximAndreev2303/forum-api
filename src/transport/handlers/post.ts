import {
  getPosts,
  getPostById,
  createPost
} from "../../services/post.js";

import {
  CreatePostDto
} from "../../dto/post.js";

import { Request, Response } from "express";

export const getAllPosts = (req: Request, res: Response) => {
  const { category, take } = req.query;

  const posts = getPosts(
    category as string | undefined,
    take ? Number(take) : undefined
  );

  res.status(200).json(posts);
};

export const getOnePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const post = getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  res.status(200).json(post);
};

export const createNewPost = async (
  req: Request,
  res: Response
) => {
  const { title, content, author, category } =
    req.body as CreatePostDto;

  if (!title || !content) {
    return res.status(422).json({
      message: "Title and content are required"
    });
  }

  const post = await createPost({
    title,
    content,
    author,
    category
  });

  res.status(201).json(post);
};