const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API GestionMax Formation Hub',
      version: '1.0.0',
      description: 'Documentation des endpoints API de GestionMax Formation Hub',
      contact: {
        name: 'GestionMax',
        email: 'contact@gestionmax.fr',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement local',
      },
      {
        url: 'https://formation.gestionmax.fr',
        description: 'Serveur de production',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Formations', description: 'Endpoints liés aux formations' },
      { name: 'Programmes', description: 'Endpoints liés aux programmes de formation' },
      { name: 'Rendez-vous', description: 'Endpoints liés aux rendez-vous' },
      { name: 'Apprenants', description: 'Endpoints liés aux apprenants' },
      { name: 'Actions Correctives', description: 'Endpoints liés aux actions correctives' },
    ],
  },
  apis: [
    path.join(__dirname, 'app/api/**/*.ts'),   // Chemin vers les fichiers d'API Next.js
  ],
};

// Générer la spécification OpenAPI
const specs = swaggerJsdoc(options);

module.exports = specs;
