import Express from 'express';

import ListCreationRouter from './routes/create-lists';
import ListDownloadRouter from './routes/download-lists';

import InitFolders from './util/folder-creator';

(function main() {
  InitFolders();
  // todo dotenv
  // todo logger
  // todo redis cache
  // todo cors

  const port = process.env.PORT || 9000;

  const app = Express();

  app.use('/create-list/user/:username/list/:list', ListCreationRouter);
  app.use('/download-list/list/:list', ListDownloadRouter);
  app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
  });
}());
