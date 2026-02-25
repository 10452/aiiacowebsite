import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "./seo.config";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  ogImage?: string;
  keywords?: string;
};

export default function SEO({
  title,
  description,
  path = "/",
  noindex = false,
  ogImage,
  keywords,
}: SEOProps) {
  const pageTitle = title ?? SITE.defaultTitle;
  const pageDesc = description ?? SITE.defaultDescription;
  const pageKeywords = keywords ?? SITE.keywords;
  const url = `${SITE.domain}${path}`;
  const image = ogImage ?? SITE.ogImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="AiiAco" />
      <link rel="canonical" href={url} />

      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {SITE.twitterHandle && <meta name="twitter:site" content={SITE.twitterHandle} />}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
