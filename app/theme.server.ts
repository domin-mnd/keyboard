import { createCookie } from "@vercel/remix";

export const themeCookie = createCookie("theme-mode", {
  maxAge: 31_536_000, // 1 year
});
