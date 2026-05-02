"use client";

import { useState } from "react";
import { theme } from "../styles/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; note?: string }) => void;
};

export default function AddModal({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  if (!open) return null;

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
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div style={styles.title}>Add Habit</div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit name"
          style={styles.input}
        />

        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional)"
          style={styles.input}
        />

        <button style={styles.button} onClick={handleAdd}>
          Add
        </button>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: "90%",
    maxWidth: 360,
    background: "#14161c",
    borderRadius: 16,
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0e0f13",
    color: "#fff",
  },

  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    background: "#ffffff",
    color: "#000",
    fontWeight: 600,
  },
};