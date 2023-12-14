// import Category from '@/models/categories'; // Updated import statement
// import { mongooseConnect } from '../lib/mongoose';

// const handler = async (req, res) => {
//   await mongooseConnect();

//   try {
//     const categories = await Category.find(); // Exclude _id and __v fields
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default handler;
