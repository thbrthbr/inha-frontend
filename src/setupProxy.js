const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/loginProc",
    createProxyMiddleware({
      target: "http://13.209.191.245:8080",
      changeOrigin: true,
    })
  );
};
