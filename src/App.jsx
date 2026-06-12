import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackagesSection from './components/PackagesSection';
import PamphletModal from './components/PamphletModal';
import BrochureModal from './components/BrochureModal';
import LeadForm from './components/LeadForm';
import WhyChooseUs from './components/WhyChooseUs';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookPackage, setSelectedBookPackage] = useState(null);
  
  // Pamphlet Modal states
  const [isPamphletOpen, setIsPamphletOpen] = useState(false);
  const [pamphletPackage, setPamphletPackage] = useState(null);

  // Brochure Modal states
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochurePackage, setBrochurePackage] = useState(null);

  const handleBookPackage = (pkg) => {
    setSelectedBookPackage(pkg);
    // Scroll to booking form automatically (LeadForm handles it internally as well)
    const element = document.getElementById('book-form');
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

  const handleOpenPamphlet = (pkg) => {
    setPamphletPackage(pkg);
    setIsPamphletOpen(true);
  };

  const handleOpenBrochure = (pkg) => {
    setBrochurePackage(pkg);
    setIsBrochureOpen(true);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    // Scroll to packages section to show filtered results
    const element = document.getElementById('packages');
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
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        
        {/* Packages Grid & Directory */}
        <PackagesSection
          searchQuery={searchQuery}
          onBookPackage={handleBookPackage}
          onOpenPamphlet={handleOpenPamphlet}
          onOpenBrochure={handleOpenBrochure}
        />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Lead Enquiry / Booking Form */}
        <LeadForm
          selectedPackageFromApp={selectedBookPackage}
          clearSelectedPackage={() => setSelectedBookPackage(null)}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Laboratory Locations & Contact Section */}
        <ContactSection />
        
      </main>

      {/* Information Test Details Pamphlet Modal */}
      <PamphletModal
        isOpen={isPamphletOpen}
        onClose={() => {
          setIsPamphletOpen(false);
          setPamphletPackage(null);
        }}
        selectedPackage={pamphletPackage}
        onBook={handleBookPackage}
      />

      {/* Brochure Preview Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => {
          setIsBrochureOpen(false);
          setBrochurePackage(null);
        }}
        selectedPackage={brochurePackage}
        onBook={handleBookPackage}
      />

      {/* Floating WhatsApp Bubble */}
      <WhatsAppBubble />

      {/* SEO-friendly Footer */}
      <Footer />
    </div>
  );
}

export default App;
