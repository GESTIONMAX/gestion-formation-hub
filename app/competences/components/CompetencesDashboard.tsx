import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { ChevronRight, Briefcase, BookOpen, Users, Calendar } from "lucide-react";
import { Competence, CategorieCompetence } from "../../_lib/types/competence";

interface CompetencesDashboardProps {
  competences: Competence[];
}

const CompetencesDashboard = ({ competences }: CompetencesDashboardProps) => {
  const [averageProgression, setAverageProgression] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState<Record<CategorieCompetence, number>>({
    technique: 0,
    pedagogique: 0,
    relationnelle: 0,
    organisationnelle: 0
  });
  const [competencesByStatus, setCompetencesByStatus] = useState({
    planifie: 0,
    'en-cours': 0,
    realise: 0,
    reporte: 0
  });

  useEffect(() => {
    if (competences.length > 0) {
      // Calculate average progression
      const totalCompetences = competences.length;
      const totalProgression = competences.reduce((acc, comp) => {
        const currentProgress = (comp.niveauActuel / comp.objectifNiveau) * 100;
        return acc + currentProgress;
      }, 0);
      setAverageProgression(Math.round(totalProgression / totalCompetences));

      // Count competences by category
      const catCount: Record<CategorieCompetence, number> = {
        technique: 0,
        pedagogique: 0,
        relationnelle: 0,
        organisationnelle: 0
      };
      
      // Count competences by status
      const statusCount = {
        planifie: 0,
        'en-cours': 0,
        realise: 0,
        reporte: 0
      };

      competences.forEach(comp => {
        catCount[comp.categorie]++;
        statusCount[comp.statut]++;
      });

      setCategoriesCount(catCount);
      setCompetencesByStatus(statusCount);
    }
  }, [competences]);

  const getCategoryIcon = (category: CategorieCompetence) => {
    switch (category) {
      case 'technique': return <Briefcase className="h-5 w-5" />;
      case 'pedagogique': return <BookOpen className="h-5 w-5" />;
      case 'relationnelle': return <Users className="h-5 w-5" />;
      case 'organisationnelle': return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tableau de bord des compétences</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total des compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competences.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">En cours d'acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competencesByStatus['en-cours']}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Compétences acquises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competencesByStatus.realise}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Progression moyenne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{averageProgression}%</div>
            <Progress value={averageProgression} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {Object.entries(categoriesCount).map(([category, count]) => (
                <li key={category} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      {getCategoryIcon(category as CategorieCompetence)}
                    </div>
                    <span className="font-medium capitalize">{category}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline">{count}</Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut des compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Planifiées</Badge>
                </div>
                <span>{competencesByStatus.planifie}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En cours</Badge>
                </div>
                <span>{competencesByStatus['en-cours']}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">Réalisées</Badge>
                </div>
                <span>{competencesByStatus.realise}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">Reportées</Badge>
                </div>
                <span>{competencesByStatus.reporte}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compétences récemment modifiées</CardTitle>
        </CardHeader>
        <CardContent>
          {competences.length > 0 ? (
            <div className="divide-y">
              {competences
                .sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime())
                .slice(0, 5)
                .map(comp => (
                  <div key={comp.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{comp.nom}</h3>
                        <p className="text-sm text-gray-500">{comp.description.substring(0, 100)}...</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {comp.categorie}
                        </Badge>
                        {comp.statut === 'realise' && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">Réalisée</Badge>
                        )}
                        {comp.statut === 'en-cours' && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En cours</Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Mise à jour le {new Date(comp.dateModification).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucune compétence enregistrée</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetencesDashboard;
