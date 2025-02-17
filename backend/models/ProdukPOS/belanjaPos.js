import mongoose from "mongoose";

const BelanjaPosSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplierPos", 
  },
    invoice: {},
    pembayaran: {},
    kembalian: {},
    belanjaDetail: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "detailBelanjaPos",
    }],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("BelanjaPos", BelanjaPosSchema);
