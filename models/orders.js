import { model, Schema, models } from 'mongoose';

const uri = process.env.MONGODB_URI;

const OrderSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    terms: [{ type: String }],
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    userTo: { type: Schema.Types.ObjectId, ref: 'User' },
    userFrom: { type: Schema.Types.ObjectId, ref: 'User' },
    request: { type: Schema.Types.ObjectId, ref: 'Request' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true }, //approved or not
    paymentMethod: { type: String, required: true },
    paymentResult: { type: Object },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    delivered: { type: Boolean, default: false },
    deliveredAddress: { type: String },
}, {
  timestamps: true,
});

export const Order = models.Order || model('Order', OrderSchema);
