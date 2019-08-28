import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { getUser, getUserByName } from './business';
import { User } from './entities/User';
import { Context } from './context';
import { SECRET_KEY } from './config';

var pgSession = require('connect-pg-simple')(session);

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/**
 * This function sets up the whole authentication stuff
 * We are using cookies to store our session Id on the clients.
 * The session is stored in the postgres database.
 *
 * We only store the userId in the session see passport.serializeUser function.
 */
export function setup(server: any) {
    server.use(cookieParser(SECRET_KEY));
    server.use(session({
        store: new pgSession({
            // TODO read out from config
            conString : "postgresql://localhost:5432/spielwiese_10"
        }),
        secret: SECRET_KEY,
        cookie: { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    
    // This function gets the userId stored in the session and delivers the loaded user
    passport.deserializeUser(async (userId: any, next) => {
        const user = await getUser(userId);
        return next(null, user);
    });

    // This function gets the user and delivers only the id of the user which is then stored in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // This functions gets the name and the password from the request and has to check if it is correct
    passport.use(new LocalStrategy({}, async (username, password, done) => {

        // Load the user for this name
        const user = await getUserByName(username);

        // If no user found --> return false
        if (!user) {
            return done(null,false)
        }

        // Check if the password matches
        if (!comparePass(password, user.password)) {
            return done(null,false)
        }

        // If all is ok, return the user
        return done(null, user);
    }));
}

/**
 * Checks if the given user password is valid for the given database password hash
 */
function comparePass(userPassword: string, databasePasswordHash: string): boolean {
    return bcrypt.compareSync(userPassword, databasePasswordHash);
}

/**
 * Hashes a given password
 */
export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

/**
 * Authenticate a request with the given name and password
 */
export function authentication(context: Context, username: string, password: string): Promise<User> {
    // @ts-ignore
    context.req.body.username = username;
    // @ts-ignore
    context.req.body.password = password;

    return new Promise<User>((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return reject('False user or password');
            }
            if (!user) {
                return reject('False user or password');
            }

            return resolve(user);
        })(context.req)
    });
}

/**
 * Call the passport Login function on the request.
 * This will create the session in the database
 */
export function login(context: Context, user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // @ts-ignore
        context.req.logIn(user, function (err) {
            if (err) {
                return reject(err)
            }
            return resolve()
        });
    });
}