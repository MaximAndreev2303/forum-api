import { Request, Response } from "express";
import { createPostRepository } from "../../repositories/post.js";
import { createPostService } from "../../services/post.js";
import { Post } from "../../domain/post/entity.js";

const repository = createPostRepository();
const service = createPostService(repository);

export const getAllPosts = (req: Request, res: Response) => {
  const { category, take } = req.query;

  const posts = service.getPosts(
    category as string | undefined,
    take ? Number(take) : undefined
  );

  res.status(200).json(posts);
};

export const getOnePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const post = service.getPostById(id);

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
    req.body as Omit<Post, "id">;

  if (!title || !content) {
    return res.status(422).json({
      message: "Title and content are required"
    });
  }

  const post = await service.createPost({
    title,
    content,
    author,
    category
  });

  res.status(201).json(post);
};