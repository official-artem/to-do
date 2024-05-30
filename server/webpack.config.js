const dotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    cache: true,
    plugins: [new TSConfigPathsPlugin({ configFile: "tsconfig.json" })],
    alias: {
      "@routes": path.resolve(__dirname, 'src/routes'),
      "@services": path.resolve(__dirname, 'src/services/'),
      "@models": path.resolve(__dirname, 'src/models/'),
      "@schemaTypes": path.resolve(__dirname, './src/appTypes/'),
      "@controllers": path.resolve(__dirname, 'src/controllers/'),
      "@types": path.resolve(__dirname, 'src/types/'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new dotenvWebpackPlugin()
  ]
};
