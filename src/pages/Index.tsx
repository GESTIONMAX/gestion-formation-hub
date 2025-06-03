
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FormationsPreview from "@/components/FormationsPreview";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FormationsPreview />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
