import { useEffect, useState } from "react";

export default function useBreakpointer() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handlerReziseWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handlerReziseWindow);

    return () => window.removeEventListener("resize", handlerReziseWindow);
  }, [width]);

  return width;
}