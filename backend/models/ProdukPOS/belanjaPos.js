import mongoose from "mongoose";

const BelanjaPosSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
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
