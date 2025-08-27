import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Calendar } from "lucide-react";

interface ActionCorrective {
  id: string;
  titre: string;
  description: string;
  statut: 'planifiee' | 'en-cours' | 'terminee' | 'annulee';
  priorite: 'faible' | 'normale' | 'haute' | 'urgente';
  avancement: number; // pourcentage 0-100
  dateCreation: Date;
  dateEcheance?: Date;
  dateRealisation?: Date;
}

interface ActionsCorrectivesDashboardProps {
  actionsCorrectives: ActionCorrective[];
}

const ActionsCorrectivesDashboard = ({ actionsCorrectives }: ActionsCorrectivesDashboardProps) => {
  const [stats, setStats] = useState({
    total: 0,
    planifiees: 0,
    enCours: 0,
    terminees: 0,
    annulees: 0,
    prioriteHaute: 0,
    prioriteUrgente: 0,
    avancementMoyen: 0,
  });

  const [actionsRecentes, setActionsRecentes] = useState<ActionCorrective[]>([]);
  const [actionsAEcheance, setActionsAEcheance] = useState<ActionCorrective[]>([]);

  useEffect(() => {
    if (actionsCorrectives.length > 0) {
      // Calcul des statistiques
      const planifiees = actionsCorrectives.filter(a => a.statut === 'planifiee').length;
      const enCours = actionsCorrectives.filter(a => a.statut === 'en-cours').length;
      const terminees = actionsCorrectives.filter(a => a.statut === 'terminee').length;
      const annulees = actionsCorrectives.filter(a => a.statut === 'annulee').length;
      const prioriteHaute = actionsCorrectives.filter(a => a.priorite === 'haute').length;
      const prioriteUrgente = actionsCorrectives.filter(a => a.priorite === 'urgente').length;
      
      // Calcul de l'avancement moyen
      const avancementTotal = actionsCorrectives.reduce((acc, action) => acc + action.avancement, 0);
      const avancementMoyen = Math.round(avancementTotal / actionsCorrectives.length);

      setStats({
        total: actionsCorrectives.length,
        planifiees,
        enCours,
        terminees,
        annulees,
        prioriteHaute,
        prioriteUrgente,
        avancementMoyen
      });

      // Récupération des actions récentes
      const recent = [...actionsCorrectives]
        .sort((a, b) => 
          new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
        )
        .slice(0, 5);

      setActionsRecentes(recent);

      // Récupération des actions à échéance proche
      const today = new Date();
      const actionsProcheEcheance = actionsCorrectives
        .filter(a => 
          a.dateEcheance && 
          a.statut !== 'terminee' && 
          a.statut !== 'annulee' &&
          new Date(a.dateEcheance) > today &&
          new Date(a.dateEcheance).getTime() - today.getTime() < 15 * 24 * 60 * 60 * 1000 // 15 jours
        )
        .sort((a, b) => 
          (a.dateEcheance ? new Date(a.dateEcheance).getTime() : 0) - 
          (b.dateEcheance ? new Date(b.dateEcheance).getTime() : 0)
        )
        .slice(0, 5);

      setActionsAEcheance(actionsProcheEcheance);
    }
  }, [actionsCorrectives]);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'planifiee':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1"><Calendar className="h-3 w-3" /> Planifiée</Badge>;
      case 'en-cours':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><Clock className="h-3 w-3" /> En cours</Badge>;
      case 'terminee':
        return <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Terminée</Badge>;
      case 'annulee':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Annulée</Badge>;
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
      <h2 className="text-2xl font-bold">Tableau de bord des actions correctives</h2>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total des actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">En cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.enCours}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Terminées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.terminees}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avancement moyen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{stats.avancementMoyen}%</div>
            <Progress value={stats.avancementMoyen} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" /> 
              Statut des actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Planifiées</Badge>
                </div>
                <span>{stats.planifiees}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En cours</Badge>
                </div>
                <span>{stats.enCours}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">Terminées</Badge>
                </div>
                <span>{stats.terminees}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">Annulées</Badge>
                </div>
                <span>{stats.annulees}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Actions récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {actionsRecentes.length > 0 ? (
              <ul className="divide-y">
                {actionsRecentes.map((action) => (
                  <li key={action.id} className="py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{action.titre}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(action.dateCreation).toLocaleDateString()}
                          {action.dateEcheance && (
                            <> · Échéance: {new Date(action.dateEcheance).toLocaleDateString()}</>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        {getStatutBadge(action.statut)}
                        {getPrioriteBadge(action.priorite)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Avancement</span>
                        <span>{action.avancement}%</span>
                      </div>
                      <Progress value={action.avancement} className="h-1" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucune action corrective enregistrée</p>
            )}
          </CardContent>
        </Card>
      </div>

      {actionsAEcheance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <Calendar className="h-5 w-5 mr-2" />
              Actions à échéance proche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {actionsAEcheance.map((action) => (
                <li key={action.id} className="py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{action.titre}</p>
                      <p className="text-sm text-amber-600 font-medium">
                        Échéance: {new Date(action.dateEcheance!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      {getStatutBadge(action.statut)}
                      {getPrioriteBadge(action.priorite)}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Avancement</span>
                      <span>{action.avancement}%</span>
                    </div>
                    <Progress value={action.avancement} className="h-1" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActionsCorrectivesDashboard;
