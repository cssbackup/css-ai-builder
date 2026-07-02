import { ComponentType } from "react";

import TopbarOne from "../components/sections/topbar/TopbarOne";
import TopbarTwo from "../components/sections/topbar/TopbarTwo";
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
  "Topbar-1": TopbarOne,
  "Topbar-2": TopbarTwo,
  "Header-1": HeaderOne,
  "Header-2": HeaderTwo,
  "Banner-1": BannerOne,
  "Banner-2": BannerTwo,
  "About-1": AboutOne,
  "About-2": AboutTwo,
  "Product-1": ProductOne,
  "Product-2": ProductTwo,
  "Product-3": ProductThree,
  "Footer-1": FooterOne,
};
