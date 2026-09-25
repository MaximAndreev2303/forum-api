import {
  getPosts,
  getPostById,
  createPost
} from "../services/post.js";

export const getAllPosts = (req, res) => {
  const { category, take } = req.query;

  const posts = getPosts(category, take);

  res.status(200).json(posts);
};

export const getOnePost = (req, res) => {
  const id = Number(req.params.id);

  const post = getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  res.status(200).json(post);
};

export const createNewPost = async (req, res) => {
  const { title, content, author, category } = req.body;

  if (!title || !content) {
    return res.status(422).json({
      message: "Title and content are required"
    });
  }

  const post = await createPost({
    title,
    content,
    author,
    category
  });

  res.status(201).json(post);
};