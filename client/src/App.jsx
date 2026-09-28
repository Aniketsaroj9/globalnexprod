import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HealthCheckBadge from './components/HealthCheckBadge';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Badge from './components/ui/Badge';
import LedgerRow from './components/ui/LedgerRow';
import { ShieldCheck, FileCheck, Award, ArrowUpRight, Compass, GraduationCap, Plane, Ship, Building2 } from 'lucide-react';

const FoundationPreview = () => {
  const [formData, setFormData] = useState({ name: '', email: '', reference: '' });

  const sampleServices = [
    {
      num: '01',
      title: 'Immigration Services',
      desc: 'Visa route selection, documentation guidance, application filing, and post-landing follow-up.',
      doc: 'VISA / PERMIT',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Study Abroad Consultancy',
      desc: 'University shortlisting, admission letters, student visa filing, and pre-departure briefing.',
      doc: 'ADMISSION / I-20',
      icon: GraduationCap,
    },
    {
      num: '03',
      title: 'Tours & Travels',
      desc: 'Itinerary planning, travel documentation, booking assistance, and curated international group tours.',
      doc: 'TRAVEL ITINERARY',
      icon: Plane,
    },
    {
      num: '04',
      title: 'Export – Import Consultancy',
      desc: 'IEC registration, trade compliance, logistics coordination, and buyer/supplier linkage.',
      doc: 'IEC CERTIFICATE',
      icon: Ship,
    },
    {
      num: '05',
      title: 'Business Setup Advisory',
      desc: 'Domestic and overseas company incorporation, regulatory compliance, and corporate structuring.',
      doc: 'INCORPORATION',
      icon: Building2,
    },
  ];

  const colorTokens = [
    { name: 'ink', hex: '#152238', text: '#F5F6F1', role: 'Iron-gall ink / Primary text' },
    { name: 'ink-2', hex: '#33445F', text: '#F5F6F1', role: 'Diluted ink / Secondary text' },
    { name: 'ink-3', hex: '#6B7A92', text: '#F5F6F1', role: 'Faded ink / Serials & captions' },
    { name: 'bond', hex: '#EDEFE8', text: '#152238', role: 'Cool bond paper / Background' },
    { name: 'paper', hex: '#F5F6F1', text: '#152238', role: 'Fresh sheet / Surfaces' },
    { name: 'field', hex: '#DDE2DA', text: '#152238', role: 'Form tint / Focus fill' },
    { name: 'rule', hex: '#C3C8BC', text: '#152238', role: 'Printed rules / Dividers' },
    { name: 'seal', hex: '#B0332B', text: '#F5F6F1', role: 'Oxblood stamp / Accents' },
    { name: 'brass', hex: '#A8843C', text: '#F5F6F1', role: 'Embossed foil / Guilloche' },
    { name: 'veridian', hex: '#1F5D4C', text: '#F5F6F1', role: 'Passport green / Success' },
  ];

  return (
    <div className="min-h-screen bg-bond dark:bg-dark-bg text-ink dark:text-dark-type transition-colors duration-200">
      <Helmet>
        <title>SmartConnect — Foundation & Design System</title>
        <meta name="description" content="Bhargesh Patel GlobalNex Private Limited Foundation System" />
      </Helmet>

      {/* Top Header / Status Bar */}
      <header className="border-b border-rule dark:border-dark-rule bg-paper/80 dark:bg-dark-surface/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink dark:bg-dark-type text-paper dark:text-dark-bg rounded-[2px] flex items-center justify-center font-serif font-black text-lg border border-brass">
              G
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight block text-ink dark:text-dark-type">
                BHARGESH PATEL GLOBALNEX
              </span>
              <span className="font-mono text-[10px] text-ink-3 dark:text-dark-type/60 tracking-wider block -mt-1">
                REG. NO. GNX-2026-IN · AP-SOUTH-1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="veridian">FOUNDATION ACTIVE</Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container with 64px Margin Rail Layout */}
      <div className="max-w-[1240px] mx-auto flex">
        {/* Document Margin Rail (Desktop >= 768px) */}
        <aside className="hidden md:flex flex-col items-center py-10 w-16 border-r border-rule dark:border-dark-rule shrink-0 text-ink-3 dark:text-dark-type/50 font-mono text-[11px] select-none">
          <span className="writing-vertical -rotate-90 tracking-widest uppercase mb-12">
            DOC REF: SC-FND-01
          </span>
          <span className="text-brass font-bold">§ 1.0</span>
          <div className="w-px h-24 bg-rule dark:bg-dark-rule my-4"></div>
          <span>FIG. 01</span>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 space-y-16">
          {/* Hero / Overview Section */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="stamp">OFFICIAL SYSTEM</Badge>
              <Badge variant="brass">PHASE 1 FOUNDATION</Badge>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-fraunces-h1 text-ink dark:text-dark-type max-w-3xl leading-[1.08]">
              SmartConnect Platform Infrastructure & Design System
            </h1>

            <p className="font-body text-lg text-ink-2 dark:text-dark-type/80 max-w-prose-gov leading-relaxed">
              Unified digital platform for <strong>Bhargesh Patel GlobalNex Private Limited</strong>. Built on Spring Boot 3.2, React 18, MongoDB, and the official Endorsement physical document design language.
            </p>

            <div className="pt-2 max-w-md">
              <HealthCheckBadge />
            </div>
          </section>

          <hr className="border-rule dark:border-dark-rule" />

          {/* Section 1: Endorsement Color Tokens */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-brass uppercase tracking-wider block">FIG. 02 · PALETTE</span>
                <h2 className="font-display font-bold text-2xl text-ink dark:text-dark-type">
                  Endorsement Physical Palette Tokens
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className="border border-rule dark:border-dark-rule rounded-[2px] overflow-hidden bg-paper dark:bg-dark-surface p-3 space-y-2 shadow-subtle"
                >
                  <div
                    className="h-14 rounded-[2px] border border-black/10 flex items-center justify-center font-mono text-xs font-bold"
                    style={{ backgroundColor: token.hex, color: token.text }}
                  >
                    {token.hex}
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-ink dark:text-dark-type block">
                      {token.name}
                    </span>
                    <span className="font-body text-[11px] text-ink-3 dark:text-dark-type/60 block line-clamp-1">
                      {token.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-rule dark:border-dark-rule" />

          {/* Section 2: Typography & Document Hierarchy */}
          <section className="space-y-6">
            <div>
              <span className="font-mono text-xs text-brass uppercase tracking-wider block">FIG. 03 · TYPOGRAPHY</span>
              <h2 className="font-display font-bold text-2xl text-ink dark:text-dark-type">
                Government & Physical Document Typography
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface rounded-[2px] space-y-3">
                <span className="font-mono text-xs text-seal font-bold">FRAUNCES 900 (WONK 1)</span>
                <p className="font-display font-black text-3xl leading-tight">
                  Official Stamped Endorsement
                </p>
                <p className="font-body text-xs text-ink-3 dark:text-dark-type/60">
                  Display serif variable font for prominent headlines and engraved letterforms.
                </p>
              </div>

              <div className="p-5 border border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface rounded-[2px] space-y-3">
                <span className="font-mono text-xs text-brass font-bold">PUBLIC SANS (REGULAR / MEDIUM)</span>
                <p className="font-body text-base leading-relaxed text-ink-2 dark:text-dark-type/90">
                  Standardized government-grade typeface engineered for dense, legible reading across digital surfaces.
                </p>
                <p className="font-body text-xs text-ink-3 dark:text-dark-type/60">
                  Body font restricted to 63ch max reading width.
                </p>
              </div>

              <div className="p-5 border border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface rounded-[2px] space-y-3">
                <span className="font-mono text-xs text-veridian font-bold">COURIER PRIME (MONOSPACE)</span>
                <p className="font-mono text-sm leading-normal text-ink dark:text-dark-type bg-field dark:bg-dark-field p-3 rounded-[2px]">
                  REF: GNX-2026-IMM-0982<br />
                  AUTH: BHARGESH PATEL<br />
                  STATUS: VERIFIED
                </p>
                <p className="font-body text-xs text-ink-3 dark:text-dark-type/60">
                  Reserved strictly for filing codes, serials, and system tags.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-rule dark:border-dark-rule" />

          {/* Section 3: Ledger Rows (Services Pattern per PRD §4) */}
          <section className="space-y-6">
            <div>
              <span className="font-mono text-xs text-brass uppercase tracking-wider block">FIG. 04 · LEDGER PATTERN</span>
              <h2 className="font-display font-bold text-2xl text-ink dark:text-dark-type">
                Five Fixed Service Offerings (Ledger Architecture)
              </h2>
              <p className="font-body text-sm text-ink-2 dark:text-dark-type/70 mt-1">
                Per design specification: services are styled as ledger rows, not generic SaaS cards.
              </p>
            </div>

            <div className="border-t border-rule dark:border-dark-rule bg-paper/50 dark:bg-dark-surface/50 rounded-[2px]">
              {sampleServices.map((svc) => (
                <LedgerRow
                  key={svc.num}
                  number={svc.num}
                  title={svc.title}
                  description={svc.desc}
                  documentType={svc.doc}
                />
              ))}
            </div>
          </section>

          <hr className="border-rule dark:border-dark-rule" />

          {/* Section 4: Ruled Fields & Button Components */}
          <section className="space-y-6">
            <div>
              <span className="font-mono text-xs text-brass uppercase tracking-wider block">FIG. 05 · COMPONENTS</span>
              <h2 className="font-display font-bold text-2xl text-ink dark:text-dark-type">
                Ruled Inputs & Stamped Action Buttons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ruled Form Example */}
              <div className="p-6 border border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface rounded-[2px] space-y-4">
                <span className="font-mono text-xs text-ink-3 dark:text-dark-type/60 uppercase">SAMPLE RULED ENTRY FORM</span>
                
                <Input
                  label="Client Full Name"
                  placeholder="e.g. Bhargesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  helperText="Single 1.5px baseline rule inks to oxblood seal on focus."
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Input
                  label="Application Reference No."
                  placeholder="GNX-XXXX-XXXX"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                />
              </div>

              {/* Action Buttons Matrix */}
              <div className="p-6 border border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface rounded-[2px] flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-mono text-xs text-ink-3 dark:text-dark-type/60 uppercase block mb-4">
                    BUTTON BEHAVIORS & HOVER OFFSETS
                  </span>
                  <p className="font-body text-sm text-ink-2 dark:text-dark-type/80 mb-6">
                    Primary buttons utilize the 2px-radius Endorsement signature: hover translation <code>-1px, -1px</code> with <code>3px 3px 0 #B0332B</code> hard oxblood offset.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">
                    Submit Inquiry
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </Button>

                  <Button variant="secondary">
                    View Documents
                  </Button>

                  <Button variant="stamp">
                    OFFICIAL STAMP
                  </Button>

                  <Button variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Official Document Footer */}
      <footer className="border-t border-rule dark:border-dark-rule bg-paper dark:bg-dark-surface mt-16 py-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ink-3 dark:text-dark-type/60">
          <div>
            © {new Date().getFullYear()} Bhargesh Patel GlobalNex Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>ISO 9001 COMPLIANT</span>
            <span>·</span>
            <span>ENDORSING EXCELLENCE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<FoundationPreview />} />
            <Route path="*" element={<FoundationPreview />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
