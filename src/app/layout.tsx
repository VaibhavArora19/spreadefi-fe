import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/(ui)/Navbar';
import QueryProvider from '@/server/provider';
import Web3ModalProvider from '@/context/WagmiProvider';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config/wagmi';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Spreadefi',
  description: 'An omnichain defi protocol',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <body className="bg-[#090909] font-poppins text-white">
        <Web3ModalProvider initialState={initialState}>
          <QueryProvider>
            <Navbar />
            <div className="pt-20 w-[85%] mx-auto">{children}</div>
          </QueryProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
