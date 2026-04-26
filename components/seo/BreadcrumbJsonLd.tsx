const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

type BreadcrumbItem = {
  name: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
