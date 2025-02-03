import mongoose from "mongoose";

const tipeKulitSchema = mongoose.Schema(
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

export default mongoose.model("tipeKulit", tipeKulitSchema);
