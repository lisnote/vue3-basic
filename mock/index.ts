import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

export default function mock(
  mode: LooseAutocomplete<'development'>,
  env: NodeJS.ProcessEnv,
) {
  if (mode !== 'development') return;
  const { MOCK_PORT } = env;
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use('/', (_req, res, next) => {
    res.end('test');
    next();
  });

  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      io.emit('message', msg);
    });
  });

  server.listen(MOCK_PORT, () => {
    console.log(`server running at http://localhost:${MOCK_PORT}`);
  });
}
