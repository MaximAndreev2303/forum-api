import { db } from "../prisma/db.js";
import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";

// В ответ отдаём только id и email автора, хеш пароля не отдаём
const hidePassword = (row: any): Post => ({
  ...row,
  author: row.author ? { id: row.author.id, email: row.author.email } : null,
});

export const createPostRepository = (): Repository => {
  return {
    async getAll(category?: string, take?: number): Promise<Post[]> {
      const posts = await db.orm.public.Post
        .include("category")
        .include("author")
        .all();

      let result = posts.map(hidePassword);

      if (category) {
        result = result.filter(
          (post) => (post as any).category?.name === category
        );
      }

      if (take) {
        result = result.slice(0, take);
      }

      return result;
    },

    async getById(id: number): Promise<Post | undefined> {
      const posts = await db.orm.public.Post
        .where({ id })
        .include("category")
        .include("author")
        .all();

      return posts[0] ? hidePassword(posts[0]) : undefined;
    },

    async addPost(
      post: Omit<Post, "id" | "categoryId"> & { categoryId: number }
    ): Promise<Post> {
      const createdPost = await db.orm.public.Post.create({
        title: post.title,
        content: post.content,
        category: (relation) =>
          relation.connect({ id: post.categoryId }),
        author: (relation) =>
          relation.connect({ id: post.authorId as number }),
      });

      const posts = await db.orm.public.Post
        .where({ id: createdPost.id })
        .include("category")
        .include("author")
        .all();

      return hidePassword(posts[0]);
    },
  };
};
