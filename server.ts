import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
// import routes from "@fastify/routes";
import swagger from "@fastify/swagger";
import fastify_bcrypt from "fastify-bcrypt";
import * as dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import prismaPlugin from "./plugins/prisma";
import ItemRoutes from "./routes/item";
import CartRoutes from "./routes/cart";
import UserRoutes from "./routes/user";
import AuthRoutes from "./routes/auth";
import SavedItemsRoutes from "./routes/savedItems";
import HomeTabsRoutes from "./routes/homeTabs";
export const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });
export async function commitToDB(promise: any) {
  const [error, data] = await server?.to(promise);
  if (error) {
    return server.httpErrors.internalServerError(error.message);
  }
  return data;
}

server.register(cors, {
  origin: "*",
  credentials: true,
});
server.register(ItemRoutes);
server.register(CartRoutes);
server.register(UserRoutes);
server.register(AuthRoutes);
server.register(SavedItemsRoutes);
server.register(HomeTabsRoutes);
server.register(sensible);
server.register(swagger);
server.register(fastify_bcrypt, {
  saltWorkFactor: 8,
});
server.register(prismaPlugin);
