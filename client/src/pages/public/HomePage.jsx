import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Building2, GraduationCap, Compass, Plane } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Bhargesh Patel GlobalNex | Premier Global Consultancy & Immigration</title>
        <meta
          name="description"
          content="Global consultancy specializing in Immigration, Study Abroad, Tours & Travels, Export-Import, and Business Setup."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-rule bg-paper py-20 lg:py-28 dark:border-dark-rule dark:bg-dark-bg">
        {/* Background Subtle Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#152238_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="mb-4 inline-flex items-center gap-2">
                <Badge variant="stamp">Official Corporate Portal</Badge>
                <span className="font-mono text-xs text-ink-3 dark:text-dark-type/60">
                  Ref: GN-CORP-2026
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold tracking-fraunces-h1 text-ink sm:text-5xl lg:text-6xl dark:text-dark-type">
                Empowering Global Mobility, Education & Cross-Border Enterprise.
              </h1>
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-2 dark:text-dark-type/80">
                A distinguished multi-disciplinary consultancy providing end-to-end solutions for
                Immigration, World-Class Higher Education, Bespoke Travel, Export–Import Advisory,
                and International Business Setup.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/contact-us">
                  <Button variant="primary" className="px-6 py-3 text-sm">
                    <span>Request Free Consultation</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary" className="px-6 py-3 text-sm">
                    Explore 5 Practice Areas
                  </Button>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-rule/60 pt-6 sm:grid-cols-3 dark:border-dark-rule/60 font-mono text-xs text-ink-3 dark:text-dark-type/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-veridian" />
                  <span>Govt. Certified Entity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-veridian" />
                  <span>25+ Destination Countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-veridian" />
                  <span>99.2% Case Success Rate</span>
                </div>
              </div>
            </div>

            {/* Official Physical Stamp Visual */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-[2px] border-[2px] border-rule bg-bond p-8 shadow-xl dark:border-dark-rule dark:bg-dark-surface max-w-sm w-full">
                <div className="absolute top-3 right-3 font-mono text-[10px] text-ink-3">
                  ESTD. 2020
                </div>
                <div className="border-b border-rule pb-4 dark:border-dark-rule">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-seal dark:text-red-400">
                    Registered Enterprise
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink dark:text-dark-type">
                    Bhargesh Patel GlobalNex
                  </h3>
                  <p className="font-mono text-xs text-ink-3 dark:text-dark-type/60">
                    Private Limited
                  </p>
                </div>
                <div className="py-4 space-y-2.5 font-body text-xs text-ink-2 dark:text-dark-type/80">
                  <div className="flex justify-between">
                    <span className="font-mono text-ink-3">Headquarters:</span>
                    <span className="font-semibold">Ahmedabad, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-ink-3">CIN:</span>
                    <span className="font-mono">U74999GJ2020PTC112345</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-ink-3">Primary Service:</span>
                    <span className="font-semibold text-seal">Consultancy & Advisory</span>
                  </div>
                </div>
                <div className="border-t border-rule pt-4 dark:border-dark-rule text-center">
                  <Link to="/contact-us">
                    <Button variant="stamp" className="w-full">
                      Direct Department Inquiry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Teaser */}
      <section className="border-b border-rule bg-paper py-16 lg:py-20 dark:border-dark-rule dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Corporate Services"
            title="Comprehensive Consultancy Practices"
            subtitle="Explore our specialized divisions dedicated to cross-border immigration, education, logistics, and foreign business formation."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                slug: 'immigration',
                icon: Shield,
                title: 'Immigration Consultancy',
                desc: 'Express Entry, PNPs, Family Sponsorship, and Skilled Worker Visas for Canada, Australia, UK, and Europe.',
              },
              {
                slug: 'study-abroad',
                icon: GraduationCap,
                title: 'Study Abroad Programs',
                desc: 'University shortlisting, SOP editing, scholarship applications, and student visa processing across top global universities.',
              },
              {
                slug: 'tours-travels',
                icon: Plane,
                title: 'Tours & Travels',
                desc: 'Curated international itineraries, corporate retreats, flight bookings, and end-to-end luxury holiday packages.',
              },
              {
                slug: 'export-import',
                icon: Compass,
                title: 'Export & Import Advisory',
                desc: 'Tariff compliance, international logistics coordination, customs clearance, and global trade contracts.',
              },
              {
                slug: 'business-setup',
                icon: Building2,
                title: 'Business Setup Services',
                desc: 'Freezone & mainland company formation in Dubai/UAE, Singapore, UK, and USA with banking assistance.',
              },
            ].map((srv) => {
              const Icon = srv.icon;
              return (
                <Card key={srv.slug} hoverable padding="md" className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-field text-ink dark:bg-dark-field dark:text-dark-type">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">
                      {srv.title}
                    </h3>
                    <p className="mt-2 font-body text-sm text-ink-3 dark:text-dark-type/70">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-rule/60 pt-4 dark:border-dark-rule/60">
                    <Link
                      to={`/services/${srv.slug}`}
                      className="inline-flex items-center font-mono text-xs font-bold text-seal hover:underline dark:text-red-400"
                    >
                      <span>Explore Practice Details</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
