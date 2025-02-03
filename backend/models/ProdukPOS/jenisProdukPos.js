import mongoose from "mongoose";

const jenisProdukPosSchema = mongoose.Schema(
  {
    jenis: {
      type: String,
      required: true,
    }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("jenisProdukPos", jenisProdukPosSchema);
