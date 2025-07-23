import Link from "next/link";
import Image from "next/image";

type Brand = {
  id: number | string;
  name: string;
  logoUrl: string;
  description: string;
};

async function getBrands(): Promise<Brand[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/ab-internal/ab-app-brands/refs/heads/data/brands.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
}

export default async function Home() {
  const brands = await getBrands();
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: '#fff', padding: '48px 0', textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
        <h1 style={{ fontSize: 40, margin: 0 }}>Welcome to AB Brand Sites</h1>
        <p style={{ fontSize: 20, color: '#555', marginTop: 16 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum.
        </p>
      </section>
      {/* Brand List */}
      <section style={{ maxWidth: 900, margin: '48px auto', background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Our Brands</h2>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {brands.map((brand: Brand) => (
            <Link
              key={brand.id}
              href={`/${brand.id}`}
              style={{
                width: 200,
                height: 220,
                background: '#f3f7fa',
                borderRadius: 12,
                boxShadow: '0 2px 8px #0001',
                padding: 24,
                textAlign: 'center',
                textDecoration: 'none',
                color: '#222',
                transition: 'box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 8,
              }}
            >
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                width={80}
                height={80}
                style={{ height: 80, width: 80, margin: '0 auto 24px', display: 'block', objectFit: 'contain' }}
                priority
              />
              <div style={{ fontWeight: 700, fontSize: 22 }}>{brand.name}</div>
              <div style={{ fontSize: 15, color: '#888', marginTop: 8 }}>
                {brand.description.slice(0, 40)}...
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer style={{ background: '#0066cc', color: '#fff', padding: '32px 0', textAlign: 'center', marginTop: 48 }}>
        <div style={{ marginBottom: 12 }}>© 2025 AB Brand Sites | Lorem ipsum dolor sit amet.</div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>Follow us on social media — Lorem Ipsum</div>
      </footer>
    </main>
  );
}
