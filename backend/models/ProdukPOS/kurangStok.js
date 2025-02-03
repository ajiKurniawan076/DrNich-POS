import mongoose from "mongoose";

const kurangStokSchema = mongoose.Schema(
  {
    produk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "produkPos",
    },
    jumlah: {
      type: Number,
      required: true,
    },
    keterangan : {
        type : String
    }
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("kurangStok", kurangStokSchema);
