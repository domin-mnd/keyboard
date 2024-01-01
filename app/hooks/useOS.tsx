import { useEffect, useState } from "react";

export type OS = "Windows" | "MacOS" | "Unix" | "Linux";

/** Hook to return OS. Used to define the name of super key on keyboard. */
export function useOS(): OS | void {
  const [os, setOs] = useState<OS>();
  const search: Record<string, OS> = {
    Win: "Windows",
    Mac: "MacOS",
    X11: "Unix",
    Linux: "Linux",
  };

  useEffect(() => {
    for (const keyword in search)
      if (navigator.userAgent.indexOf(keyword) !== -1) setOs(search[keyword]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return os;
}
