import mongoose from "mongoose";

const namaLayananSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    durasi: {
      type: String,
    },
    harga: {
      type: Number,
    },
    deskripsi: {
      type: String,
    },
    image: {
      type: String,
    },
    cardDeskripsi: {
      type: String,
    },
    reservedCount: {
      type: Number,
      default: 0,
    },
    idJenis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jenisLayanan",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("NamaLayanan", namaLayananSchema);
