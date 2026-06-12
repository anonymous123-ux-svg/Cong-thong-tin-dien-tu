import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#f9f9ff",
        outline: "#777587",
        "tertiary-fixed-dim": "#ffb695",
        "on-tertiary-fixed-variant": "#7b2f00",
        "tertiary-container": "#a44100",
        "surface-container-lowest": "#ffffff",
        tertiary: "#7e3000",
        "on-secondary-fixed-variant": "#005321",
        "surface-container-highest": "#dce2f3",
        "on-secondary-container": "#007432",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#ffd2be",
        "on-surface-variant": "#464555",
        "surface-container": "#e7eefe",
        "outline-variant": "#c7c4d8",
        "on-primary": "#ffffff",
        "tertiary-fixed": "#ffdbcc",
        "on-surface": "#151c27",
        "secondary-fixed": "#6bff8f",
        "on-tertiary": "#ffffff",
        "inverse-on-surface": "#ebf1ff",
        secondary: "#006e2f",
        "inverse-surface": "#2a313d",
        "on-secondary-fixed": "#002109",
        "on-background": "#151c27",
        "secondary-container": "#6bff8f",
        error: "#ba1a1a",
        "on-primary-fixed": "#0f0069",
        "on-secondary": "#ffffff",
        "primary-fixed": "#e2dfff",
        "on-primary-container": "#dad7ff",
        "surface-tint": "#4d44e3",
        "surface-dim": "#d3daea",
        "surface-bright": "#f9f9ff",
        primary: "#3525cd",
        "surface-container-high": "#e2e8f8",
        "error-container": "#ffdad6",
        "inverse-primary": "#c3c0ff",
        "surface-variant": "#dce2f3",
        "surface-container-low": "#f0f3ff",
        background: "#f9f9ff",
        "secondary-fixed-dim": "#4ae176",
        "on-tertiary-fixed": "#351000",
        "primary-container": "#4f46e5",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#3323cc",
        "primary-fixed-dim": "#c3c0ff",
      },
      zIndex: {
        100: "100",
        110: "110",
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      fontFamily: {
        headline: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        body: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        label: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [forms],
};

export default config;
