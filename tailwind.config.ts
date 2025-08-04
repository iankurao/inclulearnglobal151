import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tremor colors
        tremor: {
          brand: {
            faint: "hsl(var(--tremor-brand-faint))",
            muted: "hsl(var(--tremor-brand-muted))",
            subtle: "hsl(var(--tremor-brand-subtle))",
            DEFAULT: "hsl(var(--tremor-brand))",
            emphasis: "hsl(var(--tremor-brand-emphasis))",
            inverted: "hsl(var(--tremor-brand-inverted))",
          },
          background: {
            pattern: "hsl(var(--tremor-background-pattern))",
            muted: "hsl(var(--tremor-background-muted))",
            subtle: "hsl(var(--tremor-background-subtle))",
            DEFAULT: "hsl(var(--tremor-background))",
            emphasis: "hsl(var(--tremor-background-emphasis))",
          },
          border: {
            DEFAULT: "hsl(var(--tremor-border))",
          },
          ring: {
            DEFAULT: "hsl(var(--tremor-ring))",
          },
          content: {
            subtle: "hsl(var(--tremor-content-subtle))",
            DEFAULT: "hsl(var(--tremor-content))",
            emphasis: "hsl(var(--tremor-content-emphasis))",
            strong: "hsl(var(--tremor-content-strong))",
            inverted: "hsl(var(--tremor-content-inverted))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
