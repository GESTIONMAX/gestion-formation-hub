"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface DepartementCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  linkHref: string;
}

const DepartementCard = ({ title, description, icon, color, bgColor, linkHref }: DepartementCardProps) => {
  return (
    <Card className="border-t-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg" style={{ borderTopColor: color }}>
      <CardHeader className={`${bgColor} rounded-t-lg`}>
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-white/10 backdrop-blur-sm">
            <Image src={icon} alt={title} width={32} height={32} />
          </div>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <CardDescription className="text-gray-600 text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={linkHref} className="w-full">
          <Button className="w-full flex items-center justify-between" style={{ backgroundColor: color }}>
            <span>Voir les formations</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const DepartementsCards = () => {
  const departements = [
    {
      title: "Artisan Web",
      description: "Formations sur WordPress, création de sites web, référencement, et outils numériques pour les artisans et TPE. Adaptées à tous les niveaux, de débutant à avancé.",
      icon: "/icons/web-icon.svg",
      color: "#f58a3d", // Orange
      bgColor: "bg-gradient-to-r from-orange-500 to-amber-500",
      linkHref: "/formations?categorie=web"
    },
    {
      title: "Artisan Gestion",
      description: "Formations sur les outils de gestion, comptabilité, facturation, et organisation pour artisans et petites entreprises. Solutions pratiques et efficaces.",
      icon: "/icons/gestion-icon.svg",
      color: "#1869ba", // Bleu
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-500",
      linkHref: "/formations?categorie=gestion"
    },
    {
      title: "Anglais",
      description: "Formations d'anglais spécialisées pour les professionnels du tourisme, de l'artisanat et des services. Approche conversationnelle et pratique pour une utilisation immédiate.",
      icon: "/icons/english-icon.svg",
      color: "#2e7d32", // Vert
      bgColor: "bg-gradient-to-r from-green-600 to-green-500",
      linkHref: "/formations?categorie=anglais"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Nos départements de formation</h2>
          <p className="mt-4 text-xl text-gray-600">Découvrez nos trois spécialités pour développer vos compétences professionnelles</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departements.map((dept) => (
            <DepartementCard 
              key={dept.title}
              title={dept.title}
              description={dept.description}
              icon={dept.icon}
              color={dept.color}
              bgColor={dept.bgColor}
              linkHref={dept.linkHref}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartementsCards;
