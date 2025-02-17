import mongoose from "mongoose";

const pelangganPosSchema = mongoose.Schema(
  {
    namaPelanggan: {
      type: String,
      required: true,
    },
    nomorTelepon:{
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
    },
    alamat:{
      type: String,
	required: true,
    },
    poin: {
      type: Number,
    },
    keterangan:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pelangganPos", pelangganPosSchema);
