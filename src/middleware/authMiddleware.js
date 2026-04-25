import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();
export const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware called");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    //verify token and extract user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
