/**
 * generate-sitemap.js
 * 
 * Script untuk generate sitemap.xml secara dinamis dari data Firebase.
 * Jalankan dengan: node generate-sitemap.js
 * 
 * Sitemap yang dihasilkan akan disimpan ke public/sitemap.xml
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyCOrQEEqHmFD4p7QmZJNqbOi7X_z2alIfw",
  authDomain: "database-pejabat.firebaseapp.com",
  projectId: "database-pejabat",
  storageBucket: "database-pejabat.firebasestorage.app",
  messagingSenderId: "935762546326",
  appId: "1:935762546326:web:8d0becc2d89b4cdac07cb7"
};

const BASE_URL = 'https://www.rekamjejak.digital';
const today = new Date().toISOString().split('T')[0];

function toSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function generateSitemap() {
  console.log('🔄 Mengambil data officials dari Firebase...');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const snapshot = await getDocs(collection(db, 'officials'));
  const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log(`✅ Ditemukan ${officials.length} pejabat`);

  // Build URL entries
  const staticUrls = [
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
    },
  ];

  const dynamicUrls = officials.map(official => ({
    loc: `${BASE_URL}/pejabat/${toSlug(official.name)}--${official.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const allUrls = [...staticUrls, ...dynamicUrls];

  const urlEntries = allUrls
    .map(({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>
`;

  const outputPath = resolve(__dirname, 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf-8');

  console.log(`✅ Sitemap berhasil dibuat: ${outputPath}`);
  console.log(`📄 Total URL: ${allUrls.length} (1 statis + ${dynamicUrls.length} pejabat)`);

  process.exit(0);
}

generateSitemap().catch(err => {
  console.error('❌ Gagal generate sitemap:', err);
  process.exit(1);
});
