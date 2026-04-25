import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../controller/wathclistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../validators/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";
import { updateWatchlistItem } from "../controller/wathclistController.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

//baseurl: /watchlist
router.delete("/:id", removeFromWatchlist);
router.put("/:id", updateWatchlistItem);

// router.post("/login", login);
// router.post("/logout", logout);

export default router;
