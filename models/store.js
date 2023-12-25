import {model, Schema, models} from 'mongoose';

const uri = process.env.MONGODB_URI;

const StoreSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String},
    store: {type: String, unique: true},
    bannerImage: {type: String},
    storeImage: {type: String},
    isAdmin: {type: Boolean, default: false},
    isStore: {type: Boolean, default: false},
}, {
    timestamps: true,
    }
);

export const Store = models.Store || model('Store', StoreSchema);