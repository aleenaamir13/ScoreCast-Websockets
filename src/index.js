import AgentAPI from 'apminsight';
AgentAPI.config();

import express from 'express';
import cors from "cors";
import http from 'http';
import { MatchRouter } from './db/routes/matches.js';
import { attachWebSocketServer } from './ws/server.js';
import { securityMiddleware } from './arcjet.js';
import { CommentaryRouter } from './db/routes/commentary.js';

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
const server=http.createServer(app);

// CORS middleware 
const allowedOrigins = [
  "http://localhost:5174",
  "https://6a3fccc7494cc866b75dcb6b--scorecast-ws.netlify.app",
  "https://scorecast-ws.netlify.app" // if you also use the custom domain
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express Server!' });
});

app.use(securityMiddleware());
app.use('/matches', MatchRouter);
app.use('/matches/:id/commentary', CommentaryRouter);

const { broadcastMatchCreated, broadcastCommentary } = attachWebSocketServer(server);

app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;

server.listen(PORT, HOST, () => {
  const baseUrl = HOST==='0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running at ${baseUrl}`);
  console.log(`WebSocket server is running at ${baseUrl.replace('http', 'ws')}/ws`);
});
