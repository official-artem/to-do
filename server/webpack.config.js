const path = require('path');
const nodeExternals = require('webpack-node-externals');
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TSConfigPathsPlugin({ configFile: "./tsconfig.json" })],
    aliases: {
      "@routes": path.resolve(__dirname, 'src/routes/'),
      "@services": path.resolve(__dirname, 'src/services/'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
