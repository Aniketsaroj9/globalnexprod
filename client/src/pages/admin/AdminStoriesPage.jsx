import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import api from '../../lib/api';

export const AdminStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/success-stories?limit=50');
      if (res.success && res.data) {
        setStories(res.data);
      }
    } catch (err) {
      console.error('Failed to load stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this success story?')) return;
    try {
      const res = await api.delete(`/admin/success-stories/${id}`);
      if (res.success) {
        setStories((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      alert('Failed to delete success story');
    }
  };

  return (
    <>
      <Helmet>
        <title>Success Stories Management | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rule pb-4 dark:border-dark-rule">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
              Client Success Stories Ledger
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              Manage client testimonials and case study highlights across all practices
            </p>
          </div>
          <Button variant="primary" className="text-xs">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Success Story</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : stories.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No Stories in Ledger"
            description="Add your first client case study to showcase results."
          />
        ) : (
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs">
                <thead className="border-b border-rule bg-bond/50 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-3 dark:border-dark-rule dark:bg-dark-field/50 dark:text-dark-type/60">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Client Name</th>
                    <th className="px-4 py-3">Practice</th>
                    <th className="px-4 py-3">Outcome</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule dark:divide-dark-rule">
                  {stories.map((story) => (
                    <tr key={story.id} className="transition hover:bg-field/40 dark:hover:bg-dark-field/40">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant={story.status === 'PUBLISHED' ? 'veridian' : 'brass'}>
                          {story.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink dark:text-dark-type">
                        {story.clientName}
                      </td>
                      <td className="px-4 py-3 text-ink-3 dark:text-dark-type/70">
                        {story.serviceSlug || 'General'}
                      </td>
                      <td className="px-4 py-3 font-mono text-veridian font-semibold">
                        {story.outcome || 'Approved'}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(story.id)}
                          className="p-1 text-seal hover:bg-seal/10 rounded-[2px]"
                          title="Delete story"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default AdminStoriesPage;
