import { model, Schema, models } from 'mongoose';

const SpecificationSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['string', 'number'], required: true },
});

const CategorySchema = new Schema({
  name: { type: String, required: true },
  specifications: { type: [SpecificationSchema], required: true }, // Use the SpecificationSchema for the array and make it required
});

export const Category = models.Category || model('Category', CategorySchema);
