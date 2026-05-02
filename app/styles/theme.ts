export const theme = {
  // ===== BACKGROUND =====
  bg: {
    base: "#0b0c10",
    elevated: "#11131a",
  },

  // ===== SURFACES (КАРТОЧКИ) =====
  surface: {
    primary: "rgba(255,255,255,0.03)",
    hover: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.06)",
  },

  // ===== TEXT =====
  text: {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.7)",
    muted: "rgba(255,255,255,0.45)",
  },

  // ===== ACCENT (1 ЦВЕТ = ПРАВИЛО APPLE) =====
  accent: {
    main: "#00ff88",
    soft: "rgba(0,255,136,0.15)",
  },

  // ===== STATUS =====
  status: {
    danger: "#ff4d4d",
    warning: "#ffb020",
  },

  // ===== BORDER SYSTEM =====
  border: {
    thin: "1px solid rgba(255,255,255,0.06)",
  },

  // ===== RADIUS (iOS STYLE) =====
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  // ===== SPACING SYSTEM (КРИТИЧНО) =====
  spacing: (n: number) => n * 4,

  // ===== SHADOW (МИНИМАЛЬНЫЙ) =====
  shadow: {
    soft: "0 10px 30px rgba(0,0,0,0.25)",
  },

  // ===== ANIMATION =====
  motion: {
    fast: "150ms",
    normal: "250ms",
    smooth: "400ms",
  },
};