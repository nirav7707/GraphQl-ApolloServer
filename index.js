const { ApolloServer, gql } = require("apollo-server");
const { books, author } = require("./db");

const typeDefs = gql`
  type Query {
    book: [Book!]
    author: [Author!]
  }
  type Book {
    name: String!
    author: Int!
  }
  type Author {
    name: String!
    age: Int!
  }
`;
const resolvers = {
  Query: {
    book: () => {
      return books;
    },
    author: () => {
      return author;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3000, () => console.log("server is running"));
