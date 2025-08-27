import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseTsConfig } from 'jsonc-parser';
import { glob } from 'glob';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TS_CONFIG_PATH = path.join(PROJECT_ROOT, 'tsconfig.json');
const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
];

// Types
type AliasMap = Record<string, string[]>;

// Charger la configuration TypeScript
const loadTsConfig = (): AliasMap => {
  try {
    const tsConfigContent = fs.readFileSync(TS_CONFIG_PATH, 'utf-8');
    const tsConfig = parseTsConfig(tsConfigContent);
    return tsConfig?.compilerOptions?.paths || {};
  } catch (error) {
    console.error('Erreur lors du chargement de tsconfig.json:', error);
    return {};
  }
};

// Trouver tous les fichiers TypeScript
const findTypeScriptFiles = (): string[] => {
  return [
    ...glob.sync('**/*.ts', { 
      cwd: PROJECT_ROOT, 
      ignore: IGNORE_PATTERNS,
      absolute: true,
      nodir: true
    }),
    ...glob.sync('**/*.tsx', { 
      cwd: PROJECT_ROOT, 
      ignore: IGNORE_PATTERNS,
      absolute: true,
      nodir: true
    })
  ];
};

// Vérifier si un fichier existe
const fileExists = (filePath: string): boolean => {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
};

// Vérifier si un chemin d'import est valide
const isImportValid = (importPath: string, currentFile: string): boolean => {
  const aliases = loadTsConfig();
  
  // Vérifier les imports de modules npm
  if (!importPath.startsWith('.')) {
    try {
      // Vérifier si c'est un alias TypeScript
      if (Object.keys(aliases).some(alias => importPath.startsWith(alias.replace('/*', '')))) {
        return true;
      }
      // Vérifier si c'est un module npm
      require.resolve(importPath);
      return true;
    } catch {
      // Vérifier les alias
      const aliasMatch = Object.entries(aliases).find(([alias]) => 
        importPath.startsWith(alias.replace('/*', ''))
      );
      
      if (aliasMatch) {
        const [alias, paths] = aliasMatch;
        const aliasBase = alias.replace('/*', '');
        const subPath = importPath.replace(aliasBase, '');
        
        return paths.some(aliasPath => {
          const fullPath = path.join(
            PROJECT_ROOT, 
            aliasPath.replace('/*', ''), 
            subPath
          );
          return fileExists(fullPath) || fileExists(`${fullPath}.ts`) || fileExists(`${fullPath}.tsx`);
        });
      }
      
      return false;
    }
  }
  
  // Vérifier les chemins relatifs
  const dir = path.dirname(currentFile);
  const fullPath = path.resolve(dir, importPath);
  
  return [
    fullPath,
    `${fullPath}.ts`,
    `${fullPath}.tsx`,
    path.join(fullPath, 'index.ts'),
    path.join(fullPath, 'index.tsx')
  ].some(p => fileExists(p));
};

// Obtenir l'alias approprié pour un chemin
const getAliasForPath = (filePath: string): string | null => {
  const aliases = loadTsConfig();
  
  for (const [alias, paths] of Object.entries(aliases)) {
    for (const aliasPath of paths) {
      const fullAliasPath = path.join(PROJECT_ROOT, aliasPath.replace('/*', ''));
      if (filePath.startsWith(fullAliasPath)) {
        const relativePath = path.relative(fullAliasPath, filePath);
        return `${alias.replace('/*', '')}${relativePath ? `/${relativePath}` : ''}`;
      }
    }
  }
  
  return null;
};

// Traiter un fichier
const processFile = (filePath: string): boolean => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /(?:import|export)(?:\s+[^'"\n]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let modified = false;
  let newContent = content;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Ignorer les imports de modules npm
    if (!importPath.startsWith('.')) {
      continue;
    }
    
    if (!isImportValid(importPath, filePath)) {
      // Essayer de trouver un alias approprié
      const fullPath = path.resolve(path.dirname(filePath), importPath);
      const alias = getAliasForPath(fullPath);
      
      if (alias) {
        newContent = newContent.replace(`'${importPath}'`, `'${alias}'`);
        modified = true;
        console.log(`Corrigé: ${filePath} - ${importPath} -> ${alias}`);
      } else {
        console.warn(`Avertissement: Impossible de résoudre l'import: ${importPath} dans ${filePath}`);
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }
  
  return modified;
};

// Fonction principale
const main = () => {
  console.log('Démarrage de la vérification des imports...');
  
  const files = findTypeScriptFiles();
  console.log(`Fichiers trouvés: ${files.length}`);
  
  let fixedCount = 0;
  
  for (const file of files) {
    if (processFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\nRésumé:`);
  console.log(`- Fichiers analysés: ${files.length}`);
  console.log(`- Fichiers modifiés: ${fixedCount}`);
  console.log('\nVérification terminée.');
};

main();
