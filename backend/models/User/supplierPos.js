import mongoose from "mongoose";

const supplierPosSchema = mongoose.Schema(
  {
    namaPerusahaan: {
      type: String,
      required: true,
    },
	namaKontak: {
      type: String,
      required: true,
    },
	email: {
      type: String,
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
      type: String,
      required: true,
    },
    keteranganRek: {
      type: String,
    },
    produk : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "produkPos",
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("supplierPos", supplierPosSchema);
