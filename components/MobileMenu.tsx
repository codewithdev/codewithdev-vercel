import cn from 'classnames';
import Link from 'next/link';
import useDelayedRender from 'use-delayed-render';
import { useState, useEffect } from 'react';
import styles from 'styles/mobile-menu.module.css';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'flex flex-col fixed mx-auto inset-x-0',
            'top-24',
            'w-[85%] max-w-sm',
            'px-4 py-6 space-y-6',
            'bg-gray-50 dark:bg-gray-900',
            isMenuRendered && styles.menuRendered
          )}
        >
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '150ms' }}
          >
            <Link
              href="/"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
          </li>
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '175ms' }}
          >
            <Link
              href="/about"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </li>
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '200ms' }}
          >
            <Link
              href="/guestbook"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Guestbook
            </Link>
          </li>
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '225ms' }}
          >
            <Link
              href="/dashboard"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '250ms' }}
          >
            <Link
              href="/blog"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Blog
            </Link>
          </li>
          <li
            className="text-gray-900 dark:text-white text-base font-semibold w-full text-center"
            style={{ transitionDelay: '275ms' }}
          >
            <Link
              href="/snippets"
              className="flex w-full justify-center pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Snippets
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
