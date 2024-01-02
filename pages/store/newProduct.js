import ProductForm from "../../components/ProductForm";
import Layout from "../../components/Layout";

export default function StoreNewProduct() {
    const back = {back: 'store'}
    return(
        <Layout>
            <h1>New Product</h1>
            <ProductForm {...back}/>
        </Layout>
    );
}
