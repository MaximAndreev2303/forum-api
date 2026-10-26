import { User } from "./entity.js";

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(email: string, passwordHash: string): Promise<User>;
}
