import { User } from '../entities/User';
import { getRepository } from "typeorm";

export async function getUser(id: number): Promise<User> {
    return getRepository(User).createQueryBuilder("user")
        .where("user.id = :id_temp")
        .setParameters({ id_temp: id})
        .getOne();
}