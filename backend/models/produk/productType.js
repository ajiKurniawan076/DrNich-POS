import mongoose from "mongoose";

const productTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("productType", productTypeSchema);
