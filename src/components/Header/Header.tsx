'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks';
import { Logo, IconHamburger } from '@/icons';
import {
  Navigation,
  Cart,
  ContentWrapper,
  Categories,
  Backdrop,
  AlertOutsideClick,
} from '@/components';
import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const [headerBgOpacity, setHeaderBgOpacity] = useState(0);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const isHamburgerMenu = useMediaQuery(768);

  const toggleMenu = () => {
    setShowMenu((state) => !state);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBgOpacity(Math.min(document.documentElement.scrollTop / 96, 1));
    };

    handleScroll();
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHamburgerMenu) {
      setShowMenu(false);
    }
  }, [isHamburgerMenu]);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  }, [showMenu]);

  return (
    <header
      className={`${styles.header} ${
        pathname === '/' ? styles.headerBackgroundTransparent : ''
      }`}
    >
      <ContentWrapper className={styles.headerBorderBottom} />
      <div
        className={styles.headerBackground}
        style={{ opacity: showMenu ? 1 : headerBgOpacity }}
      />
      <ContentWrapper className={styles.content}>
        <button
          ref={hamburgerButtonRef}
          className={styles.btnHamburger}
          onClick={toggleMenu}
          aria-label="menu"
        >
          <IconHamburger />
        </button>

        <Link href="/" aria-label="home" className={styles.logoWrapper}>
          <Logo />
        </Link>

        <Navigation className={styles.navigation} aria-label="header navigation" />

        <Cart />
      </ContentWrapper>
      {showMenu && (
        <>
          <AlertOutsideClick
            shouldHandle={showMenu}
            onOutsideClick={() => setShowMenu(false)}
            ignore={[hamburgerButtonRef]}
            className={styles.hamburgerMenu}
          >
            <ContentWrapper>
              <Categories />
            </ContentWrapper>
          </AlertOutsideClick>

          {isHamburgerMenu && <Backdrop />}
        </>
      )}
    </header>
  );
}
