"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TaskBoard from "src/containers/task-board";

export default function Home() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const filter = searchParams.get("filter");

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fef6d9] pb-32" />}>
      <TaskBoard projectId={projectId} filter={filter} />
    </Suspense>
  );
}
