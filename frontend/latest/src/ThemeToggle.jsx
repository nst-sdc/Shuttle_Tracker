import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      style={{
        border: "none",
        outline: "none",
        background: "var(--toggle-bg)",
        borderRadius: "2em",
        width: "56px",
        height: "32px",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s"
      }}
      aria-label="Toggle dark mode"
    >
      <span
        style={{
          position: "absolute",
          left: dark ? "28px" : "4px",
          top: "4px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: dark ? "#222" : "#ffd700",
          boxShadow: dark
            ? "0 0 8px 2px #222"
            : "0 0 8px 2px #ffd700",
          transition: "left 0.3s, background 0.3s, box-shadow 0.3s"
        }}
      >
        {dark ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff0">
            <circle cx="12" cy="12" r="5" />
            <g>
              <line x1="12" y1="1" x2="12" y2="3" stroke="#ff0" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="#ff0" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#ff0" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#ff0" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="#ff0" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="#ff0" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#ff0" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#ff0" strokeWidth="2" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;