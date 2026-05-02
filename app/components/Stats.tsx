type Props = {
  habits: {
    startDate: string;
  }[];
  getDays: (date: string) => number;
};

export default function Stats({ habits, getDays }: Props) {
  const total = habits.length;

  const longest = habits.length
    ? Math.max(...habits.map((h) => getDays(h.startDate)))
    : 0;

  return (
    <div style={styles.box}>
      <div>Total habits: {total}</div>
      <div>Best streak: {longest} days</div>
    </div>
  );
}

const styles = {
  box: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    background: "#111318",
    border: "1px solid rgba(255,255,255,0.05)",
  },
};