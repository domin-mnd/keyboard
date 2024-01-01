import { useFetcher, useLocation } from "@remix-run/react";
import { useTheme } from "~/hooks/useTheme";
import type { InputHTMLAttributes } from "react";

export const Button = (
  props: Partial<InputHTMLAttributes<HTMLInputElement>>
) => (
  <input
    {...props}
    type="submit"
    underline="~ offset-3"
    className="decoration-accent hover:decoration-text decoration-1.5 hover:opacity-50"
    transition="all"
    cursor="pointer"
  />
);

export const DarkModeSubmit = () => (
  <span>
    I follow the <Button value="dark mode" /> convention!
  </span>
);

export const LightModeSubmit = () => (
  <span>
    I enjoy <Button value="flashbangs" />!
  </span>
);

export function ToggleMode() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const { pathname, search } = useLocation();

  return (
    <fetcher.Form method="post" action="/toggle-theme" preventScrollReset>
      <input hidden name="redirectUrl" value={pathname + search} readOnly />
      {theme === "dark" ? <LightModeSubmit /> : <DarkModeSubmit />}
    </fetcher.Form>
  );
}
