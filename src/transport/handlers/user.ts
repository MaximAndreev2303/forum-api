import { Request, Response } from "express";
import { UserService } from "../../services/types.js";
import { ConflictError, UnauthorizedError } from "../../domain/errors.js";

export interface UserHandlers {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}

export const createUserHandlers = (service: UserService): UserHandlers => {
  return {
    async register(req: Request, res: Response): Promise<void> {
      const { email, password } = req.body ?? {};

      if (
        typeof email !== "string" || !email.trim() ||
        typeof password !== "string" || !password
      ) {
        res.status(422).json({ message: "Email and password are required" });
        return;
      }

      try {
        const user = await service.register(email.trim(), password);
        res.status(201).json(user);
      } catch (error) {
        if (error instanceof ConflictError) {
          res.status(409).json({ message: error.message });
          return;
        }

        console.error(error);
        res.status(500).json({ message: "Failed to register user" });
      }
    },

    async login(req: Request, res: Response): Promise<void> {
      const { email, password } = req.body ?? {};

      if (
        typeof email !== "string" || !email.trim() ||
        typeof password !== "string" || !password
      ) {
        res.status(422).json({ message: "Email and password are required" });
        return;
      }

      try {
        const { accessToken, user } = await service.login(
          email.trim(),
          password
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 1000,
        });

        res.status(200).json(user);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          res.status(401).json({ message: error.message });
          return;
        }

        console.error(error);
        res.status(500).json({ message: "Failed to login" });
      }
    },
  };
};
