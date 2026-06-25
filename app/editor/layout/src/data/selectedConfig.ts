export const selectedConfig = {
  templateId: "template-1",

  sections: [
    {
  type: "header",
  variant: "header-1",
  data: {
    "header-1": {
      logo: "Header1",
      menu: [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Service", href: "#" },
        { label: "Gallery", href: "#" },
        { label: "Blog", href: "#" },
      ],
      buttons: [
        { label: "Generate Report", href: "#" },
        { label: "Call Us", href: "#" },
      ],
    },

    "header-2": {
      logo: "Header2",
      menu: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "Contact", href: "#" },
      ],
      buttons: [{ label: "Call 2", href: "#" }],
    },
  },
},
    {
      type: "banner",
      variant: "banner-1",
      data: {
        title: "Watch your cart shrink in a single click.",
        subtitle: "Build modern websites with reusable sections.",
        button: {
          label: "View more",
          href: "#",
        },
      },
    },
  ],
};