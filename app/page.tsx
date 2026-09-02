"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartView } from "@/components/CartView";
import { CheckoutBar } from "@/components/CheckoutBar";

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
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <CartView
            cart={cart}
            groupedCart={groupedCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setIsCartOpen={setIsCartOpen}
          />
        )}
      </div>

      <CheckoutBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </main>
  );
}