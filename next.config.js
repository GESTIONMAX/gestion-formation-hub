export default {
  // Configuration Next.js
  reactStrictMode: true,
  transpilePackages: ['next-auth'],
  experimental: {
    externalDir: true, // Permettre l'import de modules depuis des répertoires en dehors du répertoire Next.js
  },
};
