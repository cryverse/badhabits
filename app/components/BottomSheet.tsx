"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({
  open,
  onClose,
  children,
}: Props) {
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
            transition={{ type: "spring", damping: 25 }}
            style={styles.sheet}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const styles = {
  backdrop: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.5)",
  },

  sheet: {
    position: "fixed" as const,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#14161c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 200,
  },
};