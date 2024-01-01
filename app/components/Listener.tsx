import { useCallback, useEffect, useRef, useState } from "react";
import { type OS, useOS } from "~/hooks/useOS";

/**
 * Listener for window key events.
 * FN key cannot be tested!
 *
 * @returns The key combination (shortcut).
 */
export function Listener() {
  const [shortcut, setShortcut] = useState<string[]>([]);
  const os = useOS();
  const listenerRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  const normalize = useCallback(
    (key: string) => {
      const metaKeys: Record<OS, string> = {
        Linux: "Super",
        Windows: "Win",
        MacOS: "Cmd",
        Unix: "Meta",
      };

      const keys = {
        " ": "Space",
        Control: "Ctrl",
        CapsLock: "Caps",
        Escape: "Esc",
        Delete: "Del",
        Insert: "Ins",
        // Replace super key names
        Meta: os ? metaKeys[os] : "Meta",
      };

      const upper = key.length === 1 ? key.toUpperCase() : key;
      return (keys as any)[key] ?? upper;
    },
    [os]
  );

  const animate = useCallback(() => {
    if (!listenerRef.current || !overflowRef.current) return;
    // 32 because of p-4 padding that equals 1 rem (16 pixels)
    // therefore a horizontal or vertical padding would be twice that number
    listenerRef.current.style.width = `${
      overflowRef.current.offsetWidth + 32
    }px`;
    listenerRef.current.style.height = `${
      overflowRef.current.offsetHeight + 32
    }px`;
  }, []);

  const down = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    if (listenerRef.current) listenerRef.current.style.opacity = "";
    setShortcut((hold) =>
      hold.indexOf(event.key) === -1 ? [...hold, event.key] : hold
    );
  }, []);

  const up = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    setShortcut((hold) => {
      // No toSpliced because of compatibility.
      hold.splice(hold.indexOf(event.key), 1);
      return hold;
    });
  }, []);

  useEffect(() => {
    addEventListener("keydown", down);
    addEventListener("keyup", up);
  }, [down, up]);

  useEffect(() => {
    animate();
  }, [shortcut, animate]);

  return (
    <div
      text="6xl text"
      font="bold"
      align="center"
      p="4"
      className="opacity-50 tracking-wide"
      transition="all"
      overflow="hidden"
      select="none"
      style={{
        // Temporary opacity
        opacity: 0.2,
      }}
      ref={listenerRef}
    >
      <div ref={overflowRef} w="max" className="max-w-[90vw] min-h-[5rem]">
        {shortcut.length ? shortcut.map(normalize).join(" + ") : "Ctrl + D"}
      </div>
    </div>
  );
}
