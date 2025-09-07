const app = require("../app");

// ✅ This makes Express work in Vercel serverless functions
module.exports = (req, res) => {
  app(req, res);
};
