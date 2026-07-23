import { ComponentType } from "react";

import TopbarOne from "../components/sections/topbar/TopbarOne";
import TopbarTwo from "../components/sections/topbar/TopbarTwo";
import HeaderOne from "../components/sections/header/HeaderOne";
import HeaderTwo from "../components/sections/header/HeaderTwo";
import BannerOne from "../components/sections/banner/BannerOne";
import BannerTwo from "../components/sections/banner/BannerTwo";
import BannerThree from "../components/sections/banner/BannerThree";
import BannerFour from "../components/sections/banner/BannerFour";
import BusinessBanner1 from "../components/sections/banner/BusinessBanner1";
import EcommerceBanner1 from "../components/sections/banner/EcommerceBanner1";
import AboutOne from "../components/sections/about/AboutOne";
import AboutTwo from "../components/sections/about/AboutTwo";
import AboutPage from "../components/sections/about/AboutPage";
import AboutPageTwo from "../components/sections/about/AboutPageTwo";
import AboutPageThree from "../components/sections/about/AboutPageThree";
import ServicePage from "../components/sections/service/ServicePage";
import ProductOne from "../components/sections/product/ProductOne";
import ProductTwo from "../components/sections/product/ProductTwo";
import ProductThree from "../components/sections/product/ProductThree";
import WhyChooseUsOne from "../components/sections/whychooseus/WhyChooseUsOne";
import WhyChooseUsTwo from "../components/sections/whychooseus/WhyChooseUsTwo";
import WhyChooseUsThree from "../components/sections/whychooseus/WhyChooseUsThree";
import WhyChooseUsFour from "../components/sections/whychooseus/WhyChooseUsFour";
import GalleryOne from "../components/sections/gallery/GalleryOne";
import GalleryTwo from "../components/sections/gallery/GalleryTwo";
import GalleryThree from "../components/sections/gallery/GalleryThree";
import GalleryFour from "../components/sections/gallery/GalleryFour";
import GalleryFive from "../components/sections/gallery/GalleryFive";
import GallerySix from "../components/sections/gallery/GallerySix";
import GalleryPage from "../components/sections/gallery/GalleryPage";
import ContactPage from "../components/sections/contact/ContactPage";
import ContactPageTwo from "../components/sections/contact/ContactPageTwo";
import FormDetailOne from "../components/sections/formdetail/FormDetailOne";
import FormDetailTwo from "../components/sections/formdetail/FormDetailTwo";
import FormDetailThree from "../components/sections/formdetail/FormDetailThree";
import FormDetailFour from "../components/sections/formdetail/FormDetailFour";
import FaqOne from "../components/sections/faq/FaqOne";
import FaqTwo from "../components/sections/faq/FaqTwo";
import FaqThree from "../components/sections/faq/FaqThree";
import FaqFour from "../components/sections/faq/FaqFour";
import TestimonialOne from "../components/sections/testimonial/TestimonialOne";
import TestimonialTwo from "../components/sections/testimonial/TestimonialTwo";
import TestimonialThree from "../components/sections/testimonial/TestimonialThree";
import FooterOne from "../components/sections/footer/FooterOne";

import { SectionProps } from "../types/section";

export const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  "Topbar-1": TopbarOne,
  "Topbar-2": TopbarTwo,
  "Header-1": HeaderOne,
  "Header-2": HeaderTwo,
  "Banner-1": BannerOne,
  "Banner-2": BannerTwo,
  "Banner-3": BannerThree,
  "Banner-4": BannerFour,
  "BusinessBanner1": BusinessBanner1,
  "EcommerceBanner1": EcommerceBanner1,
  "About-1": AboutOne,
  "About-2": AboutTwo,
  "AboutPage-1": AboutPage,
  "AboutPage-2": AboutPageTwo,
  "AboutPage-3": AboutPageThree,
  "ServicePage-1": ServicePage,
  "Product-1": ProductOne,
  "Product-2": ProductTwo,
  "Product-3": ProductThree,
  "WhyChooseUs-1": WhyChooseUsOne,
  "WhyChooseUs-2": WhyChooseUsTwo,
  "WhyChooseUs-3": WhyChooseUsThree,
  "WhyChooseUs-4": WhyChooseUsFour,
  "Gallery-1": GalleryOne,
  "Gallery-2": GalleryTwo,
  "Gallery-3": GalleryThree,
  "Gallery-4": GalleryFour,
  "Gallery-5": GalleryFive,
  "Gallery-6": GallerySix,
  "GalleryPage-1": GalleryPage,
  "ContactPage-1": ContactPage,
  "ContactPage-2": ContactPageTwo,
  "FormDetail-1": FormDetailOne,
  "FormDetail-2": FormDetailTwo,
  "FormDetail-3": FormDetailThree,
  "FormDetail-4": FormDetailFour,
  "FAQ-1": FaqOne,
  "FAQ-2": FaqTwo,
  "FAQ-3": FaqThree,
  "FAQ-4": FaqFour,
  "Testimonial-1": TestimonialOne,
  "Testimonial-2": TestimonialTwo,
  "Testimonial-3": TestimonialThree,
  "Footer-1": FooterOne,
};
