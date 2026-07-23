import { ComponentType } from "react";

import { getCategorySectionVariant } from "./categorySectionVariant";
import TopbarOne from "../components/sections/topbar/TopbarOne";
import TopbarTwo from "../components/sections/topbar/TopbarTwo";
import BusinessTopbar1 from "../components/sections/topbar/BusinessTopbar1";
import BusinessTopbar2 from "../components/sections/topbar/BusinessTopbar2";
import RealEstateTopbar1 from "../components/sections/topbar/RealEstateTopbar1";
import RealEstateTopbar2 from "../components/sections/topbar/RealEstateTopbar2";
import SchoolTopbar1 from "../components/sections/topbar/SchoolTopbar1";
import SchoolTopbar2 from "../components/sections/topbar/SchoolTopbar2";
import EcommerceTopbar1 from "../components/sections/topbar/EcommerceTopbar1";
import EcommerceTopbar2 from "../components/sections/topbar/EcommerceTopbar2";
import HeaderOne from "../components/sections/header/HeaderOne";
import HeaderTwo from "../components/sections/header/HeaderTwo";
import BusinessHeader1 from "../components/sections/header/BusinessHeader1";
import BusinessHeader2 from "../components/sections/header/BusinessHeader2";
import RealEstateHeader1 from "../components/sections/header/RealEstateHeader1";
import RealEstateHeader2 from "../components/sections/header/RealEstateHeader2";
import SchoolHeader1 from "../components/sections/header/SchoolHeader1";
import SchoolHeader2 from "../components/sections/header/SchoolHeader2";
import EcommerceHeader1 from "../components/sections/header/EcommerceHeader1";
import EcommerceHeader2 from "../components/sections/header/EcommerceHeader2";
import BannerOne from "../components/sections/banner/BannerOne";
import BannerTwo from "../components/sections/banner/BannerTwo";
import BannerThree from "../components/sections/banner/BannerThree";
import BannerFour from "../components/sections/banner/BannerFour";
import BusinessBanner1 from "../components/sections/banner/BusinessBanner1";
import BusinessBanner2 from "../components/sections/banner/BusinessBanner2";
import RealEstateBanner1 from "../components/sections/banner/RealEstateBanner1";
import RealEstateBanner2 from "../components/sections/banner/RealEstateBanner2";
import EcommerceBanner1 from "../components/sections/banner/EcommerceBanner1";
import EcommerceBanner2 from "../components/sections/banner/EcommerceBanner2";
import SchoolBanner1 from "../components/sections/banner/SchoolBanner1";
import SchoolBanner2 from "../components/sections/banner/SchoolBanner2";
import AboutOne from "../components/sections/about/AboutOne";
import AboutTwo from "../components/sections/about/AboutTwo";
import BusinessAbout1 from "../components/sections/about/BusinessAbout1";
import BusinessAbout2 from "../components/sections/about/BusinessAbout2";
import RealEstateAbout1 from "../components/sections/about/RealEstateAbout1";
import RealEstateAbout2 from "../components/sections/about/RealEstateAbout2";
import SchoolAbout1 from "../components/sections/about/SchoolAbout1";
import SchoolAbout2 from "../components/sections/about/SchoolAbout2";
import EcommerceAbout1 from "../components/sections/about/EcommerceAbout1";
import EcommerceAbout2 from "../components/sections/about/EcommerceAbout2";
import AboutPage from "../components/sections/about/AboutPage";
import AboutPageTwo from "../components/sections/about/AboutPageTwo";
import AboutPageThree from "../components/sections/about/AboutPageThree";
import ServicePage from "../components/sections/service/ServicePage";
import ProductOne from "../components/sections/product/ProductOne";
import ProductTwo from "../components/sections/product/ProductTwo";
import ProductThree from "../components/sections/product/ProductThree";
import BusinessProduct1 from "../components/sections/product/BusinessProduct1";
import BusinessProduct2 from "../components/sections/product/BusinessProduct2";
import RealEstateProduct1 from "../components/sections/product/RealEstateProduct1";
import RealEstateProduct2 from "../components/sections/product/RealEstateProduct2";
import SchoolProduct1 from "../components/sections/product/SchoolProduct1";
import SchoolProduct2 from "../components/sections/product/SchoolProduct2";
import EcommerceProduct1 from "../components/sections/product/EcommerceProduct1";
import EcommerceProduct2 from "../components/sections/product/EcommerceProduct2";
import WhyChooseUsOne from "../components/sections/whychooseus/WhyChooseUsOne";
import WhyChooseUsTwo from "../components/sections/whychooseus/WhyChooseUsTwo";
import WhyChooseUsThree from "../components/sections/whychooseus/WhyChooseUsThree";
import WhyChooseUsFour from "../components/sections/whychooseus/WhyChooseUsFour";
import BusinessWhyChooseUs1 from "../components/sections/whychooseus/BusinessWhyChooseUs1";
import BusinessWhyChooseUs2 from "../components/sections/whychooseus/BusinessWhyChooseUs2";
import RealEstateWhyChooseUs1 from "../components/sections/whychooseus/RealEstateWhyChooseUs1";
import RealEstateWhyChooseUs2 from "../components/sections/whychooseus/RealEstateWhyChooseUs2";
import SchoolWhyChooseUs1 from "../components/sections/whychooseus/SchoolWhyChooseUs1";
import SchoolWhyChooseUs2 from "../components/sections/whychooseus/SchoolWhyChooseUs2";
import EcommerceWhyChooseUs1 from "../components/sections/whychooseus/EcommerceWhyChooseUs1";
import EcommerceWhyChooseUs2 from "../components/sections/whychooseus/EcommerceWhyChooseUs2";
import GalleryOne from "../components/sections/gallery/GalleryOne";
import GalleryTwo from "../components/sections/gallery/GalleryTwo";
import GalleryThree from "../components/sections/gallery/GalleryThree";
import GalleryFour from "../components/sections/gallery/GalleryFour";
import GalleryFive from "../components/sections/gallery/GalleryFive";
import GallerySix from "../components/sections/gallery/GallerySix";
import BusinessGallery1 from "../components/sections/gallery/BusinessGallery1";
import BusinessGallery2 from "../components/sections/gallery/BusinessGallery2";
import RealEstateGallery1 from "../components/sections/gallery/RealEstateGallery1";
import RealEstateGallery2 from "../components/sections/gallery/RealEstateGallery2";
import SchoolGallery1 from "../components/sections/gallery/SchoolGallery1";
import SchoolGallery2 from "../components/sections/gallery/SchoolGallery2";
import EcommerceGallery1 from "../components/sections/gallery/EcommerceGallery1";
import EcommerceGallery2 from "../components/sections/gallery/EcommerceGallery2";
import GalleryPage from "../components/sections/gallery/GalleryPage";
import ContactPage from "../components/sections/contact/ContactPage";
import ContactPageTwo from "../components/sections/contact/ContactPageTwo";
import FormDetailOne from "../components/sections/formdetail/FormDetailOne";
import FormDetailTwo from "../components/sections/formdetail/FormDetailTwo";
import FormDetailThree from "../components/sections/formdetail/FormDetailThree";
import FormDetailFour from "../components/sections/formdetail/FormDetailFour";
import BusinessFormDetail1 from "../components/sections/formdetail/BusinessFormDetail1";
import BusinessFormDetail2 from "../components/sections/formdetail/BusinessFormDetail2";
import RealEstateFormDetail1 from "../components/sections/formdetail/RealEstateFormDetail1";
import RealEstateFormDetail2 from "../components/sections/formdetail/RealEstateFormDetail2";
import SchoolFormDetail1 from "../components/sections/formdetail/SchoolFormDetail1";
import SchoolFormDetail2 from "../components/sections/formdetail/SchoolFormDetail2";
import EcommerceFormDetail1 from "../components/sections/formdetail/EcommerceFormDetail1";
import EcommerceFormDetail2 from "../components/sections/formdetail/EcommerceFormDetail2";
import FaqOne from "../components/sections/faq/FaqOne";
import FaqTwo from "../components/sections/faq/FaqTwo";
import FaqThree from "../components/sections/faq/FaqThree";
import FaqFour from "../components/sections/faq/FaqFour";
import BusinessFAQ1 from "../components/sections/faq/BusinessFAQ1";
import BusinessFAQ2 from "../components/sections/faq/BusinessFAQ2";
import RealEstateFAQ1 from "../components/sections/faq/RealEstateFAQ1";
import RealEstateFAQ2 from "../components/sections/faq/RealEstateFAQ2";
import SchoolFAQ1 from "../components/sections/faq/SchoolFAQ1";
import SchoolFAQ2 from "../components/sections/faq/SchoolFAQ2";
import EcommerceFAQ1 from "../components/sections/faq/EcommerceFAQ1";
import EcommerceFAQ2 from "../components/sections/faq/EcommerceFAQ2";
import BusinessMarquee1 from "../components/sections/marquee/BusinessMarquee1";
import BusinessMarquee2 from "../components/sections/marquee/BusinessMarquee2";
import EcommerceMarquee1 from "../components/sections/marquee/EcommerceMarquee1";
import EcommerceMarquee2 from "../components/sections/marquee/EcommerceMarquee2";
import TestimonialOne from "../components/sections/testimonial/TestimonialOne";
import TestimonialTwo from "../components/sections/testimonial/TestimonialTwo";
import TestimonialThree from "../components/sections/testimonial/TestimonialThree";
import BusinessTestimonial1 from "../components/sections/testimonial/BusinessTestimonial1";
import BusinessTestimonial2 from "../components/sections/testimonial/BusinessTestimonial2";
import RealEstateTestimonial1 from "../components/sections/testimonial/RealEstateTestimonial1";
import RealEstateTestimonial2 from "../components/sections/testimonial/RealEstateTestimonial2";
import SchoolTestimonial1 from "../components/sections/testimonial/SchoolTestimonial1";
import SchoolTestimonial2 from "../components/sections/testimonial/SchoolTestimonial2";
import EcommerceTestimonial1 from "../components/sections/testimonial/EcommerceTestimonial1";
import EcommerceTestimonial2 from "../components/sections/testimonial/EcommerceTestimonial2";
import FooterOne from "../components/sections/footer/FooterOne";
import BusinessFooter1 from "../components/sections/footer/BusinessFooter1";
import BusinessFooter2 from "../components/sections/footer/BusinessFooter2";
import RealEstateFooter1 from "../components/sections/footer/RealEstateFooter1";
import RealEstateFooter2 from "../components/sections/footer/RealEstateFooter2";
import SchoolFooter1 from "../components/sections/footer/SchoolFooter1";
import SchoolFooter2 from "../components/sections/footer/SchoolFooter2";
import EcommerceFooter1 from "../components/sections/footer/EcommerceFooter1";
import EcommerceFooter2 from "../components/sections/footer/EcommerceFooter2";

import { SectionProps } from "../types/section";

export const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  "Topbar-1": TopbarOne,
  "Topbar-2": TopbarTwo,
  BusinessTopbar1,
  BusinessTopbar2,
  RealEstateTopbar1,
  RealEstateTopbar2,
  SchoolTopbar1,
  SchoolTopbar2,
  EcommerceTopbar1,
  EcommerceTopbar2,
  "Header-1": HeaderOne,
  "Header-2": HeaderTwo,
  BusinessHeader1,
  BusinessHeader2,
  RealEstateHeader1,
  RealEstateHeader2,
  SchoolHeader1,
  SchoolHeader2,
  EcommerceHeader1,
  EcommerceHeader2,
  "Banner-1": BannerOne,
  "Banner-2": BannerTwo,
  "Banner-3": BannerThree,
  "Banner-4": BannerFour,
  "BusinessBanner1": BusinessBanner1,
  BusinessBanner2,
  RealEstateBanner1,
  RealEstateBanner2,
  "EcommerceBanner1": EcommerceBanner1,
  EcommerceBanner2,
  SchoolBanner1,
  SchoolBanner2,
  "About-1": AboutOne,
  "About-2": AboutTwo,
  BusinessAbout1,
  BusinessAbout2,
  RealEstateAbout1,
  RealEstateAbout2,
  SchoolAbout1,
  SchoolAbout2,
  EcommerceAbout1,
  EcommerceAbout2,
  "AboutPage-1": AboutPage,
  "AboutPage-2": AboutPageTwo,
  "AboutPage-3": AboutPageThree,
  "ServicePage-1": ServicePage,
  "Product-1": ProductOne,
  "Product-2": ProductTwo,
  "Product-3": ProductThree,
  BusinessProduct1,
  BusinessProduct2,
  RealEstateProduct1,
  RealEstateProduct2,
  SchoolProduct1,
  SchoolProduct2,
  EcommerceProduct1,
  EcommerceProduct2,
  "WhyChooseUs-1": WhyChooseUsOne,
  "WhyChooseUs-2": WhyChooseUsTwo,
  "WhyChooseUs-3": WhyChooseUsThree,
  "WhyChooseUs-4": WhyChooseUsFour,
  BusinessWhyChooseUs1,
  BusinessWhyChooseUs2,
  RealEstateWhyChooseUs1,
  RealEstateWhyChooseUs2,
  SchoolWhyChooseUs1,
  SchoolWhyChooseUs2,
  EcommerceWhyChooseUs1,
  EcommerceWhyChooseUs2,
  "Gallery-1": GalleryOne,
  "Gallery-2": GalleryTwo,
  "Gallery-3": GalleryThree,
  "Gallery-4": GalleryFour,
  "Gallery-5": GalleryFive,
  "Gallery-6": GallerySix,
  BusinessGallery1,
  BusinessGallery2,
  RealEstateGallery1,
  RealEstateGallery2,
  SchoolGallery1,
  SchoolGallery2,
  EcommerceGallery1,
  EcommerceGallery2,
  "GalleryPage-1": GalleryPage,
  "ContactPage-1": ContactPage,
  "ContactPage-2": ContactPageTwo,
  "FormDetail-1": FormDetailOne,
  "FormDetail-2": FormDetailTwo,
  "FormDetail-3": FormDetailThree,
  "FormDetail-4": FormDetailFour,
  BusinessFormDetail1,
  BusinessFormDetail2,
  RealEstateFormDetail1,
  RealEstateFormDetail2,
  SchoolFormDetail1,
  SchoolFormDetail2,
  EcommerceFormDetail1,
  EcommerceFormDetail2,
  "FAQ-1": FaqOne,
  "FAQ-2": FaqTwo,
  "FAQ-3": FaqThree,
  "FAQ-4": FaqFour,
  BusinessFAQ1,
  BusinessFAQ2,
  RealEstateFAQ1,
  RealEstateFAQ2,
  SchoolFAQ1,
  SchoolFAQ2,
  EcommerceFAQ1,
  EcommerceFAQ2,
  BusinessMarquee1,
  BusinessMarquee2,
  EcommerceMarquee1,
  EcommerceMarquee2,
  "Testimonial-1": TestimonialOne,
  "Testimonial-2": TestimonialTwo,
  "Testimonial-3": TestimonialThree,
  BusinessTestimonial1,
  BusinessTestimonial2,
  RealEstateTestimonial1,
  RealEstateTestimonial2,
  SchoolTestimonial1,
  SchoolTestimonial2,
  EcommerceTestimonial1,
  EcommerceTestimonial2,
  "Footer-1": FooterOne,
  BusinessFooter1,
  BusinessFooter2,
  RealEstateFooter1,
  RealEstateFooter2,
  SchoolFooter1,
  SchoolFooter2,
  EcommerceFooter1,
  EcommerceFooter2,
};

export const getSectionComponent = (
  category: string,
  sectionType: string,
  templateVariant: string,
) => {
  if (
    sectionType === "Banner" &&
    (templateVariant === "Banner-3" || templateVariant === "Banner-4")
  ) {
    return sectionRegistry[templateVariant];
  }

  const categoryVariant = getCategorySectionVariant(
    category,
    sectionType,
    templateVariant,
  );

  return sectionRegistry[categoryVariant] ?? sectionRegistry[templateVariant];
};
