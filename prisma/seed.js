import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "66802c4c-228b-4d0f-b479-8796369b81ff";

const movies = [
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology.",
    releaseYear: 2010,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qj8r9lL._AC_.jpg",
    genres: "Sci-Fi",
    createdBy: userId,
    runtime: 148,
  },
  {
    title: "The Dark Knight",
    overview: "When the Joker wreaks havoc and chaos on Gotham City.",
    releaseYear: 2008,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qj8r9lL._AC_.jpg",
    genres: "Action",
    createdBy: userId,
    runtime: 152,
  },
  {
    title: "Interstellar",
    overview: "Explorers travel through a wormhole to save humanity.",
    releaseYear: 2014,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qj8r9lL._AC_.jpg",
    genres: "Sci-Fi",
    createdBy: userId,
    runtime: 169,
  },
  {
    title: "The Matrix",
    overview: "A hacker discovers reality is a simulation.",
    releaseYear: 1999,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qj8r9lL._AC_.jpg",
    genres: "Sci-Fi",
    createdBy: userId,
    runtime: 136,
  },
  {
    title: "Pulp Fiction",
    overview: "Interwoven stories of crime and redemption.",
    releaseYear: 1994,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qj8r9lL._AC_.jpg",
    genres: "Crime",
    createdBy: userId,
    runtime: 154,
  },
];
const main = async () => {
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
