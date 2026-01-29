"use client";

import Link from "next/link";
import { useState } from "react";

interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverColor?: string;
  defaultColor?: string;
}

export default function HoverLink({ 
  href, 
  children, 
  className = "", 
  style = {},
  hoverColor = "#8b6f47",
  defaultColor = "#6b6b6b"
}: HoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={className}
      style={{ ...style, color: isHovered ? hoverColor : defaultColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}
