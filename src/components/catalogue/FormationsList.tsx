
import FormationCard from "./FormationCard";

interface Formation {
  id: string;
  titre: string;
  description: string;
  duree: string;
  prix: string;
  niveau: string;
  participants: string;
  objectifs: string[];
  prerequis: string;
  modalites: string;
}

interface FormationsListProps {
  formations: Formation[];
  onPositionnement: (titre: string) => void;
}

const FormationsList = ({ formations, onPositionnement }: FormationsListProps) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Nos formations disponibles
          </h3>
          <p className="text-lg text-gray-600">
            Chaque formation nécessite un rendez-vous de positionnement préalable
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onPositionnement={onPositionnement}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationsList;
