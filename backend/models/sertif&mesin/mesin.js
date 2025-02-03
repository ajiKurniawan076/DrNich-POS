import mongoose from "mongoose";

const mesinSchema = mongoose.Schema(
  {
    foto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("mesin", mesinSchema);
