module.exports = {
    content: ["./src/**/*.{njk,html}"],
    theme: { extend: {} },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        { light: { primary: "#3b82f6", secondary: "#6b7280", accent: "#f59e0b", neutral: "#191D24", "base-100": "#ffffff", "base-200": "#f3f4f6", "base-300": "#e5e7eb" } },
        { dark: { primary: "#3b82f6", secondary: "#9ca3af", accent: "#f59e0b", neutral: "#191D24", "base-100": "#1f2937", "base-200": "#111827", "base-300": "#0f172a" } },
      ],
      darkTheme: "dark",
    },
  };