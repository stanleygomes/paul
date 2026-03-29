"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TaskBoard from "src/containers/task-board";
// import LandingPage from "src/containers/landing-page";
// import { useUser } from "@modules/user/use-user";

export default function Home() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const filter = searchParams.get("filter");
  // const { user } = useUser();

  // if (!user) {
  //   return <LandingPage />;
  // }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background pb-32" />}>
      <TaskBoard projectId={projectId} filter={filter} />
    </Suspense>
  );
}
