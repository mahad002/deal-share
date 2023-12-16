import { Product } from "@/models/product";
import { mongooseConnect } from "../lib/mongoose";
import { Category } from "@/models/category";

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
        const categoryDoc = await Category.create({
            name, specifications
        });
        res.json(categoryDoc);
      // res.status(200).json({ message: 'POST request handled' });
    } else if (method === 'PUT') {
        const { name, specs } = req.body;
        try {
          // Find the category by name and update it
          const updatedCategory = await Category.findOneAndUpdate(
            { name: name },
            { specifications: specs },
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
      const { name } = req.body;

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

