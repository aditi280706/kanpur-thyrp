import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      question: 'How do I book a free home sample collection?',
      answer: 'Booking is simple! You can fill out the online Booking Enquiry Form on this website, click the "Confirm via WhatsApp" button to send us your details instantly, or call us directly at +91 95695 17193. Our team will coordinate and confirm your preferred slot.'
    },
    {
      question: 'Is fasting mandatory for health packages like Aarogyam?',
      answer: 'Yes, for most comprehensive health checkups (like Aarogyam Basic, C, 1.3, 1.7) and blood sugar/lipid tests, a 10 to 12-hour overnight fasting is mandatory. You should not consume tea, coffee, breakfast, or milk. Drinking plain water is perfectly fine.'
    },
    {
      question: 'When and how will I receive my test reports?',
      answer: 'You will receive a digital (PDF) report directly on your WhatsApp and registered Email within 24 hours of sample collection. The digital report contains secure QR codes to verify authenticity.'
    },
    {
      question: 'Are there any extra home collection charges in Shuklaganj or Unnao?',
      answer: 'No! Home collection is completely FREE for all Aarogyam health packages and bookings above ₹500. There are no hidden service fees or convenience charges.'
    },
    {
      question: 'What are the available payment options?',
      answer: 'You can pay securely at the time of sample collection. We accept GPay/PhonePe (UPI), Cash, or Debit/Credit cards. Online payment links can also be generated upon request.'
    },
    {
      question: 'How can I be sure about the accuracy of Thyrocare reports?',
      answer: 'Thyrocare operates India\'s fully automated laboratory processing over 100,000 samples daily. The laboratory is accredited by NABL (National Accreditation Board for Testing and Calibration Laboratories) and CAP (College of American Pathologists), ensuring global quality standards.'
    }
  ];

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-200/50 px-3 py-1 rounded-full mb-3 inline-block">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about preparation, booking, and report delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-slate-50 border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-clinical-200 shadow-sm' : 'border-slate-200/60 hover:bg-slate-100/50'
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base pr-4 flex items-center">
                    <HelpCircle className="w-5 h-5 text-clinical-950 mr-2.5 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center flex-shrink-0 text-slate-500 shadow-sm">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {/* Answer container */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-slate-200/60' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
