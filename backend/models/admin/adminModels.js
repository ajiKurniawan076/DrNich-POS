import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const ADMIN_LEVELS = {
  SUPER_ADMIN: 1,
  GUDANG: 2,
  KASIR: 3,
  ADMIN_DISPLAY: 4,
};

const adminSchema = mongoose.Schema(
  {
    name: { type: String },
    password: { type: String },
    level: { type: Number, enum: Object.values(ADMIN_LEVELS) },
  },
  { timestamps: true }
);

const admin = mongoose.model("admin", adminSchema);
export { admin, ADMIN_LEVELS };
