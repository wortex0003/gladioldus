# GLADIOLDUS — AI Website Generator
Domain: [gladiolus.love](https://gladiolus.love)

GLADIOLDUS is an instant AI-powered standalone website generator. Enter a company name, description, and contact email to generate an instant, completely bespoke, responsive single-file `index.html` landing page ready to drop onto any web hosting or domain.

## Features
- **Zero-Code Instant Output**: Single-file HTML5 with CDN Tailwind CSS, Google Fonts, and embedded vector icons.
- **Dynamic AI Generation**: Integrates Google Gemini API (`@google/genai`) with fallback procedural engine.
- **Tailored Niche Imagery**: High-resolution Unsplash photo curation with inline SVG fallback.
- **Strictly English Copy**: Professional typography, punchy value propositions, service breakdowns, FAQs, and working contact forms.
- **Instant Preview & Download**: Live responsive viewport simulator (Desktop, Tablet, Mobile) and 1-click `index.html` download.

## Deploying to Render
1. Push this repository to GitHub.
2. In Render, select **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Under **Environment Variables**:
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key from AI Studio.
   - `NODE_ENV`: `production`
6. Under **Settings -> Custom Domains**, add:
   - `gladiolus.love` and `www.gladiolus.love`
   - Follow Render's DNS instructions (point A record to Render's IP address and CNAME for `www`).
