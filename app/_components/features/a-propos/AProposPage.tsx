"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, Users, BookOpen, Clock, FileDown, ExternalLink } from "lucide-react";
import Link from "next/link";

const AProposPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">À propos de GestionMax</h1>
        <p className="text-xl text-gray-600">
          Un organisme de formation professionnelle certifié Qualiopi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Votre formateur expert</h2>
          <p className="text-gray-700 mb-6">
            Formateur indépendant certifié Qualiopi avec plus de 8 ans d'expérience 
            dans l'enseignement WordPress. Passionné par la transmission de connaissances 
            et l'accompagnement personnalisé de chaque apprenant.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Certification Qualiopi (7 indicateurs)</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Expert WordPress depuis plus de 8 ans</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Accompagnement personnalisé</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Formations</h3>
              <p className="text-3xl font-bold text-blue-600">120+</p>
              <p className="text-sm text-gray-600">Sessions réalisées</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Apprenants</h3>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-sm text-gray-600">Personnes formées</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expérience</h3>
              <p className="text-3xl font-bold text-blue-600">8+</p>
              <p className="text-sm text-gray-600">Années d'expérience</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Certification</h3>
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-sm text-gray-600">Taux de réussite</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AProposPage;
