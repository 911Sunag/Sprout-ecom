import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../store/cartSlice";
import type { RootState } from "../store/store";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  unit?: string;
  rating?: number;
  onSale?: boolean;
  description?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  unit = "500g",
  rating = 4.9,
  onSale = false,
  description = "",
}: ProductCardProps) => {
  const dispatch = useDispatch();

  const quantity = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === id)?.quantity ?? 0
  );

  const disableAdd = useSelector((state: RootState) => {
    const cart = state.cart.items;
    const products = state.products.items;

    const totalGrams = cart.reduce((sum, it) => {
      const prod = products.find((p) => p.id === it.id);
      if (!prod) return sum;
      const u = prod.unit?.toLowerCase().trim() || "";
      const num = parseFloat(u.replace(/[^0-9.]/g, "")) || 0;
      const weight = u.includes("kg") ? num * 1000 : num;
      return sum + weight * it.quantity;
    }, 0);

    // Calculate weight of current item
    const currentItemUnit = unit?.toLowerCase().trim() || "";
    const currentItemNum = parseFloat(currentItemUnit.replace(/[^0-9.]/g, "")) || 0;
    const currentItemWeight = currentItemUnit.includes("kg") ? currentItemNum * 1000 : currentItemNum;

    return (totalGrams + currentItemWeight) / 1000 > 5; // Disable if adding this item exceeds 5kg
  });

  const handleIncrement = () => {
    if (disableAdd) return;
    dispatch(addToCart({ id, name, price, image }));
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  // Mocking original price for "On Sale" items for visual fidelity
  const originalPrice = onSale ? (price * 1.5).toFixed(2) : null;

  return (
    <div className="relative mt-12 w-full max-w-[250px] flex flex-col items-center group h-[250px]">
      {/* Image Circle - Popping out */}
      <div className="absolute -top-12 left-5 z-20 w-28 h-28 rounded-full shadow-lg bg-white p-1 overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <img
          src={new URL(`../assets/${image}`, import.meta.url).href}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Card Content */}
      <div className="w-full bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-shadow pt-16 pb-4 px-5 relative h-[260px] flex flex-col justify-between">

        {/* Top Right Stats/Badges - Only Sale now */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          {onSale && (
            <div className="bg-red-400 text-white text-[10px] font-bold px-2 py-1 rounded-md transform rotate-[-5deg] shadow-sm uppercase tracking-wide">
              On Sale
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="mt-2 grow flex flex-col items-center w-full">
          {/* Name & Rating */}
          <div className="flex items-start justify-between gap-2 w-full mb-1">
            <h3 className="font-bold font-pro text-gray-800 text-lg leading-tight line-clamp-1 max-w-[70%]">
              {name}
            </h3>
            <div className="flex items-center gap-0.5 text-xs font-semibold text-slate-700 bg-gray-100 px-1.5 py-0.5 rounded-md shrink-0">
              <span className="text-amber-400">★</span> {rating}
            </div>
          </div>

          <p className="text-gray-500 text-xs text-start w-full line-clamp-3 leading-relaxed h-[3.8rem] overflow-hidden mt-6 font-medium">
            {description || "Tasty and fresh."}
          </p>
        </div>

        {/* Footer: Add Button & Price */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          {quantity === 0 ? (
            <button
              onClick={handleIncrement}
              disabled={disableAdd}
              className={`group/btn flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-bold text-gray-700 hover:border-teal-500 hover:text-teal-600 hover:shadow-sm transition-all ${disableAdd ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
            >
              Add <span className="text-base leading-none font-medium">+</span>
            </button>
          ) : (
            <div className="flex items-center border border-teal-600 rounded-xl overflow-hidden h-8">
              <button onClick={handleDecrement} className="px-2 h-full hover:bg-gray-50 text-gray-600 transition flex items-center">-</button>
              <span className="px-1 text-xs font-bold min-w-[20px] text-center">{quantity}</span>
              <button onClick={handleIncrement} disabled={disableAdd} className="px-2 h-full hover:bg-gray-50 text-gray-600 transition flex items-center">+</button>
            </div>
          )}

          {/* Price */}
          <div className="text-right flex flex-col items-end">
            {onSale && originalPrice && (
              <span className="text-[10px] text-gray-400 line-through decoration-red-400 decoration-1 font-medium leading-none mb-0.5">{originalPrice}</span>
            )}
            <div className={`font-bold leading-none ${onSale ? "text-red-500" : "text-gray-900"}`}>
              <span className="text-[10px] font-normal align-top">$</span>
              <span className="text-base">{price.toFixed(2)}</span>
            </div>
            <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">/ {unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
