import { useState, useMemo } from 'react';
import { Sparkles, FileText, Check, Calendar, ChevronDown, ChevronUp, AlertCircle, HelpCircle, Search } from 'lucide-react';
import { packageData } from '../data/packages';

export default function PackagesSection({
  searchQuery,
  onBookPackage,
  onOpenPamphlet,
  onOpenBrochure
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Local Directory states
  const [dirSearchQuery, setDirSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const categories = ['All', 'Full Body Checkups', 'Vitals & Diabetes', 'Cancer Markers', 'Allergies & Specialized', 'Vitamins'];

  // Filter package cards based on category and global search query
  const filteredPackages = useMemo(() => {
    return packageData.filter((pkg) => {
      const matchesCategory = activeTab === 'All' || pkg.categories.includes(activeTab);
      const matchesSearch =
        searchQuery === '' ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Alphabetical grouping for Test Directory
  const alphabet = ['All', 'A', 'B', 'C', 'F', 'H', 'I', 'J', 'L', 'N', 'Q', 'T', 'V'];

  // Sort and filter all tests for the alphabetical directory
  const filteredDirectoryItems = useMemo(() => {
    let items = [...packageData].sort((a, b) => a.name.localeCompare(b.name));

    if (selectedLetter !== 'All') {
      items = items.filter(item => item.name.trim().toUpperCase().startsWith(selectedLetter));
    }

    if (dirSearchQuery.trim() !== '') {
      items = items.filter(item => 
        item.name.toLowerCase().includes(dirSearchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(dirSearchQuery.toLowerCase())
      );
    }

    return items;
  }, [selectedLetter, dirSearchQuery]);

  const toggleExpandCard = (id, e) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      {/* PACKAGES BLOCK */}
      <section id="packages" className="py-20 bg-slate-50 relative">
        {/* Dynamic Background Blur */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-clinical-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-tealAccent-50/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-clinical-50 border border-clinical-200/50 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-clinical-950 uppercase tracking-wider mb-4 inline-block shadow-sm">
              Diagnostic Brochure Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-heading leading-tight">
              Preventive &amp; Clinical Health Checkups
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Book NABL accredited, CAP certified pathology tests. Choose from full-body Aarogyam profiles, specialized cancer markers, diabetes checks, and vitamins with **Free Home collection**.
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-5xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-sm border ${
                  activeTab === category
                    ? 'bg-clinical-950 border-clinical-950 text-white shadow-lg shadow-clinical-950/15'
                    : 'bg-white border-slate-200/70 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/50 shadow-sm max-w-xl mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">No Packages Found</h3>
              <p className="text-slate-500 text-sm mb-4">
                We couldn't find any packages matching "{searchQuery}". Try searching in the Test Directory below.
              </p>
            </div>
          )}

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const isExpanded = expandedCard === pkg.id;
              const discountPercent = Math.round(((pkg.originalPrice - pkg.offerPrice) / pkg.originalPrice) * 100);

              return (
                <div
                  key={pkg.id}
                  className="bg-white/95 backdrop-blur-sm rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative group"
                >
                  {/* Badge Overlay */}
                  <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2 max-w-[80%]">
                    <span className="bg-clinical-950 text-white text-[9px] uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                      {pkg.badge}
                    </span>
                    {discountPercent > 0 && (
                      <span className="bg-tealAccent-500 text-white text-[9px] uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Top Info */}
                  <div className="p-6 pt-16 border-b border-slate-50 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight leading-snug mb-2 font-heading group-hover:text-clinical-950 transition-colors">
                        {pkg.name}
                      </h3>
                      <span className="inline-flex items-center text-[10px] font-bold text-clinical-950 bg-clinical-50 border border-clinical-100/50 px-3 py-1 rounded-full mb-4">
                        {pkg.testCount} {pkg.testCount === 1 ? 'Parameter' : 'Parameters'}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                        {pkg.summary}
                      </p>

                      {/* Highlights Grid */}
                      <div className="space-y-2 mb-6 bg-slate-50/50 border border-slate-100/50 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Highlights</p>
                        {pkg.highlights.slice(0, 5).map((highlight, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-tealAccent-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                              {highlight}
                            </span>
                          </div>
                        ))}
                        {pkg.highlights.length > 5 && (
                          <button
                            onClick={(e) => toggleExpandCard(pkg.id, e)}
                            className="text-xs font-bold text-clinical-950 hover:text-tealAccent-600 flex items-center mt-3.5 transition-colors focus:outline-none"
                          >
                            {isExpanded ? (
                              <>
                                Show Less <ChevronUp className="w-3.5 h-3.5 ml-1" />
                              </>
                            ) : (
                              <>
                                + {pkg.highlights.length - 5} More Highlights <ChevronDown className="w-3.5 h-3.5 ml-1" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded Parameters List */}
                    {isExpanded && (
                      <div className="mt-2 pt-4 border-t border-slate-100 space-y-3 animate-fade-in">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Panel Details</p>
                        {pkg.details.map((detail, dIdx) => (
                          <div key={dIdx} className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-100">
                            <h4 className="text-xs font-bold text-clinical-950 mb-1.5">{detail.name}</h4>
                            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-semibold">
                              {detail.tests.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action / Price Section */}
                  <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-4">
                    {/* Price */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-clinical-950 tracking-tight">
                          ₹{pkg.offerPrice}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          MRP: ₹{pkg.originalPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenPamphlet(pkg)}
                        className="text-xs font-bold text-slate-700 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-clinical-950 transition-all flex items-center shadow-sm"
                      >
                        <HelpCircle className="w-4 h-4 mr-1 text-tealAccent-500" />
                        Parameters
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-1.5">
                      <button
                        onClick={() => onOpenBrochure(pkg)}
                        className="flex items-center justify-center space-x-1.5 border border-slate-200 bg-white text-slate-600 hover:text-clinical-950 hover:bg-slate-100/80 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-sm"
                      >
                        <FileText className="w-4 h-4 text-clinical-950" />
                        <span>Brochure</span>
                      </button>
                      <button
                        onClick={() => onBookPackage(pkg)}
                        className="flex items-center justify-center space-x-1.5 bg-clinical-950 text-white hover:bg-clinical-900 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-clinical-950/20 transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE TEST DIRECTORY */}
      <section id="directory" className="py-20 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-tealAccent-50 border border-tealAccent-100 text-tealAccent-700 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 inline-block shadow-sm">
              A-Z Test Index
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-heading leading-tight">
              Comprehensive Pathology Directory
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Easily search or filter through our complete database of 27 diagnostic tests and pathology checkups.
            </p>
          </div>

          {/* Directory Filter Panel */}
          <div className="glassmorphism p-6 rounded-[28px] border border-slate-200/50 shadow-lg shadow-slate-100/30 mb-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
            {/* Alphabet quick navigation */}
            <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter A-Z:</span>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-9 h-9 rounded-xl text-xs font-extrabold transition-all ${
                    selectedLetter === letter
                      ? 'bg-clinical-950 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/40'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Local Directory Search */}
            <div className="relative w-full md:w-80 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search directory..."
                value={dirSearchQuery}
                onChange={(e) => setDirSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100/50 transition-all text-xs"
              />
            </div>
          </div>

          {/* Directory List Grid */}
          <div className="max-w-5xl mx-auto">
            {filteredDirectoryItems.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-500">No matching tests found in directory.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDirectoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-clinical-200 transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate min-w-0">
                          {item.name}
                        </h4>
                        <span className="bg-clinical-50 text-clinical-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center">
                        <Sparkles className="w-3 h-3 text-tealAccent-500 mr-1" />
                        {item.testCount} {item.testCount === 1 ? 'Parameter' : 'Parameters'} &bull; {item.prep.split(' ')[0]} Required
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <span className="text-base font-extrabold text-clinical-950 block">
                          ₹{item.offerPrice}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through block leading-none font-semibold">
                          MRP ₹{item.originalPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenBrochure(item)}
                        className="bg-clinical-50 text-clinical-950 hover:bg-clinical-950 hover:text-white p-2.5 rounded-xl transition-all shadow-sm focus:outline-none"
                        title="View Brochure"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onBookPackage(item)}
                        className="bg-clinical-50 text-clinical-950 hover:bg-clinical-950 hover:text-white p-2.5 rounded-xl transition-all shadow-sm focus:outline-none"
                        title="Book Now"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
