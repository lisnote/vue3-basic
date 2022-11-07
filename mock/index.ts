import express from 'express';

function startMocker(port: string) {
  const app = express();
  app.get('*', (req, res, next) => res.end('mocker success'));
  app.listen(port, () =>
    console.log(`mocker started in http://localhost:${port}`),
  );
}

export default startMocker;
