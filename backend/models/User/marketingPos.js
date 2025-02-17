import mongoose from "mongoose";

const marketingPosSchema = mongoose.Schema(
  {
    namaMarketing: {
      type: String,
      required: true,
    },
    nomorTelepon:{
      type: String,
    },
    alamat:{
      type: String,
	required: true,
    },
    keterangan: {
      type: String,
    },
    namaRekening: {
      type: String,
	required: true
    },
    bank: {
      type: String,
	required: true
    },
    nomorRekening: {
      type: Number,
	default: 0,
    },
    image : {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("marketingPos", marketingPosSchema);
