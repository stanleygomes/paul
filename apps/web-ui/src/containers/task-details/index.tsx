import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTasks } from "src/modules/todo/use-tasks";
import { TaskForm } from "src/containers/task-form";
import TaskDetailsNotFound from "./not-found";

interface TaskDetailsProps {
  id: string;
}

export default function TaskDetails({ id }: TaskDetailsProps) {
  const router = useRouter();
  const {
    todoTasks,
    finishedTasks,
    updateEdit,
    updateTaskDetails,
    toggleTask,
    deleteTask,
  } = useTasks();

  const allTasks = [...todoTasks, ...finishedTasks];
  const task = allTasks.find((t) => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    if (task) {
      setEditingContent(task.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.id, task?.content]);

  if (!task) {
    return <TaskDetailsNotFound />;
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/"
          className="font-bold text-foreground/70 hover:text-foreground"
        >
          ← Back to Tasks
        </Link>

        <div className="mt-8 rounded-base border-2 border-border bg-secondary-background p-6 md:p-10 shadow-[8px_8px_0px_0px_var(--border)]">
          <TaskForm
            task={task}
            isEditing={isEditing}
            editingContent={editingContent}
            onEditingContentChange={setEditingContent}
            onToggle={toggleTask}
            onStartEdit={() => setIsEditing(true)}
            onUpdateEdit={updateEdit}
            onCloseEdit={() => setIsEditing(false)}
            onDelete={(id) => {
              deleteTask(id);
              router.push("/");
            }}
            onUpdateDetails={updateTaskDetails}
          />
        </div>
      </div>
    </main>
  );
}
