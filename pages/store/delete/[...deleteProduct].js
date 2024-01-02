import Layout from "../../../components/Layout";
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
        axios.get(`/api/product?id=${deleteProduct}`).then(response => {
            console.log('Response Data: ',response.data);
            setProductInfo(response.data);
            console.log("Product: ",productInfo);});
    },[deleteProduct])

    function goBack() {
        router.push('/store');
    }

    function deleteProduct1() {
        axios.delete(`/api/products?id=${deleteProduct}`).then(response => {
            console.log('Response Data: ',response.data);
            setProductInfo(response.data);
            console.log("Product: ",productInfo);});
            goBack();
    }

    return (

        <Layout>
            <h1 className="text-center">Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot; ?</h1>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct1} className="btn btn-alert bg-red-900 rounded-md m-1 px-3 text-white">Yes</button>
                <button onClick={goBack} className="btn btn-primary m-1">No</button>
            </div>
        </Layout>
    );
}