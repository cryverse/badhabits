"use client";

import { useEffect, useState } from "react";

import Stats from "./components/Stats";
import HabitCard from "./components/HabitCard";
import AddModal from "./components/AddModal";

type Habit = {
  name: string;
  note?: string;
  startDate: string;
};

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [open, setOpen] = useState(false);

  // =========================
  // LOAD FROM LOCALSTORAGE
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  // =========================
  // SAVE TO LOCALSTORAGE
  // =========================
  function save(data: Habit[]) {
    setHabits(data);
    localStorage.setItem("habits", JSON.stringify(data));
  }

  // =========================
  // DAYS COUNT
  // =========================
  function getDays(startDate: string) {
    return Math.floor(
      (Date.now() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  // =========================
  // ADD HABIT
  // =========================
  function addHabit(data: { name: string; note?: string }) {
    const newHabits: Habit[] = [
      ...habits,
      {
        name: data.name,
        note: data.note || "",
        startDate: new Date().toISOString(),
      },
    ];

    save(newHabits);
  }

  // =========================
  // DELETE
  // =========================
  function deleteHabit(index: number) {
    save(habits.filter((_, i) => i !== index));
  }

  // =========================
  // RESET STREAK
  // =========================
  function resetHabit(index: number) {
    const copy = [...habits];
    copy[index].startDate = new Date().toISOString();
    save(copy);
  }

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1 style={styles.title}>Habits</h1>

        <button style={styles.addBtn} onClick={() => setOpen(true)}>
          +
        </button>
      </div>

      <Stats habits={habits} getDays={getDays} />

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
    padding: 16,
    background: "#0b0c10",
    minHeight: "100vh",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
  },

  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "white",
    color: "black",
    fontSize: 20,
    border: "none",
  },

  list: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
};  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "white",
    color: "black",
    fontSize: 20,
    border: "none",
  },

  list: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
};