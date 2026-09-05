import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FAFAF8",
          card: "#FFFFFF",
          subtle: "#F4F4F0",
          elevated: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F4F4F0",
          elevated: "#FFFFFF",
          card: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#121316",
          muted: "#525866",
          subtle: "#848C9E",
        },
        primary: {
          DEFAULT: "#B4461B",
          hover: "#963813",
          foreground: "#FFFFFF",
        },
        accent: {
          gold: {
            DEFAULT: "#CBB590",
            hover: "#BAA278",
            subtle: "#F7F4EE",
          },
          fresh: {
            DEFAULT: "#1E6B52",
            hover: "#17523F",
            subtle: "#E8F3EE",
          },
        },
        border: {
          DEFAULT: "#E8E8E2",
          hover: "#C5C5BB",
        },
        ring: "#B4461B",
        destructive: {
          DEFAULT: "#C92A2A",
          bg: "#FDF2F2",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#1E6B52",
          bg: "#E8F3EE",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["var(--font-work-sans)", "Work Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Space Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(18, 19, 22, 0.04), 0 1px 2px rgba(18, 19, 22, 0.02)",
        card: "0 4px 20px -2px rgba(18, 19, 22, 0.05), 0 2px 6px -1px rgba(18, 19, 22, 0.02)",
        elevated: "0 12px 36px -4px rgba(18, 19, 22, 0.08), 0 4px 12px -2px rgba(18, 19, 22, 0.04)",
        modal: "0 24px 48px -8px rgba(18, 19, 22, 0.12), 0 8px 16px -4px rgba(18, 19, 22, 0.04)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
