import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, sendOtp } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// OTP Routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", registerUser);

// Login (admin/seller/user)
router.post("/login", loginUser);

// Get user profile (protected)
router.get("/profile", protect, getProfile);

// Update user profile (protected)
router.put("/profile", protect, updateProfile);

export default router;
