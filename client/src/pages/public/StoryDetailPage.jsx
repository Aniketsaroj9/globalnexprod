import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

export const StoryDetailPage = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/success-stories/${slug}`);
        if (res.success && res.data) {
          setStory(res.data);
        } else {
          setError('Story not found');
        }
      } catch (err) {
        setError('Case study could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
          Case Study Not Found
        </h2>
        <p className="mt-2 font-body text-ink-3 dark:text-dark-type/70">
          The requested client story could not be located.
        </p>
        <div className="mt-6">
          <Link to="/success-stories">
            <Button variant="secondary">Back to Stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{story.clientName} - Success Story | GlobalNex</title>
        <meta name="description" content={story.summary} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Success Stories', href: '/success-stories' },
            { label: story.clientName },
          ]}
        />

        <div className="py-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="veridian">{story.serviceSlug || 'Consultancy'}</Badge>
            {story.outcome && (
              <span className="font-mono text-xs font-bold text-veridian">
                &bull; {story.outcome}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-bold tracking-fraunces-h1 text-ink sm:text-4xl dark:text-dark-type">
            {story.clientName}
          </h1>

          <p className="mt-4 font-display text-lg italic text-ink-2 dark:text-dark-type/80">
            "{story.summary}"
          </p>

          <div className="my-8 border-t border-b border-rule py-8 dark:border-dark-rule font-body text-base leading-relaxed text-ink-2 dark:text-dark-type/90 whitespace-pre-line">
            {story.fullStory || story.summary}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[2px] border border-rule bg-bond/50 p-6 dark:border-dark-rule dark:bg-dark-surface">
            <div>
              <h4 className="font-display text-base font-bold text-ink dark:text-dark-type">
                Ready for your own success story?
              </h4>
              <p className="font-body text-xs text-ink-3 dark:text-dark-type/70">
                Connect directly with our advisory specialists.
              </p>
            </div>
            <Link to="/contact-us">
              <Button variant="primary">
                <span>Start Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetailPage;
