import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

export async function getRunsOnePerUser(): Promise<Array<Run>> {
    return getRepository(Run).createQueryBuilder("run")
        .orderBy("run.time", "ASC")
        .where("user_id = :id", {id: 1})
        .getMany();
}