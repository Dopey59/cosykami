#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'node:path';

const INPUT = process.argv[2];
const OUTPUT = process.argv[3];

if (!INPUT || !OUTPUT) {
  console.error('Usage: node scripts/update-products-csv.mjs <input.csv> <output.csv>');
  process.exit(1);
}

const UPDATES = {
  '1-sticker-1-pair-of-tweezers-creative-fun-collection-sticker-book-3d-miniature-scene-stacking-handmade-diy-decorative-stickers': {
    title: 'Coffret Créatif Stickers 3D + Pincettes — 43 pièces',
    description: `<p>Un coffret complet pour créer tes propres scènes 3D kawaii ✦ <strong>43 stickers handmade + pincettes</strong> pour placer les pièces avec précision.</p>
<p>Parfait pour ton scrapbooking et ton journal créatif. Matière éco-responsable et fabrication artisanale. À empiler pour un effet depth magique ✨</p>
<ul>
<li>43 stickers handmade</li>
<li>Pincettes incluses pour un placement précis</li>
<li>Effet 3D à empiler</li>
<li>Matière papier éco-responsable</li>
</ul>`,
  },
  '3d-cabin-scene-stickers-book-visual-stacking-cartoon-scene-sticker-collection-diy-cabin-scene-toy-game-stickers': {
    title: 'Cabine Douillette — Carnet Stickers 3D Kawaii',
    description: `<p>Crée ta propre cabine cosy avec ce carnet de stickers 3D ✦ Stickers de scènes cartoon à empiler pour un effet 3D magique.</p>
<p>Développe la patience et la concentration en créant tes paysages kawaii. Idéal pour le scrapbooking et le journaling créatif 🌸</p>
<ul>
<li>Format 190 × 135 mm</li>
<li>Matière PET + papier écologique et non-toxique</li>
<li>Scènes cartoon à empiler en 3D</li>
<li>Adapté dès 8 ans</li>
</ul>`,
  },
  '40pcs-20in1-3d-landscape-stickers-collection-book-album-cartoon-scene-diy-toy-game-festival-birthday-gift-for-kid-girl-child': {
    title: 'Paysages Cartoon — Carnet Stickers 3D | 40 pièces (20 scènes)',
    description: `<p>40 stickers 3D pour composer <strong>20 scènes paysage cartoon</strong> différentes ✦ À empiler pour un effet diorama kawaii dans ton journal.</p>
<p>Parfait pour ton scrapbooking, bullet journal et tes projets DIY ✨</p>
<ul>
<li>40 stickers, 20 scènes uniques</li>
<li>Matière PET premium, durable et résistante</li>
<li>Effet diorama 3D à empiler</li>
<li>Plusieurs coloris disponibles</li>
</ul>`,
  },
  'new-diy-3d-landscaping-sticker-capybara-cartoon-pocket-cabin-scene-sticker-bookbirthday-gift-for-child-student-wholesale': {
    title: 'Capybara en Cabine — Carnet Stickers 3D Diorama',
    description: `<p>Une adorable scène 3D avec <strong>capybara kawaii</strong> à créer ✦ Carnet de stickers de poche à empiler pour un effet paysage diorama cosy.</p>
<p>Parfait pour les enfants et les amateurs de DIY créatif. À customiser pour ton scrapbooking et ton bullet journal ✨</p>
<ul>
<li>20 pièces dans un carnet de poche</li>
<li>Stickers en papier synthétique de haute qualité</li>
<li>Univers capybara kawaii unique</li>
<li>Effet diorama 3D à empiler</li>
</ul>`,
  },
  '50-in-1-miniature-scene-landscape-stickers-diy-pet-3d-house-stickers-scene-collection-visual-stacking-cartoon': {
    title: 'Maisons Miniatures — Carnet Stickers 3D | 50 scènes',
    description: `<p>50 scènes miniatures à composer avec ces stickers 3D PET + papier ✦ Format <strong>184 × 184 mm</strong> pour empiler tes paysages cosy en relief.</p>
<p>Parfait pour ton scrapbooking, bullet journal et la décoration de ton carnet 🌸</p>
<ul>
<li>50 scènes miniatures uniques</li>
<li>Format 184 × 184 mm</li>
<li>Matière PET + papier premium</li>
<li>Plusieurs styles disponibles</li>
</ul>`,
  },
  '40pcs-cartoon-sticker-book-diy-the-sims-series-3d-stereoscopic-scene-sticker-book-gift-for-kid-child-kawaii-stationery-stickers': {
    title: 'Les Sims 3D — Carnet Stickers Diorama | 40 pièces',
    description: `<p>Crée des scènes de vie adorables à la manière des Sims en 3D ✦ <strong>40 stickers cartoon</strong> à empiler pour un diorama unique et personnalisé.</p>
<p>Stickers en papier écologique et non-toxique, parfaits pour ton scrapbooking et ton journal créatif. Développe ton imagination avec cet univers kawaii cosy 🌸</p>
<ul>
<li>40 stickers cartoon thème Sims</li>
<li>Papier écologique et non-toxique</li>
<li>Effet diorama 3D à empiler</li>
<li>Idéal cadeau enfant ou ado</li>
</ul>`,
  },
  '20-pcs-super-large-miniature-scene-sticker-book-3d-cute-three-dimensional-house-diy-sticker-collection-book-sence-sticker': {
    title: 'Maisons XL — Carnet Stickers 3D | 20 grandes pièces',
    description: `<p>20 grands stickers 3D <strong>format XXL</strong> pour créer des maisons miniatures cosy ✦ À empiler pour un effet diorama saisissant dans ton scrapbooking.</p>
<p>Stickers en papier de qualité, à customiser à l'infini. Idéal pour décorer ton carnet ou ta chambre kawaii ✨</p>
<ul>
<li>20 stickers grand format</li>
<li>Effet maison miniature 3D</li>
<li>Papier premium durable</li>
<li>Parfait pour décoration murale ou journaling</li>
</ul>`,
  },
  'kawaii-cute-and-fun-cabin-3d-cute-shop-landscape-sticker-book-diy-pocket-cabin-scene-festival-gift': {
    title: 'Petite Cabine Cosy — Carnet Stickers 3D Poche',
    description: `<p>Un petit carnet portable de stickers 3D pour créer une cabine kawaii ✦ Scènes de boutique et paysage cosy à empiler dans ton journal.</p>
<p>Format poche idéal pour l'école ou les déplacements. À découvrir et à customiser selon tes envies ✨</p>
<ul>
<li>Format poche 260 × 165 mm</li>
<li>Matière PET de qualité premium</li>
<li>Scènes de boutique et paysage cosy</li>
<li>Plusieurs coloris disponibles</li>
</ul>`,
  },
};

function parseCsv(text) {
  const rows = [];
  let i = 0;
  let field = '';
  let row = [];
  let inQuotes = false;

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
    } else {
      if (c === '"') {
        inQuotes = true;
        i++;
      } else if (c === ',') {
        row.push(field);
        field = '';
        i++;
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        field = '';
        row = [];
        i++;
      } else if (c === '\r') {
        i++;
      } else {
        field += c;
        i++;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function csvEscape(value) {
  const v = value ?? '';
  if (/[",\n\r]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function stringifyCsv(rows) {
  return rows.map((r) => r.map(csvEscape).join(',')).join('\n');
}

const raw = await readFile(INPUT, 'utf8');
const rows = parseCsv(raw);
const header = rows[0];
const handleIdx = header.indexOf('Handle');
const titleIdx = header.indexOf('Title');
const bodyIdx = header.indexOf('Body (HTML)');

if (handleIdx < 0 || titleIdx < 0 || bodyIdx < 0) {
  throw new Error('Headers Handle / Title / Body (HTML) introuvables.');
}

let updated = 0;
for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  const handle = row[handleIdx];
  const title = row[titleIdx];
  if (title && UPDATES[handle]) {
    row[titleIdx] = UPDATES[handle].title;
    row[bodyIdx] = UPDATES[handle].description;
    updated++;
  }
}

await writeFile(OUTPUT, stringifyCsv(rows), 'utf8');
console.log(`✓ ${updated} produits mis à jour → ${OUTPUT}`);
