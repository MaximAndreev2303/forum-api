
import { db } from "../prisma/db.js";
import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

export const createPostRepository = (): Repository => {
  return {
    async getAll(category?: string, take?: number): Promise<Post[]> {
      let posts = await db.orm.public.Post.all();

      if (category) {
        posts = posts.filter(post => post.category === category);
      }

      if (take) {
        posts = posts.slice(0, take);
      }

      return posts;
    },

    async getById(id: number): Promise<Post | undefined> {
      const posts = await db.orm.public.Post.where({ id }).all();
      return posts[0];
    },

    async addPost(post: Omit<Post, "id">): Promise<Post> {
      return db.orm.public.Post.create(post);
    }
  };
};
