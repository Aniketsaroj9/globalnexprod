import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Globe, Shield } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import Button from '../ui/Button';

const SERVICES = [
  { slug: 'immigration', label: 'Immigration Consultancy', desc: 'Canada, Australia, UK & Europe Visa solutions' },
  { slug: 'study-abroad', label: 'Study Abroad', desc: 'Global university admissions & student visas' },
  { slug: 'tours-travels', label: 'Tours & Travels', desc: 'Custom international travel & bespoke packages' },
  { slug: 'export-import', label: 'Export & Import', desc: 'Cross-border trade documentation & logistics' },
  { slug: 'business-setup', label: 'Business Setup', desc: 'Company incorporation in UAE, UK & Singapore' },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  // Track scroll for subtle border/shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking outside services dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `font-body text-sm font-semibold transition-colors py-1 border-b-2 ${
      isActive
        ? 'text-seal border-seal dark:text-red-400 dark:border-red-400'
        : 'text-ink border-transparent hover:text-seal dark:text-dark-type dark:hover:text-red-400'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-paper/95 backdrop-blur-md shadow-sm border-b border-rule dark:bg-dark-bg/95 dark:border-dark-rule'
          : 'bg-paper border-b border-rule/60 dark:bg-dark-bg dark:border-dark-rule/60'
      }`}
    >
      {/* Top Ledger Utility Bar */}
      <div className="hidden lg:block border-b border-rule/40 bg-field/30 px-6 py-1.5 font-mono text-[11px] text-ink-3 dark:border-dark-rule/40 dark:bg-dark-field/30 dark:text-dark-type/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-seal" />
              CIN: U74999GJ2020PTC112345 (Govt. Registered)
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-veridian" />
              Serving Clients Across 25+ Countries
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@bhargeshglobalnex.com"
              className="flex items-center gap-1.5 transition hover:text-ink dark:hover:text-dark-type"
            >
              <Mail className="h-3.5 w-3.5" />
              info@bhargeshglobalnex.com
            </a>
            <span className="text-rule dark:text-dark-rule">|</span>
            <Link
              to="/admin/login"
              className="transition hover:text-seal dark:hover:text-red-400"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-seal text-paper shadow-sm font-display text-xl font-bold tracking-tighter">
            GN
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-tight tracking-tight text-ink dark:text-dark-type">
              GLOBALNEX
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-3 dark:text-dark-type/60">
              Private Limited
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/about-us" className={navLinkClasses}>
            About Us
          </NavLink>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsServicesOpen((prev) => !prev)}
              className="flex items-center gap-1 font-body text-sm font-semibold text-ink transition hover:text-seal focus:outline-none dark:text-dark-type dark:hover:text-red-400"
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180 text-seal dark:text-red-400' : ''
                }`}
              />
            </button>

            {isServicesOpen && (
              <div className="absolute left-0 mt-3 w-80 rounded-[2px] border-[1.5px] border-rule bg-paper p-2 shadow-xl dark:border-dark-rule dark:bg-dark-surface">
                <div className="border-b border-rule/60 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-3 dark:border-dark-rule/60 dark:text-dark-type/60">
                  Specialized Practices
                </div>
                <div className="py-1">
                  {SERVICES.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={`/services/${srv.slug}`}
                      className="group flex flex-col rounded-[2px] p-2.5 transition hover:bg-field dark:hover:bg-dark-field"
                    >
                      <span className="font-body text-sm font-semibold text-ink group-hover:text-seal dark:text-dark-type dark:group-hover:text-red-400">
                        {srv.label}
                      </span>
                      <span className="font-body text-xs text-ink-3 dark:text-dark-type/60">
                        {srv.desc}
                      </span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-rule/60 pt-2 dark:border-dark-rule/60">
                    <Link
                      to="/services"
                      className="block px-2.5 py-1 font-mono text-xs font-bold text-seal hover:underline dark:text-red-400"
                    >
                      View All 5 Practices &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/success-stories" className={navLinkClasses}>
            Success Stories
          </NavLink>
          <NavLink to="/blog" className={navLinkClasses}>
            Insights & Blog
          </NavLink>
          <NavLink to="/contact-us" className={navLinkClasses}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link to="/contact-us">
            <Button variant="primary" className="gap-2 text-xs py-2 px-4">
              <span>Free Consultation</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-[2px] border border-rule p-2 text-ink transition hover:bg-field dark:border-dark-rule dark:text-dark-type dark:hover:bg-dark-field"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-rule bg-paper px-4 pt-3 pb-6 lg:hidden dark:border-dark-rule dark:bg-dark-surface shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="rounded-[2px] px-3 py-2 font-body text-base font-semibold text-ink transition hover:bg-field dark:text-dark-type dark:hover:bg-dark-field"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="rounded-[2px] px-3 py-2 font-body text-base font-semibold text-ink transition hover:bg-field dark:text-dark-type dark:hover:bg-dark-field"
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="rounded-[2px] border border-rule/60 p-2 dark:border-dark-rule/60">
              <div className="px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink-3 dark:text-dark-type/60">
                Our Services
              </div>
              <div className="mt-1 flex flex-col space-y-1">
                {SERVICES.map((srv) => (
                  <Link
                    key={srv.slug}
                    to={`/services/${srv.slug}`}
                    className="rounded-[2px] px-2 py-1.5 font-body text-sm text-ink hover:text-seal dark:text-dark-type dark:hover:text-red-400"
                  >
                    &bull; {srv.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/success-stories"
              className="rounded-[2px] px-3 py-2 font-body text-base font-semibold text-ink transition hover:bg-field dark:text-dark-type dark:hover:bg-dark-field"
            >
              Success Stories
            </Link>
            <Link
              to="/blog"
              className="rounded-[2px] px-3 py-2 font-body text-base font-semibold text-ink transition hover:bg-field dark:text-dark-type dark:hover:bg-dark-field"
            >
              Insights & Blog
            </Link>
            <Link
              to="/contact-us"
              className="rounded-[2px] px-3 py-2 font-body text-base font-semibold text-ink transition hover:bg-field dark:text-dark-type dark:hover:bg-dark-field"
            >
              Contact Us
            </Link>

            <div className="pt-3">
              <Link to="/contact-us" className="block w-full">
                <Button variant="primary" className="w-full justify-center">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
