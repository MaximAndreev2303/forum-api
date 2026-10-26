import { db } from "../prisma/db.js";
import { Category } from "../domain/category/entity.js";
import { CategoryRepository } from "../domain/category/repository.js";

export const createCategoryRepository = (): CategoryRepository => {
  return {
    async getAll(): Promise<Category[]> {
      return db.orm.public.Category.all();
    },

    async getById(id: number): Promise<Category | undefined> {
      const categories = await db.orm.public.Category.where({ id }).all();
      return categories[0];
    },

    async addCategory(category: Omit<Category, "id">): Promise<Category> {
      return db.orm.public.Category.create(category);
    }
  };
};