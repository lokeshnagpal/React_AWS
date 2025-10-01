// pages/api/graphql.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createYoga, createSchema } from 'graphql-yoga';
import { createPubSub } from '@graphql-yoga/node'; // or any simple pubsub
import { GraphQLError } from 'graphql';

type Service = { title: string; description: string };
const services: Service[] = [
  { title: 'Web Development', description: 'Modern, responsive websites...' },
  { title: 'Mobile Apps', description: 'Native and cross-platform...' },
  { title: 'Digital Marketing', description: 'Strategies to grow...' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure...' },
];

const typeDefs = /* GraphQL */ `
  """
  Custom directive that uppercases the resolved string of a field.
  In this demo we attach it to Service.title.
  """
  directive @upper on FIELD_DEFINITION

  """
  Custom directive that marks a field as requiring auth. In this demo
  we simulate auth via the HTTP header: x-demo-auth: true
  """
  directive @auth on FIELD_DEFINITION

  type Service {
    title: String! @upper
    description: String!
  }

  type Query {
    services(search: String): [Service!]!
  }

  type Mutation {
    addService(title: String!, description: String!): Service! @auth
  }

  type Subscription {
    serviceAdded: Service!
  }
`;

const pubSub = createPubSub<{ serviceAdded: [payload: Service] }>();

type YogaContext = { isAuthed: boolean };

const resolvers = {
  Query: {
    services: (_parent: unknown, args: { search?: string }) => {
      const t = (args.search || '').toLowerCase();
      if (!t) return services;
      return services.filter(
        s => s.title.toLowerCase().includes(t) || s.description.toLowerCase().includes(t)
      );
    },
  },
  Mutation: {
    addService: (_parent: unknown, args: { title: string; description: string }, ctx: YogaContext) => {
      // Enforce @auth via context (set by Yoga below)
      if (!ctx?.isAuthed) {
        throw new GraphQLError('Unauthorized: missing x-demo-auth header');
      }
      const newService = { title: args.title, description: args.description };
      services.unshift(newService);
      pubSub.publish('serviceAdded', newService);
      return newService;
    },
  },
  Subscription: {
    serviceAdded: {
      subscribe: () => pubSub.subscribe('serviceAdded'),
      resolve: (payload: Service) => payload,
    },
  },
  // Field-level resolvers
  Service: {
    // Demonstrate @upper by returning uppercase titles
    title: (parent: Service) => parent.title.toUpperCase(),
  },
};

// Create schema with explicit context type for directive auth
const schema = createSchema<YogaContext>({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: ({ request }) => {
    // Simple demo auth: set x-demo-auth: true to allow @auth fields
    const isAuthed = request.headers.get('x-demo-auth') === 'true';
    return { isAuthed };
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return yoga(req, res);
}

export const config = { api: { bodyParser: false } };