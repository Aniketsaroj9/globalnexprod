import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Accordion from '../../components/ui/Accordion';
import api from '../../lib/api';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/services/${slug}`);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setError('Practice not found');
        }
      } catch (err) {
        setError('Service details could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
          Practice Not Found
        </h2>
        <p className="mt-2 font-body text-ink-3 dark:text-dark-type/70">
          The requested service practice could not be located in our ledger.
        </p>
        <div className="mt-6">
          <Link to="/services">
            <Button variant="secondary">Back to All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const faqAccordionItems = (service.faqs || []).map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <>
      <Helmet>
        <title>{service.seo?.metaTitle || `${service.name} | GlobalNex`}</title>
        <meta
          name="description"
          content={service.seo?.metaDescription || service.description}
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Services', href: '/services' },
            { label: service.name },
          ]}
        />

        {/* Hero Section */}
        <div className="border-b border-rule py-12 dark:border-dark-rule">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal dark:text-red-400">
              Specialized Division
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-fraunces-h1 text-ink sm:text-4xl lg:text-5xl dark:text-dark-type">
              {service.name}
            </h1>
            <p className="mt-4 font-display text-lg text-ink-2 dark:text-dark-type/80">
              {service.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to={`/contact-us?service=${service.slug}`}>
                <Button variant="primary" className="px-6 py-2.5">
                  <span>Inquire for {service.name}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Practice Overview & Offerings */}
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <section>
              <h3 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
                Overview & Scope
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-ink-2 dark:text-dark-type/90 whitespace-pre-line">
                {service.description}
              </p>
            </section>

            {/* Offerings */}
            {service.offerings && service.offerings.length > 0 && (
              <section>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
                  Key Capabilities & Offerings
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.offerings.map((offering, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-[2px] border border-rule bg-paper p-3 dark:border-dark-rule dark:bg-dark-surface"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-veridian" />
                      <span className="font-body text-sm font-medium text-ink dark:text-dark-type">
                        {offering}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process / How It Works */}
            {service.process && service.process.length > 0 && (
              <section>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
                  Our Step-by-Step Methodology
                </h3>
                <div className="mt-6 space-y-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 rounded-[2px] border border-rule bg-bond/40 p-4 dark:border-dark-rule dark:bg-dark-surface"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-paper dark:bg-dark-type dark:text-dark-bg">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-body text-base font-bold text-ink dark:text-dark-type">
                          {step.title || `Step ${idx + 1}`}
                        </h4>
                        <p className="mt-1 font-body text-xs text-ink-3 dark:text-dark-type/70">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Accordion */}
            {faqAccordionItems.length > 0 && (
              <section>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
                  Frequently Asked Questions
                </h3>
                <div className="mt-6 rounded-[2px] border border-rule bg-paper p-4 dark:border-dark-rule dark:bg-dark-surface">
                  <Accordion items={faqAccordionItems} />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4">
            <Card padding="lg" className="sticky top-24 bg-bond/50 dark:bg-dark-surface">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal dark:text-red-400">
                Department Direct
              </div>
              <h4 className="mt-2 font-display text-xl font-bold text-ink dark:text-dark-type">
                Book a Case Assessment
              </h4>
              <p className="mt-2 font-body text-xs text-ink-3 dark:text-dark-type/70">
                Our department specialists evaluate your profile and provide structured guidance.
              </p>

              <div className="mt-6 border-t border-rule pt-4 dark:border-dark-rule">
                <Link to={`/contact-us?service=${service.slug}`} className="block w-full">
                  <Button variant="primary" className="w-full justify-center">
                    Submit Inquiry Now
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;
