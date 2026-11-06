export interface GeneratorRequest {
  name: string;
  description: string;
  email: string;
}

export interface WebsiteSectionService {
  title: string;
  description: string;
  icon: 'star' | 'check' | 'shield' | 'zap' | 'chart' | 'heart';
}

export interface WebsiteFaq {
  question: string;
  answer: string;
}

export interface WebsiteStat {
  value: string;
  label: string;
}

export interface ThemeConfig {
  accentColor: string; // Hex color
  bgMode: 'light' | 'dark' | 'warm' | 'slate';
  fontHeading: string;
  fontBody: string;
  fontUrl: string;
  heroLayout: 'split' | 'centered' | 'badge-minimal' | 'fullwidth-cinematic' | 'bold-typography';
  cardLayout: 'cards' | 'bento' | 'editorial-list' | 'grid-2x2';
  navStyle: 'pill' | 'edge-to-edge';
  aboutLayout: 'split-photo' | 'stats-matrix';
}

export interface WebsiteContent {
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroSecondaryCtaText?: string;
  aboutTitle: string;
  aboutText: string;
  servicesTitle: string;
  servicesSubtitle?: string;
  services: WebsiteSectionService[];
  faqTitle: string;
  faqs: WebsiteFaq[];
  contactTitle: string;
  contactSubtitle: string;
  heroImage?: string;
  aboutImage?: string;
  stats?: WebsiteStat[];
  email: string;
  companyName: string;
  theme: ThemeConfig;
}

export interface GeneratorResponse {
  success: boolean;
  html: string;
  content: WebsiteContent;
  error?: string;
}
