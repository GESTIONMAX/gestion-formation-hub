import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/Header";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
