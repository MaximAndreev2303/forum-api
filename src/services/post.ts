
import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";
import { CreatePostService } from "./types.js";

export const createPostService: CreatePostService = (repository: Repository) => {
  return {
    getPosts(category?: string, take?: number): Promise<Post[]> {
      return repository.getAll(category, take);
    },

    getPostById(id: number): Promise<Post | undefined> {
      return repository.getById(id);
    },

    createPost(post: Omit<Post, "id">): Promise<Post> {
      return repository.addPost(post);
    }
  };
};
