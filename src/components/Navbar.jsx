import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Packages', href: '#packages' },
    { name: 'Test Directory', href: '#directory' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glassmorphism border-b border-slate-200/50 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Name Text */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-clinical-950 to-tealAccent-500 text-white shadow-md shadow-clinical-950/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-clinical-950 leading-none">
                Thyrocare
              </span>
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-bold mt-0.5">
                Geeta Diagnostic Centre
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.href)}
                className="text-sm font-medium text-slate-600 hover:text-clinical-950 hover:underline hover:underline-offset-4 transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Call & WhatsApp Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919569517193"
              className="flex items-center space-x-2 text-slate-700 hover:text-clinical-950 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-clinical-950" />
              <span>+91 95695 17193</span>
            </a>
            <button
              onClick={() => handleScrollTo('#book-form')}
              className="bg-clinical-950 text-white hover:bg-clinical-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-clinical-950/15 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Test
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <a
              href="tel:+919569517193"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-clinical-950 hover:bg-slate-200"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-clinical-950 text-white hover:bg-clinical-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 top-[64px] bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Mobile Navigation Drawer */}
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-[calc(100vh-64px)] bg-white shadow-xl flex flex-col p-6 transition-transform duration-300 ease-out transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-4 flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-2">
              Navigation
            </p>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.href)}
                className="text-left py-3 px-4 rounded-xl text-base font-semibold text-slate-700 hover:text-clinical-950 hover:bg-slate-50 transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-6 border-t border-slate-100">
            <a
              href="tel:+919569517193"
              className="flex items-center justify-center space-x-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-bold transition-all text-center"
            >
              <Phone className="w-5 h-5 text-clinical-950" />
              <span>Call +91 95695 17193</span>
            </a>
            <a
              href="https://wa.me/919569517193"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 w-full bg-emerald-500 hover:bg-emerald-650 text-white py-3.5 rounded-xl font-bold transition-all text-center shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Booking</span>
            </a>
            <button
              onClick={() => handleScrollTo('#book-form')}
              className="w-full bg-clinical-950 hover:bg-clinical-900 text-white py-3.5 rounded-xl font-extrabold shadow-md shadow-clinical-950/20 text-center"
            >
              Book Home Collection
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
