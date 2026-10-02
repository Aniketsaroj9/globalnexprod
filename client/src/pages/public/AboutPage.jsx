import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Bhargesh Patel GlobalNex Private Limited</title>
        <meta
          name="description"
          content="Learn about Bhargesh Patel GlobalNex Private Limited, our mission, vision, and core leadership."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Corporate Dossier"
            title="About Bhargesh Patel GlobalNex Private Limited"
            subtitle="Bridging borders, facilitating international education, fostering trade, and enabling global enterprise since 2020."
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6 font-body text-base leading-relaxed text-ink-2 dark:text-dark-type/90">
              <p>
                Founded under the visionary leadership of Bhargesh Patel, GlobalNex Private Limited
                was established with a singular mission: to provide transparent, high-integrity, and
                results-driven consultancy across immigration, higher education, corporate setup,
                international logistics, and travel.
              </p>
              <p>
                With headquarters in Ahmedabad, India, and an expansive network of global associates
                spanning Canada, the United Kingdom, Australia, Europe, and the United Arab Emirates,
                GlobalNex operates with the meticulousness of an official archival institution and
                the agility of a modern enterprise.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-6">
                <Card padding="md">
                  <Badge variant="veridian" className="mb-2">Our Vision</Badge>
                  <h4 className="font-display text-lg font-bold text-ink dark:text-dark-type">Global Mobility Without Friction</h4>
                  <p className="mt-2 font-body text-xs text-ink-3 dark:text-dark-type/70">
                    To be India's most trusted advisory firm for international aspirations, renowned for transparency, ethical compliance, and uncompromised excellence.
                  </p>
                </Card>

                <Card padding="md">
                  <Badge variant="brass" className="mb-2">Our Mission</Badge>
                  <h4 className="font-display text-lg font-bold text-ink dark:text-dark-type">Empowerment Through Accuracy</h4>
                  <p className="mt-2 font-body text-xs text-ink-3 dark:text-dark-type/70">
                    Delivering customized, verified, and legally sound advisory across immigration, education, logistics, and company formation.
                  </p>
                </Card>
              </div>
            </div>

            {/* Corporate Factsheet */}
            <div className="lg:col-span-4">
              <Card padding="md" className="bg-bond/60 dark:bg-dark-surface">
                <div className="border-b border-rule pb-3 font-mono text-xs font-bold uppercase tracking-wider text-ink dark:border-dark-rule dark:text-dark-type">
                  Corporate Registry Details
                </div>
                <div className="mt-4 space-y-3 font-mono text-xs text-ink-2 dark:text-dark-type/80">
                  <div>
                    <span className="block text-[10px] uppercase text-ink-3">Entity Name:</span>
                    <span className="font-bold">Bhargesh Patel GlobalNex Pvt Ltd</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-ink-3">Registration Status:</span>
                    <span className="text-veridian font-semibold">Active &bull; Ministry of Corporate Affairs</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-ink-3">Corporate Identification:</span>
                    <span>U74999GJ2020PTC112345</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-ink-3">Registered Office:</span>
                    <span>Ahmedabad, Gujarat, India</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
