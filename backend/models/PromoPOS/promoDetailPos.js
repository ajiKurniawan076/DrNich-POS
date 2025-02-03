import mongoose from "mongoose";

const promoDetailPosSchema = mongoose.Schema(
  {
    promo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "promoPos",
        },
    produk:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "produkPos",
    }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("promoDetailPos", promoDetailPosSchema);
