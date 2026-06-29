import { ComponentType } from "react";

import HeaderOne from "../components/sections/header/HeaderOne";
import HeaderTwo from "../components/sections/header/HeaderTwo";
import BannerOne from "../components/sections/banner/BannerOne";
import BannerTwo from "../components/sections/banner/BannerTwo";
import AboutOne from "../components/sections/about/AboutOne";
import AboutTwo from "../components/sections/about/AboutTwo";
import ProductOne from "../components/sections/product/ProductOne";
import ProductTwo from "../components/sections/product/ProductTwo";
import ProductThree from "../components/sections/product/ProductThree";
import FooterOne from "../components/sections/footer/FooterOne";

import { SectionProps } from "../types/section";

export const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  "header-1": HeaderOne,
  "header-2": HeaderTwo,
  "banner-1": BannerOne,
  "banner-2": BannerTwo,
  "about-1": AboutOne,
  "about-2": AboutTwo,
  "product-1": ProductOne,
  "product-2": ProductTwo,
  "product-3": ProductThree,
  "footer-1": FooterOne,
};
