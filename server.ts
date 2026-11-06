import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateStandaloneHtml } from './src/lib/htmlTemplate.ts';
import { WebsiteContent, ThemeConfig } from './src/types/generator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Library of 12 distinct design styles across light, dark, warm, and slate modes
const THEME_VARIANTS: Array<{
  accentColor: string;
  bgMode: 'light' | 'dark' | 'warm' | 'slate';
  fontHeading: string;
  fontBody: string;
  fontUrl: string;
}> = [
  {
    // 1. Royal Electric Blue (Modern Clean Light)
    accentColor: '#2563eb',
    bgMode: 'light',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  {
    // 2. Obsidian & Cyber Cyan (Midnight Tech)
    accentColor: '#06b6d4',
    bgMode: 'dark',
    fontHeading: 'Outfit',
    fontBody: 'Outfit',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
  },
  {
    // 3. Tuscan Terracotta & Cream (Warm Editorial Boutique)
    accentColor: '#c25e34',
    bgMode: 'warm',
    fontHeading: 'Playfair Display',
    fontBody: 'DM Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap',
  },
  {
    // 4. Executive Navy & Steel (Corporate Enterprise)
    accentColor: '#0f2b48',
    bgMode: 'slate',
    fontHeading: 'Manrope',
    fontBody: 'Manrope',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
  },
  {
    // 5. Nordic Emerald & Sage (Fresh Professional)
    accentColor: '#059669',
    bgMode: 'light',
    fontHeading: 'DM Sans',
    fontBody: 'DM Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
  },
  {
    // 6. Bold Crimson & Carbon (High-Energy Contrast)
    accentColor: '#e11d48',
    bgMode: 'dark',
    fontHeading: 'Outfit',
    fontBody: 'Outfit',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
  },
  {
    // 7. Studio Violet & Indigo (Creative Modern)
    accentColor: '#7c3aed',
    bgMode: 'light',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  {
    // 8. Luxury Amber & Charcoal (Prestigious Craft)
    accentColor: '#d97706',
    bgMode: 'dark',
    fontHeading: 'Manrope',
    fontBody: 'Manrope',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
  },
  {
    // 9. Pacific Deep Teal (Clean Clinical & Engineering)
    accentColor: '#0d9488',
    bgMode: 'slate',
    fontHeading: 'Manrope',
    fontBody: 'Manrope',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
  },
  {
    // 10. Sunset Flame & Warm Slate (Dynamic Industrial)
    accentColor: '#ea580c',
    bgMode: 'light',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  {
    // 11. Minimalist Obsidian Mono (Swiss Modernism)
    accentColor: '#18181b',
    bgMode: 'light',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  {
    // 12. Emerald Cyber Matrix (Dark Tech & Craft)
    accentColor: '#10b981',
    bgMode: 'dark',
    fontHeading: 'Outfit',
    fontBody: 'Outfit',
    fontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
  },
];

const HERO_LAYOUTS: Array<'split' | 'centered' | 'fullwidth-cinematic' | 'bold-typography' | 'badge-minimal'> = [
  'split',
  'centered',
  'fullwidth-cinematic',
  'bold-typography',
  'badge-minimal',
];

const CARD_LAYOUTS: Array<'cards' | 'bento' | 'editorial-list' | 'grid-2x2'> = [
  'cards',
  'bento',
  'editorial-list',
  'grid-2x2',
];

const NAV_STYLES: Array<'pill' | 'edge-to-edge'> = ['pill', 'edge-to-edge'];
const ABOUT_LAYOUTS: Array<'split-photo' | 'stats-matrix'> = ['split-photo', 'stats-matrix'];

// High-availability image banks for industries
function detectNicheImages(name: string, description: string): { heroImage: string; aboutImage: string } {
  const combined = (name + ' ' + description).toLowerCase();

  // 1. Concrete / Construction / Masonry / Buildings & Dwellings
  if (
    combined.includes('beton') || 
    combined.includes('concrete') || 
    combined.includes('building') || 
    combined.includes('dwelling') || 
    combined.includes('construct') || 
    combined.includes('будів') || 
    combined.includes('ремонт') ||
    combined.includes('masonry')
  ) {
    const constructionHeroes = [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ];
    const constructionAbouts = [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    ];
    return {
      heroImage: constructionHeroes[Math.floor(Math.random() * constructionHeroes.length)],
      aboutImage: constructionAbouts[Math.floor(Math.random() * constructionAbouts.length)],
    };
  }

  // 2. Automotive / Detailing / Repair
  if (combined.includes('auto') || combined.includes('car') || combined.includes('detail') || combined.includes('авто') || combined.includes('машин')) {
    const autoHeroes = [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    ];
    return {
      heroImage: autoHeroes[Math.floor(Math.random() * autoHeroes.length)],
      aboutImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 3. Cafe / Bakery / Coffee / Restaurant / Food
  if (combined.includes('coffee') || combined.includes('cafe') || combined.includes('bakery') || combined.includes('кав') || combined.includes('пекарн')) {
    const cafeHeroes = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
    ];
    return {
      heroImage: cafeHeroes[Math.floor(Math.random() * cafeHeroes.length)],
      aboutImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 4. IT / Software / Tech / Web
  if (combined.includes('code') || combined.includes('tech') || combined.includes('software') || combined.includes('web') || combined.includes('digital') || combined.includes('розроб')) {
    const techHeroes = [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    ];
    return {
      heroImage: techHeroes[Math.floor(Math.random() * techHeroes.length)],
      aboutImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 5. Legal / Law / Consulting / Corporate
  if (combined.includes('law') || combined.includes('legal') || combined.includes('consult') || combined.includes('юрист') || combined.includes('адвокат')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      aboutImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    };
  }

  // Default: modern architectural structure
  const defaultHeroes = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  ];
  return {
    heroImage: defaultHeroes[Math.floor(Math.random() * defaultHeroes.length)],
    aboutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  };
}

// Procedural generator that creates rich English websites with randomized layout & styling variations
function generateDiverseEnglishContent(name: string, description: string, email: string): WebsiteContent {
  const themeIndex = Math.floor(Math.random() * THEME_VARIANTS.length);
  const selectedVariant = THEME_VARIANTS[themeIndex];

  const heroLayout = HERO_LAYOUTS[Math.floor(Math.random() * HERO_LAYOUTS.length)];
  const cardLayout = CARD_LAYOUTS[Math.floor(Math.random() * CARD_LAYOUTS.length)];
  const navStyle = NAV_STYLES[Math.floor(Math.random() * NAV_STYLES.length)];
  const aboutLayout = ABOUT_LAYOUTS[Math.floor(Math.random() * ABOUT_LAYOUTS.length)];

  const theme: ThemeConfig = {
    ...selectedVariant,
    heroLayout,
    cardLayout,
    navStyle,
    aboutLayout,
  };

  const images = detectNicheImages(name, description);

  // Diverse headlines in English
  const headlineTemplates = [
    `Building the Future with Precision: ${name}`,
    `Transforming Vision into Concrete Results with ${name}`,
    `Next-Generation Reliability & Master Craftsmanship by ${name}`,
    `${name} — Setting the Standard in Industry Excellence`,
    `Engineered for Strength, Built for Tomorrow: ${name}`,
    `Your Strategic Execution Partner: ${name}`,
  ];
  const heroHeadline = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];

  const taglines = [
    'Industry-Standard Excellence',
    'Certified Engineering & Service',
    'Dedicated Craftsmanship & Precision',
    'Proven Reliability, Built to Last',
    'Superior Execution & Support',
  ];
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];

  const heroSubheadline = description.length > 20 
    ? description 
    : `${name} provides premier industry solutions, rigorous standards compliance, and personalized attention across every project stage.`;

  return {
    metaTitle: `${name} | Official Website & Industry Services`,
    metaDescription: `${name} delivers specialized high-caliber services. Contact us today at ${email} for inquiries and quotes.`,
    tagline,
    heroHeadline,
    heroSubheadline,
    heroCtaText: 'Get in Touch',
    heroSecondaryCtaText: 'View Capabilities',
    aboutTitle: `About ${name}`,
    aboutText: `At ${name}, we take immense pride in delivering resilient, high-performance solutions. Founded on principles of integrity, technical mastery, and punctual execution, our team brings dedicated oversight to every engagement. From preliminary planning through full-scale completion, we ensure seamless communication, superior materials, and dependable post-delivery assurance.`,
    servicesTitle: 'Specialized Capabilities & Offerings',
    servicesSubtitle: 'Comprehensive solutions crafted to meet the highest industry benchmarks.',
    services: [
      {
        title: 'Precision Construction & Execution',
        description: 'End-to-end management ensuring maximum structural integrity, accuracy, and compliance with modern standards.',
        icon: 'shield',
      },
      {
        title: 'Customized Project Engineering',
        description: 'Tailored workflows designed to meet specific architectural, spatial, and technical requirements.',
        icon: 'zap',
      },
      {
        title: 'Quality Assurance & Longevity',
        description: 'Rigorous inspection standards and high-grade materials to ensure lasting durability and client satisfaction.',
        icon: 'star',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: `How can I get started with ${name}?`,
        answer: `Simply submit an inquiry via our contact form below or reach out directly to ${email}. Our team will review your requirements and respond within 24 hours.`,
      },
      {
        question: 'What is your typical project timeline?',
        answer: 'Timelines are determined by project scale and scope. During our initial consultation, we outline a transparent schedule with guaranteed milestones.',
      },
      {
        question: 'Do you offer customized proposals and quotes?',
        answer: 'Yes, we provide itemized, competitive pricing tailored specifically to the parameters of your project.',
      },
      {
        question: 'What quality standards and guarantees do you offer?',
        answer: 'All our work conforms to strict regulatory codes and is supported by dedicated post-completion warranty coverage.',
      },
    ],
    contactTitle: `Connect with ${name}`,
    contactSubtitle: `Ready to move forward or have a question? Leave a message or write to us directly at ${email}`,
    heroImage: images.heroImage,
    aboutImage: images.aboutImage,
    email: email.trim(),
    companyName: name.trim(),
    theme,
  };
}

// API endpoint for website generation
app.post('/api/generate', async (req, res) => {
  try {
    const { name, description, email } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: "Please enter your company or brand name." });
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ success: false, error: "Please provide a company description." });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: "Please provide a valid contact email address." });
    }

    const companyName = name.trim();
    const companyDesc = description.trim();
    const contactEmail = email.trim();

    let websiteContent: WebsiteContent;

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are a world-class web designer and conversion copywriter.
Generate an entire landing page for a business.
CRITICAL MANDATORY REQUIREMENT: THE WEBSITE CONTENT MUST BE 100% IN ENGLISH.
Even if the input company name or description is written in Ukrainian, Serbian, or any other language, translate and adapt all generated content into fluent, natural, professional ENGLISH.

Input Business Details:
- Company Name: "${companyName}"
- Description / Industry: "${companyDesc}"
- Contact Email: "${contactEmail}"

Guidelines:
1. All titles, headlines, descriptions, button labels, services, and FAQ questions/answers must be in ENGLISH.
2. Select an optimal aesthetic theme and varied layout:
   - bgMode: choose one of ["light", "dark", "warm", "slate"]
   - heroLayout: choose one of ["split", "centered", "fullwidth-cinematic", "bold-typography", "badge-minimal"]
   - cardLayout: choose one of ["cards", "bento", "editorial-list", "grid-2x2"]
   - navStyle: choose one of ["pill", "edge-to-edge"]
   - aboutLayout: choose one of ["split-photo", "stats-matrix"]
   - accentColor: pick a hex code suitable for this brand (e.g., #2563eb, #06b6d4, #10b981, #e11d48, #c25e34, #0f2b48, #7c3aed, #d97706)
   - fontHeading & fontBody: e.g. "Plus Jakarta Sans", "Outfit", "Manrope", "DM Sans", or "Playfair Display".
3. Write 3 distinct services with icons: "zap", "shield", "star", "chart", "heart", or "check".
4. Write 4 insightful, realistic FAQ questions and answers in English.`;

        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: "You are an elite web architect. Return strictly valid JSON following the provided schema. ALL OUTPUT TEXT MUST BE IN ENGLISH.",
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                metaTitle: { type: Type.STRING },
                metaDescription: { type: Type.STRING },
                tagline: { type: Type.STRING },
                heroHeadline: { type: Type.STRING },
                heroSubheadline: { type: Type.STRING },
                heroCtaText: { type: Type.STRING },
                heroSecondaryCtaText: { type: Type.STRING },
                aboutTitle: { type: Type.STRING },
                aboutText: { type: Type.STRING },
                servicesTitle: { type: Type.STRING },
                servicesSubtitle: { type: Type.STRING },
                services: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      icon: { 
                        type: Type.STRING,
                        description: "Must be one of: zap, shield, star, chart, heart, check"
                      },
                    },
                    required: ['title', 'description', 'icon'],
                  },
                },
                faqTitle: { type: Type.STRING },
                faqs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING },
                    },
                    required: ['question', 'answer'],
                  },
                },
                contactTitle: { type: Type.STRING },
                contactSubtitle: { type: Type.STRING },
                theme: {
                  type: Type.OBJECT,
                  properties: {
                    accentColor: { type: Type.STRING },
                    bgMode: { type: Type.STRING, description: "One of: light, dark, warm, slate" },
                    heroLayout: { type: Type.STRING, description: "One of: split, centered, fullwidth-cinematic, bold-typography, badge-minimal" },
                    cardLayout: { type: Type.STRING, description: "One of: cards, bento, editorial-list, grid-2x2" },
                    navStyle: { type: Type.STRING, description: "One of: pill, edge-to-edge" },
                    aboutLayout: { type: Type.STRING, description: "One of: split-photo, stats-matrix" },
                    fontHeading: { type: Type.STRING },
                    fontBody: { type: Type.STRING },
                    fontUrl: { type: Type.STRING },
                  },
                  required: ['accentColor', 'bgMode'],
                },
              },
              required: [
                'metaTitle',
                'metaDescription',
                'heroHeadline',
                'heroSubheadline',
                'services',
                'aboutText',
                'faqs',
              ],
            },
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI generation timed out')), 9000)
        );

        const response = await Promise.race([generatePromise, timeoutPromise]);
        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);

        const randomFallback = generateDiverseEnglishContent(companyName, companyDesc, contactEmail);
        const resolvedTheme: ThemeConfig = {
          accentColor: parsed.theme?.accentColor || randomFallback.theme.accentColor,
          bgMode: ['light', 'dark', 'warm', 'slate'].includes(parsed.theme?.bgMode)
            ? parsed.theme.bgMode
            : randomFallback.theme.bgMode,
          heroLayout: ['split', 'centered', 'fullwidth-cinematic', 'bold-typography', 'badge-minimal'].includes(parsed.theme?.heroLayout)
            ? parsed.theme.heroLayout
            : randomFallback.theme.heroLayout,
          cardLayout: ['cards', 'bento', 'editorial-list', 'grid-2x2'].includes(parsed.theme?.cardLayout)
            ? parsed.theme.cardLayout
            : randomFallback.theme.cardLayout,
          navStyle: ['pill', 'edge-to-edge'].includes(parsed.theme?.navStyle)
            ? parsed.theme.navStyle
            : randomFallback.theme.navStyle,
          aboutLayout: ['split-photo', 'stats-matrix'].includes(parsed.theme?.aboutLayout)
            ? parsed.theme.aboutLayout
            : randomFallback.theme.aboutLayout,
          fontHeading: parsed.theme?.fontHeading || randomFallback.theme.fontHeading,
          fontBody: parsed.theme?.fontBody || randomFallback.theme.fontBody,
          fontUrl: parsed.theme?.fontUrl || randomFallback.theme.fontUrl,
        };

        const nicheImgs = detectNicheImages(companyName, companyDesc);

        websiteContent = {
          metaTitle: parsed.metaTitle || `${companyName} | Official Website`,
          metaDescription: parsed.metaDescription || `${companyName} provides high-quality services.`,
          tagline: parsed.tagline || 'Excellence & Reliability',
          heroHeadline: parsed.heroHeadline || `${companyName} — Delivering Professional Results`,
          heroSubheadline: parsed.heroSubheadline || companyDesc,
          heroCtaText: parsed.heroCtaText || "Get in Touch",
          heroSecondaryCtaText: parsed.heroSecondaryCtaText || "Explore Services",
          aboutTitle: parsed.aboutTitle || `About ${companyName}`,
          aboutText: parsed.aboutText || `${companyName} is committed to providing industry-leading services.`,
          servicesTitle: parsed.servicesTitle || 'Core Capabilities & Services',
          servicesSubtitle: parsed.servicesSubtitle || 'Discover how we deliver value for our partners.',
          services: Array.isArray(parsed.services) && parsed.services.length > 0
            ? parsed.services.slice(0, 3).map((s: any) => ({
                title: s.title || 'Professional Service',
                description: s.description || 'Delivered with precision according to your specifications.',
                icon: ['zap', 'shield', 'star', 'chart', 'heart', 'check'].includes(s.icon) ? s.icon : 'star',
              }))
            : randomFallback.services,
          faqTitle: parsed.faqTitle || 'Frequently Asked Questions',
          faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0
            ? parsed.faqs.slice(0, 4).map((f: any) => ({
                question: f.question || 'Common Question',
                answer: f.answer || 'Detailed answer.',
              }))
            : randomFallback.faqs,
          contactTitle: parsed.contactTitle || "Connect With Us",
          contactSubtitle: parsed.contactSubtitle || `Reach out directly or send us an email at ${contactEmail}`,
          heroImage: nicheImgs.heroImage,
          aboutImage: nicheImgs.aboutImage,
          email: contactEmail,
          companyName,
          theme: resolvedTheme,
        };
      } catch (geminiError) {
        console.warn('Gemini API call warning, using diverse procedural engine:', geminiError);
        websiteContent = generateDiverseEnglishContent(companyName, companyDesc, contactEmail);
      }
    } else {
      websiteContent = generateDiverseEnglishContent(companyName, companyDesc, contactEmail);
    }

    const html = generateStandaloneHtml(websiteContent);

    return res.json({
      success: true,
      html,
      content: websiteContent,
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while generating the website.',
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
