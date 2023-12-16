import { model, Schema, models } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  specs: { type: Schema.Types.Mixed },
});

export const Category = models.Category || model('Category', CategorySchema);
