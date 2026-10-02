import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Filter } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import api from '../../lib/api';

export const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });
      if (selectedService) queryParams.append('service', selectedService);

      const res = await api.get(`/success-stories?${queryParams.toString()}`);
      if (res.success && res.data) {
        setStories(res.data);
        if (res.meta) setMeta(res.meta);
      }
    } catch (err) {
      console.error('Failed to load success stories:', err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedService]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const serviceFilters = [
    { label: 'All Practices', value: '' },
    { label: 'Immigration', value: 'immigration' },
    { label: 'Study Abroad', value: 'study-abroad' },
    { label: 'Tours & Travels', value: 'tours-travels' },
    { label: 'Export-Import', value: 'export-import' },
    { label: 'Business Setup', value: 'business-setup' },
  ];

  return (
    <>
      <Helmet>
        <title>Success Stories & Testimonials | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Read verified client success stories and visa approval testimonials with GlobalNex."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Success Stories' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Client Track Record"
            title="Verified Client Success Stories"
            subtitle="Discover how our advisory has transformed careers, businesses, and international aspirations into tangible reality."
          />

          {/* Service Filter Chips */}
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-rule/60 pb-4 dark:border-dark-rule/60">
            <span className="mr-2 flex items-center gap-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              <Filter className="h-3.5 w-3.5" />
              Filter by Practice:
            </span>
            {serviceFilters.map((flt) => (
              <button
                key={flt.value}
                type="button"
                onClick={() => {
                  setSelectedService(flt.value);
                  setPage(1);
                }}
                className={`rounded-[2px] px-3 py-1 font-mono text-xs font-semibold transition ${
                  selectedService === flt.value
                    ? 'bg-ink text-paper dark:bg-dark-type dark:text-dark-bg shadow-sm'
                    : 'bg-paper text-ink hover:bg-field border border-rule dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type'
                }`}
              >
                {flt.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : stories.length === 0 ? (
            <EmptyState
              icon={Award}
              title="No Success Stories Recorded Yet"
              description="Case studies in this practice area are being archived. In the meantime, get in touch to start your own success story."
              actionLabel="Submit an Inquiry"
              onAction={() => window.location.assign('/contact-us')}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                  <Card key={story.id || story.slug} hoverable padding="md" className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="veridian">
                          {story.serviceSlug || 'General'}
                        </Badge>
                        {story.outcome && (
                          <span className="font-mono text-[11px] font-bold text-veridian">
                            &bull; {story.outcome}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">
                        {story.clientName}
                      </h3>
                      <p className="mt-2 font-body text-xs leading-relaxed text-ink-3 line-clamp-3 dark:text-dark-type/70">
                        {story.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-rule/60 pt-3 dark:border-dark-rule/60">
                      <Link
                        to={`/success-stories/${story.slug}`}
                        className="inline-flex items-center font-mono text-xs font-bold text-seal hover:underline dark:text-red-400"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={meta.totalPages || 1}
                totalItems={meta.total}
                pageSize={9}
                onPageChange={(newPage) => setPage(newPage)}
                className="mt-8"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SuccessStoriesPage;
