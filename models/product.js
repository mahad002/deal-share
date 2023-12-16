import { model, Schema, models } from 'mongoose';

const uri = process.env.MONGODB_URI;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0, decimal: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  specs: { type: Schema.Types.Mixed }, // Use Mixed type for dynamic key-value pairs
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
