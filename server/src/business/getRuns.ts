import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

export async function getRuns(): Promise<Array<Run>> {
    return getRepository(Run).createQueryBuilder("run")
        .orderBy("run.time", "ASC")
        .getMany();
}