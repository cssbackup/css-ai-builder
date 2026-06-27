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
};

export type SectionProps = {
  data: SectionData;
};
