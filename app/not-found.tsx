import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-7xl text-white">Page not found.</h1>
        <Link href="/" className="cta-primary mt-8">Back home</Link>
      </div>
    </main>
  );
}
