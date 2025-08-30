import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// POST /api/users/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email and password required");

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const userToReturn = user.toObject();
    delete userToReturn.passwordHash;

    res.json({ accessToken, refreshToken, user: userToReturn });
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err);
  }
};

// POST /api/users/register
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      throw new Error("All fields required");

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      const err = new Error("Email already registered");
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email: email.toLowerCase().trim(),
      passwordHash,
      netValue: 0,
      income: [],
      expenses: [],
      savings: [],
      investments: [],
      budgets: [],
    });

    const savedUser = await newUser.save();
    const userToReturn = savedUser.toObject();
    delete userToReturn.passwordHash;

    res.status(201).json(userToReturn);
  } catch (err) {
    next(err);
  }
};

// POST /api/users/logout
export const logoutUser = (req, res) => {
  // Client deletes token; optional server-side blacklist can be implemented
  res.json({ message: "Logged out successfully" });
};

// POST /api/users/refresh-token
export const refreshToken = (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw new Error("No refresh token provided");

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

// GET /api/users/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
};
