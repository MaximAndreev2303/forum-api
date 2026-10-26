import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";
import { PublicUser } from "../domain/user/entity.js";
import { UserRepository } from "../domain/user/repository.js";

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

export interface UserService {
  register(email: string, password: string): Promise<PublicUser>;
  login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: PublicUser }>;
}

export type CreateUserService = (
  repository: UserRepository
) => UserService;
