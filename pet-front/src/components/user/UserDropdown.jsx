import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Package, Heart, Bell, ChevronDown } from "lucide-react";

const getInitial = (user) =>
  (user?.name || user?.email || "U")[0].toUpperCase();

export default function UserDropdown({
  user,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
  dropdownItems,
  go
}) {
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button className="nb-user-btn">
        <div className="nb-avatar">{getInitial(user)}</div>
        <span className="nb-user-name">
          {user ? user.name || user.email?.split("@")[0] : "Account"}
        </span>
        <ChevronDown size={13} className={`nb-chevron${dropdownOpen ? " open" : ""}`} />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="nb-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            {user && (
              <div className="nb-dropdown-header">
                <div className="nb-dropdown-name">{user.name || "Welcome back"}</div>
                <div className="nb-dropdown-email">{user.email}</div>
              </div>
            )}

            <div className="nb-dropdown-list">
              {!user ? (
                <div
                  className="nb-dropdown-item"
                  onClick={() => { go("/login"); }}
                >
                  <div className="nb-dropdown-item-left">
                    <User size={14} /> Sign In
                  </div>
                </div>
              ) : (
                <>
                  {dropdownItems.map((item, i) => (
                    <div
                      key={i}
                      className="nb-dropdown-item"
                      onClick={() => { item.extra?.(); go(item.path); }}
                    >
                      <div className="nb-dropdown-item-left">
                        {item.icon}{item.label}
                      </div>
                      {item.count > 0 && (
                        <span className={`nb-badge ${item.countClass}`} style={{ position: "static", border: "none", minWidth: 20, height: 20 }}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="nb-dropdown-divider" />
                  <div className="nb-dropdown-item danger" onClick={handleLogout}>
                    <div className="nb-dropdown-item-left">
                      <LogOut size={14} /> Logout
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
