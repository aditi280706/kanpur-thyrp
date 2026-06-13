import { Phone, MessageSquare, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
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
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-tealAccent-500 text-white shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  Thyrocare
                </span>
                <span className="text-xs sm:text-sm tracking-wide text-tealAccent-400 uppercase font-black mt-1">
                  Geeta Diagnostic Centre
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Thyrocare Shuklaganj is an authorized diagnostics collection center partner, offering NABL-accredited health checkup packages and free home collection across Shuklaganj and Unnao.
            </p>
            <div className="flex items-center space-x-2 bg-slate-800 px-3.5 py-2 rounded-xl w-fit border border-slate-700/50">
              <ShieldCheck className="w-4.5 h-4.5 text-tealAccent-400 mr-1.5 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-300">
                NABL Accredited Diagnostics Partner
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2.5">
              {[
                { name: 'Health Packages', href: '#packages' },
                { name: 'Why Choose Us', href: '#why-us' },
                { name: 'FAQs', href: '#faq' },
                { name: 'Contact Us', href: '#contact' },
                { name: 'Book Appointment', href: '#book-form' },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.href)}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white transition-all text-left w-fit focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Footer Card (4 cols) */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-tealAccent-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Shop No. 01, Ground Floor,<br />
                  Manjhara Piper Khera G/E,<br />
                  Shuklaganj, Unnao,<br />
                  Uttar Pradesh - 209861
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                <Phone className="w-4 h-4 text-tealAccent-400 flex-shrink-0" />
                <a href="tel:+919569517193" className="hover:text-white font-semibold">
                  +91 95695 17193
                </a>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                <MessageSquare className="w-4 h-4 text-tealAccent-400 flex-shrink-0" />
                <a href="https://wa.me/919569517193" className="hover:text-white font-semibold">
                  +91 95695 17193
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyrights */}
          <div className="text-xs text-slate-500">
            &copy; {currentYear} Thyrocare - Geeta Diagnostic Centre. All rights reserved.
            <span className="block mt-1 font-medium">
              Authorized partner franchisee diagnostics laboratory services.
            </span>
          </div>

          {/* Made with love/privacy details */}
          <div className="text-[11px] text-slate-600 flex items-center gap-1">
            <span>Made for Thyrocare Unnao</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>&bull; Vercel Ready</span>
          </div>
        </div>

        {/* Medical Disclaimer Disclaimer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] text-slate-600 text-left leading-relaxed">
          <strong>Disclaimer:</strong> Thyrocare and Aarogyam are registered trademarks of Thyrocare Technologies Limited. This website is owned and operated by an authorized diagnostic collection center franchise partner located at Shuklaganj, Unnao, UP. All tests and samples are processed at Thyrocare Technologies Limited NABL-accredited processing laboratories. Information provided here is for preventive screening purposes and should not replace professional medical advice.
        </div>
      </div>
    </footer>
  );
}
