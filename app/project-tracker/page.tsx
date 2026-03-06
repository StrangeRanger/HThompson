import { headers } from "next/headers";
import ProjectTrackerClient from "@/app/project-tracker/project-tracker-client";

export default async function ProjectTrackerPage() {
  const nonce: string | undefined =
    (await headers()).get("x-nonce") ?? undefined;

  return <ProjectTrackerClient nonce={nonce} />;
}
