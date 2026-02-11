import { Check } from "lucide-react";
import footerIcon from "../assets/logooo.png";
import { useForm } from "react-hook-form";

type NewsletterForm = {
  email: string;
};

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>();

  const onSubmit = (data: NewsletterForm) => {
    console.log("Newsletter subscription:", data);
    alert(`Subscribed with: ${data.email}`);
    reset();
  };

  return (
    <footer className="px-5 flex flex-col md:flex-row items-start md:items-center justify-between py-10 gap-10 md:gap-0">
      <div className="space-y-2.5">
        <img src={footerIcon} alt="icon" width={75} />
        <p className="text-[12px] font-semibold text-sprout-teal">
          Eco Food Market <br /> SPROUT Good Ltd.
        </p>
        <small className="text-[10px] font-medium text-black/45">
          2024 © All right reserved
        </small>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto text-left">
        <div>
          <h3 className="text-xl font-medium text-black/85 mb-2">Company</h3>
          <div className="flex flex-col font-medium text-black/65 items-start gap-1 text-sm">
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Store</a>
            <a href="#" className="hover:text-black transition-colors">FAQ</a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black/85 mb-2">Service</h3>
          <div className="flex flex-col font-medium text-black/65 items-start gap-1 text-sm">
            <a href="#" className="hover:text-black transition-colors">Delivery</a>
            <a href="#" className="hover:text-black transition-colors">Payment</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black/85 mb-2">Follow us</h3>
          <div className="flex flex-col font-medium text-black/65 items-start gap-1 text-sm">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Facebook</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
          </div>
        </div>
      </div>
      <div className="space-y-2.5 w-full md:w-auto">
        <p className="font-medium">Get our newsletters:</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <div className="h-10 flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Your Email"
              className={`bg-white p-3 text-sm font-medium rounded-l-lg outline-none w-full md:w-64 border-r-0 focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-black/10'}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <button type="submit" className="rounded-r-lg bg-black px-4 flex items-center justify-center cursor-pointer hover:bg-black/75 transition-colors">
              <Check size={18} className="text-white" />
            </button>
          </div>
          {errors.email && <span className="text-red-500 text-xs pl-1">{errors.email.message}</span>}
        </form>
        <div className="space-x-2.5 font-medium text-black/55 text-xs">
          <a href="#" className="underline hover:text-black">Terms & Conditions</a>
          <a href="#" className="underline hover:text-black" >Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
