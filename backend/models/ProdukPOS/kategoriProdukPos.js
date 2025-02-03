import mongoose from "mongoose";

const kategoriProdukPosSchema = mongoose.Schema(
  {
    jenis:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "jenisProdukPos",
  },
    kategori: {
      type: String,
      required: true,
    }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("kategoriProdukPos", kategoriProdukPosSchema);
