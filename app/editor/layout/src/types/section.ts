type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

export type ButtonData = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ProductImageData = {
  image: string;
  alt: string;
};

export type ProductFeatureData = {
  label: string;
  price: string;
};

export type ProductSlideData = {
  image: string;
  alt: string;
  productTitle: string;
  productSubtitle: string;
  productInfoTitle: string;
  productInfoDesc: string;
  productFeatures: ProductFeatureData[];
  productTotalPrice: string;
  productShippingText: string;
  button?: ButtonData;
};

export type ProductCardData = {
  title: string;
  category: string;
  desc: string;
  image: string;
  alt?: string;
  imageTitle?: string;
};

export type SectionData = {
  logo?: string;
  menu?: MenuItem[];
  buttons?: ButtonData[];

  headerBackgroundType?: "solid" | "gradient";
  headerBackgroundColor?: string;
  headerGradientColor?: string;

  pretitle?: string;
  title?: string;
  subtitle?: string;

  backgroundImage?: string;
  backgroundImageTitle: string;

  eyebrowColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  overlayColor?: string;

  desc?: string;

  buttonBackground?: string;
  buttonColor?: string;

  length?: number;
  sideImage?: string;
  sideImageTitle?: string;
  philosophyTitle?: string;
  philosophyDesc?: string;

  productImages?: ProductImageData[];
  productTitle?: string;
  productSubtitle?: string;
  productInfoTitle?: string;
  productInfoDesc?: string;
  productFeatures?: ProductFeatureData[];
  productTotalPrice?: string;
  productShippingText?: string;
  productSlides?: ProductSlideData[];
  productSectionTitle?: string;
  productItems?: ProductCardData[];
};

export type SectionProps = {
  data: SectionData;
};
