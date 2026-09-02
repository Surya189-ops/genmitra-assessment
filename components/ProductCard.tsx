type Product = {
  id: string;
  store_id: string;
  store_name: string;
  name: string;
  category: string;
  price: number;
  unit: string;
};

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

export const ProductCard = ({
  product,
  addToCart,
}: ProductCardProps) => {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white shadow-sm"
    >
      <div className="flex h-44 items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl">
            🛒
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Product Image
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.category}
        </p>

        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {product.store_name}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500">
              {product.unit}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};