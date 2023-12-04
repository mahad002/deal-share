// import { MongoClient } from "mongodb";
import {model, Schema, models} from 'mongoose';

const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

const ProductSchema = new Schema ({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0, decimal: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    // userId: { type: String, required: true },
    category: { type: String, required: true },
    specs: {
        // Mobile Phone, Laptop, Tablet, Computer (PC)
        brand: { type: String, required: true },
        model: { type: String, required: true },
        screenSize: { type: Number, required: true, min: 0, decimal: true },
        ram: { type: Number, required: true },
        // Laptop, Computer (PC)
        processor: { type: Number, min: 0, decimal: true  },
        cpu: { type: String },
        gpu: { type: String },
        storageCapacity: { type: Number},
        // Mobile Phone, Tablet
        rom: { type: Number },
    }},{
        timestamps: true,  
});

export const Product = models.Product || model('Product', ProductSchema);