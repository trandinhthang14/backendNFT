import express from "express";
import cors from "cors";

import { config } from "../config/config.js";
import { MainMiddleware } from "../src/middlewares/MainMiddleware.js";

import { routerNFTs } from "../src/routes/shop.route.js";
import { routerProfile } from "../src/routes/profile.route.js";
import { routerCollection } from "../src/routes/collection.route.js";
import { routerDefault } from "../src/routes/default.route.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
configDotenv();
// import { eventFetch } from "../src/utils/FetchDataFromBlockchain.js";
console.log(process.env.SERVER_PORT);
mongoose
  .connect(process.env.DB_CONNECT_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(console.log("failed----------------------"));
const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//━━━━━━━━━━━━━━━━ Middlewares ━━━━━━━━━━━━━━━━ ★
MainMiddleware(app, cors, express);

//━━━━━━━━━━━━━━━━ Middlewares ━━━━━━━━━━━━━━━━ ★
app.use(express.static(path.join(__dirname, "uploads")));
//━━━━━━━━━━━━━━━━ router ━━━━━━━━━━━━━━━━ ★
app.use(routerDefault);
app.use(routerNFTs);
app.use(routerProfile);
app.use(routerCollection);
//━━━━━━━━━━━━━━━━ router ━━━━━━━━━━━━━━━━ ★

// eventFetch();

app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Backend Server running 🎉`);
});
