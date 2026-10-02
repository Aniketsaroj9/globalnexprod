import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import api from '../../lib/api';

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blog?page=${page}&limit=9`);
      if (res.success && res.data) {
        setPosts(res.data);
        if (res.meta) setMeta(res.meta);
      }
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Helmet>
        <title>Insights & Articles | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Latest updates, policy changes, and expert guides on global immigration, university admissions, and international trade."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Insights & Blog' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Knowledge Base"
            title="Insights, Regulations & Updates"
            subtitle="Curated analysis from our domain consultants covering global policy changes, visa rules, and international market trends."
          />

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : posts.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No Articles Published Yet"
              description="Our editorial ledger is currently being updated with fresh analysis. Please check back shortly."
              actionLabel="Return to Home"
              onAction={() => window.location.assign('/')}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id || post.slug} hoverable padding="md" className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-ink-3 dark:text-dark-type/60 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">
                        {post.title}
                      </h3>
                      <p className="mt-2 font-body text-xs leading-relaxed text-ink-3 line-clamp-3 dark:text-dark-type/70">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-rule/60 pt-3 dark:border-dark-rule/60 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-ink-3 dark:text-dark-type/60">
                        By {post.author || 'GlobalNex Editorial'}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center font-mono text-xs font-bold text-seal hover:underline dark:text-red-400"
                      >
                        <span>Read Article</span>
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

export default BlogPage;
