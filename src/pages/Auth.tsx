import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, reset } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";

const stickerImages = [
    "image-0cPKr66ydMkJsLqzkBFCHVHXBZnw5X.webp",
    "image-2l0iEpELH8Dh6SlznWDG9UTDI7CXxF.webp",
    "image-5aEfm3A4zPjOYuRHNBSWFud5tmTxmF.webp",
    "image-79XLKwCuOZGHdVcOlEApISx6x2nVd2.webp",
    "image-8ysCNWCXSEUz8gev3IoCnzMXrG4Dgv.webp",
    "image-9SRE3OZK4XE1FqSayTmmiO5UqIcDGi.webp",
    "image-DQeRZcV77tvbEVDqxkEAaca8RwJ5KO.webp",
    "image-Lo6Z6zumG1tr01pDUmtp1bOwDlTeIE.webp",
    "image-N9RhY87VfwsgJMKMyc6MmdTUevd8SD.webp",
    "image-Okh2T4EAWiKpUpMznx5A3abb1qlVOz.webp",
    "image-PGsquqsWiNY7oX6G4drTdq36ieTBjG.webp",
    "image-R3MIm1xrlriIuCYpng20K9bds317N1.webp",
    "image-SMCaMDciKil0Q7RQPsqtTbNzUr2yr4.webp",
    "image-TVCwuOTeNqH2vGlDuJretqMcHhLHIu.webp",
    "image-VjaFekZH9sPWoqpxI5GfJzkoq55agF.webp",
    "image-WY6AfxnM6HoBlCZzV8tiWQPQJEORNb.webp",
    "image-X9moyHVyJ6at687pyOIlNGA3s1k5fQ.webp",
    "image-aJLwIUBibrkyvuHgIEe5momwaF3NRx.webp",
    "image-dB0Lnna9SnPK6FovcZxwjRtkxgSPBu.webp",
    "image-hGcGLkiClD5sryAD46zXP6yqYmhpvJ.webp",
    "image-j09SjN7IVQChRChhcG4DQd2XX9D6NP.webp",
    "image-mLIzz1a3BcyWlL2gqM5P7hK76WDldX.webp",
    "image-pnMXO2YYqMD8UCmPNtTPryUPlAVqkM.webp",
    "image-rXyreG0Sz8i9iLVpkX784JgqMjICxP.webp"
];

export default function Auth() {
  const { 
    register: loginRegister, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors } 
  } = useForm();
  
  const { 
    register: registerRegister, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors }, 
    watch 
  } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onLoginSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  const onRegisterSubmit = (data: any) => {
    dispatch(registerUser(data));
  };

  const registerPassword = watch("password");

  const stickers = useMemo(() => {
      const count = 80; // Maximized density for gaps

      let indices: number[] = [];
      while (indices.length < count) {
          const batch = Array.from({ length: stickerImages.length }, (_, k) => k);
          for (let k = batch.length - 1; k > 0; k--) {
              const j = Math.floor(Math.random() * (k + 1));
              [batch[k], batch[j]] = [batch[j], batch[k]];
          }
          indices = indices.concat(batch);
      }

      return Array.from({ length: count }).map((_, i) => {
          // Spread randomly across the entire width and height.
          // Stickers behind the forms will be blurred by backdrop-blur, 
          // while stickers in the gaps will be clearly visible!
          const leftPosition = Math.random() * 100;
          const topPosition = Math.random() * 100;

          // Slightly larger scale to fill gaps more effectively (0.8 to 1.3)
          const scale = 0.8 + Math.random() * 0.5;

          return {
              src: stickerImages[indices[i]],
              top: topPosition,
              left: leftPosition,
              rotation: Math.random() * 40 - 20,
              scale: scale,
              animationDuration: 3 + Math.random() * 5 + "s",
              animationDelay: -Math.random() * 5 + "s"
          };
      });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style>{`
          @keyframes float {
              0% { transform: translateY(0px) translateX(0px) rotate(var(--rot)) scale(var(--scale)); }
              33% { transform: translateY(-10px) translateX(5px) rotate(var(--rot)) scale(var(--scale)); }
              66% { transform: translateY(5px) translateX(-5px) rotate(var(--rot)) scale(var(--scale)); }
              100% { transform: translateY(0px) translateX(0px) rotate(var(--rot)) scale(var(--scale)); }
          }
      `}</style>

      {/* BACKGROUND STICKERS */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-80">
          {stickers.map((sticker, index) => (
              <img
                  key={index}
                  src={`/Strickers/${sticker.src}`}
                  alt="sticker"
                  className="absolute w-12 h-12 object-contain"
                  style={{
                      top: `${sticker.top}%`,
                      left: `${sticker.left}%`,
                      // @ts-ignore
                      "--rot": `${sticker.rotation}deg`,
                      "--scale": `${sticker.scale}`,
                      animation: `float ${sticker.animationDuration} ease-in-out infinite alternate`,
                      animationDelay: sticker.animationDelay,
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
                  }}
              />
          ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
        
        {/* LOGIN SECTION */}
        <div className="space-y-8 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 animate-in fade-in zoom-in duration-500 flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-charcoal">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your existing account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Email address"
                    {...loginRegister("email", { required: "Email is required" })}
                  />
                </div>
                {loginErrors.email && <p className="mt-1 text-xs text-sprout-red">{loginErrors.email.message?.toString()}</p>}
              </div>
              <div>
                <label htmlFor="login-password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Password"
                    {...loginRegister("password", { required: "Password is required" })}
                  />
                </div>
                {loginErrors.password && <p className="mt-1 text-xs text-sprout-red">{loginErrors.password.message?.toString()}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sprout-teal focus:ring-sprout-teal border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-sprout-teal hover:text-teal-700 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-sprout-teal hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sprout-teal transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign in
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ArrowRight className="h-5 w-5 text-teal-200 group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* DIVIDER SECTION */}
        <div className="flex md:flex-col items-center justify-center gap-4 py-4 md:py-8 animate-in fade-in zoom-in duration-700">
          <div className="h-px w-full md:w-px md:h-full bg-gray-300/50"></div>
          <span className="text-gray-400 font-bold shrink-0 uppercase text-sm tracking-widest bg-sprout-bg2/80 px-2 rounded-full">Or</span>
          <div className="h-px w-full md:w-px md:h-full bg-gray-300/50"></div>
        </div>

        {/* REGISTER SECTION */}
        <div className="space-y-8 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 animate-in fade-in zoom-in duration-500 delay-100 flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-charcoal">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join us to start shopping
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="register-name" className="sr-only">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Full Name"
                    {...registerRegister("name", { required: "Name is required" })}
                  />
                </div>
                {registerErrors.name && <p className="mt-1 text-xs text-sprout-red">{registerErrors.name.message?.toString()}</p>}
              </div>
              
              <div>
                <label htmlFor="register-email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Email address"
                    {...registerRegister("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {registerErrors.email && <p className="mt-1 text-xs text-sprout-red">{registerErrors.email.message?.toString()}</p>}
              </div>
              
              <div>
                <label htmlFor="register-password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Password"
                    {...registerRegister("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                </div>
                {registerErrors.password && <p className="mt-1 text-xs text-sprout-red">{registerErrors.password.message?.toString()}</p>}
              </div>

              <div>
                <label htmlFor="register-confirmPassword" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                    placeholder="Confirm Password"
                    {...registerRegister("confirmPassword", { 
                      required: "Confirm Password is required",
                      validate: value => value === registerPassword || "Passwords do not match"
                    })}
                  />
                </div>
                {registerErrors.confirmPassword && <p className="mt-1 text-xs text-sprout-red">{registerErrors.confirmPassword.message?.toString()}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-sprout-teal hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sprout-teal transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign up
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ArrowRight className="h-5 w-5 text-teal-200 group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
