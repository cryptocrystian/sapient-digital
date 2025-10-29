declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const events = {
  cta_click: (where: string, label: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_click", { where, label });
    }
  },
  form_start: (id: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_start", { id });
    }
  },
  form_submit: (id: string, ok: boolean) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_submit", { id, ok });
    }
  },
};
