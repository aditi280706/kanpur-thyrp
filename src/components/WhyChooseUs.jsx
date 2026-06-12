import { Award, ShieldCheck, Zap, HeartHandshake, ThermometerSnowflake, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Award,
      title: 'NABL Accredited Labs',
      desc: 'All samples are processed at NABL-certified, CAP-accredited central labs using high-end diagnostic automation.'
    },
    {
      icon: Zap,
      title: 'Smart Reports in 24 Hours',
      desc: 'Fast digital reports are sent directly to your WhatsApp and Email. Easy to read with visual markers for values.'
    },
    {
      icon: HeartHandshake,
      title: 'Hygienic Home Collection',
      desc: 'Certified phlebotomists perform sterile blood draws using safety-vacutainers at your convenient home/office time.'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Temperature-Controlled Transit',
      desc: 'Samples are sealed in barcoded tubes and transported in cold-chain boxes to prevent degradation and assure accuracy.'
    },
    {
      icon: ShieldCheck,
      title: '100% Secure & Private',
      desc: 'Your health records and test results are fully encrypted and shared securely only with you.'
    },
    {
      icon: Users,
      title: '10 Million+ Happy Customers',
      desc: 'Thyrocare is a pioneer in preventive healthcare diagnostics, trusted by millions across India for 25+ years.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white border border-slate-200/50 px-3 py-1 rounded-full mb-3 inline-block">
            Our Quality Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Choose Thyrocare Shuklaganj?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We deliver the highest clinical standards of pathology testing with convenience, affordability, and precision.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-clinical-50 flex items-center justify-center text-clinical-950 mb-6 shadow-sm">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2.5">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="mt-16 bg-gradient-to-r from-clinical-950 to-clinical-900 rounded-[32px] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-around gap-8 text-center shadow-xl shadow-clinical-950/15">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1 text-tealAccent-300">25+</div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">Years of Diagnostic Trust</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1 text-tealAccent-300">900+</div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">Test Parameters Offered</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1 text-tealAccent-300">100%</div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">NABL Accredited Standard</div>
          </div>
        </div>
      </div>
    </section>
  );
}
