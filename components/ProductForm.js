import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

// const categorySpecsMapping = {
//   "Mobile Phone": ["brand", "model", "screenSize", "ram", "rom"],
//   "Tablet": ["brand", "model", "screenSize", "ram", "rom"],
//   "Laptop": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
//   "Computer (PC)": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
// };

// const categorySpecsMapping1 = {
//     "Mobile Phone": [
//       { name: "brand", type: "string" },
//       { name: "model", type: "string" },
//       { name: "screenSize", type: "number" },
//       { name: "ram", type: "number" },
//       { name: "rom", type: "number" },
//     ],
//     "Tablet": [
//       { name: "brand", type: "string" },
//       { name: "model", type: "string" },
//       { name: "screenSize", type: "number" },
//       { name: "ram", type: "number" },
//       { name: "rom", type: "number" },
//     ],
//     "Laptop": [
//       { name: "brand", type: "string" },
//       { name: "model", type: "string" },
//       { name: "screenSize", type: "number" },
//       { name: "processor", type: "string" },
//       { name: "cpu", type: "string" },
//       { name: "gpu", type: "string" },
//       { name: "ram", type: "number" },
//       { name: "storageCapacity", type: "number" },
//     ],
//     "Computer (PC)": [
//       { name: "brand", type: "string" },
//       { name: "model", type: "string" },
//       { name: "screenSize", type: "number" },
//       { name: "processor", type: "string" },
//       { name: "cpu", type: "string" },
//       { name: "gpu", type: "string" },
//       { name: "ram", type: "number" },
//       { name: "storageCapacity", type: "number" },
//     ],
//   };
  

const ProductForm = ({
  _id,
  title: existingTitle,
  images: existingImages,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  specs: existingSpecs,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [specs, setSpecs] = useState(existingSpecs || {});
  const [images, setImages] = useState(existingImages || []);
  const [spinner, setSpinner] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [categorySpecsMapping, setCategorySpecsMapping] = useState([]);
  const router = useRouter();

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

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const product = {
      title,
      description,
      price,
      category,
      specs,
      images,
    };

    try {
      if (_id) {
        await axios.put('/api/products', { ...product, _id });
      } else {
        await axios.post('/api/products', product);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error, e.g., show a user-friendly message
    }
  };

  const handleCategoryChange = (ev) => {
    const selectedCategory = ev.target.value;
    setCategory(selectedCategory);

    // Set specs based on the selected category
    const initialSpecs = categorySpecsMapping[selectedCategory]?.reduce((acc, spec) => {
      acc[spec] = "";
      return acc;
    }, {});
    setSpecs(initialSpecs || {});
  };

  const handleSpecsChange = (ev) => {
    const { name, value } = ev.target;
    setSpecs((prevSpecs) => ({
      ...prevSpecs,
      [name]: value,
    }));
  };

  const uploadImage = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setSpinner(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      try {
        const res = await axios.post('/api/upload', data);
        setImages((prevImages) => [...prevImages, ...res.data.links]);
      } catch (error) {
        console.error("Error uploading images:", error);
        // Handle error, e.g., show a user-friendly message
      } finally {
        setSpinner(false);
      }
    }
  };

  const orderImages = (newImages) => {
    setImages(newImages);
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md" onSubmit={saveProduct}>
      <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name</label>
      <input
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        value={title}
        placeholder="Product name"
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />

      <label className="block text-sm font-semibold text-gray-600 mt-4 mb-1">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable className="flex flex-wrap gap-1" list={images} setList={orderImages}>
          {!!images?.length &&
            images.map((link, index) => (
              <div className="" key={link}>
                <div className="relative group h-24">
                  <button
                    className="absolute top-1 right-1 text-white rounded-full w-5 h-5 opacity-0 group-hover:opacity-100"
                    onClick={() => removeImage(index)}
                  >
                    x
                  </button>
                  <img src={link} className="rounded-lg" alt="" />
                </div>
              </div>
            ))}
        </ReactSortable>
        {spinner && (
          <div className="inline-block w-24 h-24 justify-center p1 bg-gray-100 flex items-center rounded-lg">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900">
              <Spinner />
            </div>
          </div>
        )}
        <label className="inline-block cursor-pointer w-24 h-24 border flex justify-center items-center text-sm text-gray-500 text-center rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>Add</div>
          <input type="file" onChange={uploadImage} className="hidden" />
        </label>
      </div>

      <label className="block text-sm font-semibold text-gray-600 mt-4 mb-1">Description</label>
      <textarea
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        value={description}
        placeholder="Description"
        onChange={(ev) => setDescription(ev.target.value)}
        required
      />

      <label className="block text-sm font-semibold text-gray-600 mt-4 mb-1">Price</label>
      <input
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        type="number"
        value={price}
        placeholder="Price"
        onChange={(ev) => setPrice(ev.target.value)}
        min="0"
        required
      />

      <label className="block text-sm font-semibold text-gray-600 pr-6 mt-4">Category</label>
      <select className="w-full mb-4" value={category} onChange={handleCategoryChange} required>
        <option value="">Select a category</option>
        {Object.keys(categorySpecsMapping).map((categoryOption) => (
          <option key={categoryOption} value={categoryOption}>
            {categoryOption}
          </option>
        ))}
      </select>

      {categorySpecsMapping[category]?.map((spec) => (
        <div key={spec.name}>
          <label className="block text-sm font-semibold text-gray-600">{spec.name.charAt(0).toUpperCase() + spec.name.slice(1)}</label>
          <input
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            type={spec.type}
            name={spec.name}
            value={specs[spec.name] || ""}
            placeholder={spec.name}
            onChange={handleSpecsChange}
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;