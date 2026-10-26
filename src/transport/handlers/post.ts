
import { Request, Response } from "express";
import { PostService } from "../../services/types.js";

export interface PostHandlers {
  getAllPosts(req: Request, res: Response): Promise<void>;
  getOnePost(req: Request, res: Response): Promise<void>;
  createNewPost(req: Request, res: Response): Promise<void>;
}

export const createPostHandlers = (
  service: PostService
): PostHandlers => {
  return {
    async getAllPosts(req: Request, res: Response): Promise<void> {
      const { category, take } = req.query;

      const posts = await service.getPosts(
        typeof category === "string" ? category : undefined,
        typeof take === "string" ? Number(take) : undefined
      );

      res.status(200).json(posts);
    },

    async getOnePost(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "Invalid post id" });
        return;
      }

      const post = await service.getPostById(id);

      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.status(200).json(post);
    },

    async createNewPost(req: Request, res: Response): Promise<void> {
      const { title, content, author, categoryId } = req.body;

      if (
        typeof title !== "string" || !title.trim() ||
        typeof content !== "string" || !content.trim() ||
        typeof author !== "string" || !author.trim()
      ) {
        res.status(422).json({ message: "Invalid post data" });
        return;
      }

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        res.status(400).json({ message: "Invalid categoryId" });
        return;
      }

      try {
        const post = await service.createPost({
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
          categoryId,
        });

        res.status(201).json(post);
      } catch (error) {
        console.error(error);
      res.status(500).json({ message: "Failed to create post" });
      }
    },
  };
};
