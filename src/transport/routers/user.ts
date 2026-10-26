import { Router } from "express";
import { UserHandlers } from "../handlers/user.js";

export const createUserRouter = (handlers: UserHandlers) => {
  const router = Router();

  router.post("/auth/register", handlers.register);
  router.post("/auth/login", handlers.login);

  return router;
};
