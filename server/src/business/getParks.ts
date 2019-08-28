import { Park } from '../entities/Park';
import { getRepository } from "typeorm";

export async function getParks(): Promise<Array<Park>> {
    return getRepository(Park).createQueryBuilder("park")
        .getMany();
}