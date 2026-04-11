import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@paul/ui";
import { Project } from "@paul/entities";
import { COLORS } from "../../constants/colors";

import { useTranslation } from "react-i18next";

interface ProjectFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  projectColor: string;
  onProjectColorChange: (color: string) => void;
  onSave: () => void;
}

export default function ProjectFormDrawer({
  open,
  onOpenChange,
  editingProject,
  projectName,
  onProjectNameChange,
  projectColor,
  onProjectColorChange,
  onSave,
}: ProjectFormDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="bg-background border-t-4 border-border rounded-t-[32px] overflow-hidden focus:outline-none">
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted flex-shrink-0" />

        <DrawerHeader className="px-6 pb-4 pt-6 text-left shrink-0">
          <DrawerTitle className="text-3xl font-black uppercase tracking-tighter">
            {editingProject
              ? t("projects.form.edit_title")
              : t("projects.form.new_title")}
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-6 pt-0 pb-12 overflow-y-auto max-h-[80vh]">
          <div className="mb-8">
            <label className="block font-black uppercase tracking-wider mb-2 text-sm text-foreground/60">
              {t("projects.form.name_label")}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              className="w-full bg-secondary-background border-2 border-border rounded-xl px-5 py-5 text-xl font-bold text-foreground focus:outline-none focus:ring-4 focus:ring-main/20 transition-all placeholder:text-foreground/20"
              placeholder={t("projects.form.name_placeholder")}
            />
          </div>

          <div className="mb-10">
            <label className="block font-black uppercase tracking-wider mb-3 text-sm text-foreground/60">
              {t("projects.form.color_label")}
            </label>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar py-4 -mx-2 px-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onProjectColorChange(c)}
                  className={`w-12 h-12 shrink-0 rounded-full border-4 cursor-pointer transition-all ${
                    projectColor === c
                      ? "border-foreground scale-110 shadow-lg"
                      : "border-transparent hover:scale-105 opacity-80"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onSave}
            className="w-full bg-main text-main-foreground border-2 border-border py-5 rounded-xl font-black text-xl uppercase tracking-tighter shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 transition-all cursor-pointer"
          >
            {t("projects.form.save_button")}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
