type ServiceSchemaProps = {
  name: string;
  description: string;
  pathname: string;
};

export function ServiceSchema({ name, description, pathname }: ServiceSchemaProps) {
  const url = `https://sungridsolar.site${pathname}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        serviceType: name,
        url,
        areaServed: { "@type": "AdministrativeArea", name: "Estado de São Paulo" },
        provider: { "@id": "https://sungridsolar.site/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Página principal",
            item: "https://sungridsolar.site/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
