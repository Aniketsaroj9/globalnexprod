import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';

export const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Terms of Service and legal conditions for Bhargesh Patel GlobalNex Private Limited."
        />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Legal Disclaimer"
            title="Terms & Conditions"
            subtitle="Last updated: October 2026 &bull; Standard Operating Terms"
          />

          <Card padding="lg" className="space-y-6 font-body text-sm leading-relaxed text-ink-2 dark:text-dark-type/90">
            <section>
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">1. Scope of Engagement</h3>
              <p className="mt-2">
                All advisory, consultancy, and application facilitation services provided by
                Bhargesh Patel GlobalNex Private Limited are subject to official engagement agreements
                and statutory regulations of respective governing bodies.
              </p>
            </section>

            <section>
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">2. Disclaimer of Guarantees</h3>
              <p className="mt-2">
                Visa decisions, university admissions, and regulatory approvals remain at the sole
                discretion of respective embassies, immigration authorities, universities, and government
                departments. GlobalNex guarantees thorough, compliant advisory but does not issue visas.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
