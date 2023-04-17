const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    prize: {
      type: Number,
      required: true,
      default: 0,
    },
    filePath: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    // imgPath:{
    //     type:String,
    //     require:true
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
