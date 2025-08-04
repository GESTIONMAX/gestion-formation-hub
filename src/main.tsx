import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Intégration d'axe-core pour l'audit d'accessibilité en mode développement uniquement
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000, {});
    console.log('Axe-core est activé pour l\'audit d\'accessibilité');
  });
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
