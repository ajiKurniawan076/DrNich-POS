import mongoose from "mongoose";

const terapisPosSchema = mongoose.Schema(
  {
    namaTerapis: {
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
    },
    image : {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("terapisPos", terapisPosSchema);
