import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Award, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isCataloguePage = location.pathname === "/catalogue";
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-blue-400">GestionMax Formation</h5>
            <p className="text-gray-300 mb-4">
              Organisme de formation spécialisé WordPress, certifié Qualiopi et référencé Datadock.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Navigation */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-blue-400">Navigation</h5>
            <nav className="flex flex-col space-y-2" aria-label="Liens de pied de page">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link>
              <Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors">Catalogue</Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              <Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors">À propos</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-blue-400">Contact</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">aurelien@gestionmax.fr</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">06 46 02 24 68</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">Antibes, Alpes-Maritimes (06)</span>
              </div>
            </div>
          </div>
          
          {/* Column 4 - Certifications */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-blue-400">Certifications</h5>
            <div className="space-y-3">
              {!isCataloguePage && (
                <div className="mb-4">
                  <div className="flex flex-col items-center bg-white p-3 rounded-lg">
                    <img 
                      src="/logo-qualiopi-gestionmax.webp" 
                      alt="Certification Qualiopi GestionMax" 
                      className="h-20 w-auto mb-2"
                    />
                    <a 
                      href="/documents/certification-qualiopi-gestionmax.pdf" 
                      download
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mt-1"
                    >
                      <Download size={14} className="mr-1" /> Télécharger certification
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-3">
                <Award className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">Certifié Qualiopi</span>
              </div>
              <div className="flex items-start space-x-3">
                <ExternalLink className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">Référencé Datadock</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-300">N° déclaration d'activité: 93 06 108 8906</p>
                <p className="text-xs text-gray-500 mt-1">Cet enregistrement ne vaut pas agrément de l'État (Article L.6352-12 du Code du travail)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 py-6 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h5 className="text-xl font-bold mb-2">Recevez nos actualités</h5>
            <p className="text-gray-300 mb-4">Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et offres de formation</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email pour newsletter"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">S'inscrire</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-300 mb-2 sm:mb-0">© {currentYear} GestionMax Formation. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <Link to="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="text-gray-300 hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link to="/accessibilite" className="text-gray-300 hover:text-white transition-colors">Accessibilité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
