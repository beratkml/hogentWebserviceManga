const {
  prisma
} = require('../prisma/prisma');


async function main() {
  const genre1 = await prisma.genre.upsert({
    where: {
      id: "1"
    },
    update: {},
    create: {
      id: "b269cf94-f9f6-40f8-bf5d-f9621e5db576",
      name: "shonen"
    }
  })
  const genre2 = await prisma.genre.upsert({
    where: {
      id: "2"
    },
    update: {},
    create: {
      id: "06e59cc3-c249-4c0c-a628-261496fc2c10",
      name: "drama"
    }
  })
  const genre3 = await prisma.genre.upsert({
    where: {
      id: "3"
    },
    update: {},
    create: {
      id: "d347e650-6a03-4183-b730-c60fb41f7c21",
      name: "fantasy"
    }
  })
  const genre4 = await prisma.genre.upsert({
    where: {
      id: "4"
    },
    update: {},
    create: {
      id: "2503c3bb-7f6d-4eda-bed5-af163b7f5287",
      name: "romance"
    }
  })
  const user = await prisma.user.upsert({
    where: {
      id: "0"
    },
    update: {},
    create: {
      id: "f8f15f1a-1cea-4a2e-a853-7eeb7de1fc88",
      username: "bob",
      password: "bob123"
    }
  })
  const status1 = await prisma.statusreading.upsert({
    where: {
      id: "1"
    },
    update: {},
    create: {
      id: "99ecf84d-ee39-45fa-b2a1-32b0711b516b",
      type: "reading"
    }
  })
  const status2 = await prisma.statusreading.upsert({
    where: {
      id: "2"
    },
    update: {},
    create: {
      id: "f8d8f9ac-3b7f-40c3-b58f-2a3483f8f232",
      type: "paused"
    }
  })
  const status3 = await prisma.statusreading.upsert({
    where: {
      id: "3"
    },
    update: {},
    create: {
      id: "dc69b544-76d3-4e65-94ab-105637bf6e12",
      type: "finished"
    }
  })
  const manga = await prisma.manga.upsert({
    where: {
      id: "0"
    },
    update: {},
    create: {
      id: "f1bdf45e-1b1c-11ec-9621-0242ac130002",
      name: "Attack on Titan",
      chapters: 139,
      isFinished: true,
      author: "Hayjime Isayama",
      release_date: new Date(2013, 04, 07),
      description: "Titans",
      genre: {
        connect: {
          id: "b269cf94-f9f6-40f8-bf5d-f9621e5db576",
        }
      }
    }
  })
  const collection = await prisma.mangacollection.upsert({
    where: {
      id: "0"
    },
    update: {},
    create: {
      start_date: new Date(2022, 11, 05),
      end_date: new Date(2022, 11, 27),
      current_chapter: 15,
      manga: {
        connect: {
          id: "f1bdf45e-1b1c-11ec-9621-0242ac130002"
        }
      },
      user: {
        connect: {
          id: "f8f15f1a-1cea-4a2e-a853-7eeb7de1fc88"
        }
      },
      statusreading: {
        connect: {
          id: "99ecf84d-ee39-45fa-b2a1-32b0711b516b"
        }
      }
    }
  })
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