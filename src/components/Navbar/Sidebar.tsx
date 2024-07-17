import NavLinks from "./NavLinks";
import { links } from "./links";

interface Props {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded }: Props) {
  return (
    <nav className="mt-6">
      <ul>
        {links.map((link, index) => (
          <NavLinks
            key={index}
            links={link}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        ))}
      </ul>
    </nav>
  );
}
