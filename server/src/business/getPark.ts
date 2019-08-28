import { Park } from '../entities/Park';
import { getRepository } from "typeorm";

export async function getPark(id: number): Promise<Park> {
    return getRepository(Park).createQueryBuilder("park")
        .where("park.id = :id_temp")
        .setParameters({ id_temp: id})
        .getOne();
}