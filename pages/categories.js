import Layout from "@/components/Layout";

export default function Categories(){

    return (
        <Layout>
            <h1>Categories</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Mobile Phones</h2>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Laptops</h2>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Tablets</h2>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Computers (PC)</h2>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 justify-end">
                {/* Create a button which calls a function to add category*/}
                {/* Create a button which calls a function to delete category*/}
                {/* Create a button which calls a function to edit category*/}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    // onClick={handleClick}
                >
                    Add Category
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    // onClick={handleClick}
                >
                    Delete Category
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    // onClick={handleClick}
                >
                    Edit Category
                </button>
            </div>
        </Layout>
    );
}