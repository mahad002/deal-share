import { Product } from "@/models/product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    // mongoose.connect(clientPromise.url);
    if(method === 'POST') {
        const {title,
            description,
            price,
            category,
            specs} = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            category,
            specs
        })
        res.json(productDoc);
    }
    if(method === 'GET'){
        // console.log("ID: ",req.query.id);
        if(req.query?.id){
            const products = await Product.findOne({_id: req.query.id});
            res.json(products);
        }
        const products = await Product.find({});
        res.json(products);
    }
    if(method === 'PUT') {
        const {title,
            description,
            price,
            category,
            specs, _id} = req.body;
            await Product.updateOne({_id}, {title, description, price, category, specs});
            res.json(true);
    }
   
}
