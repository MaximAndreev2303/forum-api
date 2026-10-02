import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

export const createPostRepository = (): Repository => {
  const posts: Post[] = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      content: "JavaScript is a programming language.",
      author: "Maxim",
      category: "programming"
    },
    {
      id: 2,
      title: "Learning Node.js",
      content: "Node.js allows you to run JavaScript outside the browser.",
      author: "Alex",
      category: "programming"
    },
    {
      id: 3,
      title: "My first post",
      content: "This is my first forum post.",
      author: "John",
      category: "general"
    }
  ];

  return {
    getAll(category?: string, take?: number): Post[] {
      let result = posts;

      if (category) {
        result = result.filter(post => post.category === category);
      }

      if (take) {
        result = result.slice(0, take);
      }

      return result;
    },

    getById(id: number): Post | undefined {
      return posts.find(post => post.id === id);
    },

    addPost(post: Omit<Post, "id">): Promise<Post> {
      return new Promise(resolve => {
        const newPost: Post = {
          id: posts.length + 1,
          ...post
        };

        posts.push(newPost);

        resolve(newPost);
      });
    }
  };
};