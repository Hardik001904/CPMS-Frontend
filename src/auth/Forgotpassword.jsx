import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../services/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(`${API_URL}/auth/forgot-password`, {
          email: values.email,
        });
        toast.success(res.data.message || "Reset link sent!");
        setSubmitted(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 mx-auto mb-6">
            <Mail className="w-6 h-6 text-indigo-400" />
          </div>

          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-1">
                Forgot Password?
              </h1>
              <p className="text-gray-400 text-sm text-center mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-800 text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors
                        ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500 focus:border-red-400"
                            : "border-gray-700 focus:border-indigo-500"
                        }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">{formik.errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  {formik.isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">

              <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                If an account exists for{" "}
                <span className="text-indigo-400 font-medium">{formik.values.email}</span>,
                a password reset link has been sent. It expires in 1 hour.
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}