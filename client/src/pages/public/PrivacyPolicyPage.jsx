import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';

export const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Official Privacy Policy of Bhargesh Patel GlobalNex Private Limited."
        />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Legal Disclaimer"
            title="Privacy Policy"
            subtitle="Last updated: October 2026 &bull; Official Compliance Document"
          />

          <Card padding="lg" className="space-y-6 font-body text-sm leading-relaxed text-ink-2 dark:text-dark-type/90">
            <section>
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">1. Information We Collect</h3>
              <p className="mt-2">
                Bhargesh Patel GlobalNex Private Limited collects personal information submitted directly
                via our consultation and contact forms, including name, email address, phone number,
                and details related to your inquiry.
              </p>
            </section>

            <section>
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">2. Use of Information</h3>
              <p className="mt-2">
                We use collected information solely for evaluating your eligibility, routing your inquiry
                to relevant specialists, responding to requests, and fulfilling corporate consulting obligations.
              </p>
            </section>

            <section>
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">3. Data Protection</h3>
              <p className="mt-2">
                We implement industry-standard encryption, firewalls, and access control policies to safeguard
                your personal and confidential case records.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
