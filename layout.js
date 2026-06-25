import './globals.css';
import { LangProvider } from '@/lib/LangContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Imtiyaz Hospitality Group',
  description: 'A Saudi hospitality group building and managing a portfolio of innovative restaurant brands.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
