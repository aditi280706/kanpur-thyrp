import { useState, useEffect } from 'react';
import { Calendar, User, Phone, MapPin, CheckCircle, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';
import { packageData } from '../data/packages';

export default function LeadForm({ selectedPackageFromApp, clearSelectedPackage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    packageId: '',
    address: '',
    date: '',
    timeSlot: 'Morning (08:00 AM - 11:00 AM)', // Fasting packages are usually done in the morning
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync selected package from external trigger (like clicking "Book Now" on a card)
  useEffect(() => {
    if (selectedPackageFromApp) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        packageId: selectedPackageFromApp.id,
      }));
      // Scroll to form smoothly
      const element = document.getElementById('book-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedPackageFromApp]);

  const timeSlots = [
    'Morning (08:00 AM - 11:00 AM)',
    'Mid Day (11:00 AM - 02:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM)',
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.packageId) newErrors.packageId = 'Please select a health package';
    if (!formData.address.trim()) newErrors.address = 'Home collection address is required';
    if (!formData.date) newErrors.date = 'Preferred collection date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSelectedPackageName = () => {
    const pkg = packageData.find((p) => p.id === formData.packageId);
    return pkg ? `${pkg.name} (₹${pkg.offerPrice})` : '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Formats text to be sent directly to WhatsApp
  const generateWhatsAppUrl = (data) => {
    const pkgName = getSelectedPackageName();
    const message = `*NEW BOOKING ENQUIRY - THYROCARE* \n\n` +
      `*Patient Name:* ${data.name}\n` +
      `*Mobile Number:* ${data.phone}\n` +
      `*Selected Package:* ${pkgName}\n` +
      `*Address:* ${data.address}\n` +
      `*Preferred Date:* ${data.date}\n` +
      `*Preferred Slot:* ${data.timeSlot}\n\n` +
      `_Please confirm my home sample collection booking. Thank you!_`;
    
    return `https://wa.me/919569517193?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate booking submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const whatsappUrl = generateWhatsAppUrl(formData);
      window.open(whatsappUrl, '_blank');
      
      clearSelectedPackage();
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      packageId: '',
      address: '',
      date: '',
      timeSlot: 'Morning (08:00 AM - 11:00 AM)',
    });
    setIsSubmitted(false);
  };

  // Get current date for min attribute in date input (prevent booking in the past)
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="book-form" className="py-20 bg-white relative">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-12 left-0 w-64 h-64 bg-tealAccent-50/40 rounded-full blur-xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Wrapper */}
        <div className="glassmorphism p-8 sm:p-12 rounded-[32px] border border-slate-200/60 shadow-xl shadow-slate-100/60">
          
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="bg-clinical-50 text-clinical-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3.5 inline-block">
                  Free Home Sample Collection
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Book A Home Checkup
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Fill in your details below. Our certified health technician will visit your home/office to collect the samples safely.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                      <User className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter patient full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 bg-slate-50 border ${
                        errors.name ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      } rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 transition-all text-sm`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {errors.name}</p>}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                      <Phone className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 bg-slate-50 border ${
                        errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      } rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 transition-all text-sm`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Package Selector */}
                  <div>
                    <label htmlFor="packageId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                      Select Package / Test
                    </label>
                    <select
                      id="packageId"
                      name="packageId"
                      value={formData.packageId}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 bg-slate-50 border ${
                        errors.packageId ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      } rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-4 transition-all text-sm`}
                    >
                      <option value="">-- Choose a package --</option>
                      {packageData.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} - ₹{pkg.offerPrice} ({pkg.testCount} tests)
                        </option>
                      ))}
                    </select>
                    {errors.packageId && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {errors.packageId}</p>}
                  </div>

                  {/* Date Selector */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 bg-slate-50 border ${
                        errors.date ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      } rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-4 transition-all text-sm`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {errors.date}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address Input */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-clinical-950 mr-1.5" />
                      Home Collection Address (Shuklaganj, Unnao)
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      placeholder="Enter building name, flat number, street name, and pincode"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 bg-slate-50 border ${
                        errors.address ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      } rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 transition-all text-sm`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> {errors.address}</p>}
                  </div>
                </div>

                {/* Time slot picker */}
                <div>
                  <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Preferred Time Slot
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, timeSlot: slot }))}
                        className={`px-4 py-3 border text-xs font-bold rounded-xl text-center transition-all ${
                          formData.timeSlot === slot
                            ? 'bg-clinical-950 text-white border-clinical-950 shadow-md'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot.split(' (')[0]}
                        <span className="block text-[9px] opacity-75 font-medium mt-0.5">
                          {slot.substring(slot.indexOf('('))}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-extrabold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 text-sm md:text-base cursor-pointer hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Booking...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5" />
                        <span>Confirm booking &amp; Send to WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Success Screen
            <div className="text-center py-8 max-w-lg mx-auto animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/10">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">
                Booking Request Received!
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Thank you, <span className="font-bold">{formData.name}</span>. Your enquiry for <span className="font-bold">{getSelectedPackageName()}</span> has been recorded.
              </p>

              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left text-xs sm:text-sm text-slate-700 space-y-2 mb-8">
                <p><strong>Appointment Date:</strong> {formData.date}</p>
                <p><strong>Slot:</strong> {formData.timeSlot}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p className="text-clinical-950 font-bold border-t border-slate-200/50 pt-2.5 mt-2.5">
                  Our coordinator will call you back at <span className="underline">{formData.phone}</span> within 15-30 minutes to confirm your home collection time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-bold transition-all text-sm"
                >
                  Book Another Test
                </button>
                <a
                  href={generateWhatsAppUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-650 text-white px-6 py-3 rounded-xl font-extrabold transition-all flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/10 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
