import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Building2, GraduationCap, Compass, Plane } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

const SERVICE_ICONS = {
  immigration: ShieldCheck,
  'study-abroad': GraduationCap,
  'tours-travels': Plane,
  'export-import': Compass,
  'business-setup': Building2,
};

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Explore GlobalNex's 5 core practices: Immigration, Study Abroad, Tours & Travels, Export-Import, and Business Setup."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Services' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Practices & Solutions"
            title="Our Five Core Advisory Divisions"
            subtitle="Dedicated professional divisions delivering certified guidance for global individuals, students, travelers, and multinational corporations."
          />

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((srv) => {
                const Icon = SERVICE_ICONS[srv.slug] || Sparkles;
                return (
                  <Card key={srv.slug} hoverable padding="lg" className="flex flex-col justify-between">
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[2px] bg-field text-ink dark:bg-dark-field dark:text-dark-type">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-ink dark:text-dark-type">
                        {srv.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-seal dark:text-red-400">
                        {srv.tagline}
                      </p>
                      <p className="mt-4 font-body text-sm text-ink-3 line-clamp-3 dark:text-dark-type/70">
                        {srv.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-rule/60 pt-4 dark:border-dark-rule/60">
                      <Link to={`/services/${srv.slug}`}>
                        <Button variant="secondary" className="w-full justify-between text-xs">
                          <span>View Division Details</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
