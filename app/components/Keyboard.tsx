import {
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { useKeyboard, type Key as IKey } from "~/hooks/useKeyboard";
import { Combined, Icon, Key, Label, Space } from "~/components/Key";

export interface KeyboardProps {
  multiplier: string;
}

export interface KeyboardHandle {
  reset: () => void;
}

/**
 * Keyboard component that listens for keys pressed.
 *
 * @returns Mapped 2D array keyboard.
 */
export const Keyboard = forwardRef<KeyboardHandle, KeyboardProps>(
  function Keyboard({ multiplier }, ref) {
    const { layout80, setLayout80 } = useKeyboard();

    const reset = useCallback(() => {
      setLayout80((keyboard) =>
        keyboard.map((row) =>
          row.map((key) =>
            key.empty ? key : { ...key, checked: false, active: false }
          )
        )
      );
    }, [setLayout80]);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    const update = useCallback(
      (keyName: string, data: Partial<IKey>) => {
        const clicked = keyName.toLocaleUpperCase();
        setLayout80((keyboard) =>
          keyboard.map((row) =>
            row.map((key) =>
              !key.empty &&
              (Array.isArray(key.key)
                ? key.key.some((key) => key === clicked)
                : key.key === clicked)
                ? { ...key, ...data }
                : key
            )
          )
        );
      },
      [setLayout80]
    );

    const down = useCallback(
      (event: KeyboardEvent) => {
        event.preventDefault();
        update(event.key, { active: true });
      },
      [update]
    );

    const up = useCallback(
      (event: KeyboardEvent) => {
        event.preventDefault();
        update(event.key, { checked: true, active: false });
      },
      [update]
    );

    useEffect(() => {
      addEventListener("keydown", down);
      addEventListener("keyup", up);
    }, [down, up]);

    // Mapped 2D array for keyboard
    const keyboard = layout80.map((row, index) => {
      const keys = row.map((key, index) => {
        // Horizontal space between keys
        if (key.empty)
          return <Space key={index} multiplier={multiplier} {...key} />;

        // Contents define what will be inside the key
        let contents: ReactNode = key.key;

        // e.g. "escape", "enter"
        if (key.display && "label" in key.display)
          contents = (
            <Label multiplier={multiplier} label={key.display.label} />
          );

        // e.g. arrow keys
        if (key.display && "icon" in key.display)
          contents = <Icon icon={key.display.icon} />;

        // e.g. key 1 with ! as alternative value
        if (Array.isArray(key.key))
          contents = <Combined multiplier={multiplier} keys={key.key} />;

        // Key in a horizontal row
        return (
          <Key {...key} key={index} multiplier={multiplier}>
            {contents}
          </Key>
        );
      });

      // Horizontal row
      return (
        <div key={index} flex="~ row">
          {keys}
        </div>
      );
    });

    return (
      <div
        mt="8"
        mb="8"
        style={{
          // Font size for 1 letter keys
          fontSize: `min(calc(${multiplier} * 0.3), 15px)`,
        }}
      >
        {keyboard}
      </div>
    );
  }
);
