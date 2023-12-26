import { Product } from "@/models/product";
import { mongooseConnect } from "../lib/mongoose";
import { authConf } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
    const { method } = req;
    
    try {
        await mongooseConnect();
        const session = await getServerSession(req,res,authConf);   
        console.log("Sesssion: ", session);

        if (method === 'POST') {
            const { title, description, price, category, specs, images, properties, uid } = req.body;
            const productDoc = await Product.create({
                title,
                description,
                price,
                category,
                specs,
                images,
                properties,
                user: uid,
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
          } else if (req.query?.uid) {
              const product = await Product.findOne({ user: req.query.uid });
              if (!product) {
                  return res.json({ message: 'User has no Products!' });
              }
              res.json(product);
          } else {
              // Check if a category is provided in the query parameters
              const { category } = req.query;
              let products;
      
              if (category) {
                  console.log(category);
                  // If a category is provided, filter products by category
                  products = await Product.find({ category });
                  console.log("PRODUCTS: ",products)
              } else {
                  // If no category is provided, return all products
                  products = await Product.find({});
              }
      
              res.json(products);
          }
      }

        if (method === 'PUT') {
            const { title, description, price, category, specs, _id, images, properties, uid } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                { title, description, price, category, specs, images, properties, user: uid },
                { new: true }
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
