
import { Post } from "./entity.js";

export interface Repository {
  getAll(category?: string, take?: number): Promise<Post[]>;
  getById(id: number): Promise<Post | undefined>;
  addPost(post: Omit<Post, "id">): Promise<Post>;
}
