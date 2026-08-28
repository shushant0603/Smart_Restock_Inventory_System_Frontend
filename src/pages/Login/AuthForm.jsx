import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, HeartPulse } from "lucide-react";
import useAuthStore from "../../store/authStore";

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [workspace, setWorkspace] = useState("E1");
  
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      
      // Redirect based on selected workspace
      if (workspace === "E1") {
        navigate("/dashboard");
      } else {
        window.location.href = import.meta.env.VITE_MEDCARE_FRONTEND_URL || "http://localhost:5174";
      }
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isLogin
            ? "Sign in to manage your inventory workspace."
            : "Start managing your inventory smarter."}
        </p>
      </div>

      {/* Workspace Toggle */}
      <div className="mb-4 flex rounded-2xl bg-gray-50/50 p-1 border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        <button
          type="button"
          onClick={() => setWorkspace("E1")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl p-2 transition-all duration-300 ${
            workspace === "E1"
              ? "bg-[#5B5EFE] text-white shadow-md shadow-indigo-200"
              : "hover:bg-white text-gray-500 hover:text-gray-900"
          }`}
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${workspace === 'E1' ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
            <Package className="h-4 w-4" />
          </div>
          <div className="text-left leading-tight overflow-hidden">
            <p className={`text-xs md:text-sm font-bold whitespace-nowrap truncate ${workspace === 'E1' ? 'text-white' : 'text-gray-900'}`}>Inventory Manager</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setWorkspace("MedCare");
            window.location.href = import.meta.env.VITE_MEDCARE_FRONTEND_URL || "http://localhost:5174";
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl p-2 transition-all duration-300 ${
            workspace === "MedCare"
              ? "bg-[#5B5EFE] text-white shadow-md shadow-indigo-200"
              : "hover:bg-white text-gray-500 hover:text-gray-900"
          }`}
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${workspace === 'MedCare' ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
            <HeartPulse className="h-4 w-4" />
          </div>
          <div className="text-left leading-tight overflow-hidden">
            <p className={`text-xs md:text-sm font-bold whitespace-nowrap truncate ${workspace === 'MedCare' ? 'text-white' : 'text-gray-900'}`}>MedCare Tower</p>
          </div>
        </button>
      </div>
      
      <p className="mb-4 text-xs text-gray-500">Choose the workspace you want to open after signing in.</p>

      {(authError || formError) && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
          {formError || authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name - Signup only */}
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-800">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">
              Password
            </label>

            {isLogin && (
              <button
                type="button"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            )}
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {/* Confirm Password - Signup only */}
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        )}

        {/* Remember me */}
        {isLogin && (
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-gray-300 accent-indigo-600"
            />
            <span className="text-xs text-gray-500">
              Keep me signed in for 30 days
            </span>
          </label>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
        >
          {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
      >
        <span className="font-bold">G</span>
        Continue with Google
      </button>

      {/* Bottom toggle */}
      <p className="mt-5 text-center text-xs text-gray-500">
        {isLogin
          ? "Don't have a SmartStock account?"
          : "Already have a SmartStock account?"}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setFormError("");
          }}
          className="ml-1 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </button>
      </p>

      {/* Security */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <span className="text-green-500">✓</span>
        Your data is encrypted and secure
      </div>
    </div>
  );
}

export default AuthForm;
