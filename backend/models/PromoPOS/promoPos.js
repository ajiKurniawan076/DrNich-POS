import mongoose from "mongoose";

const promoPosSchema = mongoose.Schema(
  {
    namaPromo: {
      type: String,
      required: true
    },
    jenis : {
        type : String,
        required : true
    },
    potongan: {
        type: Number
    },
    jenisPotongan: {
        type: String
    },
    cashback: {
      type: Number
  },
    keterangan: {
      type: "String"
    },
    berlakuDari:{
      type: Date
    },
    berlakuSampai: {
      type: Date,
      validate: {
        validator: function (value) {
          return this.berlakuDari ? value > this.berlakuDari : true;
        },
        message: "berlakuSampai must be later than berlakuDari",
      },
    },
    promoDetail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promoDetailPos', // Reference to promoDetails
      },
    ],
},
  {
    timestamps: true,
  }
);

export default mongoose.model("promoPos", promoPosSchema);
