import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  //hash password
  const slt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, slt);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
      name: name,
    },
  });
  // Generate JWT token here
  const token = generateToken(user.id);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  // Generate JWT token here
  const token = generateToken(user.id);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: token,
    },
  });
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export { register, login, logout };
