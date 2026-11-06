import { WebsiteContent } from '../types/generator.ts';

function renderSvgIcon(iconName: string): string {
  switch (iconName) {
    case 'shield':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`;
    case 'zap':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    case 'chart':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;
    case 'heart':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`;
    case 'check':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    case 'star':
    default:
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`;
  }
}

export function generateStandaloneHtml(data: WebsiteContent): string {
  const theme = data.theme;
  const isDark = theme.bgMode === 'dark';
  const isWarm = theme.bgMode === 'warm';
  const isSlate = theme.bgMode === 'slate';

  const safeName = data.companyName.replace(/"/g, '&quot;');
  const safeEmail = data.email.trim();

  // Robust images with fallbacks
  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80';
  const aboutImg = data.aboutImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';

  // Surface and Canvas themes
  let bgCanvas = 'bg-white text-slate-900';
  let navBg = 'bg-white/90 border-b border-slate-200 text-slate-900 backdrop-blur-md';
  let cardBg = 'bg-slate-50/80 border border-slate-200/90 shadow-xs';
  let altSectionBg = 'bg-slate-50/60 border-t border-slate-200/80';
  let inputBorder = 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-brand';
  let badgeBg = 'bg-slate-100 text-slate-800 border border-slate-200';

  if (isDark) {
    bgCanvas = 'bg-[#090a0f] text-neutral-100';
    navBg = 'bg-[#090a0f]/85 border-b border-neutral-800 text-white backdrop-blur-md';
    cardBg = 'bg-neutral-900/90 border border-neutral-800 shadow-md';
    altSectionBg = 'bg-neutral-900/40 border-t border-neutral-800/80';
    inputBorder = 'border-neutral-700 bg-neutral-900 text-white placeholder-neutral-500 focus:border-brand';
    badgeBg = 'bg-neutral-800/80 text-neutral-200 border border-neutral-700';
  } else if (isWarm) {
    bgCanvas = 'bg-[#FAF7F2] text-[#2C241E]';
    navBg = 'bg-[#FAF7F2]/90 border-b border-[#EAE3D9] text-[#2C241E] backdrop-blur-md';
    cardBg = 'bg-white border border-[#EAE3D9] shadow-xs';
    altSectionBg = 'bg-[#F2ECE3]/60 border-t border-[#EAE3D9]';
    inputBorder = 'border-[#DFD7CB] bg-white text-[#2C241E] placeholder-neutral-400 focus:border-brand';
    badgeBg = 'bg-[#EFE7DC] text-[#4A3A2C] border border-[#DFD7CB]';
  } else if (isSlate) {
    bgCanvas = 'bg-slate-50 text-slate-900';
    navBg = 'bg-white/90 border-b border-slate-200 text-slate-900 backdrop-blur-md';
    cardBg = 'bg-white border border-slate-200/90 shadow-xs';
    altSectionBg = 'bg-slate-100/70 border-t border-slate-200';
    inputBorder = 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-brand';
    badgeBg = 'bg-slate-200/80 text-slate-800 border border-slate-300';
  }

  // Common image error handler string to prevent black/broken boxes
  const imgFallbackHandler = `onerror="this.onerror=null; this.parentElement.classList.add('bg-gradient-to-br', 'from-slate-800', 'to-slate-900'); this.style.display='none'; this.parentElement.innerHTML+='<div class=\\'absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white\\'><div class=\\'text-4xl font-extrabold mb-2 opacity-30 font-mono\\'>${safeName.slice(0, 2).toUpperCase()}</div><div class=\\'text-base font-bold\\'>${safeName}</div><div class=\\'text-xs opacity-60 mt-1 uppercase tracking-wider\\'>Verified Excellence</div></div>';"`;

  // 1. Render Navigation (Pill or Edge-to-edge)
  let navMarkup = '';
  if (theme.navStyle === 'pill') {
    navMarkup = `
    <header class="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div class="max-w-5xl mx-auto h-16 rounded-2xl px-6 flex items-center justify-between pointer-events-auto shadow-lg backdrop-blur-lg ${navBg}">
        <a href="#" class="text-lg font-extrabold tracking-tight flex items-center gap-2">
          <span class="font-heading">${safeName}</span>
        </a>
        <nav class="hidden md:flex items-center gap-7 text-sm font-medium opacity-80">
          <a href="#services" class="hover:opacity-100 transition-opacity">Services</a>
          <a href="#about" class="hover:opacity-100 transition-opacity">About Us</a>
          <a href="#faq" class="hover:opacity-100 transition-opacity">FAQ</a>
          <a href="#contact" class="hover:opacity-100 transition-opacity">Contact</a>
        </nav>
        <div class="hidden md:flex items-center gap-4">
          <a href="#contact" class="px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all btn-brand shadow-sm">
            Get in Touch
          </a>
        </div>
        <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg opacity-80" aria-label="Menu">
          <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div id="mobile-menu" class="hidden md:hidden max-w-5xl mx-auto mt-2 rounded-2xl p-6 shadow-2xl ${navBg} pointer-events-auto">
        <div class="flex flex-col gap-3 text-base font-medium">
          <a href="#services" onclick="toggleMobileMenu()">Services</a>
          <a href="#about" onclick="toggleMobileMenu()">About Us</a>
          <a href="#faq" onclick="toggleMobileMenu()">FAQ</a>
          <a href="#contact" onclick="toggleMobileMenu()" class="text-center py-3 rounded-xl text-sm font-bold mt-2 btn-brand">Get in Touch</a>
        </div>
      </div>
    </header>`;
  } else {
    navMarkup = `
    <header class="fixed top-0 left-0 right-0 z-50 ${navBg}">
      <div class="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <a href="#" class="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <span class="font-heading">${safeName}</span>
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
          <a href="#services" class="hover:opacity-100 transition-opacity">Services</a>
          <a href="#about" class="hover:opacity-100 transition-opacity">About Us</a>
          <a href="#faq" class="hover:opacity-100 transition-opacity">FAQ</a>
          <a href="#contact" class="hover:opacity-100 transition-opacity">Contact</a>
        </nav>
        <div class="hidden md:flex items-center gap-4">
          <a href="#contact" class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm btn-brand">
            Get in Touch
          </a>
        </div>
        <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg opacity-80" aria-label="Menu">
          <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div id="mobile-menu" class="hidden md:hidden px-6 pt-2 pb-6 border-t border-current/10 bg-inherit shadow-xl">
        <div class="flex flex-col gap-4 text-base font-medium pt-2">
          <a href="#services" onclick="toggleMobileMenu()">Services</a>
          <a href="#about" onclick="toggleMobileMenu()">About Us</a>
          <a href="#faq" onclick="toggleMobileMenu()">FAQ</a>
          <a href="#contact" onclick="toggleMobileMenu()" class="text-center px-4 py-3 rounded-xl text-sm font-semibold mt-2 btn-brand">Get in Touch</a>
        </div>
      </div>
    </header>`;
  }

  // 2. Render Hero Layout (5 distinct variations)
  let heroMarkup = '';
  if (theme.heroLayout === 'split') {
    heroMarkup = `
    <section class="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${badgeBg}">
              <span class="w-2 h-2 rounded-full" style="background-color: var(--brand)"></span>
              <span>${data.tagline || 'Excellence & Reliability'}</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 font-heading">
              ${data.heroHeadline}
            </h1>
            <p class="text-lg opacity-80 leading-relaxed mb-8 max-w-xl">
              ${data.heroSubheadline}
            </p>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <a href="#contact" class="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold shadow-md btn-brand text-center">
                ${data.heroCtaText || 'Get in Touch'}
              </a>
              <a href="#services" class="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-medium opacity-80 hover:opacity-100 border border-current/20 text-center">
                ${data.heroSecondaryCtaText || 'Explore Services'}
              </a>
            </div>
          </div>
          <div class="lg:col-span-5">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-current/10 aspect-4/3 lg:aspect-auto lg:h-[480px] bg-neutral-900 group">
              <img src="${heroImg}" alt="${safeName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="eager" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-white/80">Industry Specialist</div>
                <div class="text-base font-bold">${safeName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  } else if (theme.heroLayout === 'fullwidth-cinematic') {
    heroMarkup = `
    <section class="relative min-h-[580px] flex items-center justify-center py-24 text-center text-white overflow-hidden bg-neutral-950">
      <img src="${heroImg}" alt="${safeName}" class="absolute inset-0 w-full h-full object-cover opacity-45" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="eager" />
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40"></div>
      
      <div class="relative max-w-4xl mx-auto px-6 z-10">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white">
          <span>${data.tagline || 'Leading Industry Solutions'}</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 font-heading">
          ${data.heroHeadline}
        </h1>
        <p class="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-10">
          ${data.heroSubheadline}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" class="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold shadow-xl btn-brand">
            ${data.heroCtaText || 'Start Your Project'}
          </a>
          <a href="#services" class="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20">
            ${data.heroSecondaryCtaText || 'View Capabilities ↓'}
          </a>
        </div>
      </div>
    </section>`;
  } else if (theme.heroLayout === 'bold-typography') {
    heroMarkup = `
    <section class="relative pt-20 pb-24 md:pt-28 md:pb-32 border-b border-current/10">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-xs font-mono font-bold tracking-widest uppercase brand-text mb-4">Established Standard</div>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 font-heading">
          ${data.heroHeadline}
        </h1>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p class="lg:col-span-7 text-xl opacity-80 leading-relaxed">
            ${data.heroSubheadline}
          </p>
          <div class="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
            <a href="#contact" class="px-8 py-4 rounded-xl text-base font-bold shadow-md btn-brand">
              ${data.heroCtaText || 'Work With Us'}
            </a>
          </div>
        </div>

        <div class="mt-14 rounded-3xl overflow-hidden shadow-2xl border border-current/10 aspect-16/9 max-h-[440px] bg-neutral-900">
          <img src="${heroImg}" alt="${safeName}" class="w-full h-full object-cover" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="eager" />
        </div>
      </div>
    </section>`;
  } else if (theme.heroLayout === 'badge-minimal') {
    heroMarkup = `
    <section class="relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div class="max-w-5xl mx-auto px-6">
        <div class="max-w-3xl">
          <div class="inline-block px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider mb-6 ${badgeBg}">
            ${data.tagline || 'Official Business Website'}
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 font-heading">
            ${data.heroHeadline}
          </h1>
          <p class="text-xl opacity-80 leading-relaxed mb-8">
            ${data.heroSubheadline}
          </p>
          <div class="flex flex-wrap items-center gap-4 mb-14">
            <a href="#contact" class="px-8 py-4 rounded-xl text-base font-semibold shadow-md btn-brand">
              ${data.heroCtaText || 'Contact Us Now'}
            </a>
            <a href="#about" class="px-7 py-4 rounded-xl text-base font-medium opacity-80 hover:opacity-100 border border-current/20">
              Read Our Story ↓
            </a>
          </div>
        </div>

        <div class="rounded-3xl overflow-hidden shadow-2xl border border-current/10 aspect-16/9 max-h-[440px] bg-neutral-900">
          <img src="${heroImg}" alt="${safeName}" class="w-full h-full object-cover" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="eager" />
        </div>
      </div>
    </section>`;
  } else {
    // Centered layout with grand visual showcase
    heroMarkup = `
    <section class="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden text-center">
      <div class="max-w-4xl mx-auto px-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${badgeBg}">
          <span>${data.tagline || 'Leading Industry Solutions'}</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 font-heading">
          ${data.heroHeadline}
        </h1>

        <p class="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed mb-10">
          ${data.heroSubheadline}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#contact" class="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold shadow-md btn-brand">
            ${data.heroCtaText || 'Start Your Project'}
          </a>
          <a href="#services" class="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-medium opacity-80 hover:opacity-100 border border-current/20">
            ${data.heroSecondaryCtaText || 'Discover Services ↓'}
          </a>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-6">
        <div class="rounded-3xl overflow-hidden shadow-2xl border border-current/10 aspect-16/9 max-h-[460px] bg-neutral-900">
          <img src="${heroImg}" alt="${safeName}" class="w-full h-full object-cover" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="eager" />
        </div>
      </div>
    </section>`;
  }

  // 3. Render Services Section (4 distinct styles)
  let servicesMarkup = '';
  if (theme.cardLayout === 'editorial-list') {
    servicesMarkup = `
    <div class="divide-y divide-current/10 border-y border-current/10">
      ${data.services
        .map(
          (s, index) => `
        <div class="py-8 sm:py-10 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:opacity-100 transition-opacity">
          <div class="flex items-start gap-5 md:w-1/3">
            <span class="text-sm font-mono font-bold brand-text pt-1">0${index + 1}</span>
            <h3 class="text-2xl font-bold font-heading">${s.title}</h3>
          </div>
          <p class="text-base opacity-80 md:w-1/2 leading-relaxed">${s.description}</p>
          <div class="hidden md:flex items-center justify-end w-12 pt-1 brand-text opacity-50 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </div>`
        )
        .join('\n')}
    </div>`;
  } else if (theme.cardLayout === 'bento') {
    servicesMarkup = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-8 ${cardBg} rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:shadow-lg">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 brand-badge">
          ${renderSvgIcon(data.services[0]?.icon || 'zap')}
        </div>
        <div class="text-xs font-mono font-bold opacity-50 mb-2">FEATURED SOLUTION</div>
        <h3 class="text-2xl sm:text-3xl font-bold font-heading mb-3">${data.services[0]?.title || 'Core Offering'}</h3>
        <p class="text-base opacity-80 leading-relaxed max-w-xl">${data.services[0]?.description}</p>
      </div>
      <div class="md:col-span-4 ${cardBg} rounded-3xl p-8 transition-all duration-300 hover:shadow-lg">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 brand-badge">
          ${renderSvgIcon(data.services[1]?.icon || 'shield')}
        </div>
        <div class="text-xs font-mono font-bold opacity-50 mb-2">SERVICE 02</div>
        <h3 class="text-xl font-bold font-heading mb-2">${data.services[1]?.title || 'Specialized Work'}</h3>
        <p class="text-sm opacity-80 leading-relaxed">${data.services[1]?.description}</p>
      </div>
      <div class="md:col-span-12 ${cardBg} rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="text-xs font-mono font-bold opacity-50 mb-2">SERVICE 03</div>
          <h3 class="text-2xl font-bold font-heading mb-2">${data.services[2]?.title || 'Support & Excellence'}</h3>
          <p class="text-base opacity-80 leading-relaxed max-w-2xl">${data.services[2]?.description}</p>
        </div>
        <a href="#contact" class="shrink-0 px-6 py-3 rounded-xl text-sm font-semibold btn-brand inline-block text-center">
          Inquire Now →
        </a>
      </div>
    </div>`;
  } else if (theme.cardLayout === 'grid-2x2') {
    servicesMarkup = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${data.services
        .map(
          (s, index) => `
        <div class="${cardBg} rounded-3xl p-8 flex gap-6 items-start transition-all hover:shadow-lg">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center brand-badge shrink-0">
            ${renderSvgIcon(s.icon)}
          </div>
          <div>
            <div class="text-xs font-mono font-bold opacity-50 mb-1">0${index + 1} // CAPABILITY</div>
            <h3 class="text-xl font-bold font-heading mb-2">${s.title}</h3>
            <p class="text-sm opacity-80 leading-relaxed">${s.description}</p>
          </div>
        </div>`
        )
        .join('\n')}
    </div>`;
  } else {
    // 3 Cards Grid
    servicesMarkup = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${data.services
        .map(
          (s, index) => `
        <div class="${cardBg} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 brand-badge">
            ${renderSvgIcon(s.icon)}
          </div>
          <div class="text-xs font-mono font-semibold opacity-50 mb-1">SERVICE 0${index + 1}</div>
          <h3 class="text-xl font-bold tracking-tight mb-3 font-heading">${s.title}</h3>
          <p class="text-sm opacity-80 leading-relaxed">${s.description}</p>
        </div>`
        )
        .join('\n')}
    </div>`;
  }

  // 4. Render About Us (Split-photo or Stats-matrix)
  let aboutMarkup = '';
  if (theme.aboutLayout === 'stats-matrix') {
    aboutMarkup = `
    <section id="about" class="py-20 md:py-28">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div class="lg:col-span-5">
            <div class="text-xs uppercase tracking-widest font-mono font-semibold brand-text mb-2">Our Mission</div>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 font-heading">${data.aboutTitle || 'Dedicated to High-Standard Delivery'}</h2>
            <div class="w-12 h-1 rounded-full mb-6" style="background-color: var(--brand)"></div>
          </div>
          <div class="lg:col-span-7 text-base sm:text-lg opacity-85 leading-relaxed space-y-4">
            <p>${data.aboutText}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="${cardBg} rounded-2xl p-8 text-center">
            <div class="text-4xl sm:text-5xl font-extrabold font-heading brand-text mb-2">100%</div>
            <div class="text-sm font-semibold opacity-80">Quality & Standard Compliance</div>
          </div>
          <div class="${cardBg} rounded-2xl p-8 text-center">
            <div class="text-4xl sm:text-5xl font-extrabold font-heading brand-text mb-2">24/7</div>
            <div class="text-sm font-semibold opacity-80">Responsive Client Support</div>
          </div>
          <div class="${cardBg} rounded-2xl p-8 text-center">
            <div class="text-4xl sm:text-5xl font-extrabold font-heading brand-text mb-2">Top Tier</div>
            <div class="text-sm font-semibold opacity-80">Certified Industry Expertise</div>
          </div>
        </div>
      </div>
    </section>`;
  } else {
    // Side-by-side with photo
    aboutMarkup = `
    <section id="about" class="py-20 md:py-28">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-current/10 aspect-4/3 group bg-neutral-900">
            <img src="${aboutImg}" alt="About ${safeName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" ${imgFallbackHandler} referrerpolicy="no-referrer" loading="lazy" />
          </div>
          <div class="lg:col-span-7">
            <div class="text-xs uppercase tracking-widest font-mono font-semibold brand-text mb-2">Company Overview</div>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 font-heading">${data.aboutTitle || 'Dedicated to Quality & Reliability'}</h2>
            <div class="w-12 h-1 rounded-full mb-6" style="background-color: var(--brand)"></div>
            <div class="text-base sm:text-lg opacity-85 leading-relaxed space-y-4">
              <p>${data.aboutText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  // 5. Render FAQs in English
  const faqsHtml = data.faqs
    .map(
      (f, index) => `
      <div class="${cardBg} rounded-xl overflow-hidden transition-all duration-200">
        <button 
          onclick="toggleFaq(${index})" 
          class="w-full px-6 py-4 text-left flex items-center justify-between font-semibold gap-4 focus:outline-none cursor-pointer"
          aria-expanded="false"
          id="faq-btn-${index}"
        >
          <span class="text-base">${f.question}</span>
          <svg id="faq-icon-${index}" class="w-5 h-5 shrink-0 transition-transform duration-200 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div id="faq-content-${index}" class="hidden px-6 pb-5 pt-1 text-sm opacity-80 border-t border-current/10 leading-relaxed">
          ${f.answer}
        </div>
      </div>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.metaTitle}</title>
  <meta name="description" content="${data.metaDescription}">
  <meta property="og:title" content="${data.metaTitle}">
  <meta property="og:description" content="${data.metaDescription}">
  <meta property="og:type" content="website">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${theme.fontUrl}" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: '${theme.accentColor}',
          }
        }
      }
    }
  </script>

  <style>
    :root {
      --brand: ${theme.accentColor};
    }
    body {
      font-family: '${theme.fontBody}', system-ui, sans-serif;
    }
    h1, h2, h3, .font-heading {
      font-family: '${theme.fontHeading}', system-ui, sans-serif;
    }
    .btn-brand {
      background-color: var(--brand);
      color: #ffffff;
    }
    .btn-brand:hover {
      filter: brightness(1.1);
    }
    .brand-text {
      color: var(--brand);
    }
    .brand-badge {
      background-color: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
      color: var(--brand);
    }
  </style>
</head>
<body class="${bgCanvas} antialiased selection:bg-brand selection:text-white">

  <!-- Navigation -->
  ${navMarkup}

  <main class="${theme.navStyle === 'pill' ? 'pt-24' : 'pt-20'}">
    <!-- Hero Section -->
    ${heroMarkup}

    <!-- Services Section -->
    <section id="services" class="py-20 md:py-28 ${altSectionBg}">
      <div class="max-w-6xl mx-auto px-6">
        <div class="max-w-2xl mb-14">
          <div class="text-xs uppercase tracking-widest font-mono font-semibold brand-text mb-2">What We Do</div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">${data.servicesTitle || 'Core Capabilities & Services'}</h2>
          ${data.servicesSubtitle ? `<p class="text-base opacity-75 mt-2">${data.servicesSubtitle}</p>` : ''}
        </div>

        ${servicesMarkup}
      </div>
    </section>

    <!-- About Section -->
    ${aboutMarkup}

    <!-- FAQ Section -->
    <section id="faq" class="py-20 md:py-28 ${altSectionBg}">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-widest font-mono font-semibold brand-text mb-2">Got Questions?</div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">${data.faqTitle || 'Frequently Asked Questions'}</h2>
        </div>

        <div class="space-y-4">
          ${faqsHtml}
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 md:py-28">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center max-w-xl mx-auto mb-12">
          <div class="text-xs uppercase tracking-widest font-mono font-semibold brand-text mb-2">Connect With Us</div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-heading">${data.contactTitle || 'Send Us a Message'}</h2>
          <p class="text-base opacity-75">${data.contactSubtitle || 'Have a question or looking to work together? Leave your details below and we will respond promptly.'}</p>
        </div>

        <div class="${cardBg} rounded-2xl p-8 sm:p-10 shadow-sm">
          <form id="contact-form" onsubmit="handleFormSubmit(event)" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="John Smith"
                  class="w-full px-4 py-3 rounded-xl border ${inputBorder} text-sm focus:outline-none"
                >
              </div>
              <div>
                <label for="contact-email" class="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Your Email *</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  required 
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 rounded-xl border ${inputBorder} text-sm focus:outline-none"
                >
              </div>
            </div>

            <div>
              <label for="phone" class="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Phone Number (Optional)</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="+1 (555) 000-0000"
                class="w-full px-4 py-3 rounded-xl border ${inputBorder} text-sm focus:outline-none"
              >
            </div>

            <div>
              <label for="message" class="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Your Message or Inquiry *</label>
              <textarea 
                id="message" 
                rows="4" 
                required 
                placeholder="Tell us about your project or inquiry..."
                class="w-full px-4 py-3 rounded-xl border ${inputBorder} text-sm focus:outline-none resize-y"
              ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div class="text-xs opacity-75 flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span>Direct inquiries: <strong>${safeEmail}</strong></span>
              </div>
              <button 
                type="submit" 
                id="submit-btn" 
                class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow hover:shadow-md btn-brand cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>

          <div id="form-success" class="hidden text-center py-8">
            <div class="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-2 font-heading">Thank you for reaching out!</h3>
            <p class="text-sm opacity-80 max-w-md mx-auto mb-6">Your message has been prepared. We will follow up with you at your provided email address shortly.</p>
            <button 
              onclick="resetContactForm()" 
              class="px-5 py-2.5 rounded-lg text-xs font-semibold border border-current/20 hover:border-current/40 cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer (English) -->
  <footer class="py-12 border-t border-current/10 text-sm opacity-80">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="text-center md:text-left">
        <div class="text-base font-bold tracking-tight mb-1 font-heading">${safeName}</div>
        <p class="text-xs opacity-70">© ${new Date().getFullYear()} ${safeName}. All rights reserved.</p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
        <a href="#services" class="hover:opacity-100">Services</a>
        <a href="#about" class="hover:opacity-100">About Us</a>
        <a href="#faq" class="hover:opacity-100">FAQ</a>
        <a href="mailto:${safeEmail}" class="hover:opacity-100 flex items-center gap-1.5 font-mono">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span>${safeEmail}</span>
        </a>
      </div>
    </div>
  </footer>

  <!-- Vanilla Scripts -->
  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const iconOpen = document.getElementById('menu-icon-open');
      const iconClose = document.getElementById('menu-icon-close');
      const isHidden = menu.classList.contains('hidden');

      if (isHidden) {
        menu.classList.remove('hidden');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    }

    function toggleFaq(index) {
      const content = document.getElementById('faq-content-' + index);
      const icon = document.getElementById('faq-icon-' + index);
      const isHidden = content.classList.contains('hidden');

      if (isHidden) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('contact-form');
      const success = document.getElementById('form-success');
      const name = document.getElementById('name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent('New Website Inquiry from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nPhone: ' + phone + '\\n\\nMessage:\\n' + message);
      
      form.classList.add('hidden');
      success.classList.remove('hidden');

      try {
        const mailtoUri = 'mailto:${safeEmail}?subject=' + subject + '&body=' + body;
        window.location.href = mailtoUri;
      } catch (err) {
        console.log('Client mail opened');
      }
    }

    function resetContactForm() {
      const form = document.getElementById('contact-form');
      const success = document.getElementById('form-success');
      form.reset();
      form.classList.remove('hidden');
      success.classList.add('hidden');
    }
  </script>
</body>
</html>`;
}
