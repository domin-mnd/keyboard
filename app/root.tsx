import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@vercel/remix";
import { Footer } from "~/components/Footer";
import { ThemeContext } from "~/hooks/useTheme";
import { themeCookie } from "./theme.server";
import reset from "@unocss/reset/tailwind.css";
import unocss from "~/uno.css";
import scrollbar from "~/scrollbar.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: unocss,
  },
  {
    rel: "stylesheet",
    href: scrollbar,
  },
  {
    rel: "stylesheet",
    href: reset,
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/favicon/site.webmanifest",
  },
  {
    rel: "mask-icon",
    href: "/favicon/safari-pinned-tab.svg",
    color: "#0a0900",
  },
  {
    rel: "shortcut icon",
    href: "/favicon/favicon.ico",
  },
];

export const meta: MetaFunction = () => [
  {
    title: "Keyboard.",
  },
  {
    name: "description",
    content: "Tiny utility solution for testing keyboard keys.",
  },
  {
    name: "og:title",
    content: "Keyboard.",
  },
  {
    name: "og:description",
    content: "Tiny utility solution for keyboard testing.",
  },
  {
    name: "theme-color",
    content: "#e4e3d8",
  },
  {
    name: "msapplication-TileColor",
    content: "#0a0900",
  },
  {
    name: "msapplication-config",
    content: "/favicon/browserconfig.xml",
  },
];

// Accepting prefers color scheme header.
// Not supported by firefox, safari & brave.
// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme#browser_compatibility
export const headers: HeadersFunction = () => ({
  "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  "Critical-CH": "Sec-CH-Prefers-Color-Scheme",
  Vary: "Sec-CH-Prefers-Color-Scheme",
});

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const clientHint = request.headers.get("Sec-CH-Prefers-Color-Scheme");
  const cookie = await themeCookie.parse(cookieHeader);

  if (cookie)
    return json({
      theme: cookie.theme,
    });

  const response = {
    theme: clientHint ?? "light",
  };

  return json(response, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(response),
    },
  });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        font="sans"
        bg="background"
        transition="all"
        text="text"
        className="min-h-100svh flex flex-col"
      >
        <ThemeContext.Provider value={theme}>
          <main
            flex="~ grow col"
            justify="center"
            items="center"
            className="min-h-100svh"
          >
            <Outlet />
          </main>
          <Footer />
        </ThemeContext.Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
