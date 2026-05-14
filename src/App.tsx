import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import HistorySection from '@/sections/HistorySection';
import InnovationSection from '@/sections/InnovationSection';
import ServicesSection from '@/sections/ServicesSection';
import PortfolioSection from '@/sections/PortfolioSection';
import ContactSection from '@/sections/ContactSection';
import KontaktPage from '@/pages/KontaktPage';

import ClientReviewsSection from '@/sections/ClientReviewsSection';

function HomePage() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <InnovationSection />
      <ServicesSection />
      <PortfolioSection />
      <ClientReviewsSection />
      <ContactSection />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
      <Footer />
    </SmoothScrollProvider>
  );
}

export default App;
