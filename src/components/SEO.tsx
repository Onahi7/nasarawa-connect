import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const SEO = ({
  title = "NAPPS Nasarawa State - National Association of Proprietors of Private Schools",
  description = "Official website of the National Association of Proprietors of Private Schools (NAPPS) Nasarawa State. Access our portal, view examination results, register your school, and stay updated with educational news and announcements.",
  keywords = "NAPPS, Nasarawa State, private schools, proprietors, education, Nigeria, school registration, examination results, NAPPS portal, private education, school owners, educational association, Nasarawa education",
  ogImage = "/logo.png",
  ogUrl = "https://nappsnasarawa.com",
  canonical = "https://nappsnasarawa.com"
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'NAPPS Nasarawa State');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'NAPPS Nasarawa State', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Add structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "NAPPS Nasarawa State",
      "alternateName": "National Association of Proprietors of Private Schools Nasarawa State",
      "url": "https://nappsnasarawa.com",
      "logo": "https://nappsnasarawa.com/logo.png",
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Nasarawa State",
        "addressCountry": "Nigeria"
      },
      "sameAs": [
        "https://portal.nappsnasarawa.com",
        "https://exams.nappsnasarawa.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "General Inquiries",
        "email": "info@nappsnasarawa.com"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, ogUrl, canonical]);

  return null;
};

export default SEO;
