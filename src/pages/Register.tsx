import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Lock, Mail, User, ArrowRight } from "lucide-react";

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    // TODO: implement register logic
  };

  const password = watch("password");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 animate-in fade-in zoom-in duration-500">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-charcoal">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/login" className="font-medium text-sprout-teal hover:text-teal-700 transition-colors">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-sprout-red">{errors.name.message?.toString()}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                  placeholder="Email address"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-sprout-red">{errors.email.message?.toString()}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                  placeholder="Password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-sprout-red">{errors.password.message?.toString()}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none rounded-xl relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-charcoal focus:outline-none focus:ring-2 focus:ring-sprout-teal focus:border-transparent sm:text-sm transition-all"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { 
                    required: "Confirm Password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-sprout-red">{errors.confirmPassword.message?.toString()}</p>}
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
  );
}
