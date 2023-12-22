import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState();

    useEffect(()=>{
        axios.get('/api/products').then(response =>{
            console.log(response.data);
            setProducts(response.data);
        })
    },[]);


    return (
        <Layout>
          <h1 className="heading font-bold text-4xl">Products</h1>
          <Link href={'/products/newproduct'} className="rounded-lg bg-blue-900 text-white py-1 px-2 inline-block mt-2">
            Add new product
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 " //min-w-[200px]
          >
            {products &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center"
                >
                  <div className="items-center mb-2 justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-28 h-28 rounded-full mr-2 object-cover"
                      />
                    ) : (
                      <span className='w-8 h-8 bg-gray-200 grid place-items-center rounded-full mr-2'>?</span>
                    )}
                    <h1 className="text-lg font-semibold flex flex-wrap items-center justify-center">{product.title}</h1>
                  </div>
                  <div className="flex space-x-2 gap-2">
                    {/* <Link href={`/products/edit/${product._id}`} className="text-blue-500">
                      Edit
                    </Link>
                    <Link href={`/products/delete/${product._id}`} className="text-red-500">
                      Delete
                    </Link> */}
                    <Link href={`/products/edit/${product._id}`} className="flex flex-wrap bg-blue-900 text-white rounded-lg p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 m-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </Link>
                    <Link href={`/products/delete/${product._id}`} className="flex flex-wrap bg-blue-900 text-white rounded-lg p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Layout>
      );
    };

