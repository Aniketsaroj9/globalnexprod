import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Edit3, Save, Check } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/services');
        if (res.success && res.data) {
          setServices(res.data);
          if (res.data.length > 0) {
            setSelectedSlug(res.data[0].slug);
            setFormData(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSelectService = (slug) => {
    setSelectedSlug(slug);
    const found = services.find((s) => s.slug === slug);
    if (found) {
      setFormData({ ...found });
      setSaveSuccess(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedSlug || !formData) return;

    try {
      setSaving(true);
      setSaveSuccess(false);
      const res = await api.put(`/admin/services/${selectedSlug}`, formData);
      if (res.success && res.data) {
        setSaveSuccess(true);
        setServices((prev) =>
          prev.map((s) => (s.slug === selectedSlug ? res.data : s))
        );
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to update service practice');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Services Editor | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-6 border-b border-rule pb-4 dark:border-dark-rule">
          <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
            Services Practice Editor
          </h1>
          <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
            Edit content, offerings, methodology, and SEO metadata for the 5 core practices
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Sidebar list of 5 fixed services */}
            <div className="lg:col-span-4 space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-ink-3 dark:text-dark-type/60 px-1">
                Select Practice to Edit
              </div>
              {services.map((srv) => (
                <button
                  key={srv.slug}
                  type="button"
                  onClick={() => handleSelectService(srv.slug)}
                  className={`w-full text-left p-3 rounded-[2px] border transition flex items-center justify-between ${
                    selectedSlug === srv.slug
                      ? 'bg-ink text-paper border-ink dark:bg-dark-type dark:text-dark-bg dark:border-dark-type shadow-sm'
                      : 'bg-paper text-ink border-rule hover:bg-field dark:bg-dark-surface dark:text-dark-type dark:border-dark-rule'
                  }`}
                >
                  <span className="font-display text-sm font-bold">{srv.name}</span>
                  <Edit3 className="h-4 w-4 shrink-0 opacity-70" />
                </button>
              ))}
            </div>

            {/* Service Form Column */}
            <div className="lg:col-span-8">
              {formData ? (
                <Card padding="lg">
                  {saveSuccess && (
                    <div className="mb-4 flex items-center gap-2 rounded-[2px] border border-veridian/40 bg-veridian/10 p-3 font-mono text-xs font-bold text-veridian">
                      <Check className="h-4 w-4" />
                      <span>Changes saved to database successfully.</span>
                    </div>
                  )}

                  <form onSubmit={handleSave} className="space-y-4">
                    <Input
                      label="Service Tagline"
                      value={formData.tagline || ''}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    />

                    <Textarea
                      label="Detailed Overview Description"
                      rows={6}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="pt-4 border-t border-rule dark:border-dark-rule flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={saving}
                        className="text-xs py-2.5 px-5"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        <span>Save Practice Changes</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminServicesPage;
