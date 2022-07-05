import type { NextSeoProps } from 'next-seo';

const seo: NextSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/',
    site_name: 'Hello World',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: 'Pikas Template | %s',
  defaultTitle: 'Pikas Template',
  languageAlternates: [
    {
      href: 'https://www.pikas-template.com/fr',
      hrefLang: 'fr-FR',
    },
  ],
};

export default seo;
