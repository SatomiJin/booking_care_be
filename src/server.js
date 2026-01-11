const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const db = require("./models"); // 👈 dùng Sequelize instance DUY NHẤT
const initWebRoutes = require("./routes/index");
const { connectDB } = require("./config/config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

// ✅ Kết nối DB
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Supabase DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
})();

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
