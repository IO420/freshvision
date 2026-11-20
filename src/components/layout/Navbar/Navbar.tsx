'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';


const NAV_ITEMS = [
  { label: 'El Problema', href: '#el-problema' },
  { label: 'Demo en Vivo', href: '#demo-en-vivo' },
  { label: 'Modelo de Negocio', href: '#modelo-de-negocio' },
  { label: 'Arquitectura IA', href: '#arquitectura-ia' },
  { label: 'About Us', href: '#about-us' },
];


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Grupo izquierdo: Identidad */}
        <a href="#" className={styles.brand} onClick={handleCloseMenu}>
          <Image
            src="/images/branding/freshvision-symbol.svg"
            alt="Logotipo freshVision"
            width={32}
            height={32}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandFresh}>fresh</span>
            <span className={styles.brandVision}>Vision</span>
          </span>
        </a>

        {/* Grupo central: Navegación */}
        <nav aria-label="Navegación principal">
          <ul className={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Grupo derecho: Estado y CTA */}
        <div className={styles.actions}>
          <div className={styles.statusBadge} title="Estado del motor de inferencia">
            <span className={styles.statusDot} aria-hidden="true" />
            <span>API Online</span>
          </div>

          <div className={styles.desktopCta}>
            <Button href="#demo-en-vivo" size="sm">
              Probar Escáner
            </Button>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Panel desplegable móvil / tablet */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileDivider} />
          <div className={styles.mobileFooter}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>API Online</span>
            </div>
            <Button href="#demo-en-vivo" size="sm" onClick={handleCloseMenu}>
              Probar Escáner
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}