import { getRepository } from "typeorm";
import { Track } from '../entities/Track';

/**
 * Creates a new Track with the given name for the park and the track
 */
export async function createTrack(track_name: string, park_id: number): Promise<Track> {
    const track = new Track();
    track.track_name = track_name;
    track.park_id = park_id;
    return getRepository(Track).save(track);
}