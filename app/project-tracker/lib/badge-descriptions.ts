import { RepoStatus } from "@/app/lib/types";

interface BadgeDescription {
  id: number;
  status: RepoStatus;
  description: string;
}

export const badgeDescriptions: BadgeDescription[] = [
  {
    id: 1,
    status: "personal",
    description:
      "Indicates that the project or document is tailored to my personal needs and will be updated as required. Typically, it reflects my current setup, usage, or preferences.",
  },
  {
    id: 2,
    status: "active",
    description:
      "The project is stable and fully functional, with ongoing development and regular updates. New features and improvements are continuously being added.",
  },
  {
    id: 3,
    status: "maintained",
    description:
      "The project is stable and functional, receiving updates primarily for bug fixes and minor improvements. Active development is minimal but ongoing as needed.",
  },
  {
    id: 4,
    status: "inactive",
    description:
      "Development on the project has paused, but it remains in a stable and usable state. Future work may resume, but there are currently no active updates or enhancements.",
  },
  {
    id: 5,
    status: "finished",
    description:
      "The project is complete and fully functional. While no active development is planned, updates may occur if essential fixes or changes are necessary. Combines aspects of both Maintained and Unsupported statuses.",
  },
  {
    id: 6,
    status: "unsupported",
    description:
      "The project is stable and usable, but active development has ceased. No further updates are planned, and users may need to seek alternative maintainers or solutions if issues arise.",
  },
  // NOTE: Disabled for now, though it may be reintroduced later.
  // {
  //   id: 7,
  //   status: "continuous",
  //   description: "The project is under ongoing development with a focus on gradual improvements and enhancements. The development pace is steady but less rapid than that of active projects, blending elements of active and maintained statuses.",
  // },
  {
    id: 7,
    status: "concept",
    description:
      "Represents an early-stage project or proof-of-concept with minimal implementation. Intended for demonstration, experimentation, or initial exploration without full functionality.",
  },
  {
    id: 8,
    status: "wip",
    description:
      "Development is actively underway, but the project has yet to reach a stable or publicly usable state. Ongoing work is focused on achieving initial functionality and stability.",
  },
  {
    id: 9,
    status: "suspended",
    description:
      "Development has been temporarily halted after initial progress. The project remains in a usable state, with intentions to resume work in the future, pending circumstances.",
  },
  {
    id: 10,
    status: "abandoned",
    description:
      "The project has been discontinued and will no longer receive updates or support. Users are encouraged to seek alternatives or fork the project if continued development is desired. Assume the project has been archived.",
  },
  {
    id: 11,
    status: "archived",
    description:
      "The project has been officially archived, meaning it is no longer maintained or supported. It serves as a historical reference, and no further changes will be made unless specified otherwise.",
  },
  {
    id: 12,
    status: "moved",
    description:
      "The project has been relocated to a new repository or platform. The new location is the authoritative source, and all future updates and maintenance will occur there. Assume the project has been archived.",
  },
  {
    id: 13,
    status: "unspecified",
    description:
      "The project status is not explicitly defined or documented. This status is usually reserved for projects that don't need a specific status. For example, a <a href='https://github.com/StrangeRanger/StrangeRanger' target='_blank'>GitHub user's public profile page</a> will have this status, as it's not a traditional software project.",
  },
  {
    id: 14,
    status: "unknown",
    description:
      "The project status is not known or has not been determined. This status is typically used when the project is new, lacks documentation, is a fork, or has not been categorized yet.",
  },
];
