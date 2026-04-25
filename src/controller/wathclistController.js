// import { prisma } from "../config/db.js";

// const addToWatchlist = async (req, res) => {
//   try {
//     const { status, movieId, rating, notes } = req.body;

//     // 1. check movie exists
//     const movie = await prisma.movie.findUnique({
//       where: { id: movieId },
//     });
//     // const movies = await prisma.movie.findMany();
//     // console.log("Movies in DB:", movies);

//     if (!movie) {
//       return res.status(404).json({ error: "Movie not found" });
//     }

//     // 2. check duplicate in watchlist
//     const existingInWatchlist = await prisma.watchListItem.findUnique({
//       where: {
//         userId_movieId: {
//           userId: req.user.id,
//           movieId,
//         },
//       },
//     });

//     if (existingInWatchlist) {
//       return res.status(409).json({ error: "Movie already in watchlist" });
//     }

//     const removeFromWatchlist = async (req, res) => {
//       try {
//         const { id } = req.params;

//         // check if item exists
//         const item = await prisma.watchListItem.findUnique({
//           where: { id },
//         });

//         if (!item) {
//           return res.status(404).json({ error: "Watchlist item not found" });
//         }

//         // delete item
//         await prisma.watchListItem.delete({
//           where: { id },
//         });

//         return res.status(200).json({
//           message: "Movie removed from watchlist",
//         });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//     };

//     // 3. validate status
//     const validStatuses = ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"];

//     if (status && !validStatuses.includes(status)) {
//       return res.status(400).json({ error: "Invalid status value" });
//     }

//     // 4. create watchlist item
//     const watchlistItem = await prisma.watchListItem.create({
//       data: {
//         userId: req.user.id,
//         movieId,
//         status: status || "PLANNED",
//         rating: rating ? Number(rating) : null,
//         notes: notes || null,
//       },
//     });

//     return res.status(201).json({
//       message: "Movie added to watchlist",
//       watchlistItem,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { addToWatchlist, removeFromWatchlist };

import { prisma } from "../config/db.js";

/* =========================
   ADD TO WATCHLIST
========================= */
const addToWatchlist = async (req, res) => {
  try {
    const { status, movieId, rating, notes } = req.body;

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const existingInWatchlist = await prisma.watchListItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId,
        },
      },
    });

    if (existingInWatchlist) {
      return res.status(409).json({ error: "Movie already in watchlist" });
    }

    const validStatuses = ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const watchlistItem = await prisma.watchListItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating: rating ? Number(rating) : null,
        notes: notes || null,
      },
    });

    return res.status(201).json({
      message: "Movie added to watchlist",
      watchlistItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/* =========================
   REMOVE FROM WATCHLIST
========================= */
const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.watchListItem.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    await prisma.watchListItem.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// /* =========================
//    UPDATE WATCHLIST ITEM
// ========================= */
const updateWatchlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rating, notes } = req.body;

    // check if item exists
    const item = await prisma.watchListItem.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    // validate status if provided
    const validStatuses = ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // update item
    const updatedItem = await prisma.watchListItem.update({
      where: { id },
      data: {
        status: status || item.status,
        rating: rating !== undefined ? Number(rating) : item.rating,
        notes: notes !== undefined ? notes : item.notes,
      },
    });

    return res.status(200).json({
      message: "Watchlist updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };
