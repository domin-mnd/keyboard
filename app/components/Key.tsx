import type { PropsWithChildren } from "react";
import type { Key as IKey, Space as ISpace } from "~/hooks/useKeyboard";

export interface KeyboardPart {
  multiplier: string;
}

export type SpaceProps = ISpace & KeyboardPart;
export type KeyProps = Omit<IKey, "key"> & KeyboardPart & PropsWithChildren;
export interface LabelProps extends KeyboardPart {
  label: string;
}
export interface IconProps {
  icon: string;
}
export interface CombinedProps extends KeyboardPart {
  keys: [string, string];
}

/** Horizontal space between keys. */
export function Space({ multiplier, size }: SpaceProps) {
  return (
    <div
      style={{
        width: `calc(${multiplier} * ${size})`,
        height: multiplier,
        maxWidth: `calc(50px * ${size})`,
      }}
      className="max-h-50px"
    />
  );
}

/** Key wrapper for keyboard. */
export function Key({
  multiplier,
  size,
  style,
  active,
  checked,
  children,
}: KeyProps) {
  return (
    <div
      style={{
        // - 4px because of margin set to 0.5 (2px)
        width: `calc(${multiplier} * ${size} - 4px)`,
        height: `calc(${multiplier} - 4px)`,
        maxWidth: `calc(50px * ${size} - 4px)`,
        ...style,
      }}
      m="0.5"
      p="2"
      align="center"
      rounded="sm"
      flex="~"
      justify="center"
      items="center"
      select="none"
      // 50 - 4 = 46
      className={`max-h-46px leading-none hover:cursor-pointer transition-all ${
        active ? "opacity-25" : ""
      } ${checked ? "bg-primary text-background" : "bg-secondary"}`}
      hover:opacity="50"
      active:opacity="25"
    >
      {children}
    </div>
  );
}

/** Contents of Key. */
export function Label({ multiplier, label }: LabelProps) {
  return (
    <span
      style={{
        fontSize: `min(calc(${multiplier} * 0.3), 11px)`,
      }}
    >
      {label}
    </span>
  );
}

/** Contents of Key. */
export function Icon({ icon }: IconProps) {
  return <div className={"i-ant-" + icon} />;
}

/** Contents of Key. */
export function Combined({ keys, multiplier }: CombinedProps) {
  return (
    <div flex="~ col" gap="0.5">
      <span
        style={{
          fontSize: `min(calc(${multiplier} * 0.2), 12px)`,
        }}
        className="opacity-50"
      >
        {keys[1]}
      </span>
      <span>{keys[0]}</span>
    </div>
  );
}
