const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: './src/App.js', // Your entry file, ensure the path is correct
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'carousel-bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process .js files
        exclude: /node_modules/, // Don't process files in the node_modules directory
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use these Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Process .css files
        use: ['style-loader', 'css-loader'], // Use these loaders
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
