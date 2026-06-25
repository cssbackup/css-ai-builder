type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

export type ButtonData = {
  label: string;
  href: string;
};

export type SectionData = {
  logo?: string;
  menu?: MenuItem[];
  buttons?: ButtonData[];
  title?: string;
  subtitle?: string;
  length?: number;
};

export type SectionProps = {
  data: SectionData;
};