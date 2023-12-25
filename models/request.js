import {model, Schema, models} from 'mongoose';

const uri = process.env.MONGODB_URI;

const RequestSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    quantity: {type: Number, required: true},
}, {
  timestamps: true,
});

export const Request = models.Request || model('Request', RequestSchema);