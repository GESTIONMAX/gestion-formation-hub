"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CallToActionProps {
  onPositionnement: (titre: string) => void;
}

export default function CallToAction({ onPositionnement }: CallToActionProps) {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à développer vos compétences WordPress ?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Contactez-nous pour discuter de vos besoins en formation et obtenir un devis personnalisé.
          Premier entretien de positionnement offert !
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => onPositionnement("Formation WordPress")}
          >
            Réserver un entretien de positionnement
          </Button>
          <Link href="/a-propos">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              En savoir plus
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
