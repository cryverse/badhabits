"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../styles/theme";

export default function AddModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function handleAdd() {
    if (!name.trim()) return;

    onAdd({
      name,
      note,
    });

    setName("");
    setNote("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            style={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SHEET */}
          <motion.div
            style={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* HANDLE */}
            <div style={styles.handle} />

            {/* TITLE */}
            <div style={styles.title}>New habit</div>

            {/* INPUTS */}
            <input
              style={styles.input}
              placeholder="Habit name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* BUTTON */}
            <button style={styles.button} onClick={handleAdd}>
              Add habit
            </button>
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
    zIndex: 40,
  },

  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,

    background: theme.bg.elevated,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,

    padding: theme.spacing(5),
    zIndex: 50,
  },

  handle: {
    width: 40,
    height: 4,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    margin: "0 auto",
    marginBottom: theme.spacing(4),
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.text.primary,
    marginBottom: theme.spacing(4),
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: theme.spacing(3),

    background: theme.surface.primary,
    border: theme.border.thin,
    borderRadius: theme.radius.md,

    color: theme.text.primary,
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px 14px",

    background: theme.accent.main,
    color: "#000",
    fontWeight: 600,

    borderRadius: theme.radius.md,
    border: "none",
  },
};