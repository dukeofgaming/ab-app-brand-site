import React from "react";
import { notFound } from "next/navigation";

import AgeVerificationClientWrapper from "./AgeVerificationClientWrapper";
import Link from "next/link";
import Image from "next/image";

// Helper to fetch brand data
async function fetchBrandsData(): Promise<Brand[]> {
  const res = await fetch("https://raw.githubusercontent.com/ab-internal/ab-app-brands/refs/heads/data/brands.json");

  if (!res.ok) throw new Error("Failed to fetch brands");

  return res.json();
}

async function getBrands() {
  return fetchBrandsData();
}

export async function generateStaticParams() {
  const brands = await fetchBrandsData();
  return brands.map((b: Brand) => ({ id: String(b.id) }));
}

type Brand = {
  id: string | number;
  name: string;
  logoUrl: string;
  description: string;
};

export default async function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brands = await getBrands();
  const brand = brands.find((b: Brand) => String(b.id) === id);
  if (!brand) return notFound();

  const brandSlug = String(brand.name).toLowerCase().replace(/\s+/g, "-");
  const basePath = process.env.NEXT_BASE_PATH || "";

  const heroBgUrl = `${basePath}/images/hero-bg/${brandSlug}.png`;
  const logoUrl = `${basePath}/images/logo/${brandSlug}.png`;

  return (
    <>
      <AgeVerificationClientWrapper minAge={21} brand={brand.name} />
        <main style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>

          <nav style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            height: 72,
            background: '#fff',
            boxShadow: '0 2px 12px #0001',
            borderBottom: '1px solid #eaeaea',
            marginBottom: 0
          }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src={logoUrl}
                alt={brand.name}
                width={48}
                height={48}
                style={{ height: 48, width: 48, marginRight: 18, objectFit: "contain" }}
                priority
              />
              <span style={{ fontWeight: 700, fontSize: 24, color: '#222', letterSpacing: 1 }}>{brand.name}</span>
            </Link>
            <div style={{ flex: 1 }} />
            <Link href="/" style={{ fontSize: 18, color: '#0066cc', textDecoration: 'none', fontWeight: 500, padding: '8px 20px', borderRadius: 8, transition: 'background 0.2s', background: 'rgba(0,102,204,0.06)' }}>Home</Link>
          </nav>

          {/* Hero Section */}
          <section style={{
            background: `url(${heroBgUrl}) top center/cover no-repeat, #fff`,
            padding: '48px 0',
            textAlign: 'center',
            boxShadow: '0 2px 8px #0001',
            minHeight: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
           
          </section>

          {/* Content Section */}
          <section style={{ maxWidth: 700, margin: '48px auto', background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum, tortor nec laoreet dictum, massa eros dictum nulla, euismod dictum mi nulla euismod.</p>
            <p>Praesent nec magna at ipsum facilisis dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </section>

          {/* Footer Section */}
          <footer style={{ background: '#0066cc', color: '#fff', padding: '32px 0', textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>© 2025 {brand.name} | Lorem ipsum dolor sit amet.</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>Follow us on social media — Lorem Ipsum</div>
        </footer>
      </main>
    </>
  );
}
