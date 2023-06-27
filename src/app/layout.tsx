import { Manrope } from 'next/font/google';
import { CartProvider } from '@/context/cart.context';
import './globals.scss';
import { Footer, Header } from '@/components';

const inter = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="main">{children}</main>
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}
