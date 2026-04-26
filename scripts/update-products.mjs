import { createServer } from 'http';
import { createHmac } from 'crypto';
import { exec } from 'child_process';

const SHOP = 'cosy-kami.myshopify.com';
const CLIENT_ID = '6156fcaab8e7a81c802d6c66cb284256';
const CLIENT_SECRET = process.env.SHOPIFY_SECRET;
const REDIRECT_URI = 'http://localhost:3333/callback';
const SCOPES = 'write_products,read_products';

if (!CLIENT_SECRET) {
  console.error('Lance avec : SHOPIFY_SECRET=ton_secret node scripts/update-products.mjs');
  process.exit(1);
}

const PRODUCTS = [
  {
    handle: 'cozy-cuties-bold-easy-patterns-coloring-book-for-adults-cute-drawing-book-perfect-gift-for-party-and-birthday',
    title: 'Cozy Cuties — Livre de Coloriage Kawaii Adulte',
    descriptionHtml: '<p>Plonge dans l\'univers cosy kawaii avec ce livre de coloriage aux motifs doux et apaisants ✦ Des dessins simples et adorables pour décompresser après une longue journée 🌸</p>',
    seo: { title: 'Cozy Cuties — Livre Coloriage Cosy Kawaii | Motifs Doux', description: 'Livre de coloriage adulte aux motifs kawaii cosy et doux. Parfait pour se détendre et laisser libre cours à ta créativité. Livraison en France.' },
  },
  {
    handle: 'cat-moments-adult-coloring-book-unique-book-for-relaxation-upgraded-paper-for-comfortable-coloring-perfect-gift-friend',
    title: 'Moments Chats — Livre de Coloriage Cosy Kawaii',
    descriptionHtml: '<p>Pour toutes les amoureuses des chats 🐱 Des illustrations mignonnes et apaisantes à colorier à ton rythme. Le compagnon idéal de tes soirées cosy ✨</p>',
    seo: { title: 'Moments Chats — Livre Coloriage Cosy Chats | Adulte & Ado', description: 'Livre de coloriage kawaii dédié aux chats. Des illustrations douces et relaxantes pour amoureux des chats. Livraison en France.' },
  },
  {
    handle: 'cute-bold-easy-patterns-coloring-book-for-adults-cute-drawing-book-perfect-gift-for-party-and-birthday',
    title: 'Cute & Bold — Livre de Coloriage Kawaii Adulte',
    descriptionHtml: '<p>Des motifs kawaii audacieux et ultra-mignons pour laisser exploser ta créativité 🎨 Parfait pour le coloriage cosy du week-end 🌸</p>',
    seo: { title: 'Cute & Bold — Livre Coloriage Kawaii Adulte | Motifs Cosy', description: 'Livre de coloriage kawaii avec des motifs audacieux et adorables. Idéal pour adultes et ados créatifs. Livraison en France.' },
  },
  {
    handle: 'cat-life-bold-easy-patterns-coloring-book-for-adults-cute-drawing-book-perfect-gift-for-party-and-birthday',
    title: 'Cat Life — Livre de Coloriage Chats Kawaii',
    descriptionHtml: '<p>La vie vue par les chats kawaii 🐾 Des scènes du quotidien adorables à colorier pour une pause cosy bien méritée ✦</p>',
    seo: { title: 'Cat Life — Livre Coloriage Chats Kawaii | Cosy & Relaxant', description: 'Livre de coloriage entièrement dédié à la vie des chats kawaii. Illustrations douces et cosy pour adultes. Livraison en France.' },
  },
  {
    handle: 'chill-moments-coloring-book-for-adults-featuring-cute-cozy-daily-activities-for-relaxation-cozy-spaces-coloring',
    title: 'Chill Moments — Livre de Coloriage Cosy Adulte',
    descriptionHtml: '<p>Des instants cosy à colorier — thé chaud, plaid, bougies et douceurs 🍵 Le livre parfait pour ta routine journaling et bien-être ✨</p>',
    seo: { title: 'Chill Moments — Livre Coloriage Cosy Activités Douillettes', description: 'Livre de coloriage cosy avec des illustrations d\'activités douillettes du quotidien. Idéal pour se relaxer. Livraison en France.' },
  },
  {
    handle: 'cute-simple-bold-easy-coloring-book-for-adults-cute-drawing-book-perfect-gift-for-party-and-birthday',
    title: 'Cute & Simple — Livre de Coloriage Kawaii Facile',
    descriptionHtml: '<p>Simple, kawaii et tellement mignon ✦ Des motifs accessibles à tous pour une expérience coloriage cosy sans prise de tête 🌸</p>',
    seo: { title: 'Cute & Simple — Livre Coloriage Kawaii Facile | Adulte', description: 'Livre de coloriage kawaii aux motifs simples et adorables. Accessible à tous, parfait pour débuter le coloriage cosy. Livraison en France.' },
  },
  {
    handle: 'cozy-store-coloring-book-for-adults-featuring-cute-cozy-daily-activities-for-relaxation-cozy-spaces-coloring',
    title: 'Cozy Store — Livre de Coloriage Boutiques Kawaii',
    descriptionHtml: '<p>Imagine ta boutique kawaii idéale et colorie-la 🎀 Des illustrations de petites boutiques cosy pour t\'évader dans un univers douillet et coloré ✨</p>',
    seo: { title: 'Cozy Store — Livre Coloriage Boutiques Cosy Kawaii | Adulte', description: 'Livre de coloriage kawaii sur l\'univers des boutiques cosy et douillettes. Illustrations adorables pour adultes. Livraison en France.' },
  },
  {
    handle: 'mr-paper-49pcs-sunny-town-series-miniature-scene-creation-sticker-book-for-diy-handbook-students-back-to-school-season-gifts',
    title: 'Ville Ensoleillée — Carnet Stickers Kawaii 3D | 49 pièces',
    descriptionHtml: '<p>49 stickers kawaii 3D pour créer des scènes de ville ensoleillées dans ton journal ✦ Parfait pour ton scrapbooking, bullet journal et DIY créatif 🌸</p>',
    seo: { title: 'Ville Ensoleillée — Carnet Stickers Kawaii 3D Scrapbooking', description: 'Carnet de 49 stickers kawaii 3D sur le thème de la ville ensoleillée. Parfait pour ton scrapbooking et journaling cosy. Livraison en France.' },
  },
  {
    handle: 'mr-paper-49pcs-bag-business-town-series-mini-3d-miniature-scenography-sticker-book-visual-stacking-scene-stickers-diy-gift-decor',
    title: 'Business Town — Carnet Stickers Miniatures 3D | 49 pièces',
    descriptionHtml: '<p>49 stickers miniatures 3D pour donner vie à ta ville kawaii imaginaire 🏙️ Un must-have pour ton scrapbooking et bullet journal ✦</p>',
    seo: { title: 'Business Town — Carnet Stickers 3D Kawaii | Scrapbooking', description: 'Carnet de 49 stickers miniatures 3D kawaii sur le thème de la ville. Pour ton scrapbooking et journaling créatif. Livraison en France.' },
  },
];

async function getProductId(accessToken, handle) {
  const res = await fetch(`https://${SHOP}/admin/api/2025-01/products.json?handle=${handle}&fields=id`, {
    headers: { 'X-Shopify-Access-Token': accessToken },
  });
  const data = await res.json();
  return data.products?.[0]?.id;
}

async function updateProduct(accessToken, id, product) {
  const body = {
    product: {
      id,
      title: product.title,
      body_html: product.descriptionHtml,
      metafields_global_title_tag: product.seo.title,
      metafields_global_description_tag: product.seo.description,
    },
  };
  const res = await fetch(`https://${SHOP}/admin/api/2025-01/products/${id}.json`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

async function updateAllProducts(accessToken) {
  console.log('\n🌸 Mise à jour des produits...\n');
  for (const product of PRODUCTS) {
    const id = await getProductId(accessToken, product.handle);
    if (!id) {
      console.log(`❌ Produit introuvable : ${product.handle}`);
      continue;
    }
    const ok = await updateProduct(accessToken, id, product);
    console.log(ok ? `✅ ${product.title}` : `❌ Erreur : ${product.title}`);
  }
  console.log('\n✦ Terminé !');
  process.exit(0);
}

// Serveur OAuth local
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3333');

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const hmac = url.searchParams.get('hmac');

    // Vérification HMAC
    const params = Object.fromEntries(url.searchParams);
    delete params.hmac;
    const message = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
    const digest = createHmac('sha256', CLIENT_SECRET).update(message).digest('hex');

    if (digest !== hmac) {
      res.end('Erreur HMAC — autorisation invalide.');
      return;
    }

    // Échange du code contre un token
    const tokenRes = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });
    const { access_token } = await tokenRes.json();

    res.end('<h2>✦ Autorisé ! Regarde ton terminal.</h2>');
    server.close();
    await updateAllProducts(access_token);
  }
});

server.listen(3333, () => {
  const authUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=cosykami`;
  console.log('\n🌸 Ouvre cette URL dans ton navigateur pour autoriser :\n');
  console.log(authUrl);
  console.log('\nEn attente...');
  exec(`open "${authUrl}"`);
});
