import HeaderOne from "../header/HeaderOne";
import HeaderTwo from "../header/HeaderTwo";
import TopbarOne from "../topbar/TopbarOne";
import TopbarTwo from "../topbar/TopbarTwo";
import BannerOne from "../banner/BannerOne";
import BannerTwo from "../banner/BannerTwo";
import BannerThree from "../banner/BannerThree";
import BannerFour from "../banner/BannerFour";
import AboutOne from "../about/AboutOne";
import AboutTwo from "../about/AboutTwo";
import ProductOne from "../product/ProductOne";
import ProductTwo from "../product/ProductTwo";
import ProductThree from "../product/ProductThree";
import FooterOne from "../footer/FooterOne";
import type { LayoutComponent } from "../types/section";

export const layoutRegistry: Record<string, LayoutComponent> = {
  "header-one": HeaderOne,
  "header-two": HeaderTwo,
  "topbar-one": TopbarOne,
  "topbar-two": TopbarTwo,
  "banner-one": BannerOne,
  "banner-two": BannerTwo,
  "banner-three": BannerThree,
  "banner-four": BannerFour,
  "about-one": AboutOne,
  "about-two": AboutTwo,
  "product-one": ProductOne,
  "product-two": ProductTwo,
  "product-three": ProductThree,
  "footer-one": FooterOne,
};
