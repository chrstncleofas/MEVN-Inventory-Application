import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  ProductID: { type: String, required: true, unique: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Qty: { type: Number, required: true },
  Date: { type: Date, default: Date.now },
  Image: { type: String, required: false },
});

export default mongoose.model('Product', ProductSchema);
