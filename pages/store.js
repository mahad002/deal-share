import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';


export default function Store() {
    const [user, setUser] = useState({});
    const [store, setStore] = useState("");
    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [storeImage, setStoreImage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [isStore, setIsStore] = useState(false);
    const [isCreateStore, setIsCreateStore] = useState(false);
    const [images, setImages] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [spinner1, setSpinner1] = useState(false);
    const [_id, setId] = useState({});

    const {data: session} = useSession();
    // if(!session) return; 
    // console.log({session});
    // console.log("Email:", session?.user?.email);

    

    const fetchStore = async () =>{
        if(session?.user){
            const {email} = session?.user;
            // console.log(email)
            const res = await axios.get(`/api/user`);
            // console.log(res?.data);
            setId(res.data._id);
            
            if(res?.data?.store === ""){
                console.log("No store found");
                setIsStore(false);
            }
            else{
                setIsStore(true)
            }
            
        }
    }

    useEffect(()=>{
        fetchStore();
    },[session])

    const handleCreateStore = () => {
        setIsCreateStore(true);
    }
    
    const createStore = async() => {
        try {
            const data = {
                _id,
                store,
                description,
                bannerImage,
                storeImage,
                isAdmin,
            }
            const response = await axios.post(`/api/user`, data);
            setUser("response.data: ",response.data);
        } catch (error) {
            console.error("Error creating store:", error);
        }
    }

    function StoreForm() {

        const uploadBanner = async (ev) => {
            const files = ev.target?.files;
            if (files?.length > 0) {
              setSpinner(true);
              const data = new FormData();
        
              for (const file of files) {
                data.append("file", file);
              }
        
              try {
                const res = await axios.post('/api/upload', data);
                setBannerImage(...res.data.links);
                // console.log("bannerImage: ", bannerImage)
              } catch (error) {
                console.error("Error uploading images:", error);
                // Handle error, e.g., show a user-friendly message
              } finally {
                setSpinner(false);
              }
            }
          };

          const uploadStoreProfile = async (ev) => {
            const files = ev.target?.files;
            if (files?.length > 0) {
              setSpinner1(true);
              const data = new FormData();
        
              for (const file of files) {
                data.append("file", file);
              }
        
              try {
                const res = await axios.post('/api/upload', data);
                setStoreImage(...res.data.links);
              } catch (error) {
                console.error("Error uploading images:", error);
                // Handle error, e.g., show a user-friendly message
              } finally {
                setSpinner1(false);
              }
            }
          };

        const removeBannerImage = () => {
            const updatedImages = [];
            setBannerImage(updatedImages);
        };
    
        const handleSubmit = async () => {
            const data = {
                _id,
                store,
                description,
                bannerImage,
                storeImage,
                isAdmin,
            }
            try {
                const response = await axios.put(`/api/user`, data);
                setUser("response.data: ",response.data);
                if(response.data){
                    alert('Successfully edited profile!');    
                    setIsStore(true);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

        const removeStoreImage = (index) => {
            const updatedImages = [];
            setStoreImage(updatedImages);
        };
        return (
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-4">Store Information</h1>

                {/* Store Name */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Store Name</label>
                    <input
                        type="text"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-2"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Banner image input */}
                <label className="block text-sm font-semibold text-gray-600 mt-4 mb-1">Banner Image</label>
                <div className="mb-2 flex flex-wrap gap-2">
                    {/* Sortable images */}
                    {/* <ReactSortable className="flex flex-wrap gap-1" list={images} setList={orderBannerImages}> */}
                        {!!bannerImage &&
                                    <div className="relative group h-24">
                                        <button
                                            className="absolute top-1 right-1 text-white rounded-full w-5 h-5 opacity-0 group-hover:opacity-100"
                                            onClick={() => removeBannerImage()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-red-600 rounded-lg p-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg> 
                                        </button>
                                        <img src={bannerImage} className="rounded-lg" alt="" />
                                    </div>
                            }
                    {/* </ReactSortable> */}

                    {/* Spinner */}
                    {spinner && (
                        <div className="inline-block w-24 h-24 justify-center p1 bg-gray-100 flex items-center rounded-lg">
                            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900">
                                <Spinner />
                            </div>
                        </div>
                    )}

                    {/* Add image button */}
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
                        <input type="file" onChange={uploadBanner} className="hidden" />
                    </label>

                </div>

                {/* Store image input */}
                <label className="block text-sm font-semibold text-gray-600 mt-4 mb-1">Store Image</label>
                <div className="mb-2 flex flex-wrap gap-2">
                
                {/* Sortable images */}
                {/* <ReactSortable className="flex flex-wrap gap-1" list={images} setList={orderStoreImages}> */}
                    {!!storeImage &&
                                <div className="relative group h-24">
                                    <button
                                        className="absolute top-1 right-1 text-white rounded-full w-5 h-5 opacity-0 group-hover:opacity-100"
                                        onClick={() => removeStoreImage()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-red-600 rounded-lg p-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg> 
                                    </button>
                                    <img src={storeImage} className="rounded-lg" alt="" />
                                </div>
                    }
                {/* </ReactSortable> */}

                {/* Spinner */}
                {spinner1 && (
                    <div className="inline-block w-24 h-24 justify-center p1 bg-gray-100 flex items-center rounded-lg">
                        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900">
                            <Spinner />
                        </div>
                    </div>
                )}

                {/* Add image button */}
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
                    <input type="file" onChange={uploadStoreProfile} className="hidden" />
                </label>

                
                </div>

                {/* Submit button */}
                <div className='flex flex-wrap gap-2'>
                    <button className="btn-primary mt-4" onClick={handleSubmit}>
                        Save
                    </button>
                    <button className="btn btn-alert bg-red-900 rounded-md rounded-md px-4 py-1 text-white mt-4 mr-0" onClick={() => {setIsCreateStore(false)}}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    function StoreDisplay() {

        return(
            <></>
        )
    }

    return (
        <Layout>
            <h1 className='heading font-bold text-4xl'>Store</h1>
            {!isStore && 
                <div className='flex flex-wrap flex-col justify-center items-end'>
                        {!isCreateStore && 
                            <div className='bg-gray-200 p-8 mt-5 w-full h-full flex flex-wrap justify-center items-center' style={{ borderRadius: '0 30px 30px 30px' }}>
                                <h1 className='font-bold text-6xl m-10'>You don&apos;t have a store yet!</h1>
                                <button className="btn-primary  mt-4 mr-0" onClick={handleCreateStore}>Create Store</button> 
                            </div>
                        }
                    </div>
            }
            {isCreateStore && StoreForm()}
            <div>{user?.name}</div>
        </Layout>
    );
}
