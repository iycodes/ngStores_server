import prismaPlugin from "./plugins/prisma";
import { Category, Gender, Item } from "@prisma/client";
import { commitToDB, server } from "./server";

server.route({
  method: "GET",
  url: "/",
  handler: () => "api is activeee",
});

server.listen({ port: getPort(3000), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

function getPort(port: number): number {
  const port1 = process.env.PORT;
  if (port1) return Number(port1);
  return port;
}
