import * as User from "../controllers/user.controller.js";

const resolvers = {
    Query: {
        getUser: () => {
            console.log('Returning users');
            return users;
        }
    },

    Mutation: {
        newUser: async (_, { input }) => {
            console.log(input);
            const result = await User.newUser(input);
            return result; 
        },

        authentication: async (_, { input }) => {
            try {
              const token = await User.authentication(input);
              return { token };
            } catch (error) {
              console.error('Error during authentication:', error);
              throw new Error('Authentication failed'); 
            }
          }
    }
};


export default resolvers;