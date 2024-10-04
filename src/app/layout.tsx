import Navbar from '@/components/(ui)/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { config } from '@/config/wagmi';
import Web3ModalProvider from '@/context/WagmiProvider';
import { ReduxProvider } from '@/redux/reduxProvider';
import QueryProvider from '@/server/provider';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import './globals.css';

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
        <ReduxProvider>
          <Web3ModalProvider initialState={initialState}>
            <QueryProvider>
              <Navbar />
              <div className="pt-20 w-[85%] mx-auto">{children}</div>
              <Toaster richColors />
            </QueryProvider>
          </Web3ModalProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
