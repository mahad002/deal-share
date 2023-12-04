import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const router = useRouter();
    const {editProduct} = router.query;
    // const pId = useParams();
    const [productInfo, setProductInfo] = useState();

    console.log("Router: ",router);

    useEffect(()=>{
        if(!editProduct){
            // console.log(editProduct);
            return;
        }
        axios.get(`/api/products?id=${editProduct}`).then(response => {
            console.log('Response Data: ',response.data);
            setProductInfo(response.data);
            console.log("Product: ",productInfo);
        });
    },[editProduct]);
    


    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && <ProductForm {...productInfo}/>}
        </Layout>
    );
}