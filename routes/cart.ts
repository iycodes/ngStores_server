import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { commitToDB } from "../server";
import { CartItem } from "@prisma/client";

// const cartJson = {
//   ownerid: "",
//   items: [
//     {
//       cartid: "iyanufanoro@gmail.com",
//       itemId: "iyanufanoro@gmail.com-1",
//       quantity: 2,
//       color: "#008000",
//       size: "XL",
//     },
//     {
//       cartid: "iyanufanoro@gmail.com",
//       itemId: "iyanufanoro@gmail.com-1",
//       quantity: 1,
//       color: "#000000",
//       numberSize: 38,
//     },
//     {
//       cartid: "iyanufanoro@gmail.com",
//       itemId: "iyanufanoro@gmail.com-1",
//       quantity: 2,
//       color: "#ffffff",
//       size: "M",
//     },
//     {
//       cartid: "iyanufanoro@gmail.com",
//       itemId: "iyanufanoro@gmail.com-1",
//       quantity: 1,
//       color: "#808080",
//       numberSize: 42,
//     },
//     {
//       cartid: "iyanufanoro@gmail.com",
//       itemId: "iyanufanoro@gmail.com-1",
//       quantity: 3,
//       color: "#000000",
//       size: "XL",
//     },
//   ],
// };
// // const a = {
// //   "cartid": "iyanufanoro@gmail.com",
// //   "itemId": "iyanufanoro@gmail.com-1",
// //   "quantity": 2,
// //   "color": "#008000",
// //   "size": "XL",
// // };
export default async function CartRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  console.log("paopaoap");
  server.route<{
    Body: string;
  }>({
    method: "POST",
    url: "/cart/create",
    handler: async (req, res) => {
      return await commitToDB(
        server.prisma.cart.create({
          data: {
            ownerId: req.body,
          },
        })
      );
    },
  });
  server.route<{
    Params: {
      userId: string;
    };
  }>({
    method: "GET",
    url: "/cart/:userId",
    handler: async (req, res) => {
      const cart = await commitToDB(
        server.prisma.cart.findUnique({
          where: {
            ownerId: req.params.userId,
          },
          include: {
            items: true,
          },
        })
      );
      if (cart == null) {
        return await commitToDB(
          server.prisma.cart.create({
            data: {
              ownerId: req.params.userId,
            },
          })
        );
      }
      return cart;
    },
  });

  server.route<{
    Body: CartItem;
  }>({
    method: "POST",
    url: "/cart/add_item",
    handler: async (req, res) => {
      return await commitToDB(
        server.prisma.cartItem.create({
          data: req.body,
        })
      );
    },
  });
  server.route<{
    Body: string;
  }>({
    method: "DELETE",
    url: "/cart/delete_item",
    handler: async (req, res) => {
      return await commitToDB(
        server.prisma.cartItem.delete({
          where: {
            itemId: req.body,
          },
        })
      );
    },
  });

  server.route<{
    Body: CartItem;
  }>({
    method: "PATCH",
    url: "/cart/update_item",
    handler: async (req, res) => {
      return await commitToDB(
        server.prisma.cartItem.update({
          where: {
            itemId: req.body.itemId,
          },
          data: {
            ...req.body,
          },
        })
      );
    },
  });
  return server;
}
