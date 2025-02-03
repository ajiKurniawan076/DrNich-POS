import mongoose from "mongoose";

const ulasanSchema = mongoose.Schema(
  {
    nama: {
      type: String,
    },
    foto: {
      type: String,
    },
    ulasan: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const ulasan = mongoose.model("ulasan", ulasanSchema);

export default ulasan;
