#!/bin/bash

# Script pour vérifier la navigation sur la page d'accueil
echo "Vérification de la structure de navigation..."
curl -s http://localhost:3002 | grep -o "<nav.*>" | wc -l

echo "Nombre de composants UnifiedNav:"
curl -s http://localhost:3002 | grep -o "UnifiedNav" | wc -l
