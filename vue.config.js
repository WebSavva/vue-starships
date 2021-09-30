module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? `/${process.env.VUE_APP_REP_NAME}/`
      : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "VUE STARSHIPS";
      return args;
    });
  },
};
