import { type CSSProperties, useState } from "react";

export interface Label {
  label: string;
}

export interface Icon {
  /** Ant design icon from @iconify-json/ant-design. Should not have prefixes like "i-ant-". */
  icon: string;
}

export interface Key {
  /** Key, should be uppercase. */
  key: string | [string, string];
  /**
   * Considered a multiplier for responsive keyboard.
   * @see {@link https://intercom.help/omnitype/en/articles/5121683-keycap-sizes Keycap sizes}
   */
  size: number;
  style?: CSSProperties;
  display?: Label | Icon;
  empty: false;
  /** A click state. Used to show the active key click. */
  active?: boolean;
  /** Whether key was clicked or not. */
  checked?: boolean;
}

export interface Space {
  size: number;
  empty: true;
}

// Two-dimensional array to create a somewhat matrix.
export type Layout = (Key | Space)[][];

/** Returns 2D keyboard array with all necessary information. */
export function useKeyboard() {
  const bottomLeft: CSSProperties = {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  };
  const bottomRight: CSSProperties = {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  };

  const [layout80, setLayout80] = useState<Layout>([
    [
      {
        key: "ESCAPE",
        size: 1,
        empty: false,
        display: { label: "esc" },
        style: bottomLeft,
      },
      { size: 1, empty: true },
      { key: "F1", size: 1, empty: false },
      { key: "F2", size: 1, empty: false },
      { key: "F3", size: 1, empty: false },
      { key: "F4", size: 1, empty: false },
      { size: 0.5, empty: true },
      { key: "F5", size: 1, empty: false },
      { key: "F6", size: 1, empty: false },
      { key: "F7", size: 1, empty: false },
      { key: "F8", size: 1, empty: false },
      { size: 0.5, empty: true },
      { key: "F9", size: 1, empty: false },
      { key: "F10", size: 1, empty: false },
      { key: "F11", size: 1, empty: false },
      { key: "F12", size: 1, empty: false },
      { size: 0.25, empty: true },
      {
        key: "PRINTSCREEN",
        size: 1,
        empty: false,
        display: { label: "print\nscreen" },
      },
      {
        key: "SCROLLLOCK",
        size: 1,
        empty: false,
        display: { label: "scroll\nlock" },
      },
      {
        key: ["MEDIAPLAYPAUSE", "PAUSE"],
        size: 1,
        empty: false,
        display: { label: "pause" },
      },
    ],
    [
      { key: ["`", "~"], size: 1, empty: false },
      { key: ["1", "!"], size: 1, empty: false },
      { key: ["2", "@"], size: 1, empty: false },
      { key: ["3", "#"], size: 1, empty: false },
      { key: ["4", "$"], size: 1, empty: false },
      { key: ["5", "%"], size: 1, empty: false },
      { key: ["6", "^"], size: 1, empty: false },
      { key: ["7", "&"], size: 1, empty: false },
      { key: ["8", "*"], size: 1, empty: false },
      { key: ["9", "("], size: 1, empty: false },
      { key: ["0", ")"], size: 1, empty: false },
      { key: ["-", "_"], size: 1, empty: false },
      { key: ["=", "+"], size: 1, empty: false },
      {
        key: "BACKSPACE",
        size: 2,
        empty: false,
        display: { label: "backspace" },
        style: bottomRight,
      },
      { size: 0.25, empty: true },
      {
        key: "INSERT",
        size: 1,
        empty: false,
        display: { label: "insert" },
      },
      {
        key: "HOME",
        size: 1,
        empty: false,
        display: { label: "home" },
      },
      {
        key: "PAGEUP",
        size: 1,
        empty: false,
        display: { label: "page\nup" },
      },
    ],
    [
      {
        key: "TAB",
        size: 1.5,
        empty: false,
        display: { label: "tab" },
        style: bottomLeft,
      },
      { key: "Q", size: 1, empty: false },
      { key: "W", size: 1, empty: false },
      { key: "E", size: 1, empty: false },
      { key: "R", size: 1, empty: false },
      { key: "T", size: 1, empty: false },
      { key: "Y", size: 1, empty: false },
      { key: "U", size: 1, empty: false },
      { key: "I", size: 1, empty: false },
      { key: "O", size: 1, empty: false },
      { key: "P", size: 1, empty: false },
      { key: ["[", "{"], size: 1, empty: false },
      { key: ["]", "}"], size: 1, empty: false },
      { key: ["\\", "|"], size: 1.5, empty: false },
      { size: 0.25, empty: true },
      {
        key: "DELETE",
        size: 1,
        empty: false,
        display: { label: "delete" },
      },
      {
        key: "END",
        size: 1,
        empty: false,
        display: { label: "end" },
      },
      {
        key: "PAGEDOWN",
        size: 1,
        empty: false,
        display: { label: "page\ndown" },
      },
    ],
    [
      {
        key: "CAPSLOCK",
        size: 1.75,
        empty: false,
        display: { label: "caps lock" },
        style: bottomLeft,
      },
      { key: "A", size: 1, empty: false },
      { key: "S", size: 1, empty: false },
      { key: "D", size: 1, empty: false },
      { key: "F", size: 1, empty: false },
      { key: "G", size: 1, empty: false },
      { key: "H", size: 1, empty: false },
      { key: "J", size: 1, empty: false },
      { key: "K", size: 1, empty: false },
      { key: "L", size: 1, empty: false },
      { key: [";", ":"], size: 1, empty: false },
      { key: ["'", '"'], size: 1, empty: false },
      {
        key: "ENTER",
        size: 2.25,
        empty: false,
        display: { label: "enter" },
        style: bottomRight,
      },
      { size: 3.25, empty: true },
    ],
    [
      {
        key: "SHIFT",
        size: 2.25,
        empty: false,
        display: { label: "shift" },
        style: bottomLeft,
      },
      { key: "Z", size: 1, empty: false },
      { key: "X", size: 1, empty: false },
      { key: "C", size: 1, empty: false },
      { key: "V", size: 1, empty: false },
      { key: "B", size: 1, empty: false },
      { key: "N", size: 1, empty: false },
      { key: "M", size: 1, empty: false },
      { key: [",", "<"], size: 1, empty: false },
      { key: [".", ">"], size: 1, empty: false },
      { key: ["/", "?"], size: 1, empty: false },
      {
        key: "SHIFT",
        size: 2.75,
        empty: false,
        display: { label: "shift" },
        style: bottomRight,
      },
      { size: 1.25, empty: true },
      {
        key: "ARROWUP",
        size: 1,
        empty: false,
        display: { icon: "caret-up-filled" },
      },
      { size: 1, empty: true },
    ],
    [
      {
        key: "CONTROL",
        size: 1.25,
        empty: false,
        display: { label: "control" },
        style: bottomLeft,
      },
      {
        key: "META",
        size: 1.25,
        empty: false,
        display: { label: "meta" },
        style: bottomRight,
      },
      {
        key: "ALT",
        size: 1.25,
        empty: false,
        display: { label: "alt" },
        style: bottomRight,
      },
      {
        key: " ",
        size: 6.25,
        empty: false,
      },
      {
        key: "ALT",
        size: 1.25,
        empty: false,
        display: { label: "alt" },
        style: bottomLeft,
      },
      {
        key: "META",
        size: 1.25,
        empty: false,
        display: { label: "meta" },
        style: bottomLeft,
      },
      {
        key: "CONTEXTMENU",
        size: 1.25,
        empty: false,
        display: { label: "menu" },
        style: bottomLeft,
      },
      {
        key: "CONTROL",
        size: 1.25,
        empty: false,
        display: { label: "control" },
        style: bottomRight,
      },
      { size: 0.25, empty: true },
      {
        key: "ARROWLEFT",
        size: 1,
        empty: false,
        display: { icon: "caret-left-filled" },
      },
      {
        key: "ARROWDOWN",
        size: 1,
        empty: false,
        display: { icon: "caret-down-filled" },
      },
      {
        key: "ARROWRIGHT",
        size: 1,
        empty: false,
        display: { icon: "caret-right-filled" },
      },
    ],
  ]);

  return {
    layout80,
    setLayout80,
  };
}
