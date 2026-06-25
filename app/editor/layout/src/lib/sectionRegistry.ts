import { ComponentType } from "react";

import HeaderOne from "../components/sections/header/HeaderOne";
import HeaderTwo from "../components/sections/header/HeaderTwo";
import BannerOne from "../components/sections/banner/BannerOne";
import BannerTwo from "../components/sections/banner/BannerTwo";

import { SectionProps } from "../types/section";

export const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  "header-1": HeaderOne,
  "header-2": HeaderTwo,
  "banner-1": BannerOne,
  "banner-2": BannerTwo,
};