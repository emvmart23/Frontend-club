import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  icon: React.ReactNode;
  title: string;
  url: string;
}

export default function NavLinks({ icon, title, url }: Props ) {
  const [isActive, setIsActive] = useState(false)
  return (
    <NavLink
      to={url}
      className="group flex relative w-[12rem] ml-4 h-[3.8rem] mx-auto z-50"
    >
    <div
      className={"p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground rounded transition-all duration-75 origin-left mt-5 flex gap-5"}
    >
      <span>{icon}</span>
      <span className="origin-left">{title}</span>
    </div>
  </NavLink>
  )
}