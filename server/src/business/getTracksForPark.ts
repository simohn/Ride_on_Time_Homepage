import { getRepository } from "typeorm";
import { Track } from '../entities/Track';

export async function getTracksForPark(park_id: number): Promise<Array<Track>> {
    return getRepository(Track).createQueryBuilder("track")
        .where("track.park_id = :park_id")
        .setParameters({ park_id })
        .getMany();
}