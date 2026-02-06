import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./server/db.js";
import { createApp } from "./server/app.js";

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  const app = await createApp();

  app.listen(PORT, () => {
    console.log(
      `🚀 Local GraphQL running at http://localhost:${PORT}/api/graphql`,
    );
  });
})();
