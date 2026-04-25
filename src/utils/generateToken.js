import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
  // Set the token in an HTTP-only cookie

  return token;
};
