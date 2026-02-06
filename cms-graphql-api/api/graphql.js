import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../server/db.js";
import { createApp } from "../server/app.js";

let cachedApp = null;

// export default async function handler(req, res) {
//   await connectDB();
//   const app = await createApp();
//   return app(req, res);
// }

export default async function handler(req, res) {
  await connectDB();

  if (!cachedApp) cachedApp = await createApp();

  return cachedApp(req, res);
}
