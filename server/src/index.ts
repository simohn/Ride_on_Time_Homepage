import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Run } from "./entities/Run";
import { Track } from "./entities/Track";
import { authentication, login, setup } from './auth';
import { getUser, getUsers, getRunsForUser, createUser, createRun, getRuns, getTrack, createTrack, getTracksForPark, getRunsForTrack, getRunsOnePerUser } from './business';
import { Context, createContext } from './context';

const typeDefs = `
  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    runs: [Run!]
    admin: Boolean
  }
  type Run {
    id: ID!
    time: Float!
    timeFormatted: String!
    user: User!
    track: Track!
  }
  type Track {
    id: ID!
    track_name: String!
    park_name: String!
  }
  
  type Query {
    getUser(id: ID!): User
    getRuns: [Run!]
    getRunsOnePerUser: [Run!]
    hello: String
    getUsers: [User!]!
    getTracksForPark(park_name: String!): [Track!]
    getRunsForTrack(track_id: ID!): [Run!]
    
    me: User!
  }
  
  type Mutation {
    
    """
    Registers a new user with the given name, email and password
    """
    register(username: String!, first_name: String!, last_name: String!, email: String!, password: String!): User!
    
    """
    Logs in a user with the given name and password.
    """
    login(username: String!, password: String!): User!
    
    """
    Adds a run for a given user
    """
    addRun(time: Float!, userId: Int!, track_id: Int!): Run
  
    """
    Adds a track for a given user
    """
    addTrack(track_name: String!, park_name: String!): Track
  }
`;

function centisecondsToTime(centi: number): String
{
      var centiseconds = centi % 100;
      var seconds = Math.floor((centi / 100) % 60);
      var minutes = Math.floor((centi / (60 * 100)) % 60);

      return pad(minutes) + ":" + pad(seconds) + "." + pad(centiseconds);
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

const resolvers = {
  Run: {
    user: async (source: Run, args, context: Context) => {
      return getUser(source.user_id)
    },
    track: async (source: Run, args, context: Context) => {
      return getTrack(source.track_id)
    },
    timeFormatted: async (source: Run, args, context: Context) => {
      return centisecondsToTime(source.time)
    }
  },
  User: {
    runs:  async (source: User, args, context: Context) => {
      return getRunsForUser(source.id)
    }
  },
  Query: {
    hello: (root, args, context) => {
      return "Hello World"
    },
    me: async (source, params, context: Context) => {
      return context.user
    },
    getUsers:  async (source, args, context: Context) => {
      // Only an admin should see all users
      if (!context.isAdmin()) {
        throw new Error('Only an admin can see all users')
      }

      return getUsers()
    },
    getUser: async (_, { id }) => {
      const user = await getUser(id);

      if (!user) {
        throw Error(`No user with the id ${id}`)
      }

      return user;
    },
    getRuns: async (_, {}) => {
     return getRuns()
    },
    getRunsOnePerUser: async (_, {}) => {
      return getRunsOnePerUser()
     },
    getTracksForPark: async (source, { park_name }: { park_name: string }, context: Context) => { 
      return getTracksForPark(park_name);
    },
    getRunsForTrack: async (source, { track_id }: { track_id: number }, context: Context) => { 
      return getRunsForTrack(track_id);
    }
  },
  Mutation: 
  {
    login: async (source, { username, password }: { username: string, password: string}, context: Context) => {
      const user = await authentication(context, username, password);
      await login(context, user);
      return user;
    },
    register: async (source, { username, first_name, last_name, email, password }: { username: string, first_name: string, last_name: string, email: string, password: string }, context: Context) => {

      const user = await createUser(username, first_name, last_name, email, password);

      // If a user registers we wanna log him hin immediately
      await login(context, user);

      return user;
    },
    addRun: async (_, { userId, time, track_id }: { userId: number, time: number, track_id:number}, context: Context) => {

      // Only allow an logged in user to add a run
      if (!context.isAdmin()) {
        throw new Error('Only admins can add a run')
      }

      // A user can only add a run for himself
      if (context.user.id !== userId) {
        throw new Error('You can only add a run for yourself')
      }

      return createRun(time, userId, track_id)
    },
    addTrack: async (_, { track_name, park_name }: { track_name: string, park_name: string}, context: Context) => {

      return createTrack(track_name, park_name)
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers, context: createContext });

setup(server);

createConnection()
  .then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch((error) => {
    console.log("Couldn't connect to the database.", error);
  });
