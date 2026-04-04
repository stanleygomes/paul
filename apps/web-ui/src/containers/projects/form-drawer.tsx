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
      <DrawerContent className="bg-background border-t-2 border-border rounded-t-[30px] p-6 pb-10">
        <DrawerHeader className="px-6 pb-4 pt-2 text-left shrink-0">
          <DrawerTitle className="text-2xl font-black">
            {editingProject
              ? t("projects.form.edit_title")
              : t("projects.form.new_title")}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-6">
          <div className="mb-6">
            <label className="block font-bold mb-3 text-lg">
              {t("projects.form.name_label")}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-black/20"
              placeholder={t("projects.form.name_placeholder")}
            />
          </div>
          <div className="mb-10">
            <label className="block font-bold mb-3 text-lg">
              {t("projects.form.color_label")}
            </label>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onProjectColorChange(c)}
                  className={`w-12 h-12 rounded-full border-4 cursor-pointer transition-all ${projectColor === c ? "border-black scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={onSave}
            className="w-full bg-black text-[#fef6d9] py-5 rounded-xl font-bold text-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t("projects.form.save_button")}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
