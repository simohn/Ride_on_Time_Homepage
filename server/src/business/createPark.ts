import { getRepository } from "typeorm";
import { Park } from '../entities/Park';

/**
 * Creates a new Track with the given name for the park and the track
 */
export async function createPark(park_name: string): Promise<Park> {
    const park = new Park();
    park.parkname = park_name;
    return getRepository(Park).save(park);
}