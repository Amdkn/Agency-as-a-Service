export interface NavItem {
  label: string;
  href: string;
  type?: PageType;
}

export type PageType = 'home' | 'solaris' | 'nexus' | 'orbiter' | 'login';

export interface Pillar {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  buttonStyle: 'primary' | 'outline';
}