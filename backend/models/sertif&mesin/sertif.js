import mongoose from "mongoose";

const sertifSchema = mongoose.Schema(
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

export default mongoose.model("sertif", sertifSchema);
