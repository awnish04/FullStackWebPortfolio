// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import { typeDefs } from "./typeDefs/index.js";
// import { resolvers } from "./resolver/dev.js";

// dotenv.config();

// const app = express();

// // Global MongoDB connection with caching
// let cachedConnection = null;

// async function connectDB() {
//   if (cachedConnection) {
//     return cachedConnection;
//   }

//   if (!process.env.MONGO_URI) {
//     throw new Error("Missing MONGO_URI");
//   }

//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       bufferCommands: false,
//     });
//     cachedConnection = conn;
//     return conn;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// }

// // CORS configuration for your specific domains
// const corsOptions = {
//   origin: [
//     "https://web-portfolio-i7zdsqnwt-awnish04s-projects.vercel.app",
//     "https://portfolio-dashboard-main-quyr4ujfb-awnish04s-projects.vercel.app",
//     // "http://localhost:3000",
//   ],
//   credentials: true,
// };

// // Create Apollo Server once (outside the handler)
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   introspection: true,
// });

// let serverStarted = false;

// // Initialize the server
// async function initializeServer() {
//   if (!serverStarted) {
//     await server.start();
//     serverStarted = true;

//     // Apply middleware with CORS
//     app.use(
//       "/api/graphql",
//       cors(corsOptions),
//       express.json(),
//       expressMiddleware(server),
//     );

//     // Health check endpoint
//     app.get("/health", (req, res) => {
//       res.status(200).json({ status: "OK", message: "GraphQL API is running" });
//     });

//     // Root endpoint
//     app.get("/", (req, res) => {
//       res.json({
//         message: "GraphQL API Server",
//         graphqlEndpoint: "/api/graphql",
//         healthCheck: "/health",
//       });
//     });
//   }
// }

// // Export for Vercel serverless
// export default async function handler(req, res) {
//   await connectDB();
//   await initializeServer();
//   return app(req, res);
// }

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
