import {
  getAll,
  getById,
  addPost
} from "../repositories/post.js";

export const getPosts = (category, take) => {
  return getAll(category, take);
};

export const getPostById = (id) => {
  return getById(id);
};

export const createPost = (post) => {
  return addPost(post);
};