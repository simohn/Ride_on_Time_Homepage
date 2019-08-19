import { Track } from '../entities/Track';
import { getRepository } from "typeorm";

export async function getTrack(track_id: number): Promise<Track> {
    return getRepository(Track).createQueryBuilder("track")
        .where("track.id = :track_id")
        .setParameters({ track_id })
        .getOne();
}
