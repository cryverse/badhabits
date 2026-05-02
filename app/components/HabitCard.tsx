"use client";

import { theme } from "../styles/theme";
import ProgressRing from "./ProgressRing";

export default function HabitCard({
  habit,
  index,
  onReset,
  onDelete,
  getDays,
}) {
  const days = getDays(habit.startDate);
  const progress = Math.min(100, days * 5);

  return (
    <div style={styles.card}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>{habit.name}</div>

          {habit.note && (
            <div style={styles.note}>{habit.note}</div>
          )}
        </div>

        <ProgressRing progress={progress} size={54} />
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.value}>{days}</div>
          <div style={styles.label}>days</div>
        </div>

        <div style={styles.stat}>
          <div style={styles.value}>{progress}%</div>
          <div style={styles.label}>progress</div>
        </div>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>

        <button
          style={styles.reset}
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
    background: theme.surface.primary,
    border: theme.border.thin,
    borderRadius: theme.radius.md,
    padding: theme.spacing(4),
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.text.primary,
  },

  note: {
    fontSize: 12,
    marginTop: 4,
    color: theme.text.muted,
  },

  stats: {
    display: "flex",
    gap: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },

  stat: {
    flex: 1,
  },

  value: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.text.primary,
  },

  label: {
    fontSize: 11,
    color: theme.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  actions: {
    display: "flex",
    gap: theme.spacing(2),
  },

  reset: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: theme.text.primary,
  },

  delete: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 12,
    border: "1px solid rgba(255,80,80,0.2)",
    background: "transparent",
    color: theme.status.danger,
  },
};