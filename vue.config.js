// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // publicPath: 'https://monade.github.io/vue-components',
  configureWebpack: {
    externals: {

      // jquery: 'jQuery',
      // select2: 'select2',
      // moment: 'moment'
    }
  }
};
