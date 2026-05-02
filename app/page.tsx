"use client";

import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Stats from "./components/Stats";
import HabitCard from "./components/HabitCard";
import AddModal from "./components/AddModal";

export default function Page() {
  const [habits, setHabits] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const docRef = doc(db, "user", "main");

  // ===== LOAD =====
  useEffect(() => {
    async function load() {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setHabits(snap.data().habits || []);
      }
    }

    load();
  }, []);

  // ===== SAVE =====
  async function save(updated: any[]) {
    setHabits(updated);
    await setDoc(docRef, { habits: updated });
  }

  // ===== STREAK =====
  function getDays(startDate: string) {
    const start = new Date(startDate);
    const now = new Date();
    return Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // ===== ADD =====
  function addHabit(data: { name: string; note?: string }) {
    const newHabits = [
      ...habits,
      {
        name: data.name,
        note: data.note || "",
        startDate: new Date().toISOString(),
      },
    ];

    save(newHabits);
  }

  // ===== DELETE =====
  function deleteHabit(index: number) {
    const newHabits = habits.filter((_, i) => i !== index);
    save(newHabits);
  }

  // ===== RESET =====
  function resetHabit(index: number) {
    const newHabits = [...habits];
    newHabits[index].startDate = new Date().toISOString();
    save(newHabits);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>Discipline</div>

        <button
          style={styles.addBtn}
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>

      {/* STATS */}
      <Stats habits={habits} getDays={getDays} />

      {/* LIST */}
      <div style={styles.list}>
        {habits.map((h, i) => (
          <HabitCard
            key={i}
            habit={h}
            index={i}
            onReset={resetHabit}
            onDelete={deleteHabit}
            getDays={getDays}
          />
        ))}
      </div>

      {/* MODAL */}
      <AddModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={addHabit}
      />

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0c10",
    padding: 16,
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
  },

  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontSize: 20,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
};