import * as Path from 'path';
import * as FS from 'fs';

const basePath = Path.resolve('./dist/temp-output-files/');

function clearFolderStructureRecursive() {
  if (FS.existsSync(basePath)) {
    FS.rmdirSync(basePath, { recursive: true });
  }
}

function createFolderStructure() {
  const animeListsFolder = Path.resolve(basePath, './anime');
  const mangaListsFolder = Path.resolve(basePath, './manga');

  FS.mkdirSync(animeListsFolder, { recursive: true });
  FS.mkdirSync(mangaListsFolder);
}

export default function InitFolders() {
  clearFolderStructureRecursive();
  createFolderStructure();
}
