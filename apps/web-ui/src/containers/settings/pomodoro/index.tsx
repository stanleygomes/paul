import React from "react";
import { useTranslation } from "react-i18next";
import { usePomodoroSettings } from "@modules/pomodoro/use-pomodoro-settings";
import { SettingsMain } from "../settings-main";
import { SettingsHeader } from "../settings-header";

export function PomodoroSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = usePomodoroSettings();

  return (
    <SettingsMain>
      <SettingsHeader />
      <div className="flex flex-col gap-4 bg-secondary-background/50 p-4 rounded-base border-2 border-border shadow-base">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg">{t("settings.pomodoro.title")}</h3>
          <p className="text-sm font-base text-foreground/70">
            {t("settings.pomodoro.device_hint")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">
              {t("settings.pomodoro.focus_label")}
            </label>
            <input
              type="number"
              min={1}
              max={120}
              className="rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base shadow-base outline-none hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus:translate-x-boxShadowX focus:translate-y-boxShadowY focus:shadow-none transition-all dark:bg-darkBg"
              value={settings.focusTime}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  focusTime: Number(e.target.value) || 25,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">
              {t("settings.pomodoro.short_break_label")}
            </label>
            <input
              type="number"
              min={1}
              max={60}
              className="rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base shadow-base outline-none hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus:translate-x-boxShadowX focus:translate-y-boxShadowY focus:shadow-none transition-all dark:bg-darkBg"
              value={settings.shortBreakTime}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  shortBreakTime: Number(e.target.value) || 5,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">
              {t("settings.pomodoro.long_break_label")}
            </label>
            <input
              type="number"
              min={1}
              max={60}
              className="rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base shadow-base outline-none hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus:translate-x-boxShadowX focus:translate-y-boxShadowY focus:shadow-none transition-all dark:bg-darkBg"
              value={settings.longBreakTime}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  longBreakTime: Number(e.target.value) || 15,
                })
              }
            />
          </div>
        </div>
      </div>
    </SettingsMain>
  );
}
