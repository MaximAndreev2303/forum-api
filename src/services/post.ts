import {
  getAll,
  getById,
  addPost
} from "../repositories/post.js";

import {
  PostDto,
  CreatePostDto
} from "../dto/post.js";

export const getPosts = (
  category?: string,
  take?: number
): PostDto[] => {
  return getAll(category, take);
};

export const getPostById = (
  id: number
): PostDto | undefined => {
  return getById(id);
};

export const createPost = (
  post: CreatePostDto
): Promise<PostDto> => {
  return addPost(post);
};