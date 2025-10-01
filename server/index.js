// Standalone GraphQL server using Apollo Server v4
// Run with: npm run server:graphql

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// Mock data (shared idea as Next.js APIs)
const services = [
  { title: 'Web Development', description: 'Modern, responsive websites that engage your audience' },
  { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications' },
  { title: 'Digital Marketing', description: 'Strategies to grow your online presence' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure for your business' },
];

// GraphQL schema
const typeDefs = `#graphql
  type Service {
    title: String!
    description: String!
  }

  type Query {
    services(search: String): [Service!]!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    services: (_, { search }) => {
      if (!search) return services;
      const q = String(search).toLowerCase();
      return services.filter(
        (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    },
  },
};

async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({})
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
}

main().catch((err) => {
  console.error('Failed to start GraphQL server', err);
  process.exit(1);
});
