import { db } from "../prisma/db.js";
import { User } from "../domain/user/entity.js";
import { UserRepository } from "../domain/user/repository.js";

export const createUserRepository = (): UserRepository => {
  return {
    async findByEmail(email: string): Promise<User | undefined> {
      const user = await db.orm.public.User.where({ email }).first();

      return (user ?? undefined) as unknown as User | undefined;
    },

    async create(email: string, passwordHash: string): Promise<User> {
      const user = await db.orm.public.User.create({
        email,
        password: passwordHash,
      });

      return user as unknown as User;
    },
  };
};
