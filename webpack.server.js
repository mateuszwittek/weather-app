import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    name: 'server',
    target: 'node',
    entry: './src/server/index.ts',
    
    output: {
      path: path.resolve(__dirname, 'dist/server'),
      filename: 'index.js',
      module: true,
      chunkFormat: 'module',
      clean: true,
    },
    
    experiments: {
      outputModule: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    externals: [nodeExternals({
      importType: 'module'
    })],

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { node: '18' } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: ['@emotion/babel-plugin'],
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};