import React from "react";

export default interface LinkCardData {
  id: string;
  title: string;
  body: string;
  href: string;
  isExternal: boolean;
  icon: React.ElementType;
  category?: "service" | "doc-and-tools";
  color?: string;
}
