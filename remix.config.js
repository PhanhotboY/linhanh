/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  future: {
    /* any enabled future flags */
  },
  ignoredRouteFiles: ['**/*.css'],
  publicPath: '/build/',
  devServerPort: 5173,
  serverBuildPath: 'build/index.js',
};
