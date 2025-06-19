const mongoose=require('mongoose'); 

const canvasSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    elements: { type: Array, default: [] },
  },
  {
    timestamps: true, 
  }
);

const Canvas = mongoose.model("Canvas", canvasSchema);
module.exports=Canvas;