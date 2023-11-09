import { User } from "@prisma/client";
import { commitToDB } from "../server";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

export default async function AuthRoutes(
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: any
) {
  server.route<{
    Body: {
      email: string;
      pswd: string;
    };
  }>({
    method: "POST",
    url: "/login",
    handler: async (req, res) => {
      const user: any = await commitToDB(
        server.prisma.user.findUnique({
          where: {
            email: req.body.email,
          },
          include: {
            cart: true,
            orders: true,
          },
        })
      );
      if (user == null) {
        return res.status(401).send("bad request, invalid credentials");
      }

      const isSame = await server.bcrypt.compare(req.body.pswd, user.pwHash);
      if (isSame) {
        res.status(200).send(user);
      } else {
        return res.status(401).send("Invalid Credentials");
      }
    },
  });

  return server;
}

// bcrypt.hash(plaintextPassword, 10, function(err, hash) {
//     // store hash in the database
// })
