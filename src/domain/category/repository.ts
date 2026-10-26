import { Category } from "./entity.js";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: number): Promise<Category | undefined>;
  addCategory(category: Omit<Category, "id">): Promise<Category>;
}