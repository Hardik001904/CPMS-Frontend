import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../services/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send, ShieldCheck, RefreshCw } from "lucide-react";

export default function ForgotPassword() {
  // step: "email" | "otp"
  const [step, setStep] = useState("email");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ── Step 1: Email form ─────────────────────────────────────────────────────
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(`/auth/forgot-password`, {
          email: values.email,
        });
        toast.success(res.data.message || "OTP sent to your email!");
        setSubmittedEmail(values.email);
        setStep("otp");
        startResendCooldown();
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ── Resend cooldown (60 seconds) ───────────────────────────────────────────
  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    try {
      await axios.post(`/auth/forgot-password`, { email: submittedEmail });
      toast.success("New OTP sent!");
      setOtp(["", "", "", "", "", ""]);
      startResendCooldown();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  }

  // ── OTP input handlers ─────────────────────────────────────────────────────
  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return; // only single digit
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  }

  // ── Step 2: Verify OTP ─────────────────────────────────────────────────────
  async function handleVerifyOtp() {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await axios.post(`/auth/verify-otp`, {
        email: submittedEmail,
        otp: otpValue,
      });
      toast.success("OTP verified!");
      const { resetToken } = res.data;
      navigate(`/reset-password/${resetToken}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {step === "email" ? (
            <>
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 mx-auto mb-6">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>

              <h1 className="text-2xl font-bold text-white text-center mb-1">
                Forgot Password?
              </h1>
              <p className="text-gray-400 text-sm text-center mb-8">
                Enter your email and we'll send you a 6-digit OTP.
              </p>

              <form onSubmit={emailFormik.handleSubmit} className="space-y-5">
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
                      value={emailFormik.values.email}
                      onChange={emailFormik.handleChange}
                      onBlur={emailFormik.handleBlur}
                      className={`w-full bg-gray-800 text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors
                        ${
                          emailFormik.touched.email && emailFormik.errors.email
                            ? "border-red-500 focus:border-red-400"
                            : "border-gray-700 focus:border-indigo-500"
                        }`}
                    />
                  </div>
                  {emailFormik.touched.email && emailFormik.errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {emailFormik.errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={emailFormik.isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  {emailFormik.isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send OTP
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* OTP Step */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 mx-auto mb-6">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>

              <h1 className="text-2xl font-bold text-white text-center mb-1">
                Enter OTP
              </h1>
              <p className="text-gray-400 text-sm text-center mb-2">
                We sent a 6-digit code to
              </p>
              <p className="text-indigo-400 text-sm font-medium text-center mb-8">
                {submittedEmail}
              </p>

              {/* OTP Boxes */}
              <div
                className="flex justify-center gap-3 mb-6"
                onPaste={handleOtpPaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-11 h-13 text-center text-xl font-bold bg-gray-800 text-white border rounded-xl outline-none transition-colors
                      ${digit ? "border-indigo-500" : "border-gray-700"}
                      focus:border-indigo-400`}
                    style={{ height: "52px" }}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOtp}
                disabled={otpLoading || otp.join("").length !== 6}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-4"
              >
                {otpLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Verify OTP
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {resendCooldown > 0
                    ? `Resend OTP in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>
              </div>

              {/* Change email */}
              <div className="mt-3 text-center">
                <button
                  onClick={() => {
                    setStep("email");
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Wrong email? Go back
                </button>
              </div>
            </>
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
