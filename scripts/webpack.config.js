const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(relatePath) {
  return path.join(__dirname, relatePath);
}

const webpackConfig = {
  mode: 'production',
  entry: {
    app: [resolve('../src/index.js')],
  },
  output: {
    path: resolve('../dist'),
    filename: 'bundle.js' 
  },
  // 为项目生成一个可以访问的html文件，页面访问的入口
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  }
}
module.exports = webpackConfig;
