import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "../typeDefs/index.js";
import { resolvers } from "../resolver/index.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    // "https://web-portfolio-i7zdsqnwt-awnish04s-projects.vercel.app",
    // "https://portfolio-dashboard-main-quyr4ujfb-awnish04s-projects.vercel.app",
  ],
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

let started = false;

export async function createApp() {
  if (!started) {
    await server.start();
    started = true;

    app.use(
      "/api/graphql",
      cors(corsOptions),
      express.json(),
      expressMiddleware(server),
    );

    app.get("/health", (_, res) => res.json({ status: "OK" }));
  }

  return app;
}
