import { Category } from "../domain/category/entity.js";
import { CategoryRepository } from "../domain/category/repository.js";

export const createCategoryService = (repository: CategoryRepository) => {
  return {
    getCategories(): Promise<Category[]> {
      return repository.getAll();
    },

    getCategoryById(id: number): Promise<Category | undefined> {
      return repository.getById(id);
    },

    createCategory(category: Omit<Category, "id">): Promise<Category> {
      return repository.addCategory(category);
    }
  };
};