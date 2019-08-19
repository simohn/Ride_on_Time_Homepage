import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

export async function getRunsForUser(userId: number): Promise<Array<Run>> {
    return getRepository(Run).createQueryBuilder("run")
        .where("user_id = :id")
        .setParameters({ id: userId })
        .getMany();
}