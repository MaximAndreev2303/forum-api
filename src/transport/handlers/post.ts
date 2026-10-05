import { Request, Response } from "express";
import { Post } from "../../domain/post/entity.js";
import { PostService } from "../../services/types.js";

export interface PostHandlers {
  getAllPosts(req: Request, res: Response): void;
  getOnePost(req: Request, res: Response): void;
  createNewPost(req: Request, res: Response): Promise<void>;
}

export const createPostHandlers = (
  service: PostService
): PostHandlers => {
  return {
    getAllPosts(req: Request, res: Response) {
      const { category, take } = req.query;

      const posts = service.getPosts(
        category as string | undefined,
        take ? Number(take) : undefined
      );

      res.status(200).json(posts);
    },

    getOnePost(req: Request, res: Response) {
      const id = Number(req.params.id);

      const post = service.getPostById(id);

      if (!post) {
        res.status(404).json({
          message: "Post not found"
        });
        return;
      }

      res.status(200).json(post);
    },

    async createNewPost(req: Request, res: Response) {
      const { title, content, author, category } =
        req.body as Omit<Post, "id">;

      if (!title || !content) {
        res.status(422).json({
          message: "Title and content are required"
        });
        return;
      }

      const post = await service.createPost({
        title,
        content,
        author,
        category
      });

      res.status(201).json(post);
    }
  };
};