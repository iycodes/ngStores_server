import { FastifyInstance } from "fastify";
import { commitToDB } from "../server";
import { IncomingMessage, Server, ServerResponse } from "http";

export default async function SavedItemsRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  server.route<{
    Params: {
      userId: string;
    };
  }>({
    method: "GET",
    url: "/:userId/savedItems",
    handler: async (req, res) => {
      const data = await commitToDB(
        server.prisma.user.findUnique({
          where: {
            email: req.params.userId,
          },
          select: {
            savedItems: true,
          },
        })
      );
      if (data == null || data == undefined) {
        return res.status(400).send("bad reqiest");
      }
      res.status(200).send(data);
    },
  });
  server.route<{
    Params: {
      userId: string;
    };
    Body: string[];
  }>({
    method: "PATCH",
    url: "/:userId/savedItems/add",
    handler: async (req, res) => {
      const prev = (await commitToDB(
        server.prisma.user.findUnique({
          where: {
            email: req.params.userId,
          },
          select: {
            savedItems: true,
          },
        })
      )) as unknown as {
        savedItems: string[];
      };
      if (prev == null || prev == undefined) {
        return res.status(400).send("bad request, user no exist");
      }
      console.log(prev);
      return await commitToDB(
        server.prisma.user.update({
          where: {
            email: req.params.userId,
          },
          data: {
            savedItems: [...prev.savedItems, ...req.body],
          },
        })
      );
    },
  });

  server.route<{
    Params: {
      userId: string;
    };
    Body: string;
  }>({
    method: "PATCH",
    url: "/:userId/savedItems/remove",
    handler: async (req, res) => {
      const prev = (await commitToDB(
        server.prisma.user.findUnique({
          where: {
            email: req.params.userId,
          },
          select: {
            savedItems: true,
          },
        })
      )) as {
        savedItems: string[];
      };
      const savedItems = prev.savedItems;
      const savedItems_ = savedItems.filter((e) => e != req.body);

      if (prev == null || prev == undefined) {
        return res.status(400).send("bad reqiest");
      }
      return await commitToDB(
        server.prisma.user.update({
          where: {
            email: req.params.userId,
          },

          data: {
            savedItems: savedItems_,
          },
        })
      );
    },
  });

  return server;
}
