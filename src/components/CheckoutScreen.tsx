
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { CreditCard, BadgePercent } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetails from './Orderdetails';

const CheckoutScreen = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'paypal' | 'card'>('card');

    // Form States for Credit Card
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardError, setCardError] = useState('');

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && !isOrderComplete) {
            navigate('/');
        }
    }, [cartItems, navigate, isOrderComplete]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 0.20;
    const total = subtotal + deliveryFee;

    const validateCardNumber = (number: string) => {
        const cleanedNumber = number.replace(/\s/g, '');
        // Simple validation: 16 digits
        const regex = /^\d{16}$/;
        if (!regex.test(cleanedNumber)) {
            setCardError('Card number must be 16 digits.');
            return false;
        }
        setCardError('');
        return true;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        // Format with spaces every 4 digits
        const formattedVal = val.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(formattedVal.substring(0, 19)); // Max 19 chars (16 digits + 3 spaces)
        if (cardError) setCardError(''); // Clear error as user types
    };

    const handlePurchase = () => {
        // Basic validation before showing modal
        if (paymentMethod === 'card') {
            if (!cardNumber || cardError) {
                alert("Please enter a valid card number.");
                return;
            }
        }
        setIsOrderComplete(true);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (val.length > 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setExpiry(val.substring(0, 5)); // MM/YY
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        setCvv(val.substring(0, 3)); // Max 3 digits
    };

    const RadioIcon = ({ selected }: { selected: boolean }) => (
        <div className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${selected ? 'border-teal-600' : 'border-gray-300'}`}>
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
            {isOrderComplete && <OrderDetails total={total} onClose={() => setIsOrderComplete(false)} />}

            {/* <div className="mb-4 text-sm text-gray-500">
                <Link to="/" className="hover:text-teal-600 transition-colors cursor-pointer">Homepage</Link> / Checkout
            </div> */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Personal Information */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Personal information:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">First name</label>
                                <input type="text" placeholder="Julia" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Last name</label>
                                <input type="text" placeholder="Burch" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Phone</label>
                                <input type="text" placeholder="+1 234 567 890" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Email</label>
                                <input type="email" placeholder="julia.burch@example.com" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                        </div>
                    </section>

                    {/* Delivery Details */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery details:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Country / Region</label>
                                <input type="text" placeholder="Select Country" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Town / City</label>
                                <input type="text" placeholder="Select City" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Street</label>
                                <input type="text" placeholder="123 Green St" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Postcode</label>
                                <input type="text" placeholder="E1 6AN" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Packaging type</label>
                                <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer">
                                    <option>Without plastic</option>
                                    <option>Eco-friendly</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Shipping option</label>
                                <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer">
                                    <option>By courier</option>
                                    <option>Pickup</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Payment */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Payment:</h2>
                        <div className="space-y-3">
                            {/* UPI */}
                            <div
                                onClick={() => setPaymentMethod('upi')}
                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${paymentMethod === 'upi' ? 'bg-gray-50 border-teal-500 shadow-sm' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioIcon selected={paymentMethod === 'upi'} />
                                    <span className={`font-semibold text-sm flex items-center gap-2 ${paymentMethod === 'upi' ? 'text-teal-900' : 'text-gray-700'}`}>UPI</span>
                                </div>
                                <div className="text-xs font-bold font-mono">UPI</div>
                            </div>

                            {/* PayPal */}
                            <div
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${paymentMethod === 'paypal' ? 'bg-gray-50 border-teal-500 shadow-sm' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioIcon selected={paymentMethod === 'paypal'} />
                                    <span className={`font-semibold text-sm flex items-center gap-2 ${paymentMethod === 'paypal' ? 'text-teal-900' : 'text-gray-700'}`}>PayPal</span>
                                </div>
                                <div className="text-xs font-bold text-blue-600 italic">PayPal</div>
                            </div>

                            {/* Credit Card */}
                            <div
                                onClick={() => setPaymentMethod('card')}
                                className={`p-4 md:p-6 rounded-xl relative border transition-all cursor-pointer ${paymentMethod === 'card' ? 'bg-orange-50/50 border-orange-200 shadow-sm' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                    <RadioIcon selected={paymentMethod === 'card'} />
                                    <span className={`font-bold text-sm w-full ${paymentMethod === 'card' ? 'text-gray-900' : 'text-gray-500'}`}>Credit or debit card</span>
                                    {/* Card Icons */}
                                    <div className="flex gap-2">
                                        <div className="w-8 h-5 bg-red-500 rounded-sm opacity-80"></div>
                                        <div className="w-8 h-5 bg-blue-600 rounded-sm opacity-80"></div>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 cursor-default" onClick={(e) => e.stopPropagation()}>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 ml-1">Name on card</label>
                                            <input
                                                type="text"
                                                placeholder="Julia Burch"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 ml-1">Card number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    onBlur={(e) => validateCardNumber(e.target.value)}
                                                    className={`w-full bg-white border ${cardError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-teal-500'} rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 outline-none shadow-sm pl-10`}
                                                />
                                                <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                            {cardError && <p className="text-xs text-red-500 ml-1 mt-1">{cardError}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-gray-500 ml-1">Expiration date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    value={expiry}
                                                    onChange={handleExpiryChange}
                                                    maxLength={5}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-gray-500 ml-1">CVV code</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    value={cvv}
                                                    onChange={handleCvvChange}
                                                    maxLength={3}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-4 md:p-6 sticky top-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6">Your order:</h2>

                        <div className="space-y-1 mb-6">
                            <div className="flex justify-between text-sm font-medium text-gray-500">
                                <span>Subtotal:</span>
                                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500">
                                <span>Delivery:</span>
                                <span className="text-gray-900 font-bold">${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200/60">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Coupon Input */}
                        <div className="mb-6 relative">
                            <input
                                type="text"
                                placeholder="Discount code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none shadow-sm pl-10"
                            />
                            <BadgePercent size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700 hover:text-teal-900 px-2 py-1 bg-teal-50 rounded-md transition-colors">
                                Apply
                            </button>
                        </div>

                        <button
                            onClick={handlePurchase}
                            className="w-full bg-[#4a6c6f] hover:bg-[#3b575a] text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-900/10 transition-all active:scale-95 mb-10"
                        >
                            Purchase
                        </button>

                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-100 p-1 shadow-sm">
                                        <img
                                            src={new URL(`../assets/${item.image}`, import.meta.url).href}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                                            </div>
                                            {/* <button className="text-gray-400 hover:text-red-500">
                                                <X size={14} />
                                            </button> */}
                                        </div>
                                        <div className="text-right mt-1">
                                            <span className="font-bold text-xs text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutScreen;