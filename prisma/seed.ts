import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

async function main() {
  console.log(`Start seeding ...`);
  await seed();
  console.log(`Seeding finished.`);
}
const prisma = new PrismaClient();
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function seed() {
  // await prisma.user.deleteMany();
  const saltRounds = 10;
  const _bcrypt: Function = async (pswd: string) =>
    bcrypt
      .genSalt(saltRounds)
      .then(async (salt) => [salt, await bcrypt.hash(pswd, salt)])
      .catch((e) => console.log(e.message));
  const [salt1, hash1] = await _bcrypt(".1yanu0luwA");
  const [salt2, hash2] = await _bcrypt("pyrex007");

  await prisma.user.createMany({
    data: [
      {
        email: "iyanufanoro@gmail.com",
        name: "Iyanuoluwa Fanoro",
        type: "ADMIN",
        storeName: "iycodes",
        pwSalt: salt1,
        pwHash: hash1,
      },
      {
        email: "fanoroIyanu@gmail.com",
        name: "FANORO IYANU",
        type: "BUYER",
        pwSalt: salt2,
        pwHash: hash2,
      },
    ],
  });
  await prisma.item.createMany({
    data: [
      {
        id: "iyanufanoro@gmail.com-1",
        name: "shirt",
        sellerId: "iyanufanoro@gmail.com",
        price: 6000,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket",
        gender: "MEN",
        category: "FASHION",
        thumbnail:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      },
      {
        id: "iyanufanoro@gmail.com-2",
        name: "shirt",
        sellerId: "iyanufanoro@gmail.com",
        price: 8999,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket",
        gender: "MEN",
        category: "FASHION",
        thumbnail:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      },
      {
        id: "iyanufanoro@gmail.com-3",
        name: "shirt",
        sellerId: "iyanufanoro@gmail.com",
        price: 3000,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket",
        gender: "MEN",
        category: "FASHION",
        thumbnail: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      },
      {
        id: "iyanufanoro@gmail.com-4",
        name: "4tb gaming drive",
        sellerId: "iyanufanoro@gmail.com",
        price: 23000,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket",
        gender: "MEN",
        category: "COMPUTING",
        thumbnail: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      },
      {
        id: "iyanufanoro@gmail.com-5",
        name: "shirt",
        sellerId: "iyanufanoro@gmail.com",
        price: 6000,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket",
        gender: "MEN",
        category: "FASHION",
        thumbnail:
          "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
  });
}
