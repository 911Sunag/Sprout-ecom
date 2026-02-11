import { CheckCircle2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import type { RootState } from "../store/store";

interface OrderDetailsProps {
    total: number;
    onClose: () => void;
}

const OrderDetails = ({ total, onClose }: OrderDetailsProps) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleStartNewOrder = () => {
        dispatch(clearCart());
        onClose();
    };
    // const dispatch = useDispatch();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Content */}
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative">

                {/* Success Icon & Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center border-4 border-teal-100">
                        <CheckCircle2 size={32} className="text-teal-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Order Confirmed</h2>
                        <p className="text-gray-500 mt-1 text-sm">We hope you enjoy your food!</p>
                    </div>
                </div>

                {/* Order Items Summary Card */}
                <div className="bg-gray-50/80 rounded-2xl p-6 mb-8">
                    {/* List */}
                    <div className="space-y-6 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-14 h-14 shrink-0 rounded-xl bg-white border border-gray-100 p-1 shadow-sm overflow-hidden">
                                    {/* Assuming simple image path logic as in Checkout */}
                                    <img
                                        src={new URL(`../assets/${item.image}`, import.meta.url).href}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex justify-between items-center gap-4">
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800 text-sm truncate max-w-[120px]">{item.name}</h3>
                                        <div className="flex gap-2 text-xs mt-0.5">
                                            <span className="font-bold text-teal-600">{item.quantity}x</span>
                                            <span className="text-gray-400">@ ${item.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-6"></div>

                    {/* Total */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium text-sm">Order Total</span>
                        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    to="/"
                    onClick={handleStartNewOrder}
                    className="block w-full bg-[#4a6c6f] hover:bg-[#3b575a] text-white font-bold text-center py-4 rounded-xl shadow-lg shadow-teal-900/20 transition-all active:scale-95"
                >
                    Start New Order
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;