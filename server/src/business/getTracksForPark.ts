import { getRepository } from "typeorm";
import { Track } from '../entities/Track';

export async function getTracksForPark(park_name: string): Promise<Array<Track>> {
    return getRepository(Track).createQueryBuilder("track")
        .where("track.park_name = :park_name")
        .setParameters({ park_name })
        .getMany();
}