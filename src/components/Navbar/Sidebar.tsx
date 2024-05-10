import NavLinks from "./NavLinks";
import { links } from "./links";

export default function Sidebar() {
  return (
    <nav>
      <ul>
        {links.map(({icon,title, path}, index) => (
          <NavLinks key={index} icon={icon} title={title} url={path} />
        ))}
      </ul>
    </nav>
  )
}