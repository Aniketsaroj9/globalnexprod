import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

export const BlogPostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/blog/${slug}`);
        if (res.success && res.data) {
          setPost(res.data);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Article could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
          Article Not Found
        </h2>
        <p className="mt-2 font-body text-ink-3 dark:text-dark-type/70">
          The requested publication could not be found or has not been published yet.
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="secondary">Back to Insights</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} | GlobalNex`}</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Insights & Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <article className="py-8">
          <div className="border-b border-rule pb-6 dark:border-dark-rule">
            <h1 className="font-display text-3xl font-bold tracking-fraunces-h1 text-ink sm:text-4xl lg:text-5xl dark:text-dark-type">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-ink-3 dark:text-dark-type/70">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author || 'GlobalNex Editorial'}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
              </span>
              {post.readTime && (
                <>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min read
                  </span>
                </>
              )}
            </div>
          </div>

          {post.excerpt && (
            <p className="my-6 font-display text-lg italic text-ink-2 dark:text-dark-type/80">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose max-w-none font-body text-base leading-relaxed text-ink-2 dark:text-dark-type/90 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 rounded-[2px] border border-rule bg-bond/40 p-6 dark:border-dark-rule dark:bg-dark-surface flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-base font-bold text-ink dark:text-dark-type">
                Have questions regarding this topic?
              </h4>
              <p className="font-body text-xs text-ink-3 dark:text-dark-type/70">
                Reach out to our specialist advisory team.
              </p>
            </div>
            <Link to="/contact-us">
              <Button variant="primary">
                <span>Contact Department</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostDetailPage;
