import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";

export default function ProductForm({ _id, title: existingTitle, images: existingImages ,description: existingDescription, price: existingPrice, category: existingCategory, specs: existingSpecs,  }) {
            const [title, setTitle] = useState(existingTitle || "");
            const [description, setDescription] = useState(existingDescription || "");
            const [price, setPrice] = useState(existingPrice || "");
            const [category, setCategory] = useState(existingCategory || "");
            const [specs, setSpecs] = useState(existingSpecs || {
                brand: "",
                model: "",
                screenSize: null,
                storageCapacity: null,
                processor: "",
                cpu: "",
                gpu: "",
                ram: null,
                diskSize: null,
                rom: null
            });
            const [images, setImages] = useState(existingImages || [])


            console.log(_id);

            const [goToProducts, setGoToProducts] = useState(false);
            const router = useRouter();

            async function saveProduct(ev) {
                ev.preventDefault();
                const product = {
                    title,
                    description,
                    price,
                    category,
                    specs
                };

                if(_id){
                    await axios.put('/api/products',{...product, _id} );
                    
                } else {
                    console.log("Products: ", product);
                    await axios.post('/api/products', product);
                }
                setGoToProducts(true);
            }

            function handleCategoryChange(ev) {
                setCategory(ev.target.value);
                setSpecs({
                    brand: "",
                    model: "",
                    screenSize: null,
                    storageCapacity: null,
                    processor: "",
                    cpu: "",
                    gpu: "",
                    ram: null,
                    diskSize: null,
                    rom: null
                });
            }

            function handleSpecsChange(ev) {
                const { name, value } = ev.target;
                setSpecs(prevSpecs => ({
                    ...prevSpecs,
                    [name]: value
                }));
            }

            async function uploadImage(ev) {
                // console.log("EV: ",ev);
                const files = ev.target?.files;
                if(files?.length > 0) {
                    const data = new FormData();

                    for(const file of files){
                        data.append("file", file);
                    }
                    const res = await axios.post('/api/upload', data);
                    console.log(res.data);
                }
            }
                
            if(goToProducts){
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
                        <div className="mb-2">
                            <label className="cursor-pointer w-24 h-24 border flex justify-center items-center text-sm text-gray-500 text-center rounded-lg bg-gray-200">
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
                            {!images?.length && (
                                <div>No images!</div>
                            )}
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
                        <select
                            className="mb-4 mr-4 mt-4"
                            value={category}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Mobile Phone">Mobile Phone</option>
                            <option value="Computer (PC)">Computer (PC)</option>
                            <option value="Tablet">Tablet</option>
                        </select>
                        {category === "Mobile Phone" && (
                            <div className="">
                            <label>Brand</label>
                            <input
                                className=""
                                type="text"
                                name="brand"
                                value={specs.brand || ""}
                                placeholder="brand"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Model</label>
                            <input
                                className=""
                                type="text"
                                name="model"
                                value={specs.model || ""}
                                placeholder="model"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Screen Size</label>
                            <input
                                className=""
                                type="number"
                                name="screenSize"
                                value={specs.screenSize || ""}
                                placeholder="screen size"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>RAM</label>
                            <input
                                className=""
                                type="number"
                                name="ram"
                                value={specs.ram || ""}
                                placeholder="RAM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>ROM</label>
                            <input
                                className=""
                                type="number"
                                name="rom"
                                value={specs.rom || ""}
                                placeholder="ROM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            </div>
                        )}
                        {category === "Tablet" && (
                            <div>
                            <label>Brand</label>
                            <input
                                className=""
                                type="text"
                                name="brand"
                                value={specs.brand || ""}
                                placeholder="brand"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Model</label>
                            <input
                                className=""
                                type="text"
                                name="model"
                                value={specs.model || ""}
                                placeholder="model"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Screen Size</label>
                            <input
                                className=""
                                type="number"
                                name="screenSize"
                                value={specs.screenSize || ""}
                                placeholder="screen size"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>RAM</label>
                            <input
                                className=""
                                type="number"
                                name="ram"
                                value={specs.ram || ""}
                                placeholder="RAM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>ROM</label>
                            <input
                                className=""
                                type="number"
                                name="rom"
                                value={specs.rom || ""}
                                placeholder="ROM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            </div>
                        )}
                        {category === "Laptop" && (
                            <div className="">
                            <label>Brand</label>
                            <input
                                className=""
                                type="text"
                                name="brand"
                                value={specs.brand || ""}
                                placeholder="brand"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Model</label>
                            <input
                                className=""
                                type="text"
                                name="model"
                                value={specs.model || ""}
                                placeholder="model"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Screen Size</label>
                            <input
                                className=""
                                type="number"
                                name="screenSize"
                                value={specs.screenSize || ""}
                                placeholder="screen size"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>Processor</label>
                            <input
                                className=""
                                type="text"
                                name="processor"
                                value={specs.processor || ""}
                                placeholder="processor"
                                onChange={handleSpecsChange}
                            />
                            <label>CPU</label>
                            <input
                                className=""
                                type="text"
                                name="cpu"
                                value={specs.cpu || ""}
                                placeholder="CPU"
                                onChange={handleSpecsChange}
                            />
                            <label>GPU</label>
                            <input
                                className=""
                                type="text"
                                name="gpu"
                                value={specs.gpu || ""}
                                placeholder="GPU"
                                onChange={handleSpecsChange}
                            />
                            <label>RAM</label>
                            <input
                                className=""
                                type="number"
                                name="ram"
                                value={specs.ram || ""}
                                placeholder="RAM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>Storage Capacity</label>
                            <input
                                className=""
                                type="number"
                                name="storageCapacity"
                                value={specs.storageCapacity || ""}
                                placeholder="storage capacity"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            </div>
                            )}
                            {category === "Computer (PC)" && (
                            <div>
                            <label>Brand</label>
                            <input
                                className=""
                                type="text"
                                name="brand"
                                value={specs.brand || ""}
                                placeholder="brand"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Model</label>
                            <input
                                className=""
                                type="text"
                                name="model"
                                value={specs.model || ""}
                                placeholder="model"
                                onChange={handleSpecsChange}
                                required
                            />
                            <label>Screen Size</label>
                            <input
                                className=""
                                type="number"
                                name="screenSize"
                                value={specs.screenSize || ""}
                                placeholder="screen size"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <lable>Processor</lable>
                            <input
                                className=""
                                type="text"
                                name="processor"
                                value={specs.processor || ""}
                                placeholder="processor"
                                onChange={handleSpecsChange}
                            />
                            <label>CPU</label>
                            <input
                                className=""
                                type="text"
                                name="cpu"
                                value={specs.cpu || ""}
                                placeholder="CPU"
                                onChange={handleSpecsChange}
                            />
                            <label>GPU</label>
                            <input
                                className=""
                                type="text"
                                name="gpu"
                                value={specs.gpu || ""}
                                placeholder="GPU"
                                onChange={handleSpecsChange}
                            />
                            <label>RAM</label>
                            <input
                                className=""
                                type="number"
                                name="ram"
                                value={specs.ram || ""}
                                placeholder="RAM"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            <label>Storage Capacity</label>
                            <input
                                className=""
                                type="number"
                                name="storageCapacity"
                                value={specs.storageCapacity || ""}
                                placeholder="storage capacity"
                                onChange={handleSpecsChange}
                                min="0"
                                required
                            />
                            </div>
                        )}
                        <button type="submit" className="btn-primary mt-4">
                            Save
                        </button>
                    </form>
            
                                    );
}