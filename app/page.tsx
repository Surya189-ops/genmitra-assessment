"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";

type CartItem = (typeof products)[number] & {
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: (typeof products)[number]) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const groupedCart = cart.reduce((groups, item) => {
    if (!groups[item.store_name]) {
      groups[item.store_name] = [];
    }

    groups[item.store_name].push(item);

    return groups;
  }, {} as Record<string, CartItem[]>);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 pb-28">
      <div className="mx-auto max-w-md">
        {!isCartOpen ? (
          <>
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

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                Your Cart
              </h1>

              <button
                onClick={() => setIsCartOpen(false)}
                className="text-sm font-medium text-gray-600"
              >
                Back to Store
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <p className="text-gray-500">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedCart).map(
                  ([storeName, storeItems]) => (
                    <div
                      key={storeName}
                      className="rounded-xl bg-white p-4 shadow-sm"
                    >
                      <h2 className="mb-4 text-lg font-semibold">
                        {storeName}
                      </h2>

                      <div className="space-y-4">
                        {storeItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3"
                          >
                            <div>
                              <p className="font-medium">
                                {item.name}
                              </p>

                              <p className="text-sm text-gray-500">
                                ₹{item.price} · {item.unit}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200"
                              >
                                -
                              </button>

                              <span className="font-medium">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 shadow-lg">
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </p>

              <p className="text-lg font-bold">
                ₹{totalPrice}
              </p>
            </div>

            {!isCartOpen && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="rounded-lg bg-black px-6 py-3 font-medium text-white"
              >
                View Cart
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}