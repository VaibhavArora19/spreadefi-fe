import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/(ui)/Navbar';

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
    <html lang='en'>
      <body className='bg-[#090909] font-poppins text-white'>
        <Navbar />

        <div className='py-20 w-[85%] mx-auto'>{children}</div>
      </body>
    </html>
  );
}
