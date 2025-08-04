
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center gap-6" aria-label="Menu principal">
      <Link to="/">
        <Button 
          variant={isActive("/") ? "default" : "ghost"}
          className="text-base"
        >
          Accueil
        </Button>
      </Link>
      <Link to="/catalogue">
        <Button 
          variant={isActive("/catalogue") ? "default" : "ghost"}
          className="text-base"
        >
          Catalogue
        </Button>
      </Link>
      <Link to="/blog">
        <Button 
          variant={isActive("/blog") ? "default" : "ghost"}
          className="text-base"
        >
          Blog
        </Button>
      </Link>
      <Link to="/a-propos">
        <Button 
          variant={isActive("/a-propos") ? "default" : "ghost"}
          className="text-base"
        >
          À propos
        </Button>
      </Link>
      <Link to="/contact">
        <Button 
          variant={isActive("/contact") ? "default" : "ghost"}
          className="text-base"
        >
          Contact
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button variant="outline" className="text-base">
          Espace formation
        </Button>
      </Link>
    </nav>
  );
};

export default Navigation;
