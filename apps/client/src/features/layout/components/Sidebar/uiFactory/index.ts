import { addID } from "@/core/lib/etc";
import { FaPenFancy } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { SiBookstack } from "react-icons/si";

export type SideLink = {
  id: string;
  name: string;
  href: string;
  svg: IconType;
};

export const sideLinks: SideLink[] = addID([
  {
    name: "Courses",
    href: "/courses/list",
    svg: SiBookstack,
  },
  {
    name: "Create Course",
    href: "/courses/post",
    svg: FaPenFancy,
  },
]);
