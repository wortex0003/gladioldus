import React, { useState, useRef } from 'react';
import { 
  Download, 
  Sparkles, 
  Eye, 
  Copy, 
  RotateCcw, 
  Laptop, 
  Tablet, 
  Smartphone, 
  Check, 
  FileCode2,
  X
} from 'lucide-react';
import { GeneratorResponse } from './types/generator.ts';

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Result state
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);

  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Trigger download of index.html
  const downloadHtmlFile = (htmlContent: string, fileName = 'index.html') => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!name.trim()) {
      setErrorMsg('Будь ласка, вкажіть назву компанії або сайту.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Будь ласка, введіть опис діяльності вашої компанії.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Будь ласка, вкажіть коректну контактну пошту.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(1);

    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          email: email.trim(),
        }),
      });

      clearInterval(stepInterval);

      const data: GeneratorResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Помилка при створенні сайту');
      }

      setGeneratedHtml(data.html);
      setGenerationStep(3);

      // Auto download index.html immediately into user's downloads
      setTimeout(() => {
        downloadHtmlFile(data.html, 'index.html');
      }, 400);

    } catch (err: any) {
      clearInterval(stepInterval);
      setErrorMsg(err.message || 'Сталася непередбачена помилка. Спробуйте ще раз.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = async () => {
    if (!generatedHtml) return;
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setEmail('');
    setGeneratedHtml(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Bar Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">GLADIOLDUS</span>
              <span className="text-xs text-blue-400 font-mono block -mt-1">gladiolus.love</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <FileCode2 className="w-4 h-4 text-blue-400" />
              <span>Формат: <strong>index.html</strong></span>
            </div>
            {generatedHtml && (
              <button 
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Очистити</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 md:py-16">
        {/* Intro Hero Text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Створіть сайт за 15 секунд
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Введіть назву, опис бізнесу та пошту. Штучний інтелект автоматично підбере структуру, гармонійну палітру, шрифти та сформує файл <strong className="text-slate-200 font-mono">index.html</strong>, готовий для будь-якого хостингу.
          </p>
        </div>

        {/* Generator Form Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Field 1: Company Name */}
            <div>
              <label htmlFor="company-name" className="block text-sm font-semibold text-slate-200 mb-2">
                1. Назва компанії або сайту <span className="text-blue-400">*</span>
              </label>
              <input
                id="company-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введіть назву вашого проєкту або бренду"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Field 2: Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="company-desc" className="block text-sm font-semibold text-slate-200">
                  2. Опис компанії та що вона робить <span className="text-blue-400">*</span>
                </label>
              </div>
              <textarea
                id="company-desc"
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Детально опишіть, чим займається компанія, які послуги або товари надає, для кого працює та які головні переваги..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-y leading-relaxed"
              />
            </div>

            {/* Field 3: Contact Email */}
            <div>
              <label htmlFor="company-email" className="block text-sm font-semibold text-slate-200 mb-2">
                3. Пошта внизу для звернення / зворотного зв'язку <span className="text-blue-400">*</span>
              </label>
              <input
                id="company-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Ця адреса відображатиметься у підвалі створеного сайту та прийматиме повідомлення з форми.
              </p>
            </div>

            {/* Error Message Display */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Generate & Download Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>
                      {generationStep === 1 && 'Аналіз бізнесу та вибір палітри...'}
                      {generationStep === 2 && 'AI-генерація контенту та блоків...'}
                      {generationStep >= 3 && 'Компіляція автономного index.html...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>ЗГЕНЕРУВАТИ ТА ЗАВАНТАЖИТИ INDEX.HTML</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success Output Section */}
        {generatedHtml && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Сайт успішно згенеровано!</h3>
                  <p className="text-sm text-emerald-200/80">
                    Файл <code className="bg-emerald-900/50 px-1.5 py-0.5 rounded text-white font-mono text-xs">index.html</code> автоматично завантажено.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => downloadHtmlFile(generatedHtml, 'index.html')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Завантажити ще раз</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Переглянути сайт</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Скопійовано!' : 'Копіювати код'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Live Preview Modal */}
      {isPreviewOpen && generatedHtml && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          {/* Modal Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-white">Попередній перегляд: {name}</span>
              <span className="text-xs text-slate-400 font-mono">index.html</span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="ПК"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Планшет"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Мобільний"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => downloadHtmlFile(generatedHtml, 'index.html')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Завантажити</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="flex-1 bg-neutral-950 p-4 sm:p-6 overflow-auto flex justify-center items-center">
            <div
              className={`h-full transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-white ${
                previewDevice === 'desktop'
                  ? 'w-full max-w-6xl'
                  : previewDevice === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              <iframe
                ref={previewIframeRef}
                srcDoc={generatedHtml}
                title="Site Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-forms allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} GLADIOLDUS (gladiolus.love). Instant Standalone AI Website Generator.</p>
      </footer>
    </div>
  );
}
