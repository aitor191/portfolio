'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/languageContext';
import { ThemeToggle } from './themeToggle';

const NAV_LINKS = [
  { href: '/', key: 'home' as const },
  { href: '/projects', key: 'projects' as const },
  { href: '/about', key: 'about' as const },
  { href: '/contact', key: 'contact' as const },
] as const;

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = useCallback(() => setIsOpen(false), []);
    
    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const handleLanguageToggle = () => {
        toggleLanguage();
        closeMenu();
    };

    // Handle Escape key to close mobile menu
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeMenu]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const languageButtonText = language === 'es' ? 'EN' : 'ES';
    const languageAriaLabel = language === 'es' 
        ? 'Cambiar idioma a inglés' 
        : 'Switch language to Spanish';
    const hamburgerClassName = `hamburger ${isOpen ? 'active' : ''}`;
    const mobileMenuClassName = `nav-mobile ${isOpen ? 'open' : ''}`;

    return (
        <nav className="nav-container" role="navigation" aria-label="Navegación principal">
            <div className="nav-wrapper">
                <Link 
                    href="/" 
                    className="nav-logo" 
                    onClick={closeMenu}
                    aria-label="Ir a la página de inicio"
                >
                    Portfolio
                </Link>

                <div className="nav-right">
                    <ThemeToggle />
                    
                    <button
                        onClick={toggleLanguage}
                        className="language-toggle"
                        aria-label={languageAriaLabel}
                        type="button"
                    >
                        {languageButtonText}
                    </button>

                    <button
                        className={hamburgerClassName}
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        type="button"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div className="nav-links desktop" role="menubar">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.key} 
                            href={link.href}
                            role="menuitem"
                        >
                            {t.nav[link.key]}
                        </Link>
                    ))}
                </div>
            </div>

            <div 
                id="mobile-menu"
                className={mobileMenuClassName}
                role="menu"
                aria-hidden={!isOpen}
            >
                {NAV_LINKS.map((link) => (
                    <Link 
                        key={link.key} 
                        href={link.href} 
                        onClick={closeMenu}
                        role="menuitem"
                        tabIndex={isOpen ? 0 : -1}
                    >
                        {t.nav[link.key]}
                    </Link>
                ))}
                <div className="nav-mobile-toggles">
                    <ThemeToggle className="theme-toggle-mobile" />
                    <button
                        onClick={handleLanguageToggle}
                        className="language-toggle-mobile"
                        aria-label={languageAriaLabel}
                        tabIndex={isOpen ? 0 : -1}
                        type="button"
                    >
                        {languageButtonText}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div 
                    className="nav-overlay" 
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
}