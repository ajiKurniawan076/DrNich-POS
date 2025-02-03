import mongoose from "mongoose";

const categoryProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categoryProduct", categoryProductSchema);
