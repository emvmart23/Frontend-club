import { useState } from "react";
import NavLinks from "./NavLinks";
import { links } from "./links";

export default function Sidebar() {
  const [state, setState] = useState(false);
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <NavLinks key={index} {...link} state={state} setState={setState} />
        ))}
      </ul>
    </nav>
  );
}
