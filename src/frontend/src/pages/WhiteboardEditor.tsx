import { useRouter } from "@tanstack/react-router";
// InkSync legacy file — not used in Parental Awareness Hub
import { useEffect } from "react";

export function WhiteboardEditor() {
  const router = useRouter();
  useEffect(() => {
    router.navigate({ to: "/home" });
  }, [router]);
  return null;
}
