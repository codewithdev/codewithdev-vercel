import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';

import MobileMenu from 'components/MobileMenu';

interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-sm'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

type ContainerProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  children: React.ReactNode;
  customMeta?: Record<string, any>;
};

export default function Container({ 
  children, 
  title, 
  description, 
  image, 
  date, 
  type,
  customMeta = {}
}: ContainerProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [fontFamily, setFontFamily] = useState('system-ui');
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  const meta = {
    title: title || 'Dev Prakash Sharma',
    description: description || 'Developer, writer, and creator.',
    image: image || 'https://codewithdev.vercel.app/static/images/dev-banner.png',
    type: type || 'website',
    date,
    ...customMeta
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://codewithdev.vercel.app${router.asPath}`} />
        <link rel="canonical" href={`https://codewithdev.vercel.app${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Dev Prakash Sharma" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codewithdev" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 dark:text-gray-100">
          <a 
            href="#skip" 
            className="skip-nav absolute -top-8 left-0 p-2 bg-white dark:bg-gray-800 focus:top-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Skip to content
          </a>
          <div className="relative ml-[-0.60rem]">
            <MobileMenu />
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowQuickLinks(!showQuickLinks)}
                className="flex items-center justify-between px-3 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all font-normal text-gray-600 dark:text-gray-400 text-sm"
              >
                Quick Links
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0   0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className={`${showQuickLinks ? 'flex' : 'hidden'} items-center gap-1`}>
                <NavItem href="/" text="Home" />
                <NavItem href="/about" text="About" />
                <NavItem href="/guestbook" text="Guestbook" />
                <NavItem href="/dashboard" text="Dashboard" />
                <NavItem href="/blog" text="Blog" />
                <NavItem href="/snippets" text="Snippets" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                >
                  {resolvedTheme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8"
      >
        {children}
      </main>
    </div>
  );
}
