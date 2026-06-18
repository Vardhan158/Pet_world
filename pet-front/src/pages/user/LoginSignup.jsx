import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/utils/axiosInstance";

import Dog1 from "../../assets/Dog1.jpg";
import Cat from "../../assets/Cat.jpg";
import Bird from "../../assets/Bird.jpg";
import Fish from "../../assets/Fish.jpg";

if (!document.head.querySelector("[href*='Poppins']")) {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const SLIDES = [
  { img: Dog1, title: "Shop for Happy Paws", sub: "Find your perfect furry companion", badge: "Dogs" },
  { img: Cat, title: "Cozy Cats, Warm Hearts", sub: "Adopt a purring bundle of joy", badge: "Cats" },
  { img: Bird, title: "Chirpy Companions", sub: "Brighten your home with birdsong", badge: "Birds" },
  { img: Fish, title: "Dive into Pet Joy", sub: "Explore aquatic wonders", badge: "Fish" },
];

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    background: "linear-gradient(135deg, #eef2ff 0%, #faf5ff 45%, #eff6ff 100%)",
    fontFamily: "'Poppins', sans-serif",
  },
  mediaPanel: {
    padding: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaFrame: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 56px)",
    borderRadius: 28,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(79, 70, 229, 0.18)",
  },
  mediaOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.7) 100%)",
    zIndex: 1,
  },
  authPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 24px",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(196, 181, 253, 0.7)",
    borderRadius: 28,
    padding: "34px 30px 28px",
    boxShadow: "0 18px 46px rgba(99,102,241,0.12)",
  },
  logo: {
    width: 48,
    height: 48,
    margin: "0 auto 14px",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: 22,
    boxShadow: "0 10px 22px rgba(99,102,241,0.26)",
  },
  title: {
    margin: 0,
    textAlign: "center",
    color: "#1e1b4b",
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    margin: "8px 0 22px",
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
  },
  tabs: {
    display: "flex",
    gap: 6,
    padding: 5,
    borderRadius: 16,
    background: "#f5f3ff",
    border: "1px solid #e9d5ff",
    marginBottom: 22,
  },
  tab: (active) => ({
    flex: 1,
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    background: active ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
    color: active ? "#fff" : "#7c3aed",
    boxShadow: active ? "0 8px 20px rgba(99,102,241,0.25)" : "none",
  }),
  field: { marginBottom: 14 },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6366f1",
  },
  input: {
    width: "100%",
    height: 46,
    borderRadius: 14,
    border: "1.5px solid #ddd6fe",
    background: "#fafaff",
    padding: "0 14px",
    fontSize: 14,
    color: "#1f2937",
    outline: "none",
    boxSizing: "border-box",
  },
  otpInput: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    border: "1.5px solid #c4b5fd",
    background: "#fcfbff",
    padding: "0 16px",
    fontSize: 24,
    letterSpacing: "0.55em",
    textAlign: "center",
    fontWeight: 700,
    color: "#4c1d95",
    outline: "none",
    boxSizing: "border-box",
  },
  submit: (loading) => ({
    width: "100%",
    height: 48,
    border: "none",
    borderRadius: 14,
    cursor: loading ? "not-allowed" : "pointer",
    background: loading ? "#c4b5fd" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: loading ? "none" : "0 12px 24px rgba(99,102,241,0.28)",
  }),
  helperRow: {
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    fontSize: 12,
    color: "#64748b",
  },
  textButton: {
    background: "none",
    border: "none",
    color: "#6d28d9",
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    fontSize: 12,
  },
};

const focusIn = (e) => {
  e.target.style.border = "1.5px solid #8b5cf6";
  e.target.style.boxShadow = "0 0 0 4px rgba(139,92,246,0.12)";
  e.target.style.background = "#fff";
};

const focusOut = (e) => {
  e.target.style.border = "1.5px solid #ddd6fe";
  e.target.style.boxShadow = "none";
  e.target.style.background = "#fafaff";
};

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return undefined;
    const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const slide = SLIDES[currentSlide];

  const resetSignupFlow = () => {
    setOtp("");
    setOtpStep(false);
    setResendTimer(0);
  };

  const resetAll = () => {
    setFormData({ name: "", email: "", password: "" });
    resetSignupFlow();
    setShowPass(false);
  };

  const handleTabChange = (loginMode) => {
    setIsLogin(loginMode);
    resetAll();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleAuthSuccess = (data, message) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    login(data);
    toast.success(message);

    setTimeout(() => {
      if (data.role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (data.role === "seller") navigate("/seller/dashboard", { replace: true });
      else navigate("/", { replace: true });
    }, 1000);
  };

  const handleSendOtp = async () => {
    await axiosInstance.post("/auth/send-otp", {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    });

    setOtpStep(true);
    setResendTimer(60);
    toast.success(`OTP sent to ${formData.email.trim()}`);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    const { data } = await axiosInstance.post("/auth/verify-otp", {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      otp,
    });

    if (!data?.token) {
      throw new Error("Invalid server response");
    }

    handleAuthSuccess(data, "Account created successfully!");
    resetAll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim() || (!isLogin && !formData.name.trim())) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await axiosInstance.post("/auth/login", {
          email: formData.email.trim(),
          password: formData.password.trim(),
        });

        if (!data?.token) throw new Error("Invalid server response");
        handleAuthSuccess(data, "Welcome back!");
      } else if (otpStep) {
        await handleVerifyOtp();
      } else {
        await handleSendOtp();
      }
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        (status === 401
          ? "Invalid email or password"
          : status === 409
            ? "Account already exists"
            : "Something went wrong. Please try again.");
      toast.error(message);
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await handleSendOtp();
      setOtp("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const submitLabel = isLogin
    ? "Sign In"
    : otpStep
      ? "Verify OTP & Create Account"
      : "Send OTP";

  const subtitle = isLogin
    ? "Sign in to continue to PetWorld"
    : otpStep
      ? `Enter the 6-digit code sent to ${formData.email}`
      : "Create your account and verify it with OTP";

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .pet-auth-page {
            grid-template-columns: 1fr !important;
          }
          .pet-auth-media {
            padding: 20px 20px 0 !important;
          }
          .pet-auth-media-frame {
            height: 280px !important;
          }
        }
      `}</style>

      <div className="pet-auth-page" style={styles.page}>
        <div className="pet-auth-media" style={styles.mediaPanel}>
          <div className="pet-auth-media-frame" style={styles.mediaFrame}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slide.img}
                alt={slide.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div style={styles.mediaOverlay} />

            <div style={{ position: "absolute", top: 20, left: 20, zIndex: 2, display: "flex", gap: 6 }}>
              {SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === currentSlide ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    background: idx === currentSlide ? "#c4b5fd" : "rgba(255,255,255,0.45)",
                    transition: "width 0.25s ease",
                  }}
                />
              ))}
            </div>

            <div style={{ position: "absolute", top: 20, right: 20, zIndex: 2, padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", fontSize: 12, fontWeight: 700 }}>
              {slide.badge}
            </div>

            <div style={{ position: "absolute", left: 24, right: 24, bottom: 24, zIndex: 2 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd6fe", marginBottom: 8 }}>PetWorld</div>
              <h2 style={{ margin: 0, color: "#fff", fontSize: 30, lineHeight: 1.1 }}>{slide.title}</h2>
              <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.82)", fontSize: 14 }}>{slide.sub}</p>
            </div>
          </div>
        </div>

        <div style={styles.authPanel}>
          <div style={styles.card}>
            <div style={styles.logo}>P</div>
            <h1 style={styles.title}>{isLogin ? "Welcome Back" : otpStep ? "Verify Your Email" : "Create Account"}</h1>
            <p style={styles.subtitle}>{subtitle}</p>

            <div style={styles.tabs}>
              <button type="button" style={styles.tab(isLogin)} onClick={() => handleTabChange(true)}>
                Sign In
              </button>
              <button type="button" style={styles.tab(!isLogin)} onClick={() => handleTabChange(false)}>
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && !otpStep && (
                <div style={styles.field}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="e.g. Ravi Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
              )}

              <div style={styles.field}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={focusIn}
                  onBlur={focusOut}
                  disabled={otpStep && !isLogin}
                />
              </div>

              {!isLogin && otpStep ? (
                <div style={styles.field}>
                  <label style={styles.label}>Enter OTP</label>
                  <input
                    style={styles.otpInput}
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              ) : (
                <div style={{ ...styles.field, position: "relative" }}>
                  <label style={styles.label}>Password</label>
                  <input
                    style={styles.input}
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    style={{ position: "absolute", right: 14, top: 35, border: "none", background: "none", color: "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                style={styles.submit(loading)}
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
              >
                {loading ? "Please wait..." : submitLabel}
              </motion.button>
            </form>

            {!isLogin && otpStep && (
              <div style={styles.helperRow}>
                <span>Didn't get the code?</span>
                <button
                  type="button"
                  style={{ ...styles.textButton, color: resendTimer > 0 ? "#a5b4fc" : "#6d28d9", cursor: resendTimer > 0 || loading ? "not-allowed" : "pointer" }}
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || loading}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>
            )}

            <div style={{ ...styles.helperRow, justifyContent: "center", marginTop: 20 }}>
              <span>{isLogin ? "Don't have an account?" : otpStep ? "Need to edit your signup details?" : "Already a member?"}</span>
              <button
                type="button"
                style={styles.textButton}
                onClick={() => {
                  if (!isLogin && otpStep) {
                    resetSignupFlow();
                    return;
                  }
                  handleTabChange(!isLogin);
                }}
              >
                {isLogin ? "Sign Up" : otpStep ? "Back" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
