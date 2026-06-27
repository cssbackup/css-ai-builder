export const templates = [
  {
    id: "template-1",
    name: "Aero Blue",
    variables: {
      "--header-bg": "#245c6e",
      "--header-text": "#ffffff",
      "--hero-bg": "#000000",
      "--hero-title": "#ffffff",
      "--primary-pretitle-text":"#ffffff",
      "--primary-title-text":"#ffffff",
      "--primary-subtitle-text":"#ffffff",
       "--secondary-pretitle-text":"#ffffff",
      "--secondary-title-text":"#ffffff",
      "--secondary-subtitle-text":"#ffffff",
      "--primary-link-bg": "#ffffff",
      "--primary-link-color": "#000000",
      "--secondary-link-bg": "#00cadd",
      "--secondary-link-color": "#ffffff",
      "--text-white":"white",
      "--blue-bg":"#0668ff",
      "--lightcream-bg":"#fbfaf6"
    },
    allowedSections: {
      header: ["header-1", "header-2"],
      banner: ["banner-1", "banner-2"],
      about: ["about-1", "about-2"],
      product: ["product-1"],
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