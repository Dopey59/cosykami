import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const ATELIER_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1747741744097-bae633939e47?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Le bureau Cosykami à Lille — planches de stickers en cours de tri',
  },
  {
    src: 'https://images.unsplash.com/photo-1587136527278-47b852bb3ef4?q=80&w=1504&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Préparation d\'une commande Cosykami — emballage cosy avec mot doux',
  },
  {
    src: 'https://images.unsplash.com/photo-1587136527307-f53f514267d7?q=80&w=848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Test qualité sur une planche de stickers 3D kawaii',
  },
];

export const metadata: Metadata = {
  title: 'À propos — l\'histoire de Cosykami',
  description:
    'Cosykami, c\'est un atelier de curation kawaii basé à Lille. Découvre l\'histoire, la sélection minutieuse et la philosophie cosy derrière chaque planche de stickers.',
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Breadcrumb items={[{ label: 'À propos' }]} />

      <header className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
          ✦ L'histoire ✦
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-brand-text md:text-5xl">
          Cosykami, mon petit atelier<br />
          de curation kawaii
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-muted">
          Bienvenue dans mon univers — un coin doux, pastel et un peu rêveur,
          dédié à celles et ceux qui aiment le papier, le journaling et les
          petits détails qui rendent la vie cosy 🌸
        </p>
      </header>

      <section className="mb-14 rounded-2xl border border-brand-border/40 bg-brand-cream/50 p-6 md:p-10">
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-28 sm:w-28">
            <Image
              src="https://images.unsplash.com/photo-1747741744139-663023d082bc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Portrait de la fondatrice de Cosykami"
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
              ✿ La fondatrice
            </p>
            <p className="font-display text-xl font-bold text-brand-text">
              Coucou, moi c'est Lucile 👋
            </p>
            <p className="text-sm text-brand-muted">
              Curatrice kawaii à Lille
            </p>
          </div>
        </div>

        <h2 className="font-display mb-4 text-2xl font-bold text-brand-text">
          Pourquoi Cosykami existe
        </h2>
        <div className="flex flex-col gap-4 leading-relaxed text-brand-muted">
          <p>
            Tout a commencé par une frustration personnelle. Passionnée de
            scrapbooking et de bullet journal, j'en avais marre de passer des
            heures à fouiller des sites obscurs, à attendre 6 semaines pour
            recevoir un colis chinois pas suivi, ou à payer 25 € la planche
            de stickers dans une papeterie de centre-ville.
          </p>
          <p>
            Je voulais quelque chose entre les deux : <strong className="text-brand-text">la beauté des stickers
            asiatiques 3D, sans la galère du sourcing, sans l'attente
            interminable, et avec un service client qui parle français.</strong>
          </p>
          <p>
            Alors j'ai créé Cosykami, depuis chez moi à Lille. Mon atelier
            est petit, ma sélection est volontairement réduite, et chaque
            commande part avec un mot doux 
          </p>
        </div>
      </section>

      <section className="mb-14">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
          ✦ Bienvenue dans l'atelier ✦
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {ATELIER_PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-cream/40"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-display mb-6 text-2xl font-bold text-brand-text">
          Comment je sélectionne mes produits
        </h2>
        <p className="mb-6 leading-relaxed text-brand-muted">
          Je le dis clairement : <strong className="text-brand-text">je ne fabrique pas mes stickers.</strong>{' '}
          Je sourse auprès de petits ateliers kawaii principalement asiatiques,
          parce que c'est là-bas que sont nés les codes esthétiques que j'aime —
          le 3D à empiler, les paysages diorama, la papeterie pastel.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-brand-border/40 bg-white p-5">
            <p className="mb-2 text-2xl">🔍</p>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">Je teste avant</h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Je commande chaque planche pour la voir en vrai, vérifier le
              papier, l'effet 3D, la qualité d'impression. Si ça ne me plaît
              pas, je n'ajoute pas au catalogue.
            </p>
          </div>

          <div className="rounded-xl border border-brand-border/40 bg-white p-5">
            <p className="mb-2 text-2xl">📦</p>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">Je stocke en France</h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Tout ce que tu commandes part de Lille sous 1-3 jours ouvrés.
              Pas d'attente de 6 semaines depuis l'autre bout du monde.
            </p>
          </div>

          <div className="rounded-xl border border-brand-border/40 bg-white p-5">
            <p className="mb-2 text-2xl">💌</p>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">J'emballe avec amour</h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Pochette renforcée, carton anti-pli, mot doux glissé dedans.
              Parce qu'ouvrir un colis Cosykami, c'est déjà un moment cosy 🌸
            </p>
          </div>
        </div>
      </section>

      <section className="mb-14 rounded-2xl bg-accent-main/10 p-6 md:p-10">
        <h2 className="font-display mb-4 text-2xl font-bold text-brand-text">
          Ce que tu paies en commandant chez moi
        </h2>
        <p className="mb-4 leading-relaxed text-brand-muted">
          Soyons transparente : tu pourrais peut-être trouver des stickers
          similaires moins chers en cherchant des heures sur AliExpress. Mais
          en commandant chez Cosykami, tu paies aussi :
        </p>
        <ul className="space-y-2 text-brand-muted">
          <li>✦ <strong className="text-brand-text">Ma sélection</strong> — je trie pour toi parmi des centaines de produits</li>
          <li>✦ <strong className="text-brand-text">Le contrôle qualité</strong> — chaque référence est testée avant d'arriver chez toi</li>
          <li>✦ <strong className="text-brand-text">L'expédition rapide</strong> — depuis la France, 7-10 jours max</li>
          <li>✦ <strong className="text-brand-text">Un SAV en français</strong> — un email à <a href="mailto:cosykami@gmail.com" className="text-accent-main hover:underline">cosykami@gmail.com</a> et je te réponds sous 48h</li>
          <li>✦ <strong className="text-brand-text">La possibilité de retour</strong> — 14 jours pour changer d'avis (droit français)</li>
          <li>✦ <strong className="text-brand-text">L'emballage cosy</strong> — c'est un détail mais ça change tout 💖</li>
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="font-display mb-6 text-2xl font-bold text-brand-text">
          Mes valeurs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">
              Slow craft, slow shop
            </h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Je préfère un petit catalogue de planches que j'aime vraiment
              plutôt qu'un giga-catalogue indigeste. Mieux vaut 20 produits
              cosy qu'on adore que 200 random.
            </p>
          </div>

          <div>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">
              Transparence totale
            </h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Je ne te vendrai jamais une histoire que je n'assume pas.
              D'où viennent les produits, comment je les sélectionne, ma
              marge — pose-moi la question, je te réponds.
            </p>
          </div>

          <div>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">
              Communauté avant tout
            </h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Cosykami, c'est aussi toi. Tes créations en story Instagram, tes
              demandes de produits, tes idées — tout ça nourrit la sélection
              de demain 
            </p>
          </div>

          <div>
            <h3 className="font-display mb-2 text-base font-bold text-brand-text">
              Esthétique cosy & kawaii
            </h3>
            <p className="text-sm leading-relaxed text-brand-muted">
              Pastel, doux, un peu rêveur, un peu japonisant. Si ça ne rentre
              pas dans cet univers, ça n'entre pas chez Cosykami — même si ça
              cartonne ailleurs.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-brand-pink/60 bg-brand-cream p-8 text-center md:p-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-main">
          ✦ Reste connectée ✦
        </p>
        <h2 className="font-display mb-4 text-2xl font-bold text-brand-text md:text-3xl">
          Rejoins la communauté Cosykami
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-brand-muted">
          Découvre les nouveautés, les coulisses de l'atelier et les inspirations
          journaling de la communauté
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-accent-main px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Découvrir la boutique
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-brand-text/20 bg-white px-6 py-3 text-sm font-semibold text-brand-text transition hover:border-accent-main hover:text-accent-main"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </div>
  );
}
