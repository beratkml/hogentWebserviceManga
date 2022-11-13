const {
  PrismaClient
} = require('@prisma/client');
const {
  query
} = require('winston');

const prisma = new PrismaClient({
  log: ["query"]
});

const main = async () => {
  // const genre = await prisma.manga.create({
  //   data: {
  //     name: "Attack on Titan",
  //     author: "Hajime Isayama",
  //     chapters: 139,
  //     description: "Set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans",
  //     isFinished: true,
  //     release_date: new Date("2013-04-13"),
  //     genreId: "abecee8d-5498-4696-86be-41e6e4cde2d6"
  //   }
  // })

  const manga = await prisma.manga.findFirst({
    where: {
      id: "c0c13337-c76c-467c-9d58-23cb8fa49caa"
    },
    select: {
      name: true,
      description: true,
      author: true,
      chapters: true,
      isFinished: true,
      genre: {
        select: {
          name: true
        }
      }
    }
  })
  console.log(manga)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })