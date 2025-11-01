import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import WelcomeSection from "@/components/WelcomeSection";
import LeadershipSection from "@/components/LeadershipSection";
import Footer from "@/components/Footer";
import PortalPopup from "@/components/PortalPopup";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <NewsSection />
      <WelcomeSection />
      <LeadershipSection />
      <Footer />
      <PortalPopup />
    </div>
  );
};

export default Index;
