import { Product } from "@/models/product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    
    try {
        await mongooseConnect();

        if (method === 'POST') {
            const { title, description, price, category, specs, images } = req.body;
            const productDoc = await Product.create({
                title,
                description,
                price,
                category,
                specs,
                images
            });
            res.json(productDoc);
        }

        if (method === 'GET') {
            if (req.query?.id) {
                const product = await Product.findOne({ _id: req.query.id });
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                res.json(product);
            } else {
                const products = await Product.find({});
                res.json(products);
            }
        }

        if (method === 'PUT') {
            const { title, description, price, category, specs, _id, images } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                { title, description, price, category, specs, images },
                // { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const deletedProduct = await Product.findByIdAndDelete(req.query?.id);
                if (!deletedProduct) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                res.json(true);
            }
        }
    } catch (error) {
        console.error('Error in products.js:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
