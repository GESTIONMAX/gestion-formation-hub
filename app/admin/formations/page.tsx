'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, BookOpen, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Formation = {
  id: string;
  title: string;
  category: string;
  duration: string;
  status: 'publiée' | 'brouillon' | 'archivée';
  participants: number;
  lastUpdate: string;
};

export default function FormationsPage() {
  // Données factices pour les formations
  const [formations, setFormations] = useState<Formation[]>([
    {
      id: '1',
      title: 'Introduction à React',
      category: 'Développement Web',
      duration: '3 jours',
      status: 'publiée',
      participants: 24,
      lastUpdate: '2023-06-10T14:32:00',
    },
    {
      id: '2',
      title: 'Node.js Avancé',
      category: 'Backend',
      duration: '5 jours',
      status: 'publiée',
      participants: 15,
      lastUpdate: '2023-06-12T09:15:00',
    },
    {
      id: '3',
      title: 'UI/UX Design',
      category: 'Design',
      duration: '4 jours',
      status: 'brouillon',
      participants: 0,
      lastUpdate: '2023-06-15T11:20:00',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch = 
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'tous' || 
      formation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'publiée':
        return 'default';
      case 'brouillon':
        return 'secondary';
      case 'archivée':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des formations</h2>
          <p className="text-gray-600">Gérez le catalogue des formations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle formation
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une formation..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="tous">Tous les statuts</option>
              <option value="publiée">Publiées</option>
              <option value="brouillon">Brouillons</option>
              <option value="archivée">Archivées</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Formation</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFormations.length > 0 ? (
              filteredFormations.map((formation) => (
                <TableRow key={formation.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span>{formation.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formation.category}</TableCell>
                  <TableCell>{formation.duration}</TableCell>
                  <TableCell>{formation.participants}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(formation.status)}>
                      {formation.status.charAt(0).toUpperCase() + formation.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(formation.lastUpdate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Aucune formation trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
