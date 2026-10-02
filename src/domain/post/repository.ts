import { Post } from "./entity.js";

export interface Repository {
  getAll(category?: string, take?: number): Post[];
  getById(id: number): Post | undefined;
  addPost(post: Omit<Post, "id">): Promise<Post>;
}