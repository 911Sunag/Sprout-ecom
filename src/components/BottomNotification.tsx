import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const parseToGrams = (unit?: string) => {
  if (!unit) return 0;
  const u = unit.toLowerCase().trim();
  const num = parseFloat(u.replace(/[^0-9.]/g, '')) || 0;
  if (u.includes('kg')) return num * 1000;
  return num; // assume grams
};

const BottomNotification = () => {
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const products = useSelector((s: RootState) => s.products.items);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const totalGrams = cartItems.reduce((sum, it) => {
      const prod = products.find(p => p.id === it.id);
      if (!prod) return sum;
      const grams = parseToGrams(prod.unit);
      return sum + grams * it.quantity;
    }, 0);

    const totalKg = totalGrams / 1000;
    setVisible(totalKg > 3);
  }, [cartItems, products]);

  if (!visible) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
      <div className="bg-white shadow-lg rounded-full px-5 py-3 flex items-center space-x-4">
        <div className="font-semibold">Daily limit reached</div>
        <div className="text-sm">You exceeded your daily limit (3kg). Adding is disabled.</div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-sm text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BottomNotification;
