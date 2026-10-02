import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Check } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import api from '../../lib/api';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/settings');
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      setSaveSuccess(false);
      const res = await api.put('/admin/settings', settings);
      if (res.success && res.data) {
        setSettings(res.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to update site settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Site Settings | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-6 border-b border-rule pb-4 dark:border-dark-rule">
          <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
            Global Site Settings
          </h1>
          <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
            Configure singleton company registry info, primary department emails, and corporate contacts
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : settings ? (
          <Card padding="lg" className="max-w-3xl">
            {saveSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-[2px] border border-veridian/40 bg-veridian/10 p-3 font-mono text-xs font-bold text-veridian">
                <Check className="h-4 w-4" />
                <span>Site configuration updated successfully.</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Company Legal Name"
                value={settings.companyName || ''}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Primary Central Email"
                  type="email"
                  value={settings.primaryEmail || ''}
                  onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                />

                <Input
                  label="Corporate Phone"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>

              <Input
                label="Registered Headquarters Address"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />

              <div className="pt-4 border-t border-rule dark:border-dark-rule flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={saving}
                  className="text-xs py-2.5 px-5"
                >
                  <Save className="mr-2 h-4 w-4" />
                  <span>Update Site Settings</span>
                </Button>
              </div>
            </form>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default AdminSettingsPage;
