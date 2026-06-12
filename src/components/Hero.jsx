import { Search, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const popularKeywords = ['Aarogyam Purush', 'Aarogyam Stree', 'Thyroid Basic', 'Lipid Profile', 'Food Intolerance', 'Beta HCG', 'CA-125'];

  const handleQuickKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    onSearchSubmit(keyword);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-teal-50/70 overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-clinical-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-20 w-80 h-80 bg-tealAccent-100/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center space-x-2 bg-clinical-50 border border-clinical-200/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-clinical-950 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-tealAccent-500 animate-pulse" />
            <span>NABL Accredited Diagnostics at Shuklaganj, Unnao</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Accurate Reports. Trusted Care.<br />
            <span className="bg-gradient-to-r from-clinical-950 to-tealAccent-600 bg-clip-text text-transparent">
              Right At Your Doorstep.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get certified Thyrocare health checkup packages with **Free Home Sample Collection** in Shuklaganj, Unnao, and surrounding areas.
          </p>

          {/* Interactive Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl mx-auto glassmorphism p-2 rounded-2xl flex flex-col sm:flex-row items-stretch gap-2 shadow-xl shadow-slate-100/80 mb-6"
          >
            <div className="flex-grow flex items-center px-3 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                placeholder="Search for blood tests, health packages (e.g. Thyroid, Aarogyam)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-transparent border-0 text-slate-800 placeholder-slate-400 font-medium focus:ring-0 focus:outline-none text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-clinical-950 text-white hover:bg-clinical-900 px-7 py-3 rounded-xl font-bold transition-all text-sm sm:text-base shadow-md shadow-clinical-950/20 active:scale-95"
            >
              Search Packages
            </button>
          </form>

          {/* Quick Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mr-2">Popular:</span>
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleQuickKeywordClick(keyword)}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-clinical-950 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:shadow transition-all duration-200"
              >
                {keyword}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: 'NABL Certified Partner', desc: '100% Reliable Reports' },
              { icon: MapPin, title: 'Free Home Collection', desc: 'Hygenic Sample Pickup' },
              { icon: Clock, title: 'Reports in 24 Hours', desc: 'Quick Digital Reports' },
              { icon: Award, title: 'Best Price Guarantee', desc: 'Up to 50% Off Packages' },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-slate-100 p-4 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-clinical-50 flex items-center justify-center text-clinical-950 mb-3 shadow-inner">
                  <badge.icon className="w-5 h-5 text-clinical-950" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  {badge.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
