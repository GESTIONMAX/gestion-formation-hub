import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, MessageCircle } from "lucide-react";

interface Reclamation {
  id: string;
  titre: string;
  description: string;
  statut: 'nouvelle' | 'en-traitement' | 'resolue' | 'cloturee';
  priorite: 'faible' | 'normale' | 'haute' | 'urgente';
  dateCreation: Date;
  dateCloture?: Date;
}

interface ReclamationsDashboardProps {
  reclamations: Reclamation[];
}

const ReclamationsDashboard = ({ reclamations }: ReclamationsDashboardProps) => {
  const [stats, setStats] = useState({
    total: 0,
    nouvelles: 0,
    enTraitement: 0,
    resolues: 0,
    cloturees: 0,
    prioriteHaute: 0,
    prioriteUrgente: 0,
  });

  const [reclamationsRecentes, setReclamationsRecentes] = useState<Reclamation[]>([]);

  useEffect(() => {
    if (reclamations.length > 0) {
      // Calculate statistics
      const nouvelles = reclamations.filter(r => r.statut === 'nouvelle').length;
      const enTraitement = reclamations.filter(r => r.statut === 'en-traitement').length;
      const resolues = reclamations.filter(r => r.statut === 'resolue').length;
      const cloturees = reclamations.filter(r => r.statut === 'cloturee').length;
      const prioriteHaute = reclamations.filter(r => r.priorite === 'haute').length;
      const prioriteUrgente = reclamations.filter(r => r.priorite === 'urgente').length;

      setStats({
        total: reclamations.length,
        nouvelles,
        enTraitement,
        resolues,
        cloturees,
        prioriteHaute,
        prioriteUrgente
      });

      // Get recent reclamations
      const recent = [...reclamations]
        .sort((a, b) => 
          new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
        )
        .slice(0, 5);

      setReclamationsRecentes(recent);
    }
  }, [reclamations]);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'nouvelle':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Nouvelle</Badge>;
      case 'en-traitement':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><Clock className="h-3 w-3" /> En traitement</Badge>;
      case 'resolue':
        return <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Résolue</Badge>;
      case 'cloturee':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Clôturée</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  const getPrioriteBadge = (priorite: string) => {
    switch (priorite) {
      case 'faible':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Faible</Badge>;
      case 'normale':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Normale</Badge>;
      case 'haute':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Haute</Badge>;
      case 'urgente':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Urgente</Badge>;
      default:
        return <Badge>{priorite}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tableau de bord des réclamations</h2>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total des réclamations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Nouvelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.nouvelles}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">En traitement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.enTraitement}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Haute priorité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.prioriteHaute + stats.prioriteUrgente}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" /> 
              Statut des réclamations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Nouvelles</Badge>
                </div>
                <span>{stats.nouvelles}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En traitement</Badge>
                </div>
                <span>{stats.enTraitement}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">Résolues</Badge>
                </div>
                <span>{stats.resolues}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">Clôturées</Badge>
                </div>
                <span>{stats.cloturees}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Réclamations récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reclamationsRecentes.length > 0 ? (
              <ul className="divide-y">
                {reclamationsRecentes.map((reclamation) => (
                  <li key={reclamation.id} className="py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{reclamation.titre}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(reclamation.dateCreation).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        {getStatutBadge(reclamation.statut)}
                        {getPrioriteBadge(reclamation.priorite)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucune réclamation enregistrée</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReclamationsDashboard;
