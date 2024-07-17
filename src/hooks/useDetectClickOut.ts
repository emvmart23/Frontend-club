// import { RefObject, useEffect, useState } from "react";

// export default function useDetectClickOut<T>(ref: RefObject<T>) {
//   const [isClicked, setIsClicked] = useState(false);

//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (ref.current && !ref.current.constains) {
//         setIsClicked(true);
//       } else {
//         setIsClicked(false);
//       }
//     }
//   }, [ref]);
// }
