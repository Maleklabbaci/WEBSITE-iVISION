// Pré-rendu de l'accueil après vite build : H1, services et liens sont présents
// dans dist/index.html avant l'exécution du JavaScript, sans changer le routage client.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App.tsx';
import HomeBelowFold from '../components/HomeBelowFold.tsx';

const indexPath = path.resolve('dist/index.html');
let page = readFileSync(indexPath, 'utf8');
assert.ok(page.includes('<div id="root"></div>'), 'Point de montage introuvable dans dist/index.html.');

// La page client charge HomeBelowFold à la demande. Ici on le fournit directement
// à App pour que React ne sérialise pas un fallback Suspense à la place du contenu.
const markup = renderToString(
  React.createElement(React.StrictMode, null, React.createElement(App, { homeSections: HomeBelowFold }))
);
assert.match(markup, /<h1\b/);
assert.doesNotMatch(markup, /<!--\$!-->/, 'Le pré-rendu ne doit pas contenir un fallback Suspense.');

// React 19 peut précharger les images prioritaires. Les mettre dans <head> plutôt
// qu'au début du conteneur hydraté évite de confondre les enfants du composant.
const preloads = markup.match(/^(?:<link rel="preload"[^>]*\/>)+/)?.[0] || '';
const content = markup.slice(preloads.length);
page = page.replace('</head>', `${preloads}\n  </head>`);
page = page.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
writeFileSync(indexPath, page);
console.log('Accueil pré-rendu : H1 et services accessibles sans JavaScript.');
