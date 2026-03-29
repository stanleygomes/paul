import { DrawerHeader, DrawerTitle, DrawerDescription } from "@done/ui";

export function TaskDrawerHeader() {
  return (
    <DrawerHeader className="border-b-2 border-border px-6 py-4 text-left shrink-0">
      <DrawerTitle className="text-xl font-black">Task Details</DrawerTitle>
      <DrawerDescription className="sr-only">
        View and edit the details of your task here.
      </DrawerDescription>
    </DrawerHeader>
  );
}
