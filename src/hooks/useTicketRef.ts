import { useRef } from "react";

export const useTicketRef = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  return targetRef;
};
