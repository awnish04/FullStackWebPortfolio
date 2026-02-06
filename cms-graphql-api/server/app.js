import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "../typeDefs/index.js";
import { resolvers } from "../resolver/index.js";

const app = express();

// ✅ CORS configuration: allow local dev + deployed frontend URLs
const allowedOrigins = [
  "http://localhost:3000", // frontend local
  "http://localhost:3001", // alternate dev port
  "https://welcome-to-awnish-mehta-web-portfol.vercel.app", // deployed frontend
  "https://admin-dashboard-awnish-mehta-web-git-c92fa2-awnish04s-projects.vercel.app", // deployed admin dashboard
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like server-to-server or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // allows Playground / introspection
});

let started = false;

export async function createApp() {
  if (!started) {
    await server.start();
    started = true;

    // ✅ GraphQL endpoint
    app.use(
      "/api/graphql",
      cors(corsOptions),
      express.json(),
      expressMiddleware(server),
    );

    // ✅ Health check
    app.get("/health", (_, res) => res.json({ status: "OK" }));

    // ✅ Optional root endpoint for testing
    app.get("/", (_, res) =>
      res.json({
        message: "GraphQL API is live!",
        graphqlEndpoint: "/api/graphql",
        healthCheck: "/health",
      }),
    );
  }

  return app;
}
