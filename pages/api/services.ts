import type { NextApiRequest, NextApiResponse } from 'next';

// Mock services data (shared by REST and GraphQL)
const services = [
  { title: 'Web Development', description: 'Modern, responsive websites that engage your audience' },
  { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications' },
  { title: 'Digital Marketing', description: 'Strategies to grow your online presence' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure for your business' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    debugger;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({ services });
}
