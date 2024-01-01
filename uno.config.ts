import presetTheme from "unocss-preset-theme";
import {
  defineConfig,
  presetIcons,
  presetAttributify,
  presetWebFonts,
  presetUno,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: "Satoshi",
      },
    }),
    presetIcons({
      collections: {
        ant: () =>
          import("@iconify-json/ant-design/icons.json").then((i) => i.default),
      },
    }),
    presetTheme({
      theme: {
        dark: {
          colors: {
            text: "#feffe5",
            background: "#0a0900",
            primary: "#fff01f",
            secondary: "#27261b",
            accent: "#ff3d40",
          },
        },
      },
    }) as any,
  ],
  theme: {
    colors: {
      text: "#0a0900",
      background: "#feffe5",
      primary: "#e0d100",
      secondary: "#e4e3d8",
      accent: "#c20003",
    },
  },
  safelist: [
    // Potential solution to dynamically set icons
    "i-ant-caret-up-filled",
    "i-ant-caret-left-filled",
    "i-ant-caret-down-filled",
    "i-ant-caret-right-filled",

    "opacity-25",
    "text-background",
    "bg-primary",
  ],
});
