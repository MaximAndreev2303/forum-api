import { Request, Response } from "express";
import { CreateCategoryDto } from "../../dto/category.js";

export interface CategoryService {
  getCategories(): Promise<{ id: number; name: string }[]>;
  getCategoryById(id: number): Promise<{ id: number; name: string } | undefined>;
  createCategory(category: CreateCategoryDto): Promise<{ id: number; name: string }>;
}

export const createCategoryHandlers = (service: CategoryService) => ({
  async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await service.getCategories();
    res.status(200).json(categories);
  },

  async getOneCategory(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid category id" });
      return;
    }

    const category = await service.getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  },

  async createNewCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body as CreateCategoryDto;

    if (typeof name !== "string" || !name.trim()) {
      res.status(422).json({ message: "Invalid category data" });
      return;
    }

    try {
      const category = await service.createCategory({ name: name.trim() });
      res.status(201).json(category);
    } catch (error) {
      res.status(409).json({ message: "Category name already exists" });
    }
  }
});