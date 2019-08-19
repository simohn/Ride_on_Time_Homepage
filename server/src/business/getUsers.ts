import { User } from '../entities/User';
import { getRepository } from "typeorm";

export async function getUsers(): Promise<Array<User>> {
    return getRepository(User).createQueryBuilder("user")
        .getMany();
}