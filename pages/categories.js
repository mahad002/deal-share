import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categorySpecsMapping, setCategorySpecsMapping] = useState({});

  // Fetch categories and specifications data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/categories`);
        console.log("Category Response: ", response.data);

        // Transform the response data to match the old structure
        const transformedData = response.data.map((category) => {
          const specifications = category.specifications.map((spec) => {
            return {
              name: spec.name,
              type: spec.type,
            };
          });

          return {
            [category.name]: specifications,
          };
        });

        // Update the state with the transformed data
        setCategorySpecsMapping(Object.assign({}, ...transformedData));

        // Set default selected category (you may want to modify this logic)
        setSelectedCategory(response.data[0]?.name || '');

      } catch (error) {
        console.error(`Error fetching Categories`);
      }
    };

    fetchCategories();

    // Cleanup function if needed
    return () => {
      // Any cleanup code goes here
    };
  }, []); // Empty dependency array for initial render only

  // Fetch products when the selected category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedCategory) {
          const response = await axios.get(`/api/products?category=${selectedCategory}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error(`Error fetching products for ${selectedCategory}:`, error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductUpdate = async (product) => {
    try {
      const response = await axios.put('/api/products', { ...product, _id: product._id });
      console.log('Product updated:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error, e.g., show a user-friendly message
    }
  };

  const handleAddCategory = () => {
    // Perform any validation if needed
    // Add the new category to the list of categories
    setSelectedCategory(newCategory);
    setNewCategory('');
  };

  const handleDeleteCategory = () => {
    // Perform any validation if needed
    // Delete the selected category
    setSelectedCategory('');
    setProducts([]);
  };

  const handleEditCategory = () => {
    // // Perform any validation if needed
    // // Delete the selected category
    // setSelectedCategory('');
    // setProducts([]);
  };

  return (
    <Layout>
      <h1 className="heading font-bold" style={{ fontSize: '32px' }}>Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Dynamically render categories based on fetched data */}
        {Object.keys(categorySpecsMapping).map((categoryOption) => (
          <div key={categoryOption} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{categoryOption}</h2>
            <button onClick={() => setSelectedCategory(categoryOption)}>Select</button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {/* Display selected category */}
        <h2 className="text-xl font-semibold">Selected Category: {selectedCategory}</h2>
        {/* Display products for the selected category */}
        <table className="table-basic">
          <thead>
            <tr>
              <td>Product Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className='flex flex-wrap gap-2'>
                  {/* Check if images array exists and has at least one image */}
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]} // Display the URL of the first image
                      alt={product.title}
                      className="w-8 h-8" // Adjust the size as needed
                    />
                  ) : (
                    <span className='w-8 h-8 bg-gray-200 grid place-items-center'>?</span>
                  )}
                  {product.title}
                </td>
                <td>
                  <Link href={`/products/edit/${product._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                  </Link>
                  <Link href={`/products/delete/${product._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex wrap gap-4 justify-end items-end m-4'>
        <div className="mt-4">
          {/* <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
          /> */}
          <button className="rounded-lg bg-blue-900 text-white py-1 px-2" onClick={handleAddCategory}>Add Category</button>
        </div>

        {/* Delete Category */}
        <div className="mt-4">
          <button className="rounded-lg bg-blue-900 text-white py-1 px-2" onClick={handleDeleteCategory}>Delete Category</button>
        </div>

        {/* Edit Category */}
        <div className="mt-4">
          <button className="rounded-lg bg-blue-900 text-white py-1 px-2" onClick={handleEditCategory}>Edit Category</button>
        </div>
      </div>
    </Layout>
  );
}
