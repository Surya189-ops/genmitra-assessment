import { products } from "../data/products";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">
          Store Catalog
        </h1>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-gray-400">
                  Image
                </span>
              </div>

              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {product.store_name}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    ₹{product.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    {product.unit}
                  </p>
                </div>

                <button className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}