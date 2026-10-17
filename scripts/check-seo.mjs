import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const base = 'https://ivision.agency';
const routes = [
  'agence-marketing-digital-algerie.html',
  'creation-contenu-algerie.html',
  'publicite-meta-google-ads-algerie.html',
  'creation-site-web-algerie.html',
];
const read = (file) => readFileSync(path.join(dist, file), 'utf8');
const homepage = read('index.html');
const sitemap = read('sitemap.xml');
const titles = new Set();
const descriptions = new Set();

assert.match(homepage, /<div id="root"><div[^>]+>/, 'Accueil non pré-rendu dans le build.');
assert.equal([...homepage.matchAll(/<h1\b/g)].length, 1, 'Un seul H1 sur l’accueil pré-rendu.');
assert.match(homepage, /AGENCE DE/);
assert.match(homepage, /EN ALGÉRIE/);
assert.match(homepage, /"@type": "Organization"/);
assert.match(homepage, /"@type": "WebSite"/);
assert.match(homepage, /<link rel="canonical" href="https:\/\/ivision\.agency\/"/);
assert.doesNotMatch(homepage, /<!--\$!-->|200\+|98%|"addressLocality"/);

for (const route of routes) {
  const url = `${base}/${route}`;
  const html = read(route);
  assert.match(html, /<html lang="fr-DZ">/);
  assert.match(html, /<main id="contenu">/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Un seul H1 attendu : ${route}`);
  assert.doesNotMatch(html, /<meta name="robots" content="noindex/i);
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Canonique manquant : ${route}`);
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`), `OG URL manquante : ${route}`);
  assert.ok(html.includes(`<link rel="stylesheet" href="/seo/landing.css"`), `CSS manquant : ${route}`);
  assert.ok(homepage.includes(`href="/${route}"`), `Lien sur l'accueil manquant : ${route}`);

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `Titre et description requis : ${route}`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `Métadonnées dupliquées : ${route}`);
  titles.add(title);
  descriptions.add(description);

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  assert.equal(jsonLd.length, 1, `Un seul schema JSON-LD attendu : ${route}`);
  const graph = JSON.parse(jsonLd[0][1])['@graph'];
  assert.equal(graph.find((item) => item['@type'] === 'WebPage')?.url, url);
  const service = graph.find((item) => item['@type'] === 'Service');
  assert.equal(service?.provider?.['@id'], `${base}/#organization`);
  assert.equal(service?.areaServed?.name, 'Algérie');
  const breadcrumb = graph.find((item) => item['@type'] === 'BreadcrumbList');
  assert.equal(breadcrumb?.itemListElement.at(-1)?.item, url);
  assert.doesNotMatch(jsonLd[0][1], /"(aggregateRating|review|addressLocality)"/);

  for (const other of routes.filter((item) => item !== route)) {
    assert.ok(html.includes(`href="/${other}"`), `Lien croisé manquant : ${route} → ${other}`);
  }

  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:seo\/|images\/|favicon)[^"]+)"/g)) {
    assert.ok(existsSync(path.join(dist, asset.slice(1))), `Asset introuvable : ${asset} (${route})`);
  }
}

const webPage = read('creation-site-web-algerie.html');
const webQuoteLink = 'href="/#/devis?service=site-web"';
assert.match(webPage, /<body class="web-landing">/);
assert.ok(webPage.includes('src="/images/project-fidali.webp"'), 'Aperçu réel manquant dans le hero web.');
assert.equal([...webPage.matchAll(/class="project"/g)].length, 2, 'L’offre web doit montrer deux aperçus et renvoyer au portfolio complet.');
assert.ok([...webPage.matchAll(/href="\/#\/devis\?service=site-web"/g)].length >= 3, 'Les appels à l’action web doivent ouvrir le devis adapté.');
assert.ok(homepage.includes(webQuoteLink), 'Le parcours web doit être lié depuis l’accueil.');
assert.ok(homepage.includes('Voir le portfolio sites web'), 'Le portfolio web doit être visible depuis les projets de l’accueil.');
assert.ok(webPage.includes('href="/portfolio-sites-web-algerie.html"'), 'L’offre web doit conduire au portfolio dédié.');
assert.doesNotMatch(webPage, /href="\/#\/devis"/, 'Ne pas envoyer un projet web vers le devis de pack mensuel.');
assert.ok(webPage.includes('mailto:contact@ivision.agency?subject=Demande%20de%20site%20web'), 'Alternative de contact web manquante.');

const webPortfolioRoute = 'portfolio-sites-web-algerie.html';
const socialPortfolioRoute = 'portfolio-social-media-algerie.html';
const webPortfolioUrl = `${base}/${webPortfolioRoute}`;
const socialPortfolioUrl = `${base}/${socialPortfolioRoute}`;
const webPortfolio = read(webPortfolioRoute);
const socialPortfolio = read(socialPortfolioRoute);
for (const [route, html, url] of [
  [webPortfolioRoute, webPortfolio, webPortfolioUrl],
  [socialPortfolioRoute, socialPortfolio, socialPortfolioUrl],
]) {
  assert.match(html, /<html lang="fr-DZ">/);
  assert.match(html, /<main id="contenu">/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Un seul H1 attendu : ${route}`);
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Canonique manquant : ${route}`);
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`), `OG URL manquante : ${route}`);
  for (const css of ['landing.css', 'portfolio.css']) assert.ok(html.includes(`href="/seo/${css}"`));
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:seo\/|images\/|favicon)[^"]+)"/g)) {
    assert.ok(existsSync(path.join(dist, asset.slice(1))), `Asset introuvable : ${asset} (${route})`);
  }
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${anchor}"`), `Ancre #${anchor} sans cible : ${route}`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description && !titles.has(title) && !descriptions.has(description), `Métadonnées uniques requises : ${route}`);
  titles.add(title);
  descriptions.add(description);
  assert.ok(homepage.includes(`href="/${route}"`), `Accès depuis l’accueil manquant : ${route}`);
}
assert.doesNotMatch(webPortfolio, /<meta name="robots" content="noindex/i);
assert.ok(webPortfolio.includes('href="/#/devis?service=site-web"'));
assert.ok(webPortfolio.includes('href="/creation-site-web-algerie.html"'));
assert.ok(webPortfolio.includes('href="/portfolio-social-media-algerie.html"'));
const portfolioSchemas = [...webPortfolio.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
assert.equal(portfolioSchemas.length, 1);
const portfolioGraph = JSON.parse(portfolioSchemas[0][1])['@graph'];
assert.equal(portfolioGraph.find((item) => item['@type'] === 'CollectionPage')?.url, webPortfolioUrl);
assert.equal(portfolioGraph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement.at(-1)?.item, webPortfolioUrl);
const expectedSites = [
  ['DC16 X WYN', 'https://dc16.shop/', 'project-dc16.webp'],
  ['MoveSmart', 'https://movesmart-ecru.vercel.app/', 'project-movesmart.webp'],
  ['Fidali', 'https://fidali.vercel.app/', 'project-fidali.webp'],
  ['White Aura', 'https://white-aura.vercel.app/', 'project-white-aura.webp'],
];
const listedSites = portfolioGraph.find((item) => item['@type'] === 'ItemList')?.itemListElement;
assert.deepEqual(listedSites?.map((item) => [item.name, item.url]), expectedSites.map(([name, url]) => [name, url]));
assert.equal([...webPortfolio.matchAll(/class="pf-project"/g)].length, expectedSites.length);
for (const [, url, image] of expectedSites) {
  assert.ok(webPortfolio.includes(`href="${url}"`) && webPortfolio.includes(`src="/images/${image}"`), `Lien ou capture de site manquant : ${url}`);
  assert.ok(homepage.includes(`href="${url}"`) && homepage.includes(`src="/images/${image}"`), `Projet web incohérent entre accueil et portfolio : ${url}`);
}
assert.match(socialPortfolio, /<meta name="robots" content="noindex,follow"/);
assert.equal([...socialPortfolio.matchAll(/class="pf-project"/g)].length, 0, 'Ne pas fabriquer de projets social media.');
assert.ok(socialPortfolio.includes('href="/portfolio-sites-web-algerie.html"'));
assert.ok(read('creation-contenu-algerie.html').includes(`href="/${socialPortfolioRoute}"`));
assert.ok(socialPortfolio.includes('https://www.instagram.com/ivision_agency/'));
assert.ok(socialPortfolio.includes('https://web.facebook.com/agencyivision'));
assert.ok(socialPortfolio.includes('https://www.tiktok.com/@ivisionagency1'));

const guideRoute = 'choisir-seo-google-ads-meta-algerie.html';
const guideUrl = `${base}/${guideRoute}`;
const guide = read(guideRoute);
assert.match(guide, /<html lang="fr-DZ">/);
assert.match(guide, /<main id="contenu">/);
assert.equal([...guide.matchAll(/<h1\b/g)].length, 1, 'Un seul H1 attendu pour le guide.');
assert.ok(guide.includes(`<link rel="canonical" href="${guideUrl}"`));
assert.ok(guide.includes(`<meta property="og:url" content="${guideUrl}"`));
assert.ok(guide.includes('href="/seo/landing.css"'));
assert.ok(homepage.includes(`href="/${guideRoute}"`), 'Le guide doit être lié depuis l’accueil pré-rendu.');
assert.ok(read(routes[0]).includes(`href="/${guideRoute}"`), 'Le guide doit être lié depuis la page marketing.');
assert.ok(read(routes[2]).includes(`href="/${guideRoute}"`), 'Le guide doit être lié depuis la page Ads.');
assert.doesNotMatch(guide, /<meta name="robots" content="noindex/i);
assert.doesNotMatch(guide, /première place garantie|résultats garantis|"(aggregateRating|review|addressLocality)"/i);
for (const route of routes) assert.ok(guide.includes(`href="/${route}"`), `Lien de service manquant dans le guide : ${route}`);
for (const [, asset] of guide.matchAll(/(?:src|href)="(\/(?:seo\/|images\/|favicon)[^"]+)"/g)) {
  assert.ok(existsSync(path.join(dist, asset.slice(1))), `Asset introuvable : ${asset} (guide)`);
}
const guideTitle = guide.match(/<title>([^<]+)<\/title>/)?.[1];
const guideDescription = guide.match(/<meta name="description" content="([^"]+)"/)?.[1];
assert.ok(guideTitle && guideDescription && !titles.has(guideTitle) && !descriptions.has(guideDescription), 'Métadonnées uniques requises pour le guide.');
const guideSchemas = [...guide.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
assert.equal(guideSchemas.length, 1, 'Un seul JSON-LD pour le guide.');
const guideGraph = JSON.parse(guideSchemas[0][1])['@graph'];
assert.equal(guideGraph.find((item) => item['@type'] === 'WebPage')?.url, guideUrl);
assert.equal(guideGraph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement.at(-1)?.item, guideUrl);

const listedUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(listedUrls, [`${base}/`, ...routes.map((route) => `${base}/${route}`), webPortfolioUrl, guideUrl]);
assert.ok(!listedUrls.includes(socialPortfolioUrl), 'Le portfolio social non finalisé ne doit pas figurer au sitemap.');
assert.ok(listedUrls.every((url) => !url.includes('#')), 'Ne pas lister les routes à fragment dans le sitemap.');
assert.ok(listedUrls.every((url) => existsSync(path.join(dist, new URL(url).pathname))), 'Chaque URL du sitemap doit avoir un fichier servi.');

for (const [source, html] of [
  ['index.html', homepage],
  ...routes.map((route) => [route, read(route)]),
  [webPortfolioRoute, webPortfolio],
  [socialPortfolioRoute, socialPortfolio],
  [guideRoute, guide],
]) {
  for (const [, target] of html.matchAll(/href="\/([^"#?]+\.html)(?:[?#][^"]*)?"/g)) {
    assert.ok(existsSync(path.join(dist, target)), `Lien interne introuvable : ${source} → /${target}`);
  }
}

console.log(`SEO : accueil, ${routes.length} pages de service, guide et portfolio web vérifiés ; portfolio social en brouillon non indexé.`);
