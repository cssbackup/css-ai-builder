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
          desc:
            "Google AI Studio is the fast path for developers, students, and researchers who want to try Gemini models and start building with the Gemini Developer API. We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
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
          desc:
            "You can build AI agents with Gemini Enterprise Agent Platform. Get started by exploring Agent Garden for pre-built, customizable blueprints, complete with source code and configuration files.",
         
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
      type:"about",
      variant:"about-1",
      data:{
        "about-1":{
          pretitle:"Know more of us",
          title:"About Us",
          desc:"Google AI Studio is the fast path for developers, students, and researchers who want to try Gemini models and start building with the Gemini Developer API. We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
          desc2:"This integration can help you spend less time on infrastructure management and more time on refining your models to solve complex business problems.",
          backgroundImage:"/bg2.jpg",
          backgroundImageTitle:"About image",
          buttons:[
            {
              label:"Contact Us",
              href:"#"
            }
          ]
        },
        "about-2":{
          pretitle:"Know more of us",
          title:"About Us",
          desc:"Google AI Studio is the fast path for developers, students, and researchers who want to try Gemini models and start building with the Gemini Developer API. We also offer free tools for common AI use cases, including translation, image and video analysis, speech-to-text, and more.",
          desc2:"This integration can help you spend less time on infrastructure management and more time on refining your models to solve complex business problems.",
          backgroundImage:"/bg2.jpg",
          backgroundImageTitle:"About image",
          buttons:[
            {
              label:"Contact Us",
              href:"#"
            }
          ]
        }
      }
    }
  ],
};
