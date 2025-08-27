"use client";

import React from 'react';

const FormationsAdaptabilite = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Des formations adaptées à vos besoins</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Chez GestionMax Formation, nous proposons des parcours personnalisés selon votre profil et vos objectifs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Pour les débutants</h3>
            <p className="text-gray-700 mb-4">
              Des formations progressives et accessibles qui vous permettent d'acquérir des bases solides
              sans prérequis techniques.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Accompagnement personnalisé
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Rythme adapté à votre progression
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Supports pédagogiques simplifiés
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Pour les intermédiaires</h3>
            <p className="text-gray-700 mb-4">
              Perfectionnez vos compétences et découvrez des fonctionnalités avancées pour gagner en autonomie.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Cas pratiques complexes
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Optimisation des workflows
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Personnalisation avancée
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Pour les experts</h3>
            <p className="text-gray-700 mb-4">
              Des formations techniques de haut niveau pour maîtriser le développement et la personnalisation avancée.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Développement de thèmes et plugins
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Architectures complexes
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Performance et sécurité
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationsAdaptabilite;
