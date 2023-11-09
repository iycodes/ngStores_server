import { FastifyInstance } from "fastify";
import { commitToDB } from "../server";
import { IncomingMessage, Server, ServerResponse } from "http";
import { promotion } from "@prisma/client";

export default async function HomeTabsRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  server.route({
    method: "GET",
    url: "/homeTab1",
    handler: async () => {
      let data = (await commitToDB(server.prisma.item.findMany({}))) as Array<{
        promotion: string;
      }>;

      data = data.filter((e) => e.promotion == promotion.HOMETAB1);
      return data;
    },
  });
  return server;
}
