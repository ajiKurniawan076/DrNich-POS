import mongoose from "mongoose";

const layananSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("jenisLayanan", layananSchema);
