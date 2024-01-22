module.exports = {
  // other configurations...
  module: {
    rules: [
      // other rules...
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
};
