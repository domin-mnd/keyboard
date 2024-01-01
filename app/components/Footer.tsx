import { ToggleMode } from "./Mode";

/** Footer with a theme toggler. */
export function Footer() {
  return (
    <footer
      className="flex"
      justify="center"
      p="4"
      border-t="1 secondary"
      transition="all"
    >
      <div
        className="flex max-w-xl"
        justify="between"
        w="full"
        text="sm"
        font="semibold"
      >
        <span>Made with ❤️️</span>
        <ToggleMode />
      </div>
    </footer>
  );
}
