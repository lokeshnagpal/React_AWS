import type { NextApiRequest, NextApiResponse } from 'next';

// Reuse the same mock data as REST
const services = [
  { title: 'Web Development', description: 'Modern, responsive websites that engage your audience' },
  { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications' },
  { title: 'Digital Marketing', description: 'Strategies to grow your online presence' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure for your business' },
];

/*
  Minimal GraphQL-like handler without external libs for demo purposes.
  Now supports:
  - Query:
    {
      services(search: "term") { title description }
    }
  - Mutation:
    mutation {
      addService(title: "T", description: "D") { title description }
    }
  - Subscription over SSE (Server-Sent Events):
    GET /api/graphql?subscription=serviceAdded
*/

// Very naive in-memory list of SSE subscribers
const subscribers = new Set<NextApiResponse>();

function projectFields<T extends Record<string, any>>(obj: T, fields: string[]): Partial<T> {
  if (!fields.length) return obj;
  const out: Partial<T> = {};
  fields.forEach((f) => {
    if (f in obj) (out as any)[f] = obj[f];
  });
  return out;
}

function parseSelection(query: string, rootField: string): string[] {
  const selectionMatch = query.match(new RegExp(`${rootField}[^\\{]*\\{([^}]*)\\}`, 'i'));
  const selectionRaw = selectionMatch?.[1] || '';
  return selectionRaw
    .split(/[^a-zA-Z_]+/)
    .filter(Boolean)
    .filter((f) => ['title', 'description'].includes(f));
}

function publishServiceAdded(payload: any) {
  const data = `data: ${JSON.stringify({ data: { serviceAdded: payload } })}\n\n`;
  subscribers.forEach((res) => {
    try {
      res.write(data);
    } catch (_e) {
      // if write fails, drop the subscriber
      try { subscribers.delete(res); } catch {}
    }
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle SSE subscription: /api/graphql?subscription=serviceAdded
  if (req.method === 'GET' && (req.query as any)?.subscription === 'serviceAdded') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.write(': connected\n\n');

    subscribers.add(res);

    // keep-alive ping to prevent proxies from closing the connection
    const keepAlive = setInterval(() => {
      try { res.write(': keep-alive\n\n'); } catch (_e) {}
    }, 25000);

    req.on('close', () => {
      clearInterval(keepAlive);
      subscribers.delete(res);
      try { res.end(); } catch {}
    });
    return; // keep connection open
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { query } = req.body || {};

    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid GraphQL payload' });
    }

    const qLower = query.replace(/\s+/g, ' ').toLowerCase();

    // Handle Mutation: addService
    if (qLower.includes('mutation') && qLower.includes('addservice')) {
      // Extract arguments (very naive)
      const titleMatch = query.match(/title\s*:\s*"([^"]*)"/i);
      const descMatch = query.match(/description\s*:\s*"([^"]*)"/i);
      const title = titleMatch?.[1]?.trim();
      const description = descMatch?.[1]?.trim();
      if (!title || !description) {
        return res.status(400).json({ error: 'addService requires title and description' });
      }

      const newService = { title, description };
      services.unshift(newService);

      const fields = parseSelection(query, 'addService');
      const projected = projectFields(newService, fields);

      // Publish to SSE subscribers
      publishServiceAdded(projected);

      return res.status(200).json({ data: { addService: projected } });
    }

    // Handle Query: services
    if (!qLower.includes('services')) {
      return res.status(400).json({ error: 'Unsupported query in mock GraphQL API' });
    }

    // Extract optional search argument: services(search: "term")
    const searchMatch = query.match(/services\s*\(\s*search\s*:\s*"([^"]*)"\s*\)/i);
    const searchTerm = searchMatch?.[1]?.trim() || '';

    const requestedFields = parseSelection(query, 'services');

    // Filter by search term if provided (in title or description)
    const filtered = services.filter((s) => {
      if (!searchTerm) return true;
      const t = searchTerm.toLowerCase();
      return (
        s.title.toLowerCase().includes(t) ||
        s.description.toLowerCase().includes(t)
      );
    });

    // Project only requested fields if any were specified; otherwise return full objects
    const result = requestedFields.length
      ? filtered.map((s) => projectFields(s, requestedFields))
      : filtered;

    return res.status(200).json({ data: { services: result } });

  } catch (e) {
    return res.status(500).json({ error: 'GraphQL server error' });
  }
}
