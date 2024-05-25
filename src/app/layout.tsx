import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/(ui)/Navbar';
import QueryProvider from '@/server/provider';

export const metadata: Metadata = {
  title: 'Spreadefi',
  description: 'An omnichain defi protocol',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#090909] font-poppins text-white">
        <QueryProvider>
          <Navbar />
          <div className="pt-20 w-[85%] mx-auto">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
