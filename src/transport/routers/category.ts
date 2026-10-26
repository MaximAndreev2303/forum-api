import { Router } from "express";
import { CategoryService } from "../handlers/category.js";
import { createCategoryHandlers } from "../handlers/category.js";

export const createCategoryRouter = (service: CategoryService) => {
  const router = Router();
  const handlers = createCategoryHandlers(service);

  router.get("/categories", handlers.getAllCategories);
  router.get("/categories/:id", handlers.getOneCategory);
  router.post("/categories", handlers.createNewCategory);

  return router;
};