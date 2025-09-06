import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import LeadershipSection from "@/components/LeadershipSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <WelcomeSection />
      <LeadershipSection />
      <Footer />
    </div>
  );
};

export default Index;
