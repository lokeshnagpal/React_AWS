import type { NextApiRequest, NextApiResponse } from 'next';
import yogaHandler from './graphqlResolver';

// Delegate to the Yoga-based GraphQL handler implemented in graphqlResolver.ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return (yogaHandler as any)(req, res);
}
