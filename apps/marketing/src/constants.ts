import { NavItem, Pillar, MethodStep, PricingTier } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'The Method', href: '#method' },
  { label: 'Franchise', href: '#franchise' },
  { label: 'Pricing', href: '#pricing' },
];

export const PILLARS: Pillar[] = [
  {
    id: 'solaris',
    name: 'Solaris',
    subtitle: 'Lead & Market Intelligence',
    description: 'Autonomous agents that scan, analyze, and predict market trends. Turn raw data into actionable growth strategies instantly.',
    icon: 'light_mode',
    color: 'text-solaris',
    colorClass: 'solaris',
    bgClass: 'bg-solaris/10',
    borderClass: 'hover:border-solaris/20'
  },
  {
    id: 'nexus',
    name: 'Nexus',
    subtitle: 'Business Logic & Automation',
    description: 'The central nervous system. Connects your tools, manages workflows, and executes complex business logic without human intervention.',
    icon: 'hub',
    color: 'text-primary',
    colorClass: 'primary',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/10 hover:border-primary/30'
  },
  {
    id: 'orbiter',
    name: 'Orbiter',
    subtitle: 'Operations & Fulfillment',
    description: 'Delivery at scale. Orbiter manages the physical and digital fulfillment layer, ensuring quality and timeliness across all deliverables.',
    icon: 'public',
    color: 'text-orbiter',
    colorClass: 'orbiter',
    bgClass: 'bg-orbiter/10',
    borderClass: 'hover:border-orbiter/20'
  }
];

export const METHOD_STEPS: MethodStep[] = [
  { number: '01', title: 'Audit', description: 'Deep dive into current operational bottlenecks.' },
  { number: '02', title: 'Tooling', description: 'Selection of best-in-class stack components.' },
  { number: '03', title: 'Automation', description: 'Implementation of Nexus logic flows.', active: true },
  { number: '04', title: 'Training', description: 'Team alignment and OS handover.' },
  { number: '05', title: 'Custom', description: 'Continuous iterative improvement loop.' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'SaaS',
    description: 'Self-service access to the core OS.',
    price: '$499',
    period: '/month',
    features: ['Access to Nexus Core', 'Basic Solaris Reports', 'Community Support'],
    cta: 'Get Started',
    buttonStyle: 'outline'
  },
  {
    name: 'White Label',
    description: 'For agencies deploying AaaS to clients.',
    price: '$2,499',
    period: '/month',
    features: ['Full Trinity Access', 'Custom Branding', 'Priority API Access', 'Dedicated Account Manager'],
    cta: 'Partner With Us',
    highlight: true,
    buttonStyle: 'primary'
  },
  {
    name: 'Franchise',
    description: 'Full operational partnership & equity.',
    price: 'Custom',
    features: ['Territory Exclusivity', 'Revenue Share Model', 'On-site Implementation'],
    cta: 'Contact Sales',
    buttonStyle: 'outline'
  }
];