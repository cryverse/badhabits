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

  useEffect(() => {
    async function load() {
      const snap = await getDoc(docRef);
      if (snap.exists()) setHabits(snap.data().habits || []);
    }
    load();
  }, []);

  async function save(data: any[]) {
    setHabits(data);
    await setDoc(docRef, { habits: data });
  }

  function getDays(startDate: string) {
    return Math.floor(
      (Date.now() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

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

  function deleteHabit(index: number) {
    save(habits.filter((_, i) => i !== index));
  }

  function resetHabit(index: number) {
    const copy = [...habits];
    copy[index].startDate = new Date().toISOString();
    save(copy);
  }

  return (
    <div style={{ padding: 16, color: "white", background: "#0b0c10", minHeight: "100vh" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Habits</h1>
        <button onClick={() => setOpen(true)}>+</button>
      </div>

      <Stats habits={habits} getDays={getDays} />

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

      <AddModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
}