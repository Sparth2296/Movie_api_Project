const app = require("./app");

const PORT = process.env.PORT || 3000;

// ✅ Now app.listen works, because app is an Express instance
app.listen(PORT, () => {
  console.log(`Local server → http://localhost:${PORT}`);
});
