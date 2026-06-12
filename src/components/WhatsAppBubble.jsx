import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppBubble() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = 'https://wa.me/919569517193?text=Hi!%20I%20want%20to%20inquire%20about%20Thyrocare%20health%20packages%20and%20book%20a%20free%20home%20collection.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Book on WhatsApp"
    >
      {/* Animated Ping Ring */}
      <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping group-hover:animate-none" />
      
      {/* WhatsApp Icon */}
      <MessageSquare className="w-7 h-7 fill-white" />
      
      {/* Tooltip on Hover */}
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-md bg-opacity-95">
        Book via WhatsApp
      </span>
    </a>
  );
}
