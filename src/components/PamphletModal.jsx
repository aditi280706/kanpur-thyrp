import { X, Calendar, Printer, ShieldAlert, CheckCircle, FileText, Info } from 'lucide-react';

export default function PamphletModal({ isOpen, onClose, selectedPackage, onBook }) {
  if (!isOpen || !selectedPackage) return null;

  const pkg = selectedPackage;

  const handlePrint = () => {
    // Open a new window and render the printable layout
    const printContent = `
      <html>
        <head>
          <title>${pkg.name} Diagnostic Pamphlet</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #1e293b; padding: 30px; line-height: 1.6; }
            .header { border-bottom: 2px solid #0f4c81; padding-bottom: 15px; margin-bottom: 25px; }
            .brand { font-size: 24px; font-weight: bold; color: #0f4c81; }
            .partner { font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase; }
            .title { font-size: 28px; font-weight: 800; color: #0f4c81; margin: 15px 0 5px 0; }
            .badge { background: #eef6fc; color: #0f4c81; padding: 4px 10px; border-radius: 15px; font-weight: bold; font-size: 12px; display: inline-block; }
            .price-info { float: right; text-align: right; }
            .price { font-size: 22px; font-weight: bold; color: #00a896; }
            .mrp { text-decoration: line-through; color: #94a3b8; font-size: 13px; }
            .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
            .section { background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 15px; }
            .section-title { font-size: 15px; font-weight: bold; color: #0f4c81; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 10px; }
            ul { padding-left: 20px; margin: 0; }
            li { margin-bottom: 6px; font-size: 13px; }
            .parameters-list { font-size: 12px; color: #475569; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; text-align: center; color: #64748b; }
            .contact-info { font-weight: bold; color: #0f4c81; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="price-info">
              <div class="price">Offer Price: ₹${pkg.offerPrice}</div>
              <div class="mrp">MRP: ₹${pkg.originalPrice}</div>
            </div>
            <div>
              <div class="brand">Thyrocare</div>
              <div class="partner">Diagnostic Partner - Shuklaganj, Unnao</div>
            </div>
          </div>

          <h1 class="title">${pkg.name}</h1>
          <div class="badge">Includes ${pkg.testCount} Test Parameters</div>

          <p style="font-size: 14px; color: #475569; margin: 15px 0;">${pkg.summary}</p>

          <div class="content-grid">
            <div class="section">
              <div class="section-title">Preparation & Guidelines</div>
              <p style="font-size: 13px; margin: 0;">${pkg.prep}</p>
            </div>
            <div class="section">
              <div class="section-title">Clinical Purpose & Who Needs It</div>
              <p style="font-size: 13px; margin: 0;">${pkg.whoNeeds}</p>
            </div>
          </div>

          <div class="section">
            <div class="section-title font-bold">Key Inclusions (${pkg.highlights.length})</div>
            <ul style="list-style-type: square;">
              ${pkg.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Detailed Sub-Parameter Breakdown</div>
            <div class="parameters-list">
              ${pkg.details.map(d => `
                <div style="margin-bottom: 8px;">
                  <strong>${d.name}:</strong> ${d.tests.join(', ')}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="footer">
            <p>Authorized Thyrocare Franchise Diagnostic Service.</p>
            <p class="contact-info">To schedule a free home sample collection: Call +91 95695 17193 / WhatsApp: +91 95695 17193</p>
            <p>Shop No. 01, Ground Floor, Manjhara Piper Khera G/E, Shuklaganj, Unnao, Uttar Pradesh - 209861</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[90vh] animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-clinical-950 to-clinical-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="bg-tealAccent-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-inner inline-block mb-3">
            {pkg.badge} - Medical Pamphlet
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{pkg.name}</h3>
          <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-xl">
            {pkg.summary}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Quick Details Alert Banner */}
          <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-2xl flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-amber-800">
              <span className="font-bold">Fasting Requirement: </span>
              {pkg.prep}
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                <Info className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                Who Should Get This?
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {pkg.whoNeeds}
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 text-tealAccent-600 mr-1.5" />
                Testing Frequency
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {pkg.frequency}
              </p>
            </div>
          </div>

          {/* Test parameters details */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h4 className="text-sm font-bold text-slate-800 flex items-center">
                <FileText className="w-4 h-4 text-clinical-950 mr-2" />
                Detailed Test Profile Parameter Breakdown
              </h4>
              <p className="text-slate-500 text-[11px] sm:text-xs">
                Click Book Now to book these tests. Total parameters: {pkg.testCount}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.details.map((group, gIdx) => (
                <div key={gIdx} className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-xs font-extrabold text-clinical-950 uppercase tracking-wide border-b border-slate-200/50 pb-1.5 block mb-2">
                    {group.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tests.map((test, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-white border border-slate-200/60 text-slate-700 text-[11px] font-medium px-2 py-1 rounded-lg"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-clinical-950">₹{pkg.offerPrice}</span>
              <span className="text-xs text-slate-400 line-through">MRP ₹{pkg.originalPrice}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/30 px-2.5 py-1 rounded-full">
              Free Home Collection
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 border border-slate-300 bg-white text-slate-600 hover:text-clinical-950 hover:bg-slate-100 px-4 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-clinical-950" />
              <span className="hidden sm:inline">Print Pamphlet</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button
              onClick={() => {
                onBook(pkg);
                onClose();
              }}
              className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-2 bg-clinical-950 hover:bg-clinical-900 text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-md shadow-clinical-950/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Collection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
