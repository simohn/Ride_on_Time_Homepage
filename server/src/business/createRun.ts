import { getRepository } from "typeorm";
import { Run } from '../entities/Run';

var Globalize = require( "globalize" );
Globalize.load( require( "cldr-data" ).entireSupplemental() );
Globalize.load( require( "cldr-data" ).entireMainFor( "de" ) );

/**
 * Creates a new Run with the given time for the given User
 */
export async function createRun(time: number, userId: number, track_id: number): Promise<Run> {
    const run = new Run();
    run.time = time;
    run.user_id = userId;
    run.track_id = track_id;
    run.timestampTime = new Date().toLocaleTimeString();
    run.timestampDate = Globalize("de").formatDate(new Date());
    return getRepository(Run).save(run);
}