import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

export interface PostService {
  getPosts(category?: string, take?: number): Post[];
  getPostById(id: number): Post | undefined;
  createPost(post: Omit<Post, "id">): Promise<Post>;
}

export type CreatePostService = (
  repository: Repository
) => PostService;