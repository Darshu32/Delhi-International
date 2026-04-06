import { useCallback } from "react";
import { useToast, type ToastType } from "../components/Toast";

interface WhatsAppOptions {
  successMessage?: string;
  successType?: ToastType;
  errorMessage?: string;
}

const WHATSAPP_BLOCKED_MESSAGE = "Couldn't open WhatsApp. Please allow pop-ups and try again.";

export function useExternalActions() {
  const { toast } = useToast();

  const announcePhone = useCallback(() => {
    toast("Opening phone dialer...", "info");
  }, [toast]);

  const announceEmail = useCallback(() => {
    toast("Opening email client...", "info");
  }, [toast]);

  const announceMaps = useCallback(() => {
    toast("Opening Google Maps...", "info");
  }, [toast]);

  const openWhatsApp = useCallback(
    (url: string, options: WhatsAppOptions = {}) => {
      const {
        successMessage = "Opening WhatsApp...",
        successType = "info",
        errorMessage = WHATSAPP_BLOCKED_MESSAGE,
      } = options;

      const popup = window.open(url, "_blank", "noopener,noreferrer");

      if (!popup) {
        toast(errorMessage, "error");
        return false;
      }

      popup.focus?.();
      toast(successMessage, successType);
      return true;
    },
    [toast],
  );

  return { announcePhone, announceEmail, announceMaps, openWhatsApp };
}
