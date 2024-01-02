import { Product } from "../../models/product";
import { mongooseConnect } from "../lib/mongoose";
import { Category } from "../../models/category";

export default async function handle(req, res) {
  const { method } = req;

  try {
    await mongooseConnect(); // Connect to your MongoDB

    if (method === 'GET') {
      // Use aggregation to get distinct categories from the Product collection
      const categories = await Category.find();
      // console.log(categories);

      res.json(categories);
    } else if (method === 'POST') {
        const { name, specifications } = req.body;
        // console.log('Specification:', specifications);
          const categoryDoc = await Category.create({
            name,
            specifications,
          });
          // console.log('Created category:', categoryDoc);
          res.json(categoryDoc);   
         // res.status(200).json({ message: 'POST request handled' });
      }
     else if (method === 'PUT') {
        const { name, specifications, _id} = req.body;
        // console.log(req.body);
        // console.log("SPECS: ",specifications);
        try {
          // Find the category by name and update it
          const updatedCategory = await Category.findOneAndUpdate(
            _id,
            { name, specifications},
            { new: true }
          );

          if (updatedCategory) {
            res.status(200).json(updatedCategory);
          } else {
            res.status(404).json({ error: 'Category not found' });
          }
        } catch (error) {
          console.error('Error in categories.js:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      // res.status(200).json({ message: 'PUT request handled' });
    } else if (method === 'DELETE') {
      // const { name } = req.body;
      const { name } = req.query;
      // console.log("req.parmas: ",req.query);
      // console.log("Delete");
      // console.log(name);
        try {
          // Find the category by name and delete it
          const deletedCategory = await Category.findOneAndDelete({ name: name });

          if (deletedCategory) {
            res.status(200).json({ message: 'Category deleted successfully' });
          } else {
            res.status(404).json({ error: 'Category not found' });
          }
        } catch (error) {
          console.error('Error in categories.js:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      // res.status(200).json({ message: 'DELETE request handled' });
    } else {
      res.status(404).json({ error: 'Method not supported' });
    }
  } catch (error) {
    console.error('Error in categories.js:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

