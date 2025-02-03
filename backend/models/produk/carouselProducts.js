import mongoose from "mongoose";

const carouselProductSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carouselProduct", carouselProductSchema);
