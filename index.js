const { ApolloServer, gql } = require("apollo-server");
const { books, author } = require("./db");

const typeDefs = gql`
  type Query {
    book: [Book!]
    author: [Author!]
    getBook(ID: String): Book
    getAuthor(ID: String): Author
  }
  type Book {
    name: String!
    author: String!
  }
  type Author {
    name: String!
    age: Int!
    book: [Book]
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
    getBook: (parent, args, context) => {
      console.log(parent);
      return books.find((book) => book.id === args.ID);
    },
    getAuthor: (parent, args, context) => {
      return author.find(a=>a.id===args.ID)
    },
  },
  Author:{
    book:(parent,args,context)=>{
      return books.filter(book=>book.author === parent.id)
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3000, () => console.log("server is running"));
