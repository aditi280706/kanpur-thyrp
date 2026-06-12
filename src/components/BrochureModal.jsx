import { createPortal } from 'react-dom';
import { X, Printer, Calendar, Check, Sparkles, FileText, ShieldAlert, Heart } from 'lucide-react';

export default function BrochureModal({ isOpen, onClose, selectedPackage, onBook }) {
  if (!isOpen || !selectedPackage) return null;

  const pkg = selectedPackage;
  const discountPercent = Math.round(((pkg.originalPrice - pkg.offerPrice) / pkg.originalPrice) * 100);

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      id="brochure-portal-root"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 print:p-0 print:static print:bg-white"
    >
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none print:rounded-none print:w-full print:static animate-slide-up">
        
        {/* Sticky Preview Header - Hidden in Print */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-tealAccent-400" />
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-wide">
              Official Brochure Preview &amp; Download
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
            aria-label="Close brochure"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brochure Core Sheet (This gets printed) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-grow print:overflow-visible print:p-0 print:space-y-8 print:w-full">
          
          {/* Top Brand Banner */}
          <div className="border-b-4 border-clinical-950 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="font-heading font-black text-3xl text-clinical-950 tracking-tight flex items-center gap-1.5">
                <Heart className="w-7 h-7 text-clinical-950 fill-clinical-950" />
                Thyrocare
              </div>
              <div className="text-[10px] sm:text-xs font-heading font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                Geeta Diagnostic Centre &bull; Authorized Partner, Shuklaganj
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              <div className="text-xs font-bold text-tealAccent-600 bg-tealAccent-50 border border-tealAccent-200/50 px-3 py-1 rounded-full inline-block mb-1.5">
                Special Franchise Rate
              </div>
              <div className="flex items-baseline sm:justify-end gap-2">
                <span className="text-2xl sm:text-3xl font-black text-clinical-950">₹{pkg.offerPrice}</span>
                <span className="text-xs sm:text-sm text-slate-400 line-through font-bold">MRP ₹{pkg.originalPrice}</span>
              </div>
              {discountPercent > 0 && (
                <div className="text-[10px] font-extrabold text-emerald-600">
                  Save ₹{pkg.originalPrice - pkg.offerPrice} ({discountPercent}% OFF)
                </div>
              )}
            </div>
          </div>

          {/* Package Core Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-clinical-950 text-white text-[10px] uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                {pkg.badge}
              </span>
              <span className="bg-tealAccent-500 text-white text-[10px] uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                Includes {pkg.testCount} Parameters
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-slate-800 tracking-tight">
              {pkg.name}
            </h1>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-3xl">
              {pkg.summary}
            </p>
          </div>

          {/* Highlights & Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Highlights (Left) */}
            <div className="md:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-6">
              <h3 className="font-heading font-extrabold text-base text-clinical-950 mb-4 border-b border-slate-200/60 pb-2">
                Key Test Inclusions
              </h3>
              <ul className="space-y-3">
                {pkg.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-tealAccent-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Info (Right) */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <h3 className="font-heading font-extrabold text-base text-clinical-950 mb-4 border-b border-slate-200/60 pb-2">
                  Clinical Guidelines
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] block">
                      Fasting Guideline
                    </span>
                    <span className="font-bold text-slate-700 mt-0.5 block flex items-start gap-1">
                      <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      {pkg.prep}
                    </span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] block">
                      Recommended Frequency
                    </span>
                    <span className="font-bold text-slate-700 mt-0.5 block">
                      {pkg.frequency}
                    </span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] block">
                      Who Needs This Test?
                    </span>
                    <span className="font-bold text-slate-700 mt-0.5 block leading-relaxed">
                      {pkg.whoNeeds}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-parameter Breakdown details */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-base text-clinical-950 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-tealAccent-500" />
              Detailed Sub-Parameter Breakdown Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.details.map((group, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 p-4 rounded-2xl print:border print:border-slate-300">
                  <span className="font-heading font-black text-xs text-clinical-950 uppercase tracking-wider border-b border-slate-100 pb-1.5 block mb-2">
                    {group.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tests.map((test, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg print:border-none print:p-0 print:bg-transparent print:after:content-[',_'] print:last:after:content-none"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Laboratory Address & Contact Footer */}
          <div className="border-t border-slate-200 pt-6 text-center space-y-2">
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
              Official Certified Thyrocare Franchised Diagnostics
            </p>
            <p className="text-xs sm:text-sm font-heading font-black text-clinical-950">
              For Free Home Sample Collection: Call +91 95695 17193 / WhatsApp: +91 95695 17193
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold max-w-xl mx-auto">
              Shop No. 01, Ground Floor, Manjhara Piper Khera G/E, Shuklaganj, Unnao, Uttar Pradesh - 209861
            </p>
          </div>

        </div>

        {/* Modal Interactive Footer - Hidden in Print */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-heading font-black text-clinical-950">₹{pkg.offerPrice}</span>
              <span className="text-xs text-slate-400 line-through font-bold">MRP ₹{pkg.originalPrice}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/30 px-3 py-1.5 rounded-full">
              Free Home Collection Included
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 border border-slate-300 bg-white text-slate-600 hover:text-clinical-950 hover:bg-slate-100 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-clinical-950" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                onBook(pkg);
                onClose();
              }}
              className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-2 bg-clinical-950 hover:bg-clinical-900 text-white px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md shadow-clinical-950/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Collection</span>
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
