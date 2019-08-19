import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

/**
 * Creates a new Run with the given time for the given User
 */
export async function createRun(time: number, userId: number, track_id: number): Promise<Run> {
    const run = new Run();
    run.time = time;
    run.user_id = userId;
    run.track_id = track_id;
    return getRepository(Run).save(run);
}