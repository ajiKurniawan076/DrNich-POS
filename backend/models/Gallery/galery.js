import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    judul: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    link: {
      type: String,
    },
    channel: {
      type: String,
    },
    sosmed: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("gallery", gallerySchema);
