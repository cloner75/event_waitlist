import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const SFProDisplay = localFont({
  src: [
    {
      path: './fonts/SFProDisplay-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    { path: './fonts/SFProDisplay-Bold.woff2', weight: '700', style: 'normal' },
    {
      path: './fonts/SFProDisplay-HeavyItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/SFProDisplay-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/SFProDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SFProDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SFProDisplay-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/SFProDisplay-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/SFProDisplay-UltralightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
  ],
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'Dopin Waitlist',
  description: 'Dopin - Every location has story',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SFProDisplay.className} bg-[#161616] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
