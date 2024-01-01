import { redirect, json, type ActionFunctionArgs } from "@vercel/remix";
import { themeCookie } from "~/theme.server";

export async function loader() {
  return json("Method not allowed", { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
  const redirectUrl = (await request.formData()).get("redirectUrl");
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await themeCookie.parse(cookieHeader);

  return redirect(typeof redirectUrl === "string" ? redirectUrl : "/", {
    headers: {
      "Set-Cookie": await themeCookie.serialize({
        theme: cookie.theme === "dark" ? "light" : "dark",
      }),
    },
  });
}
