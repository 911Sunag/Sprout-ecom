import { Search, ShoppingBag } from "lucide-react";
import sproutLogo from "../assets/logooo.png";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Navbar = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);

  return (
    <nav className="flex items-center justify-between w-full py-5">
      <div className="flex items-center space-x-2">
        <img src={sproutLogo} alt="logo" width={115} />
        <div className="flex items-center bg-white rounded-lg px-3 space-x-1">
          <input type="text" placeholder="Search" className="bg-white rounded-lg py-2 w-105 outline-none text-[15px] font-semibold"/>
          <Search size={18} className="bg-white"/>
        </div>
      </div>
      <button className="flex items-center justify-center space-x-2 bg-white px-3 py-2 rounded-xl cursor-pointer active:scale-98">
        <ShoppingBag size={18}/>
        <span className="font-semibold tracking-wide">Cart: {cartCount}</span>
      </button>
    </nav>
  );
};

export default Navbar;
