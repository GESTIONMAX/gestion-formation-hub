"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { UserDialog } from "@/app/_components/users/UserDialog";
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "actif" | "inactif";
  lastLogin?: string;
};

export default function GestionUtilisateurs() {
  // État pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("tous");
  
  // État pour la gestion de la modale
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Données factices (à remplacer par un appel API réel)
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      role: "admin",
      status: "actif",
      lastLogin: "2023-10-15T14:30:00Z",
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      role: "formateur",
      status: "actif",
      lastLogin: "2023-10-16T09:15:00Z",
    },
    {
      id: "3",
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
      role: "apprenant",
      status: "inactif",
      lastLogin: "2023-10-10T16:45:00Z",
    },
  ]);

  // Filtrer les utilisateurs selon la recherche et le filtre de rôle
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "tous" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Gérer la création d'un nouvel utilisateur
  const handleCreateUser = () => {
    setCurrentUser(null);
    setIsDialogOpen(true);
  };

  // Gérer l'édition d'un utilisateur existant
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  // Gérer la suppression d'un utilisateur
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        // Ici, vous feriez normalement un appel API pour supprimer l'utilisateur
        setUsers(users.filter(user => user.id !== userId));
        toast({
          title: "Succès",
          description: "L'utilisateur a été supprimé avec succès.",
        });
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de l'utilisateur.",
          variant: "destructive",
        });
      }
    }
  };

  // Gérer l'enregistrement d'un utilisateur (création ou mise à jour)
  const handleSaveUser = async (userData: any) => {
    try {
      if (currentUser) {
        // Mise à jour d'un utilisateur existant
        setUsers(users.map(user => 
          user.id === currentUser.id ? { ...user, ...userData } : user
        ));
        toast({
          title: "Succès",
          description: "L'utilisateur a été mis à jour avec succès.",
        });
      } else {
        // Création d'un nouvel utilisateur
        const newUser = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9), // Génère un ID aléatoire (à remplacer par un ID généré par le backend)
          lastLogin: new Date().toISOString(),
        };
        setUsers([...users, newUser]);
        toast({
          title: "Succès",
          description: "L'utilisateur a été créé avec succès.",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de l'utilisateur.",
        variant: "destructive",
      });
    }
  };

  // Formater la date de dernière connexion
  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return "Jamais";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtenir le libellé du rôle
  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: "Administrateur",
      formateur: "Formateur",
      apprenant: "Apprenant",
    };
    return roles[role] || role;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <Button onClick={handleCreateUser}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un utilisateur..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="tous">Tous les rôles</option>
              <option value="admin">Administrateur</option>
              <option value="formateur">Formateur</option>
              <option value="apprenant">Apprenant</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleLabel(user.role)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "actif" ? "default" : "secondary"}
                        className={user.status === "actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {user.status === "actif" ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun utilisateur trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modale de création/édition d'utilisateur */}
      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={currentUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
