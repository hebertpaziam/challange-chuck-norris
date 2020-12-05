module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://api.chucknorris.io/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  pwa: {
    appleMobileWebAppStatusBarStyle: "black",
    msTileColor: "#000000",
    name: "Chuck Norris Facts",
    themeColor: "#EE5A24",
    manifestPath: "config/manifest.json",
    iconPaths: {
      favicon32: "config/favicon-32x32.png",
      favicon16: "config/favicon-16x16.png",
      appleTouchIcon: "config/apple-touch-icon-152x152.png",
      maskIcon: "config/safari-pinned-tab.svg",
      msTileImage: "config/msapplication-icon-144x144.png"
    },
    manifestOptions: {
      icons: []
    }
  }
};
