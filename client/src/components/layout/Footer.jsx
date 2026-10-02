import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Globe, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-rule bg-bond text-ink dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type">
      {/* 4 Column Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Corporate Overview & Trust Seal */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-seal text-paper font-display text-lg font-bold">
                GN
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold leading-tight tracking-tight text-ink dark:text-dark-type">
                  GLOBALNEX
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-3 dark:text-dark-type/60">
                  Private Limited
                </span>
              </div>
            </div>
            <p className="font-body text-xs leading-relaxed text-ink-3 dark:text-dark-type/70">
              Bhargesh Patel GlobalNex Private Limited is a multi-disciplinary global consultancy
              facilitating immigration, higher education abroad, bespoke international travels,
              cross-border trade, and corporate business establishment.
            </p>
            <div className="rounded-[2px] border border-rule bg-paper p-2.5 dark:border-dark-rule dark:bg-dark-bg">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-seal dark:text-red-400">
                <Shield className="h-3.5 w-3.5" />
                <span>Certified & Registered</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-3 dark:text-dark-type/60">
                CIN: U74999GJ2020PTC112345 &bull; Govt. of India
              </p>
            </div>
          </div>

          {/* Col 2: Services Practices */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-dark-type">
              Specialized Practices
            </h4>
            <div className="mt-4 flex flex-col space-y-2.5 font-body text-xs text-ink-3 dark:text-dark-type/70">
              <Link to="/services/immigration" className="transition hover:text-seal dark:hover:text-red-400">
                &bull; Immigration Consultancy (PR & Work)
              </Link>
              <Link to="/services/study-abroad" className="transition hover:text-seal dark:hover:text-red-400">
                &bull; Study Abroad & University Admissions
              </Link>
              <Link to="/services/tours-travels" className="transition hover:text-seal dark:hover:text-red-400">
                &bull; Tours & Bespoke International Travels
              </Link>
              <Link to="/services/export-import" className="transition hover:text-seal dark:hover:text-red-400">
                &bull; Export–Import Advisory & Logistics
              </Link>
              <Link to="/services/business-setup" className="transition hover:text-seal dark:hover:text-red-400">
                &bull; Global Business Setup & Incorporation
              </Link>
            </div>
          </div>

          {/* Col 3: Department Inboxes */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-dark-type">
              Department Routing
            </h4>
            <div className="mt-4 flex flex-col space-y-2.5 font-mono text-xs text-ink-3 dark:text-dark-type/70">
              <div>
                <span className="block text-[10px] uppercase text-ink-3/70 dark:text-dark-type/40">Immigration:</span>
                <a href="mailto:immigration@bhargeshglobalnex.com" className="text-ink transition hover:text-seal dark:text-dark-type dark:hover:text-red-400">
                  immigration@bhargeshglobalnex.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-ink-3/70 dark:text-dark-type/40">Study Abroad:</span>
                <a href="mailto:education@bhargeshglobalnex.com" className="text-ink transition hover:text-seal dark:text-dark-type dark:hover:text-red-400">
                  education@bhargeshglobalnex.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-ink-3/70 dark:text-dark-type/40">Travels & Tours:</span>
                <a href="mailto:travel@bhargeshglobalnex.com" className="text-ink transition hover:text-seal dark:text-dark-type dark:hover:text-red-400">
                  travel@bhargeshglobalnex.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-ink-3/70 dark:text-dark-type/40">Export / Import:</span>
                <a href="mailto:exports@bhargeshglobalnex.com" className="text-ink transition hover:text-seal dark:text-dark-type dark:hover:text-red-400">
                  exports@bhargeshglobalnex.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-ink-3/70 dark:text-dark-type/40">General Enquiries:</span>
                <a href="mailto:info@bhargeshglobalnex.com" className="text-ink transition hover:text-seal dark:text-dark-type dark:hover:text-red-400">
                  info@bhargeshglobalnex.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Head Office & Quick Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-dark-type">
              Corporate Office
            </h4>
            <div className="mt-4 flex flex-col space-y-3 font-body text-xs text-ink-3 dark:text-dark-type/70">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-seal dark:text-red-400" />
                <span>
                  GlobalNex House, Corporate Road, Prahlad Nagar, Ahmedabad, Gujarat 380015, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-veridian" />
                <span>+91 (079) 4900-5500</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-brass" />
                <span>Mon – Sat: 09:30 AM – 06:30 PM IST</span>
              </div>
            </div>

            <div className="mt-6 border-t border-rule/60 pt-4 dark:border-dark-rule/60">
              <div className="flex items-center gap-4 text-xs">
                <Link to="/about-us" className="text-ink hover:underline dark:text-dark-type">About</Link>
                <Link to="/blog" className="text-ink hover:underline dark:text-dark-type">Blog</Link>
                <Link to="/success-stories" className="text-ink hover:underline dark:text-dark-type">Stories</Link>
                <Link to="/contact-us" className="text-ink hover:underline dark:text-dark-type">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Band */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-rule/80 pt-6 font-mono text-[11px] text-ink-3 sm:flex-row dark:border-dark-rule/80 dark:text-dark-type/60">
          <p>
            &copy; {new Date().getFullYear()} Bhargesh Patel GlobalNex Private Limited. All rights reserved.
          </p>
          <div className="mt-3 flex items-center gap-6 sm:mt-0">
            <Link to="/privacy-policy" className="transition hover:text-ink dark:hover:text-dark-type">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="transition hover:text-ink dark:hover:text-dark-type">
              Terms & Conditions
            </Link>
            <span>&bull;</span>
            <Link to="/admin/login" className="transition hover:text-seal dark:hover:text-red-400">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
