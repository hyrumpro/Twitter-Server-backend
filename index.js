import 'dotenv/config';
import mongoose from "mongoose";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './gql/typeDefs.js';
import resolvers from './gql/resolver.js';

try {
    // Connect to MongoDB with error handling
    await mongoose.connect(process.env.MONGO_ATLAS)
        .then(() => console.log('MongoDB connected'))
        .catch((error) => {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Exit with an error code
        });

    const server = new ApolloServer({ resolvers, typeDefs });

    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`  Server ready at: ${url}`);
    } catch (error) {
        console.error(`Error starting Apollo Server:`, error);
    }
} catch (error) {
    console.error('Error during server setup:', error);
}


