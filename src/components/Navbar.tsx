import { Search, ShoppingBag, Home, User, LogOut } from "lucide-react";
import sproutLogo from "../assets/logooo.png";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setSearchTerm } from "../store/productsSlice";
import { logout } from "../store/authSlice";
import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import Cart from "./Cart";

const Navbar = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isCheckout = location.pathname === '/checkout';
  const isAuthPage = location.pathname === '/auth';
  const hideSearchAndCart = isCheckout || isAuthPage;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(query));
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  return (
    <nav className={`flex items-center w-full py-4 mb-5 gap-4 ${hideSearchAndCart ? 'relative justify-end' : 'flex-wrap md:flex-nowrap justify-between'}`}>
      <img
        src={sproutLogo}
        alt="Sprout Logo"
        width={115}
        height={40}
        className={`${hideSearchAndCart ? 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'order-1 cursor-pointer'}`}
      />

      {!hideSearchAndCart && (
        <div className="order-3 md:order-2 flex items-center bg-white rounded-lg px-3 space-x-1 w-full md:w-auto shadow-sm md:shadow-none shrink-0 border border-transparent focus-within:border-teal-500 transition-colors">
          <input
            type="text"
            placeholder="Search items..."
            aria-label="Search for products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white rounded-lg py-2 w-full md:w-96 outline-none text-[15px] font-semibold placeholder:text-gray-400"
          />
          <Search size={18} className="text-gray-400" />
        </div>
      )}

      <div ref={cartRef} className={`${hideSearchAndCart ? '' : 'order-2 md:order-3'} relative z-50`}>
        {hideSearchAndCart ? (
          isCheckout && (
            <Link to="/" className="flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition active:scale-95 shadow-sm text-gray-700 font-semibold hover:text-teal-600">
              <Home size={20} />
              <span className="tracking-wide text-sm md:text-base">Homepage</span>
            </Link>
          )
        ) : (
          <div className="flex items-center space-x-2">
            {user ? (
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition active:scale-95 shadow-sm text-gray-700 font-semibold hover:text-red-500"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline font-semibold tracking-wide text-sm md:text-base">Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition active:scale-95 shadow-sm text-gray-700 font-semibold hover:text-teal-600"
              >
                <User size={20} />
                <span className="hidden sm:inline font-semibold tracking-wide text-sm md:text-base">Login</span>
              </Link>
            )}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={`flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition active:scale-95 shadow-sm ${isCartOpen ? 'ring-2 ring-teal-500/20' : ''}`}
            >
              <ShoppingBag size={20} />
              <span className="font-semibold tracking-wide text-sm md:text-base">Cart: {cartCount}</span>
            </button>
            {isCartOpen && <Cart />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
