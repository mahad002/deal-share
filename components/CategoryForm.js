import Layout from "./Layout";



export default function Categories() {
    return (
        <Layout>
            <h1>Categories</h1>
            <div className="grid grid-cols-2 gap-4">
                {/* Mobile Phones */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Mobile Phones</h2>
                    <button>Select</button>
                </div>

                {/* Laptops */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Laptops</h2>
                    <button>Select</button>
                </div>

                {/* Tablets */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Tablets</h2>
                    <button>Select</button>
                </div>

                {/* Computers */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Computers (PC)</h2>
                    <button>Select</button>
                </div>
            </div>
        </Layout>
    );
}