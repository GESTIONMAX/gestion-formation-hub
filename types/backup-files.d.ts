// Déclaration pour ignorer les fichiers backup
declare module '*backup*' {
  const content: any;
  export default content;
}

declare module '*.backup.*' {
  const content: any;
  export default content;
}
