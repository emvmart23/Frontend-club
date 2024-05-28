import NavLinks from "./NavLinks";
import { links } from "./links";

interface Props { 
  isExpanded: boolean;
}

export default function Sideba({ isExpanded }: Props) {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <NavLinks key={index} links={link} isExpanded={isExpanded}/>
        ))}
      </ul>
    </nav>
  );
}
