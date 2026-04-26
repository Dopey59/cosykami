import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

function ToriiIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      {/* Top curved beam */}
      <path d="M2 7 Q12 3 22 7" />
      {/* Second beam */}
      <line x1="4" y1="10" x2="20" y2="10" />
      {/* Left pillar */}
      <line x1="7" y1="10" x2="7" y2="22" />
      {/* Right pillar */}
      <line x1="17" y1="10" x2="17" y2="22" />
      {/* Pillar caps at top */}
      <line x1="5" y1="7" x2="5" y2="10" />
      <line x1="19" y1="7" x2="19" y2="10" />
    </svg>
  );
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-brand-muted">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-brand-muted transition-colors hover:text-brand-text"
        aria-label="Accueil"
      >
        <ToriiIcon />
        <span className="sr-only">Accueil</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-brand-muted/40">／</span>
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="transition-colors hover:text-brand-text">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
