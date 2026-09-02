type CheckoutBarProps = {
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
};

export const CheckoutBar = ({
  totalItems,
  totalPrice,
  isCartOpen,
  setIsCartOpen,
}: CheckoutBarProps) => {
  if (totalItems === 0) {
    return null;
  }

  return (
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
  );
};