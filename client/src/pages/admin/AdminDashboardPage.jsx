import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Inbox, FileText, Award, TrendingUp, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    newInquiries: 0,
    totalInquiries: 0,
    publishedPosts: 0,
    publishedStories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard Overview | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rule pb-4 dark:border-dark-rule">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
              Corporate Intelligence Dashboard
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              Real-time ledger overview & department activity indicators
            </p>
          </div>
          <Link to="/admin/inquiries">
            <Button variant="primary" className="text-xs">
              <Inbox className="mr-2 h-3.5 w-3.5" />
              <span>Review Incoming Inquiries</span>
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            {/* 4 Stat Tiles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card padding="md" className="border-seal/40 bg-seal/5 dark:bg-seal/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-seal dark:text-red-400">
                    New Inquiries
                  </span>
                  <Inbox className="h-4 w-4 text-seal" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-ink dark:text-dark-type">
                  {stats.newInquiries}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-3 dark:text-dark-type/60">
                  Awaiting review by staff
                </p>
              </Card>

              <Card padding="md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-ink-3">
                    Total Inquiries
                  </span>
                  <TrendingUp className="h-4 w-4 text-veridian" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-ink dark:text-dark-type">
                  {stats.totalInquiries}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-3 dark:text-dark-type/60">
                  Lifetime submissions
                </p>
              </Card>

              <Card padding="md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-ink-3">
                    Published Posts
                  </span>
                  <FileText className="h-4 w-4 text-brass" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-ink dark:text-dark-type">
                  {stats.publishedPosts}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-3 dark:text-dark-type/60">
                  Live on public blog
                </p>
              </Card>

              <Card padding="md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-ink-3">
                    Success Stories
                  </span>
                  <Award className="h-4 w-4 text-veridian" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-ink dark:text-dark-type">
                  {stats.publishedStories}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-3 dark:text-dark-type/60">
                  Verified client cases
                </p>
              </Card>
            </div>

            {/* Quick Actions Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card padding="md">
                <h3 className="font-display text-base font-bold text-ink dark:text-dark-type">
                  Department Inquiries
                </h3>
                <p className="mt-1 font-body text-xs text-ink-3 dark:text-dark-type/70">
                  View, filter, and transition client consultation requests across Immigration, Education, and Trade.
                </p>
                <div className="mt-4">
                  <Link to="/admin/inquiries">
                    <Button variant="secondary" className="w-full justify-between text-xs">
                      <span>Open Inquiries Ledger</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card padding="md">
                <h3 className="font-display text-base font-bold text-ink dark:text-dark-type">
                  Content & Blog Management
                </h3>
                <p className="mt-1 font-body text-xs text-ink-3 dark:text-dark-type/70">
                  Author, edit, or publish articles and client success stories to enhance SEO visibility.
                </p>
                <div className="mt-4">
                  <Link to="/admin/blog">
                    <Button variant="secondary" className="w-full justify-between text-xs">
                      <span>Manage Blog Posts</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
