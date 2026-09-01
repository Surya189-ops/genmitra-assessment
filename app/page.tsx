"use client";

import { useState } from "react";
import { products } from "@/data/products";

type CartItem = (typeof products)[number] & {
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);

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

        <div className="mt-6 space-y-6">
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
                      className="flex items-center justify-between"
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
      </div>
    </main>
  );
}