import {
  useRef,
  type HTMLProps,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { Keyboard, type KeyboardHandle } from "~/components/Keyboard";
import { Listener } from "~/components/Listener";

function Link({
  children,
  ...props
}: PropsWithChildren & HTMLProps<HTMLSpanElement>) {
  return (
    <span
      cursor="pointer"
      underline="~ offset-4"
      className="decoration-1 hover:opacity-50 active:opacity-25"
      transition="all"
      select="none"
      {...props}
    >
      {children}
    </span>
  );
}

export default function Index() {
  const keyboardRef = useRef<KeyboardHandle>(null);
  // Storing the function in useState to correctly pass as prop.
  // Instead it'd be undefined even after ref is set.
  const [reset, setReset] = useState<() => void>();
  useEffect(
    () => setReset(() => keyboardRef.current?.reset),
    [keyboardRef.current?.reset]
  );

  return (
    <div flex="~ col" justify="center" items="center">
      <Listener />
      <span text="text center" className="opacity-25" pl="2" pr="2">
        Type something to test your keyboard... or instead{" "}
        <Link onClick={reset}>reset</Link> the keyboard.
      </span>
      <div className="max-sm:hidden">
        <Keyboard multiplier="5vw" ref={keyboardRef} />
      </div>
    </div>
  );
}
