

const typeDefs = `
   type User {
       id: ID,
       username: String,
       email: String,
       avatar: String,
       website: String,
       description: String,
       password: String,
   }

   type Token {
       token: String!
   }
   
   input UserInput {
       name: String!,
       username: String!,
       email: String!,
       password: String!,
   }
   
   input LoginInput {,
       email: String!,
       password: String!,
   }

   type Query {
       getUser: User
   }
   
   type Mutation {
     newUser(input: UserInput): User,
     authentication(input: LoginInput): Token
   }
   
   
`

export default typeDefs;