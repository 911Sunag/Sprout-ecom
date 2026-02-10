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
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  unit = "500g",
  rating = 4.9,
  onSale = false,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const cartItem = cart.find(i => i.id === id);
  const quantity = cartItem?.quantity ?? 0;

  const parseToGrams = (unit?: string) => {
    if (!unit) return 0;
    const u = unit.toLowerCase().trim();
    const num = parseFloat(u.replace(/[^0-9.]/g, '')) || 0;
    if (u.includes('kg')) return num * 1000;
    return num; // assume grams
  };

  const totalGrams = cart.reduce((sum, it) => {
    const prod = products.find(p => p.id === it.id);
    if (!prod) return sum;
    const grams = parseToGrams(prod.unit);
    return sum + grams * it.quantity;
  }, 0);

  const totalKg = totalGrams / 1000;
  const disableAdd = totalKg > 3;

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

  return (
    <div
      className="relative w-60 h-80 rounded-2xl overflow-hidden shadow-md font-pro bg-cover bg-center"
      style={{ backgroundImage: `url(${new URL(`../assets/${image}`, import.meta.url).href})` }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full p-2 flex flex-col justify-between text-white">
        {/* Top */}
        <div className="flex justify-between items-start">
          {onSale && (
            <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">ON SALE</span>
          )}

          <div className="bg-white/90 text-black text-sm px-2 py-0.5 rounded-full shadow">⭐ {rating}</div>
        </div>

        {/* Bottom */}
        <div className="bg-white text-black rounded-xl p-3">
          <p className="font-semibold text-sm leading-tight">{name}</p>

          <div className="flex items-center justify-between mt-3">
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                disabled={disableAdd}
                className={`border rounded-lg px-3 py-1 text-sm font-medium transition ${disableAdd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/10'}`}
              >
                Add +
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="border rounded-lg px-3 py-1 text-sm font-medium hover:bg-black/10 transition"
                >
                  -
                </button>
                <div className="px-3 py-1 border rounded-lg">{quantity}</div>
                <button
                  onClick={handleIncrement}
                  disabled={disableAdd}
                  className={`border rounded-lg px-3 py-1 text-sm font-medium transition ${disableAdd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/10'}`}
                >
                  +
                </button>
              </div>
            )}

            <div className="text-right font-semibold text-sm">
              <p>${price.toFixed(2)}</p>
              <p className="text-xs text-black/50">/ {unit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
