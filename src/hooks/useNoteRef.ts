import { useRef } from "react";

export const useNoteRef = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    return targetRef;
}