
import { db } from "../prisma/db.js";
import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

export const createPostRepository = (): Repository => {
  return {
    async getAll(category?: string, take?: number): Promise<Post[]> {
      const posts = await db.orm.public.Post.include("category").all();

      let result = posts;

      if (category) {
        result = result.filter(
          (post) => post.category?.name === category
        );
      }

      if (take) {
        result = result.slice(0, take);
      }

      return result as unknown as Post[];
    },

    async getById(id: number): Promise<Post | undefined> {
      const posts = await db.orm.public.Post
        .where({ id })
        .include("category")
        .all();

      return posts[0] as unknown as Post | undefined;
    },

    async addPost(
      post: Omit<Post, "id" | "categoryId"> & { categoryId: number }
    ): Promise<Post> {
      const createdPost = await db.orm.public.Post.create({
        title: post.title,
        content: post.content,
        author: post.author,
        category: (relation) =>
          relation.connect({ id: post.categoryId }),
      });

      const posts = await db.orm.public.Post
        .where({ id: createdPost.id })
        .include("category")
        .all();

      return posts[0] as unknown as Post;
    },
  };
};
