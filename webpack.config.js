const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  entry: {
    index: './src/index.ts',
    print: './src/print.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /.ts$/i,
        use: ['ts-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  // don't actually know what that do
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
