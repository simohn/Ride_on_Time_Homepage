import { User } from '../entities/User';
import { getRepository } from "typeorm";

export async function getUserByName(username: string): Promise<User> {
    return getRepository(User).createQueryBuilder("user")
        .where("user.username = :username")
        .setParameters({ username })
        .getOne();
}