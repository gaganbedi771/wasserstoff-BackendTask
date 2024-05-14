const express = require("express");
const {
  PORT,
  USER_SERVICE_ROUTE,
  IMAGE_SERVICE_ROUTE,
} = require("../src/config/server_config");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");
const validationMiddleware = require("./middleware/inputValidation");
const authenticateMiddleware = require("./middleware/authenticate");

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      data: {},
      success: false,
      message: "Please try in sometimes",
      error: { error: "Too many requests" },
    });
  },
});

// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/user",
  
  createProxyMiddleware({
    target: USER_SERVICE_ROUTE,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).json({ error: "Proxy error" });
    },
    onProxyReq: (proxyReq, req, res) => {
      // Add custom headers if needed
      proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
    },
  })
);

app.use(
  "/image",
  validationMiddleware.validateToken,
  authenticateMiddleware.authenticate,
  createProxyMiddleware({
    target: IMAGE_SERVICE_ROUTE,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log("Api gateway ruuning on port", PORT);
});
