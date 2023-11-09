import { FastifyInstance } from "fastify";
import { commitToDB } from "../server";
import { IncomingMessage, Server, ServerResponse } from "http";

export default async function UserRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  server.route({
    method: "GET",
    url: "/all_users",
    handler: async () => await commitToDB(server.prisma.user.findMany()),
  });

  return server;
}
