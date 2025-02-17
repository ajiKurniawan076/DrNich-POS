import mongoose from "mongoose";

const transaksiPosSchema = mongoose.Schema(
  {
    invoice: {
        type : String
    },
    promo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "promoPos",
    },
    pelanggan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pelangganPos",
    },
    total: {
      type: Number,
      required: true,
    },
    totalAkhir: {
      type: Number,
      required: true,
    },
    potongan: {
      type : Number,
    },
    pembayaran : {
      type : Number
    },
    kembalian : {
      type : Number
    },
    poin:{
      type: Number,
    },
    transaksiDetail: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "detailTransaksiPos",
    }],
    status : {
      type : String,
      required : true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transaksiPos", transaksiPosSchema);
