export const templates = [
  {
    id: "template-1",
    name: "Aero Blue",
    variables: {
      "--header-bg": "#005d00",
      "--header-text": "#ffffff",
      "--hero-bg": "#000000",
      "--hero-title": "#ffffff",
      "--primary-link-bg": "#ffffff",
      "--primary-link-color": "#000000",
    },
    allowedSections: {
      header: ["header-1", "header-2"],
      banner: ["banner-1", "banner-2"],
    },
  },
  {
    id: "template-2",
    name: "Aero Dark",
    variables: {
      "--header-bg": "#111827",
      "--header-text": "#ffffff",
      "--hero-bg": "#020617",
      "--hero-title": "#f8fafc",
      "--primary-link-bg": "#ffffff",
      "--primary-link-color": "#000000",
    },
    allowedSections: {
      header: ["header-1", "header-2"],
      banner: ["banner-1", "banner-2"],
    },
  },
];