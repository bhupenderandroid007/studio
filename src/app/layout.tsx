import type {Metadata} from 'next';
import {Geist} from 'next/font/google'; // Use Geist Sans for body
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Remove Geist Mono if not explicitly needed
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'VectorMatcher', // Updated title
  description: 'Job-Candidate Matching System', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure no whitespace exists between <html> and <body> tags
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`} suppressHydrationWarning> {/* Add suppressHydrationWarning here */}
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
