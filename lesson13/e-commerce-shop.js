import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# Пользователь
type User {
    id: Int!,
    email: String!,
    orders: [Order]!,
}

# Продавец
type Seller {
    id: Int!
    email: String!
    products: [Product]
}

# Заказ
type Order {
    id: Int!,
    userId: Int!
    products: [Product]!
}

# Товар
type Product {
    id: Int!,
    title: String!,
    price: Float!
    sellerId: Int!
}

type Query {
    getAllUsers: [User],
    getUserById(id: Int!): User,
    getAllProducts: [Product],
    getOrderByUserId(userId: Int!): Order
}

input CreateUserInput {
    email: String!,
    password: String!
}

input CreateProductInput {
    title: String!,
    price: Float!
}

type Mutation {
    addUser(input: CreateUserInput!): User!,
    addOrder: Order!,
    addProduct(input: CreateProductInput!): Product!
}

`;

const users = [
    {
        id: 1,
        email: 'bobovkin@mail.ru',
        orders: [],
    },
    {
        id: 2,
        email: 'chapaev@mail.ru',
        orders: [],
    },
    {
        id: 3,
        email: 'minin@mail.ru',
        orders: [],
    },
];

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        getAllUsers: () => users,
        getUserById: (id) => users.find(u => u.id === id)
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
