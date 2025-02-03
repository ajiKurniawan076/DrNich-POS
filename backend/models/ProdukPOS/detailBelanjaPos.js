import mongoose from "mongoose";

const detailBelanjaPosSchema = mongoose.Schema(
  {
    Belanja:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BelanjaPos",
    },
    produk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produkPos",
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplierPos", 
    },
    jumlah:{
      type: Number,
    required: true,
    },
    harga: {
      type: Number,
      required : true
    },
    totalHarga: {
      type: Number,
      required : true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("detailBelanjaPos", detailBelanjaPosSchema);
