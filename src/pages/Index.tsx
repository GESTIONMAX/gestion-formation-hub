
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FormationsPreview from "@/components/FormationsPreview";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <FormationsPreview />
      
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer votre formation WordPress ?
          </h2>
          <p className="text-xl mb-8">
            Rejoignez des centaines d'apprenants satisfaits
          </p>
          <div className="flex justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  Accéder au Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" variant="secondary">
                  Se connecter
                </Button>
              </Link>
            )}
            <Link to="/catalogue">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Voir le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
