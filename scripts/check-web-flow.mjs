import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { parseRoute } from '../lib/router.ts';
import WebProjectQuoteForm, { buildWebQuotePayload, countPhoneDigits, validateWebQuoteDetails } from '../components/WebProjectQuoteForm.tsx';

const routeFor = (hash) => {
  globalThis.window = { location: { hash } };
  return parseRoute();
};

assert.deepEqual(routeFor('#/devis?service=site-web'), { type: 'quote', service: 'site-web' });
assert.deepEqual(routeFor('#/devis'), { type: 'quote' });
assert.deepEqual(routeFor('#/devis?service=inconnu'), { type: 'quote' });
assert.deepEqual(routeFor('#/services/creation-site-web'), { type: 'service', slug: 'creation-site-web' });
delete globalThis.window;
assert.equal(countPhoneDigits('+213 (0) 555 00 00 00'), 13);
assert.equal(countPhoneDigits('٠٥٥٥ ٠٠ ٠٠ ٠٠'), 10);
assert.equal(countPhoneDigits('۰۵۵۵ ۰۰ ۰۰ ۰۰'), 10);

const html = renderToString(React.createElement(WebProjectQuoteForm, { language: 'fr', onOpenPolicy: () => {} }));
assert.match(html, /Parlons de votre site/);
assert.match(html, /name="siteType"/);
assert.match(html, /name="projectDescription"/);
assert.match(html, /name="privacyConsent"/);
assert.match(html, /name="phone"/);
assert.match(html, /name="budget"/);
assert.match(html, /Lire la politique de confidentialité/);
assert.doesNotMatch(html, /Budget mensuel|Publicités payantes|DEVIS PACK MENSUEL/);

const details = {
  name: '  Amel  ', phone: '0555 00 00 00', email: '', company: '', siteType: 'Site vitrine',
  currentSite: '', projectDescription: '  Présenter mes services et recevoir des demandes.  ', timeline: '', budget: '',
};
assert.equal(validateWebQuoteDetails(details), null);
assert.equal(validateWebQuoteDetails({ ...details, name: '  ' }), 'name');
assert.equal(validateWebQuoteDetails({ ...details, phone: '123' }), 'phone');
assert.equal(validateWebQuoteDetails({ ...details, projectDescription: '                ' }), 'project');
const payload = buildWebQuotePayload(details);
assert.equal(payload._subject, 'DEVIS SITE WEB : Amel');
assert.equal(payload.service, 'Création de site web');
assert.equal(payload.siteType, 'Site vitrine');
assert.equal(payload.budget, 'À définir');
assert.equal(payload.timeline, 'À définir');
assert.equal(payload.projectDescription, 'Présenter mes services et recevoir des demandes.');
assert.ok(!('privacyConsent' in payload) && !('website' in payload), 'Ne pas envoyer le champ anti-spam ou une donnée de consentement factice.');

console.log('Parcours web : routage, champs, validation et données de demande vérifiés.');
