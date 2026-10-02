import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import api from '../../lib/api';

export const AdminBlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/blog?limit=50');
      if (res.success && res.data) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await api.delete(`/admin/blog/${id}`);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog Management | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rule pb-4 dark:border-dark-rule">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
              Blog & Article Management
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              Create, edit, and publish content to establish domain authority and SEO ranking
            </p>
          </div>
          <Button variant="primary" className="text-xs">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Article</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : posts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Articles in Ledger"
            description="Create your first publication to begin distributing insights."
          />
        ) : (
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs">
                <thead className="border-b border-rule bg-bond/50 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-3 dark:border-dark-rule dark:bg-dark-field/50 dark:text-dark-type/60">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule dark:divide-dark-rule">
                  {posts.map((post) => (
                    <tr key={post.id} className="transition hover:bg-field/40 dark:hover:bg-dark-field/40">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant={post.status === 'PUBLISHED' ? 'veridian' : 'brass'}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink dark:text-dark-type max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="px-4 py-3 text-ink-3 dark:text-dark-type/70">
                        {post.author || 'Editorial'}
                      </td>
                      <td className="px-4 py-3 font-mono text-ink-3 dark:text-dark-type/60 whitespace-nowrap">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            className="p-1 text-seal hover:bg-seal/10 rounded-[2px]"
                            title="Delete post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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

export default AdminBlogPage;
