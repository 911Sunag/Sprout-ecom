import { Check } from "lucide-react";
import footerIcon from "../assets/logooo.png";

const Footer = () => {
  return (
    <footer className="px-5 flex items-center justify-between py-10">
      <div className="space-y-2.5">
        <img src={footerIcon} alt="icon" width={75} />
        <p className="text-[12px] font-semibold text-sprout-teal">
          Eco Food Market <br /> SPROUT Good Ltd.
        </p>
        <small className="text-[10px] font-medium text-black/45">
          2024 © All right reserved
        </small>
      </div>
      <div className="flex space-x-50 space-y-2.5">
        <div>
          <h3 className="text-xl font-medium text-black/85">Company</h3>
          <small className="flex flex-col font-medium text-black/65 items-start">
            <a href="#">About</a><a href="#">Store</a><a href="#">FAQ</a>
          </small>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black/85">Service</h3>
          <small className="flex flex-col font-medium text-black/65"><a href="#">Delivery</a><a href="#">Paymant</a><a href="#">Contact</a></small>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black/85">Follow us</h3>
          <small className="flex flex-col font-medium text-black/65">
            <a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Twitter</a>
          </small>
        </div>
      </div>
      <div className="space-y-2.5">
        <p className="font-medium">Get our newsletters:</p>
        <div className="h-8 flex">
          <input type="text" placeholder="Your Email" className="bg-white p-3 text-sm font-medium rounded-tl-lg rounded-bl-lg outline-none" />
          <button className="rounded-tr-lg rounded-br-lg bg-black w-10 flex items-center justify-center cursor-pointer hover:bg-black/75">
            <Check size={18} className="text-white"/>
          </button>
        </div>
        <small className="space-x-2.5 font-medium text-black/55 "><a href="#" className="underline hover:text-black">Terms & Conditions</a><a href="#" className="underline hover:text-black" >Privacy Policy</a></small> 
      </div>
    </footer>
  );
};

export default Footer;
