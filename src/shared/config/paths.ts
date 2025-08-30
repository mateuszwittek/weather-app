import path from 'path';

const root = process.cwd();

export const paths = {
  root,
  clientDist: path.resolve(root, 'dist/client'),
  serverDist: path.resolve(root, 'dist/server'),
  clientIndex: path.resolve(root, 'dist/client/index.html')
} as const;