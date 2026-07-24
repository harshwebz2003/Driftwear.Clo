import type { MetadataRoute } from 'next';

const baseUrl = 'https://driftware.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '#shop', '#dtf', '#gallery', '#about', '#contact'].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7
  }));
}
