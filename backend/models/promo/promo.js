import mongoose from "mongoose";

const promoSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    syarat: {
      type: String,
    },
    fotoDesktop: {
      type: String,
    },
    fotoMobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("promo", promoSchema);
