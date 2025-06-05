
import { CardHeader, CardTitle } from "@/components/ui/card";

const PositionnementFormHeader = () => {
  return (
    <CardHeader className="bg-blue-50">
      <CardTitle className="text-2xl text-blue-900">
        Rendez-vous de positionnement initial
      </CardTitle>
      <div className="bg-blue-100 p-3 rounded">
        <p className="text-sm text-blue-800">
          <strong>Formation sélectionnée :</strong> WordPress : concevoir et réaliser un site vitrine • webmarketing initial <br/>
          <strong>Référence :</strong> RNCP35634-BC01 <br/>
          <strong>Catégorie :</strong> Formations sur le code ROME E
        </p>
      </div>
    </CardHeader>
  );
};

export default PositionnementFormHeader;
