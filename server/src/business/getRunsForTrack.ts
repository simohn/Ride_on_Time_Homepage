import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

export async function getRunsForTrack(track_id: number): Promise<Array<Run>> {
    return getRepository(Run).createQueryBuilder("run")
        .where("run.track_id = :track_id")
        .setParameters({ track_id})
        .getMany();
}