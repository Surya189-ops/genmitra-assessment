import { CartItem } from "./CartItem";

type CartItemType = {
  id: string;
  store_id: string;
  store_name: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
};

type CartViewProps = {
  cart: CartItemType[];
  groupedCart: Record<string, CartItemType[]>;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setIsCartOpen: (value: boolean) => void;
};

export const CartView = ({
  cart,
  groupedCart,
  increaseQuantity,
  decreaseQuantity,
  setIsCartOpen,
}: CartViewProps) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {cart.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            {cart.length === 1 ? "item" : "items"}
          </p>

          <h1 className="text-2xl font-bold">
            Your Cart
          </h1>
        </div>

        <button
          onClick={() => setIsCartOpen(false)}
          className="rounded-lg border px-3 py-2 text-sm font-medium"
        >
          Back
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">
            🛒
          </div>

          <p className="mt-3 font-medium">
            Your cart is empty
          </p>

          <button
            onClick={() => setIsCartOpen(false)}
            className="mt-4 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(groupedCart).map(
            ([storeName, storeItems]) => (
              <div
                key={storeName}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="mb-4 border-b pb-3">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Store
                  </p>

                  <h2 className="text-lg font-bold">
                    {storeName}
                  </h2>
                </div>

                <div className="space-y-5">
                  {storeItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};