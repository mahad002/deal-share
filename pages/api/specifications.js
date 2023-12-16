// // server/api/specifications.js

// const express = require('express');
// const router = express.Router();

// // Example specifications data
// const categorySpecsMapping = {
//   "Mobile Phone": ["brand", "model", "screenSize", "ram", "rom"],
//   "Tablet": ["brand", "model", "screenSize", "ram", "rom"],
//   "Laptop": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
//   "Computer (PC)": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
// };

// // Get specifications for a given category
// router.get('/:category', (req, res) => {
//   const { category } = req.params;
//   const specs = categorySpecsMapping[category] || [];
//   res.json(specs);
// });

// module.exports = router;
