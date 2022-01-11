const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function resolve(relatePath) {
  return path.join(__dirname, relatePath);
}

const webpackConfig = {
  // mode: 'production',
  mode: 'development',
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
    }),
    new MiniCssExtractPlugin(),
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
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,  
        }, 'css-loader', 
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')(),//给css自动加前缀
              ]
            }
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true, //当解析antd.less，必须写成下面的格式，否则会报Inline Javascript is not enabled
            },
          }
        }],
      },
      {
        // loader-image
        test: /\.(png|jpe?g|gif|svg|jpg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../public/images')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          outputPath: '/images'
        },

      },
      // loader-font
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[ext]'
        }
      },
    ],
  },
  target: 'web',
  devServer: {
    port: 8090,
    // contentBase: resolve('../public'),
    open: true,
  }
}
module.exports = webpackConfig;
