export const selectedConfig = {
  templateId: "template-1",

  sections: [
    {
      type: "header",
      variant: "header-1",
      data: {
        "header-1": {
          logo: "Header1",
          headerBackgroundType: "solid",
          headerBackgroundColor: "#245c6e",
          headerGradientColor: "#0668ff",
          menu: [
            { label: "Home", href: "#" },
            { label: "About", href: "#" },
            { label: "Service", href: "#" },
            { label: "Gallery", href: "#" },
            { label: "Blog", href: "#" },
          ],
          buttons: [
            {
              label: "Generate Report",
              href: "#",
              variant: "primary",
            },
            {
              label: "Call Us",
              href: "#",
              variant: "secondary",
            },
          ],
        },

        "header-2": {
          logo: "Header2",
          headerBackgroundType: "solid",
          headerBackgroundColor: "#245c6e",
          headerGradientColor: "#0668ff",
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
        "banner-1": {
          backgroundImage: "/bg1.jpg",
          backgroundImageTitle: "BG1",
          pretitle: "Free AI tools from Google Cloud",
          title: "Watch your cart shrink.",
          desc: "Google AI Studio is the fast path for developers, students, and researchers who want to try Gemini models and start building with the Gemini Developer API. We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
          buttons: [
            {
              label: "Learn more",
              href: "#",
            },
          ],
        },
        "banner-2": {
          backgroundImage: "/bg2.jpg",
          backgroundImageTitle: "AI rays",
          pretitle: "Launch faster with AI",
          title: "Build smarter pages in minutes.",
          desc: "You can build AI agents with Gemini Enterprise Agent Platform. Get started by exploring Agent Garden for pre-built, customizable blueprints, complete with source code and configuration files.",
          buttons: [
            {
              label: "Start building",
              href: "#",
            },
          ],
        },
      },
    },
    {
      type: "about",
      variant: "about-1",
      data: {
        "about-1": {
          pretitle: "Know more of us",
          title: "About Us",
          desc: "Google AI Studio is the fast path for developers, students, and researchers who want to try Gemini models and start building with the Gemini Developer API. We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
          desc2:
            "This integration can help you spend less time on infrastructure management and more time on refining your models to solve complex business problems.",
          backgroundImage: "/bg2.jpg",
          backgroundImageTitle: "About image",
          buttons: [
            {
              label: "Contact Us",
              href: "#",
            },
          ],
        },
        "about-2": {
          pretitle: "Know More of Us",
          title: "About Us",
          subtitle: "Luxurious Interior and Industrial Design",
          desc: "Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials.",
          backgroundImage: "/blackbay.png",
          backgroundImageTitle: "Modern luxury living room interior",
          sideImage: "/shaye.png",
          sideImageTitle: "Luxury interior chair design",
          philosophyTitle: "Our Philosophy",
          philosophyDesc:
            "At Britto Charette, we believe in creating luxurious, personalized environments that reflect our clients' tastes and lifestyles.",
          buttons: [
            {
              label: "Contact Us",
              href: "#",
              variant: "primary",
            },
          ],
        },
      },
    },
    {
      type: "product",
      variant: "product-1",
      data: {
        "product-1": {
          productSlides: [
             {
              image: "/prod2.jpg",
              alt: "Laptop product two",
              productTitle: "Travel Ready Build",
              productSubtitle: "Packed for the next trip",
              productInfoTitle: "Compact Power",
              productInfoDesc:
                "We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
              productFeatures: [
                {
                  label: "Hard shell body",
                  price: "+$140",
                },
                {
                  label: "Matte blue finish",
                  price: "+$65",
                },
                {
                  label: "Silent spin wheels",
                  price: "+$110",
                },
                {
                  label: "Travel lock",
                  price: "+$30",
                },
              ],
              productTotalPrice: "$1385",
              productShippingText: "Express shipping available",
              button: {
                label: "View details",
                href: "#",
                variant: "primary",
              },
            },
            {
              image: "/55.jpg",
              alt: "Laptop product one",
              productTitle: "Builder Nor Showcase",
              productSubtitle: "Create the art of below",
              productInfoTitle: "Inspiration Need",
              productInfoDesc:
                "We assist travelers worldwide with every and arrivals cards. Get accurate guidance, faster processing, and reliable support before your journey begins.",
              productFeatures: [
                {
                  label: "Small suitcase",
                  price: "+$100",
                },
                {
                  label: "Cold wind color",
                  price: "+$50",
                },
                {
                  label: "360° Spin wheels",
                  price: "+$95",
                },
                {
                  label: "Fixes handle",
                  price: "0",
                },
              ],
              productTotalPrice: "$1245",
              productShippingText: "Free shipping available",
              button: {
                label: "Know more",
                href: "#",
                variant: "primary",
              },
            },
           
          ],
        },
      },
    },
  ],
};
