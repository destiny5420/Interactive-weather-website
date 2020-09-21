module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Interactive-weather-website/' : '/',
  outputDir: 'docs',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Weather',
    },
  },
};
