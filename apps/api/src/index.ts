import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

const app = new Hono();

// Middleware
app.use('*', cors());

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/v1/hello', (c) => {
  return c.json({ message: 'Hello from Agents 2025 DOPE API!' });
});

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 API Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});