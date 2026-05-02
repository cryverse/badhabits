"use client";

import { theme } from "../styles/theme";

export default function Stats({ habits, getDays }) {
  const streaks = habits.map((h) => getDays(h.startDate));

  const currentStreak = streaks.length ? Math.max(...streaks) : 0;
  const totalHabits = habits.length;

  const avgStreak = streaks.length
    ? Math.round(streaks.reduce((a, b) => a + b, 0) / streaks.length)
    : 0;

  const disciplineScore = Math.min(100, currentStreak * 5 + totalHabits * 3);

  return (
    <div style={styles.wrapper}>

      {/* GRID */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <div style={styles.value}>{currentStreak}</div>
          <div style={styles.label}>current streak</div>
        </div>

        <div style={styles.card}>
          <div style={styles.value}>{avgStreak}</div>
          <div style={styles.label}>avg streak</div>
        </div>

        <div style={styles.card}>
          <div style={styles.value}>{totalHabits}</div>
          <div style={styles.label}>habits</div>
        </div>

        <div style={styles.card}>
          <div style={styles.value}>{disciplineScore}</div>
          <div style={styles.label}>score</div>
        </div>

      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: theme.spacing(4),
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(3),
  },

  card: {
    background: theme.surface.primary,
    border: theme.border.thin,
    borderRadius: theme.radius.md,
    padding: theme.spacing(4),
  },

  value: {
    fontSize: 20,
    fontWeight: 600,
    color: theme.text.primary,
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    color: theme.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
};