
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-4">GestionMax Formation</h5>
            <p className="text-gray-300">
              Formations WordPress professionnelles certifiées Qualiopi
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact</h5>
            <p className="text-gray-300">
              Email: contact@gestionmax-formation.fr<br />
              Téléphone: 06 12 34 56 78
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Certifications</h5>
            <p className="text-gray-300">
              Organisme certifié Qualiopi<br />
              N° déclaration d'activité: 11 75 12345 75
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
