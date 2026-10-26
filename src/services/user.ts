import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../domain/user/repository.js";
import { PublicUser } from "../domain/user/entity.js";
import { ConflictError, UnauthorizedError } from "../domain/errors.js";
import { UserService, CreateUserService } from "./types.js";

export const createUserService: CreateUserService = (
  repository: UserRepository
): UserService => {
  return {
    async register(email: string, password: string): Promise<PublicUser> {
      const existing = await repository.findByEmail(email);

      if (existing) {
        throw new ConflictError("User with this email already exists");
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await repository.create(email, passwordHash);

      return { id: user.id, email: user.email };
    },

    async login(
      email: string,
      password: string
    ): Promise<{ accessToken: string; user: PublicUser }> {
      const user = await repository.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const secret = process.env["JWT_SECRET"];

      if (!secret) {
        throw new Error("JWT_SECRET is not set");
      }

      const accessToken = jwt.sign(
        { sub: String(user.id), email: user.email },
        secret,
        { expiresIn: "1h" }
      );

      return { accessToken, user: { id: user.id, email: user.email } };
    },
  };
};
