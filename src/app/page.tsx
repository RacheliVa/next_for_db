import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Car List</h1>
      <Link href="/cars">View Cars</Link>
    </div>
  );
}

