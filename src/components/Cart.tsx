
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { X, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const products = useSelector((state: RootState) => state.products.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="absolute top-12 right-0 z-50 w-80 bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                <p className="font-semibold text-gray-500">Your cart is empty.</p>
            </div>
        )
    }

    return (
        <div className="absolute top-14 right-0 z-50 w-[380px] bg-white rounded-[2rem] shadow-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Arrow tooltip */}
            <div className="absolute -top-2 right-10 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>

            <h2 className="text-lg font-bold text-gray-800 mb-6 text-left">My shopping cart:</h2>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {cartItems.map((item) => {
                    const product = products.find(p => p.id === item.id);
                    const unit = product?.unit || 'unit';

                    return (
                        <div key={item.id} className="flex items-center gap-4 relative group">
                            {/* Image */}
                            <div className="w-16 h-16 shrink-0 rounded-full bg-gray-50 border border-gray-100 p-1 shadow-sm">
                                <img
                                    src={new URL(`../assets/${item.image}`, import.meta.url).href}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-700 text-sm text-left">{item.name}</h3>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    {/* Quantity Control */}
                                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                                        <button
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                                } else {
                                                    dispatch(removeFromCart(item.id));
                                                }
                                            }}
                                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer active:scale-95"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-xs font-bold text-sprout-teal min-w-[30px] text-center">
                                            {item.quantity} {unit}
                                        </span>
                                        <button
                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer active:scale-95"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <span className="font-bold text-gray-800 text-sm">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 font-medium">Subtotal:</span>
                    <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-[#4a6c6f] hover:bg-[#3b575a] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-teal-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                    To checkout
                </button>
            </div>
        </div>
    )
}

export default Cart