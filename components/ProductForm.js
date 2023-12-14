import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

// Define a mapping of category to specifications
const categorySpecsMapping = {
  "Mobile Phone": ["brand", "model", "screenSize", "ram", "rom"],
  "Tablet": ["brand", "model", "screenSize", "ram", "rom"],
  "Laptop": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
  "Computer (PC)": ["brand", "model", "screenSize", "processor", "cpu", "gpu", "ram", "storageCapacity"],
};

export default function ProductForm({
  _id,
  title: existingTitle,
  images: existingImages,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  specs: existingSpecs,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [specs, setSpecs] = useState(existingSpecs || {});
  const [images, setImages] = useState(existingImages || []);
  const [spinner, setSpinner] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);

  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const product = {
      title,
      description,
      price,
      category,
      specs,
      images,
    };

    if (_id) {
      await axios.put('/api/products', { ...product, _id });
    } else {
      console.log("Products: ", product);
      await axios.post('/api/products', product);
    }
    setGoToProducts(true);
  }

  function handleCategoryChange(ev) {
    const selectedCategory = ev.target.value;
    setCategory(selectedCategory);

    // Set specs based on the selected category
    const initialSpecs = categorySpecsMapping[selectedCategory]?.reduce((acc, spec) => {
      acc[spec] = "";
      return acc;
    }, {});
    setSpecs(initialSpecs || {});
  }

  function handleSpecsChange(ev) {
    const { name, value } = ev.target;
    setSpecs((prevSpecs) => ({
      ...prevSpecs,
      [name]: value,
    }));
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setSpinner(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post('/api/upload', data);

      console.log(res.data);
      setImages((prevImages) => [...prevImages, ...res.data.links]);
      setSpinner(false);
    }
  }

  function orderImages(images) {
    console.log(images);
    setImages(images);
  }

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form className="gp-4" onSubmit={saveProduct}>
      <label>Product Name</label>
                        <input
                            className=""
                            type="text"
                            value={title}
                            placeholder="product name"
                            onChange={ev => setTitle(ev.target.value)}
                            required
                        />
                        <label>Photos</label>
                        <div className="mb-2 flex flex-wrap gap-2">
                            <ReactSortable className = "flex flex-wrap gap-1" list={images} setList={orderImages}>
                            {!!images?.length && images.map(link => (
                                <div className = 'inline-block h-24' key={link}>
                                    <img src={link} className="rounded-lg" alt=""/>
                                </div>
                            ))}
                            </ReactSortable>
                            {spinner && (
                                <div className="inline-block w-24 h-24 justify-center p1 bg-gray-100 flex items-center rounded-lg ">
                                    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"><Spinner/></div>
                                    
                                </div>

                            )}
                            <label className="inline-block cursor-pointer w-24 h-24 border flex justify-center items-center text-sm text-gray-500 text-center rounded-lg bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <div>
                                    Add
                                </div>
                                <input 
                                    type = "file" 
                                    onChange={uploadImage}
                                    className="hidden"
                                />
                            </label>
                            {/* {!images?.length && (
                                <div>No images!</div>
                            )} */}
                        </div>
                        <label>Description</label>
                        <textarea
                            className=""
                            type="text"
                            value={description}
                            placeholder="description"
                            onChange={ev => setDescription(ev.target.value)}
                            required
                        />
                        <label>Price</label>
                        <input
                            className=""
                            type="number"
                            value={price}
                            placeholder="price"
                            onChange={ev => setPrice(ev.target.value)}
                            min="0"
                            required
                        />
      <label className="pr-6 mt-4">Category</label>
      <select className="mb-4 mr-4 mt-4" value={category} onChange={handleCategoryChange} required>
        <option value="">Select a category</option>
        <option value="Laptop">Laptop</option>
        <option value="Mobile Phone">Mobile Phone</option>
        <option value="Computer (PC)">Computer (PC)</option>
        <option value="Tablet">Tablet</option>
      </select>

      {/* Render dynamic inputs based on the selected category */}
      {categorySpecsMapping[category]?.map((spec) => (
        <div key={spec}>
          <label>{spec.charAt(0).toUpperCase() + spec.slice(1)}</label>
          <input
            className=""
            type="text"
            name={spec}
            value={specs[spec] || ""}
            placeholder={spec}
            onChange={handleSpecsChange}
            required
          />
        </div>
      ))}

      <button type="submit" className="btn-primary mt-4">
        Save
      </button>
    </form>
  );
}
