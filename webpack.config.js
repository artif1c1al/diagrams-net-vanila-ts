const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  entry: {
    index: './src/index.js',
    print: './src/print.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
         <html>
          <body>
            <div id="root"></div>
          </body>
        </html> 
      `,
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
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
