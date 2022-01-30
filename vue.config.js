// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  configureWebpack: {
    externals: {

      // jquery: 'jQuery',
      // select2: 'select2',
      // moment: 'moment'
    }
  }
};
