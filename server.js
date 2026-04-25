import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./src/config/db.js";

config();
connectDB();

// Import routes
import movieRoutes from "./src/route/movieRoutes.js";
import authRoutes from "./src/route/authRoures.js";
import watchlistRoute from "./src/route/whatchlistRoute.js";
import cookieParser from "cookie-parser";

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoute);

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
const port = 5001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle graceful shutdown
process.on("uncaughtException", async () => {
  console.log("Received uncaught exception. Shutting down gracefully...");
  await disconnectDB();
  process.exit(1);
});
process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    console.log("Server closed. Exiting process.");
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", async (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  await disconnectDB();
  process.exit(1);
});
