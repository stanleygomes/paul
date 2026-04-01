import { toast } from "@paul/ui";

export class NotificationManager {
  private static timeouts: Map<string, NodeJS.Timeout> = new Map();

  static async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      toast.error("Notificações não são suportadas neste navegador.");
      return "denied";
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      toast.success("Notificações ativadas!");
      this.sendNotification("Paul", {
        body: "Você receberá lembretes das suas tarefas.",
      });
    }
    return permission;
  }

  static async sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission !== "granted") return;

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        icon: "/icon.png",
        badge: "/icon.png",
        ...options,
      });
    } else {
      new Notification(title, options);
    }
  }

  static schedule(taskId: string, title: string, date: Date) {
    this.cancel(taskId);

    const now = Date.now();
    const delay = date.getTime() - now;

    if (delay <= 0) return;

    const timeout = setTimeout(() => {
      this.sendNotification("Lembrete de Tarefa", {
        body: title,
        tag: taskId,
        requireInteraction: true,
      });
      this.timeouts.delete(taskId);
    }, delay);

    this.timeouts.set(taskId, timeout);
  }

  static cancel(taskId: string) {
    if (this.timeouts.has(taskId)) {
      clearTimeout(this.timeouts.get(taskId));
      this.timeouts.delete(taskId);
    }
  }
}
