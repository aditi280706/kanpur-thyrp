import { Phone, MessageSquare, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Call Us Directly',
      value: '+91 95695 17193',
      href: 'tel:+919569517193',
      actionText: 'Tap to call'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Booking',
      value: '+91 95695 17193',
      href: 'https://wa.me/919569517193',
      actionText: 'Send message'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Monday - Sunday: 08:00 AM - 05:00 PM',
      href: null,
      actionText: 'Home collection slots available'
    }
  ];

  const mapsQuery = 'Shop+No.+01,+Ground+Floor,+Manjhara+Piper+Khera+G/E,+Shuklaganj,+Unnao,+Uttar+Pradesh+-+209861';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white border border-slate-200/50 px-3 py-1 rounded-full mb-3 inline-block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact Our Diagnostics Center
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about a package or want to schedule an urgent home collection? Call us, message on WhatsApp, or visit our office.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Cards - Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-clinical-50 flex items-center justify-center text-clinical-950 flex-shrink-0">
                    <detail.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {detail.title}
                    </h3>
                    {detail.href ? (
                      <a 
                        href={detail.href} 
                        target={detail.href.startsWith('http') ? '_blank' : undefined}
                        rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-base sm:text-lg font-bold text-slate-800 hover:text-clinical-950 block hover:underline transition-all"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-base sm:text-lg font-bold text-slate-800 block">
                        {detail.value}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      {detail.actionText}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-clinical-50 flex items-center justify-center text-clinical-950 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Laboratory Address
                </h3>
                <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                  Shop No. 01, Ground Floor,<br />
                  Manjhara Piper Khera G/E,<br />
                  Shuklaganj, Unnao,<br />
                  Uttar Pradesh - 209861
                </p>
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-clinical-950 hover:underline flex items-center mt-3 focus:outline-none"
                >
                  View on Google Maps <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Maps Card - Right (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-lg p-4 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
            {/* Interactive SVG/CSS Maps Mockup */}
            <div className="absolute inset-0 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden h-[calc(100%-80px)] rounded-t-2xl">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0f4c81_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Simulated Map Streets */}
              <svg className="w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
                <path d="M-10 100 H410 M-10 200 H410 M150 -10 V310 M250 -10 V310" stroke="#0f4c81" strokeWidth="6" />
                <path d="M50 -10 L350 310" stroke="#0f4c81" strokeWidth="4" />
                <path d="M350 -10 L50 310" stroke="#0f4c81" strokeWidth="4" />
              </svg>

              {/* Glowing Pulse Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 bg-clinical-950 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg animate-bounce">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                {/* Ping rings */}
                <div className="absolute -bottom-1.5 w-8 h-8 rounded-full border border-clinical-950/40 bg-clinical-950/10 animate-ping" />
                
                {/* Tooltip Card */}
                <div className="bg-white/95 border border-slate-200/50 p-2.5 rounded-xl shadow-lg mt-3 text-center text-[11px] font-bold text-slate-800 w-52 backdrop-blur-md">
                  Thyrocare - Geeta Diagnostic Centre
                  <span className="block font-medium text-[9px] text-slate-500 mt-0.5">Shop No. 1, Ground Floor</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions of Map */}
            <div className="relative mt-auto pt-4 bg-white z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-bold text-tealAccent-600 bg-tealAccent-50 border border-tealAccent-200/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Location Verified
                </span>
                <p className="text-xs text-slate-500 mt-1.5">
                  Shuklaganj, Unnao, Uttar Pradesh
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-clinical-950 hover:bg-clinical-900 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-clinical-950/20 text-center flex items-center justify-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
