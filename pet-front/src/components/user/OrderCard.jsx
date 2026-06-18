import React from "react";
import { motion } from "framer-motion";

export default function OrderCard({ order, idx, getOrderStatus, getPaymentStatus, S }) {
  const item     = order.items?.[0];
  const pet      = item?.pet;
  const qty      = item?.quantity || 1;
  const addr     = order.address || {};
  const addrStr  = [addr.house, addr.area, addr.city, addr.pincode].filter(Boolean).join(", ") || "No address";
  const oStatus  = getOrderStatus(order.orderStatus);
  const isCOD    = order.paymentMethod === "Cash on Delivery";
  const pLabel   = isCOD ? "COD" : (order.paymentStatus || "Pending");
  const pStatus  = getPaymentStatus(isCOD ? "COD" : pLabel);

  return (
    <motion.div
      style={S.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.07, duration: 0.38 }}
      whileHover={{ boxShadow: "0 8px 28px rgba(99,102,241,0.13)", transform: "translateY(-2px)" }}
    >
      {/* Top bar */}
      <div style={S.cardTop}>
        <span style={S.orderIdText}>
          🧾 Order #{(order._id || idx + 1).toString().slice(-6).toUpperCase()}
        </span>
        <div style={S.cardTopRight}>
          <span style={S.pill(oStatus)}>
            <span style={S.pillDot(oStatus)} />
            {order.orderStatus || "Pending"}
          </span>
          <span style={S.pill(pStatus)}>{pLabel}</span>
        </div>
      </div>

      <div style={S.cardBody}>
        {/* Pet row */}
        <div style={S.petRow}>
          <div style={S.petImgWrap}>
            <img
              src={pet?.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
              alt={pet?.name || "pet"}
              style={S.petImg}
            />
          </div>
          <div>
            <p style={S.petName}>
              {pet?.name || "Unknown Pet"}
              {qty > 1 && <span style={S.qtyBadge}>× {qty}</span>}
            </p>
            <p style={S.petCat}>{pet?.category || "Pet"}</p>
          </div>
          <p style={S.petPrice}>₹{order.totalAmount?.toLocaleString() || 0}</p>
        </div>

        {/* Info grid */}
        <div style={S.infoGrid}>
          <div style={S.infoCell}>
            <p style={S.infoLabel}>📍 Delivery Address</p>
            <p style={S.infoVal}>{addr.name || "Customer"}</p>
            <p style={S.infoMuted}>{addrStr}</p>
          </div>
          <div style={S.infoCell}>
            <p style={S.infoLabel}>💳 Payment Method</p>
            <p style={S.infoVal}>{order.paymentMethod || "—"}</p>
          </div>
          <div style={{ ...S.infoCell, borderRight: "none" }}>
            <p style={S.infoLabel}>📅 Order Date</p>
            <p style={S.infoVal}>
              {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
