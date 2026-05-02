"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={styles.backdrop}
          />

          {/* SHEET */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
            style={styles.sheet}
          >
            {/* HANDLE (iOS feel) */}
            <div style={styles.handle} />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    zIndex: 999,
  },

  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,

    background: "rgba(20,20,25,0.95)",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    padding: 16,
    paddingBottom: 30,

    boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
    zIndex: 1000,
  },

  handle: {
    width: 40,
    height: 5,
    borderRadius: 999,
    background: "rgba(255,255,255,0.2)",
    margin: "0 auto 12px",
  },
};