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
    <main className="min-h-screen bg-gray-50 px-4 py-5 pb-28">
      <div className="mx-auto max-w-md">
        {!isCartOpen ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Welcome
                </p>

                <h1 className="text-2xl font-bold">
                  Store Catalog
                </h1>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
                >
                  Cart ({totalItems})
                </button>
              )}
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
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
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}
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
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <p className="truncate font-medium">
                                {item.name}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                ₹{item.price} · {item.unit}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                              <button
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-lg"
                              >
                                −
                              </button>

                              <span className="w-4 text-center font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-lg"
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
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3 shadow-lg">
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">
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
                className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white"
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