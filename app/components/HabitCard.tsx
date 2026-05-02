"use client";

import { theme } from "../styles/theme";
import ProgressRing from "./ProgressRing";

type Props = {
  habit: {
    name: string;
    note?: string;
    startDate: string;
  };
  index: number;
  onReset: (i: number) => void;
  onDelete: (i: number) => void;
  getDays: (date: string) => number;
};

export default function HabitCard({
  habit,
  index,
  onReset,
  onDelete,
  getDays,
}: Props) {
  const days = getDays(habit.startDate);
  const progress = Math.min(100, days * 5);

  return (
    <div style={styles.card}>

      <div style={styles.header}>
        <div>
          <div style={styles.title}>{habit.name}</div>
          {habit.note && <div style={styles.note}>{habit.note}</div>}
        </div>

        <ProgressRing progress={progress} size={54} />
      </div>

      <div style={styles.stats}>
        <div>
          <div style={styles.value}>{days}</div>
          <div style={styles.label}>days</div>
        </div>

        <div>
          <div style={styles.value}>{progress}%</div>
          <div style={styles.label}>progress</div>
        </div>
      </div>

      <div style={styles.actions}>
        <button
          style={styles.btn}
          onClick={(e) => {
            e.stopPropagation();
            onReset(index);
          }}
        >
          reset
        </button>

        <button
          style={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
        >
          delete
        </button>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "#14161c",
    borderRadius: 16,
    padding: 16,
    border: "1px solid rgba(255,255,255,0.06)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
  },

  note: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },

  stats: {
    display: "flex",
    gap: 20,
    marginBottom: 12,
  },

  value: {
    fontSize: 18,
    fontWeight: 600,
  },

  label: {
    fontSize: 10,
    opacity: 0.5,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
  },

  delete: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    background: "transparent",
    border: "1px solid rgba(255,80,80,0.3)",
    color: "#ff4d4d",
  },
};