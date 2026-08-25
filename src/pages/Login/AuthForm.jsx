import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
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
      navigate("/dashboard");
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        <p className="mt-2 text-gray-500">
          {isLogin
            ? "Sign in to manage your inventory workspace."
            : "Start managing your inventory smarter."}
        </p>
      </div>

      {/* Login / Signup Toggle */}
      <div className="mb-8 flex rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => {
            setIsLogin(true);
            setFormError("");
          }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
            isLogin
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLogin(false);
            setFormError("");
          }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
            !isLogin
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Create account
        </button>
      </div>

      {(authError || formError) && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {formError || authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name - Signup only */}
        {!isLogin && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              placeholder="John Doe"
              className="
                w-full rounded-xl border border-gray-200
                bg-gray-50 px-4 py-3.5
                text-gray-900 outline-none
                placeholder:text-gray-400
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
              "
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="
              w-full rounded-xl border border-gray-200
              bg-gray-50 px-4 py-3.5
              text-gray-900 outline-none
              placeholder:text-gray-400
              transition
              focus:border-indigo-500
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
            "
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">
              Password
            </label>

            {isLogin && (
              <button
                type="button"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
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
            className="
              w-full rounded-xl border border-gray-200
              bg-gray-50 px-4 py-3.5
              text-gray-900 outline-none
              placeholder:text-gray-400
              transition
              focus:border-indigo-500
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
            "
          />
        </div>

        {/* Confirm Password - Signup only */}
        {!isLogin && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Confirm your password"
              className="
                w-full rounded-xl border border-gray-200
                bg-gray-50 px-4 py-3.5
                text-gray-900 outline-none
                placeholder:text-gray-400
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
              "
            />
          </div>
        )}

        {/* Remember me */}
        {isLogin && (
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
            />
            <span className="text-sm text-gray-500">
              Keep me signed in for 30 days
            </span>
          </label>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-xl
            bg-indigo-600
            py-3.5
            font-semibold
            text-white
            shadow-lg shadow-indigo-600/20
            transition-all
            hover:bg-indigo-700
            hover:shadow-xl
            hover:shadow-indigo-600/25
            active:scale-[0.99]
            disabled:opacity-70 disabled:hover:scale-100
          "
        >
          {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="
          flex w-full items-center justify-center
          gap-3 rounded-xl
          border border-gray-200
          bg-white
          py-3.5
          font-semibold
          text-gray-800
          transition
          hover:bg-gray-50
        "
      >
        <span className="font-bold">G</span>
        Continue with Google
      </button>

      {/* Bottom toggle */}
      <p className="mt-7 text-center text-sm text-gray-500">
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
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
        <span className="text-green-500">✓</span>
        Your data is encrypted and secure
      </div>
    </div>
  );
}

export default AuthForm;