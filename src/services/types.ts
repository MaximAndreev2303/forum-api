import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

export interface PostService {
  getPosts(category?: string, take?: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(
    post: Omit<Post, "id" | "categoryId"> & { categoryId: number }
  ): Promise<Post>;
}

export type CreatePostService = (
  repository: Repository
) => PostService;
