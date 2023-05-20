import 'dotenv/config';

import fastify from "fastify";

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';

import { resolve } from 'node:path';

import { MemoriesRoutes } from "./routes/memories";
import { AuthRoutes } from './routes/auth';
import { UploadRoutes } from './routes/upload';


const app = fastify();

app.register(cors, {
  origin: true
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads/'
});

app.register(jwt, {
  secret: 'spacetime'
});

app.register(multipart);

app.register(AuthRoutes);
app.register(UploadRoutes);
app.register(MemoriesRoutes);

app.listen({
  port: 3333,
  host: '0.0.0.0',
})
.then(() => {
  console.log('HTTP server running on http://localhost:3333 🔥🔥')
});