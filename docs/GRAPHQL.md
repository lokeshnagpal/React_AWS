# GraphQL in This Project

This project includes a minimal GraphQL-like API implemented without external GraphQL libraries to demonstrate the three core GraphQL operation types:

- Queries (read)
- Mutations (write)
- Subscriptions (real-time events)

The implementation is intentionally simple and uses naive string parsing. It is suitable for demos and learning, not for production.


## Where to Look

- API route: `pages/api/graphql.ts`
- Client usage: `pages/services.js`

The REST counterpart is available at `pages/api/services.ts` (if present). The Services page allows you to toggle between REST and GraphQL to see the differences.


## Data Model (Mock)

The API works with an in-memory array named `services`:

```ts
const services = [
  { title: 'Web Development', description: 'Modern, responsive websites that engage your audience' },
  { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications' },
  { title: 'Digital Marketing', description: 'Strategies to grow your online presence' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure for your business' },
];
```

Because this is in-memory, data resets whenever the server restarts.


## Queries

Queries are read-only operations. This demo supports a root field `services` with:

- Optional argument: `search: String` (filters by title or description)
- Selection set: any subset of `title` and `description`

Examples:

- Fetch all services (title + description)

```json
{
  "query": "{ services { title description } }"
}
```

- Fetch only `description`

```json
{
  "query": "{ services { description } }"
}
```

- Fetch with a search term

```json
{
  "query": "{ services(search: \"cloud\") { title description } }"
}
```

Notes:
- Selection sets are parsed naively; nested selections are not supported.
- Only the fields `title` and `description` are recognized.


## Mutations

Mutations change data. This demo supports a single mutation: `addService(title: String!, description: String!)`.

Example payload:

```json
{
  "query": "mutation { addService(title: \"New\", description: \"From mutation\") { title description } }"
}
```

Behavior:
- Appends a new service (actually unshift to add on top) to the in-memory list.
- Returns the created service projected to the requested fields.
- Publishes a `serviceAdded` event to all active subscribers (see Subscriptions).

Client helper in `pages/services.js`:

```js
const mutation = `mutation { addService(title: "${title}", description: "${description}") { title description } }`;
fetch('/api/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: mutation }) })
```

Caution:
- Since we use naive string interpolation in the demo, avoid unescaped quotes in `title`/`description`. In a real app, variables should be used instead of raw string interpolation.
- There is no authentication or validation beyond presence checks.


## Subscriptions (SSE)

Subscriptions deliver real-time updates. This demo uses Server-Sent Events (SSE) to push a `serviceAdded` event whenever a new service is created via the mutation.

Endpoint:

```
GET /api/graphql?subscription=serviceAdded
```

Event payload shape:

```json
{"data":{"serviceAdded":{"title":"...","description":"..."}}}
```

Browser example (used in `pages/services.js`):

```js
const es = new EventSource('/api/graphql?subscription=serviceAdded');
es.onmessage = (evt) => {
  const payload = JSON.parse(evt.data);
  const added = payload?.data?.serviceAdded;
  if (added) {
    // Update UI with the new item
  }
};
```

cURL example:

```bash
curl -N http://localhost:3000/api/graphql?subscription=serviceAdded
```

Notes:
- SSE keeps an open HTTP connection and sends events as lines prefixed by `data:`.
- This demo keeps subscribers in memory and sends a keep-alive comment every ~25s.


## How the Client Page Uses It (`pages/services.js`)

- Toggle selector switches between `REST API` and `GraphQL`.
- When in GraphQL mode:
  - Fetches services via a GraphQL query requesting `{ title description }`.
  - Subscribes to `serviceAdded` events with `EventSource` and prepends incoming items to the list.
  - Provides a button “Add Demo Service (Mutation)” that triggers `addService` and optimistically updates the UI.

Key functions:

```js
// Query
fetch('/api/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: '{ services { title description } }' }) });

// Mutation
addServiceGraphql(title, description);

// Subscription
new EventSource('/api/graphql?subscription=serviceAdded');
```


## API Route Implementation Details (`pages/api/graphql.ts`)

- POST requests handle Queries and Mutations by looking for keywords:
  - `mutation` + `addService` → parse args, create, return data, publish SSE
  - `services` → optional `search` argument, apply selection set, return list
- GET requests with `?subscription=serviceAdded` upgrade the response to an SSE stream and keep it open to send events.

Important helpers:

- `parseSelection(query, rootField)` — extracts the selection set for the root field and filters to allowed fields
- `projectFields(obj, fields)` — returns only the requested fields
- `publishServiceAdded(payload)` — writes an SSE event to all connected subscribers

Limitations (by design for demo):
- Naive string parsing via regex; no GraphQL schema or validation.
- Only fields `title` and `description` are supported.
- No variables, fragments, directives, or nested selections.
- In-memory data and subscribers (no persistence).


## Testing with curl

- Query:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ services { title description } }"}' \
  http://localhost:3000/api/graphql
```

- Query with search:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ services(search: \"cloud\") { title description } }"}' \
  http://localhost:3000/api/graphql
```

- Mutation:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { addService(title: \"New\", description: \"From mutation\") { title description } }"}' \
  http://localhost:3000/api/graphql
```

- Subscription (SSE):

```bash
curl -N http://localhost:3000/api/graphql?subscription=serviceAdded
```


## Production Guidance

For real-world GraphQL, use a proper GraphQL server and tooling:

- Apollo Server, GraphQL Yoga, or Mercurius for the server
- Define a schema (`typeDefs`) and resolvers
- Use variables in queries/mutations instead of building strings
- Implement authentication and input validation
- For subscriptions, prefer `graphql-ws` (WebSockets) or Yoga’s SSE support
- Persist data in a database

Example schema sketch for production:

```graphql
type Service {
  title: String!
  description: String!
}

type Query {
  services(search: String): [Service!]!
}

type Mutation {
  addService(title: String!, description: String!): Service!
}

type Subscription {
  serviceAdded: Service!
}
```


## Troubleshooting

- If GraphQL responses are missing fields, ensure your query includes them in the selection set (e.g., `{ services { title description } }`).
- If the subscription appears idle, try creating a new service via the mutation to trigger an event.
- Since the parser is naive, unescaped quotes in input strings can break the mutation. Use simple text without quotes for the demo.
- Data resets on server restarts because state is in-memory.
