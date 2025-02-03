import mongoose from "mongoose";

const produkPosSchema = mongoose.Schema(
  {
    namaProduk: {
      type: String,
      required: true,
    },
    hargaJual: {
      type: Number,
	    required: true,},
    hargaBeli: {
      type: Number,
	    required: true,},
    kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kategoriProdukPos",
    },
    jenis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jenisProdukPos",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplierPos",
    },
    bonusTerapis: {
      type: Number,
    },
    stok: {
      type: Number,
    },
    minStok: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("produkPos", produkPosSchema);
