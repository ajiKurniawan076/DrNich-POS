import asyncHandler from "express-async-handler";
import { admin, ADMIN_LEVELS } from "../../models/admin/adminModels.js";
import bcrypt from "bcryptjs";
import { generateToken, setTokenCookie } from "../../utils/generateToken.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, password, level } = req.body;

  const existingAdmin = await admin.findOne({ name });

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const newAdmin = new admin({ name, password: hashPass, level });
  await newAdmin.save();

  res.status(201).json({ message: "Admin registered successfully" });
});


const getAdmins = asyncHandler(async (req, res) => {
  const admins = await admin.find().select("-password");
  res.status(200).json(admins);
});


const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedAdmin = await admin.findByIdAndDelete(id);

  if (!deletedAdmin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  res.status(200).json({ message: "Admin deleted successfully" });
});


const cekLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const foundAdmin = await admin.findOne({ name });

  if (!foundAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, foundAdmin.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = generateToken(foundAdmin._id, foundAdmin.level);

  setTokenCookie(res, token);

  res.status(200).json({
    id: foundAdmin._id,
    name: foundAdmin.name,
    level: foundAdmin.level,
    token,
  });
});

export { registerAdmin, getAdmins, deleteAdmin, cekLogin };
