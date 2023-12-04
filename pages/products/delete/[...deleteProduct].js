import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const {deleteProduct} = router.query;
    const [productInfo, setProductInfo] = useState();
    console.log(router.query);
    console.log(deleteProduct);
    useEffect(() => {
        if(!deleteProduct){
            return;
        }
        axios.get(`/api/products?id=${deleteProduct}`).then(response => {
            console.log('Response Data: ',response.data);
            setProductInfo(response.data);
            console.log("Product: ",productInfo);});
    },[deleteProduct])

    function goBack() {
        router.push('/products');
    }

    return (

        <Layout>
            <h1>Do you really want to delete &nsbp; {productInfo?.title} ?</h1>
            <button className="btn btn-alert bg-red-900 rounded-md p-1 px-3 text-white">Yes</button>
            <button onClick={goBack} className="btn btn-primary m-2">No</button>
        </Layout>
    );
}