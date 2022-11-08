import express from 'express';
import mocker from './mocker';
import recorder from './recorder';

function startMocker(port: string) {
  const app = express();
  app.use(mocker());
  app.use(recorder);
  app.listen(port, () =>
    console.log(`mocker started in \x1b[1;36mhttp://localhost:${port}\x1b[0m`),
  );
}

export default startMocker;
