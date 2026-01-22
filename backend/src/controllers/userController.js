import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signTheToken(id) {
  if (!process.env.JWT_SECRET) {
    const err = new Error("JWT missing");
    err.statusCode = 500;
    throw err;
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
export async function RekisteriinUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Provide all the info");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error("email in use, pick another one");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  try {// Creates a new user, hashes the password and returns it to JWT
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash
    });
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: signTheToken(user._id)
    });
  } catch (err) {
    if (err?.code === 11000) {
      res.status(400);
      throw new Error("email already in use");
    }
    throw err;
  }
}
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Provide all the info");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401);
    throw new Error("Nope");
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    res.status(401);
    throw new Error("Nope");
  }
  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: signTheToken(user._id)
  });
}
export async function getMe(req, res) {
  const user = await User.findById(req.user.id).select("-passwordHash");
  return res.json(user);
}
