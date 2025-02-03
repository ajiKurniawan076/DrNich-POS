import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

//@desc get all
//route GET /api/admin/auth
//@access PUBLIC
const GetAllReserve = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

//@desc create reseve by non user
//route POST /api/users
//@access PUBLIC
const CreateReserveUser = asyncHandler(async (req, res) => {
  const { layanan, jenisTreatment, namaTreatment, tanggal, jam } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
  res.status(200).json({ message: "Register User" });
});

//@desc create reseve by user
//route POST /api/users/logout
//@access PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

//@desc Update user profile
//route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
