import mongoose from "mongoose";

const detailTransaksiPosSchema = mongoose.Schema(
  {
    transaksi:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaksiPos",
    },
    produk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produkPos",
    },
    jumlah:{
      type: Number,
    required: true,
    },
    terapis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "terapisPos",
    },
    marketing:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "marketingPos",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("detailTransaksiPos", detailTransaksiPosSchema);
