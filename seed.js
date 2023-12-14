// // seedCategories.js
// const { mongoose, mongooseConnect } = require('./pages/lib/mongoose');
// const Category = require('./models/categories');
// require('dotenv').config();


// mongooseConnect({ useNewUrlParser: true, useUnifiedTopology: true });

// const categories = [
//   {
//     name: 'Mobile Phone',
//     specifications: [
//       { name: 'brand', type: 'string' },
//       { name: 'model', type: 'string' },
//       { name: 'screenSize', type: 'number' },
//       { name: 'ram', type: 'number' },
//       { name: 'rom', type: 'number' },
//     ],
//   },
//   {
//     name: 'Tablet',
//     specifications: [
//       { name: 'brand', type: 'string' },
//       { name: 'model', type: 'string' },
//       { name: 'screenSize', type: 'number' },
//       { name: 'ram', type: 'number' },
//       { name: 'rom', type: 'number' },
//     ],
//   },
//   {
//     name: 'Laptop',
//     specifications: [
//       { name: 'brand', type: 'string' },
//       { name: 'model', type: 'string' },
//       { name: 'screenSize', type: 'number' },
//       { name: 'processor', type: 'string' },
//       { name: 'cpu', type: 'string' },
//       { name: 'gpu', type: 'string' },
//       { name: 'ram', type: 'number' },
//       { name: 'storageCapacity', type: 'number' },
//     ],
//   },
//   {
//     name: 'Computer (PC)',
//     specifications: [
//       { name: 'brand', type: 'string' },
//       { name: 'model', type: 'string' },
//       { name: 'screenSize', type: 'number' },
//       { name: 'processor', type: 'string' },
//       { name: 'cpu', type: 'string' },
//       { name: 'gpu', type: 'string' },
//       { name: 'ram', type: 'number' },
//       { name: 'storageCapacity', type: 'number' },
//     ],
//   },
// ];

// Category.insertMany(categories, { writeConcern: { wtimeout: 5000 } }) // Set a timeout of 5 seconds
// .then(() => {
//     console.log('Categories seeded successfully');
//     mongoose.connection.close();
// })
// .catch((err) => {
//     console.error('Error seeding categories:', err);
//     mongoose.connection.close();
// });
