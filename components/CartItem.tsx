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

type CartItemProps = {
  item: CartItemType;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

export const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
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
          onClick={() => decreaseQuantity(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-lg"
        >
          −
        </button>

        <span className="w-4 text-center font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};