"use client";

import React from 'react';
import { Button } from "../ui/button";

interface CustomFormationCTAProps {
  onContactClick: () => void;
}

const CustomFormationCTA = ({ onContactClick }: CustomFormationCTAProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas la formation adaptée ?</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Nous concevons des programmes de formation sur-mesure adaptés à vos besoins spécifiques
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Formation 100% personnalisée</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contenu adapté à votre secteur d'activité</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Horaires flexibles selon vos contraintes</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Intervenants experts de votre domaine</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Notre approche</h3>
              <p className="mb-4 text-blue-100">
                Notre équipe d'experts construit avec vous un programme sur-mesure après une analyse approfondie de vos besoins spécifiques.
              </p>
              <Button 
                size="lg"
                className="text-lg px-8 py-3 bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-200"
                onClick={onContactClick}
              >
                Contactez-nous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomFormationCTA;
