import { Item } from "@prisma/client";
import { commitToDB } from "../server";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

export default async function ItemRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  server.route({
    method: "GET",
    url: "/all_items",
    handler: async (req, res) => {
      const a = await commitToDB(
        server.prisma.item.findMany({
          select: {
            id: true,
            name: true,
            price: true,
            gender: true,
            category: true,
            thumbnail: true,
            colors: true,
          },
        })
      );
      res.send(a);
    },
  });

  server.route<{
    Params: {
      itemId: string;
    };
  }>({
    method: "GET",
    url: "/item/:itemId",
    handler: async (req, reply) => {
      return await commitToDB(
        server.prisma.item.findUnique({
          where: {
            id: req.params.itemId,
          },
          include: {
            colors: true,
            rating: true,
          },
        })
      );
    },
  });

  server.route<{
    Body: Item & {
      colors: [];
    };
  }>({
    method: "POST",
    url: "/add_item",
    handler: async (req, reply) => {
      // const body = req.body;
      const keys = Object.keys(req.body);

      for (let i = 0; i < keys.length; i++) {
        if (req.body[keys[i] as keyof Item] == null) {
          delete req.body[keys[i] as keyof Item];
        }
      }
      console.log(req.body);
      const { colors, ...itemData } = req.body;
      return await commitToDB(
        server.prisma.item.create({
          data: {
            ...req.body,
            colors: {
              create: [...req.body.colors],
            },
          },
        })
      );
    },
  });
  server.route<{
    Body: {
      id: string;
    };
  }>({
    method: "PATCH",
    url: "/update_item",
    handler: async (req, reply) => {
      return await commitToDB(
        server.prisma.item.update({
          where: {
            id: req.body.id,
          },
          data: {
            ...req.body,
          },
        })
      );
    },
  });

  server.route<{
    Body: string;
  }>({
    method: "DELETE",
    url: "/delete_item",
    handler: async (req, reply) => {
      return await commitToDB(
        server.prisma.item.delete({
          where: {
            id: req.body,
          },
        })
      );
    },
  });

  server.route<{
    Body: string;
  }>({
    method: "DELETE",
    url: "/delete_allColors",
    handler: async (req, reply) => {
      return await commitToDB(server.prisma.color.deleteMany({}));
    },
  });
  // not using schema valiadtion because prisma is already schema based
  //  const itemJsonSchema = {
  //     type:"object",
  //     properties:{

  //     }
  //   }
  return server;
}

// const d = {
//   "id": "iyanufanoro@gmail.com-12",
//   "name": "namee",
//   "category": "FASHION",
//   "sellerId": "iyanufanoro@gmail.com",
//   "price": 50000,
//   "description": "description",
//   "gender": "MEN",
//   "thumbnail": "https://img.freepik.com/free-psd/simple-black-men-s-tee-mockup_53876-57893.jpg?w=740&t=st=1694434183~exp=1694434783~hmac=6834af1eb2b0f9b91f91f92fbbf594a423048bde2e1829cb79bec1a0104eb14d",
//   "colors": [
//     {
// "id":"iyanufanoro@gmail.com-12#ffffff",
//       "color": "#ffffff",
//       "sizes": ["XS-1","S-2","M-4", "L-1", "XL-5", "XXL-3", "XXXL-4"],
//     },
// {
// "id":"iyanufanoro@gmail.com-12#000000",
//   "color": "#000000",
//   "sizes": ["XS-3","S-1","M-5", "L-7", "XL-4", "XXL-2"],
// },

//   ],
// };
