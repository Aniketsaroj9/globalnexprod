import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SectionHeading from '../../components/ui/SectionHeading';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import api from '../../lib/api';

const SERVICE_OPTIONS = [
  { value: 'immigration', label: 'Immigration Consultancy' },
  { value: 'study-abroad', label: 'Study Abroad Programs' },
  { value: 'tours-travels', label: 'Tours & Travels' },
  { value: 'export-import', label: 'Export & Import Advisory' },
  { value: 'business-setup', label: 'Global Business Setup' },
  { value: 'general', label: 'General Corporate Inquiry' },
];

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || 'immigration';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceLabel: defaultService,
    message: '',
    website: '', // Honeypot field
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, serviceLabel: serviceParam }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid phone number (minimum 8 digits).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide details about your inquiry (minimum 10 characters).';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must authorize GlobalNex to contact you regarding this inquiry.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const res = await api.post('/inquiries', formData);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setServerError(res.error?.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setServerError(err.error?.message || 'Unable to submit your inquiry at this time. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact & Inquiries | Bhargesh Patel GlobalNex</title>
        <meta
          name="description"
          content="Get in touch with Bhargesh Patel GlobalNex specialists for immigration, study abroad, travel, and enterprise setup."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="py-8">
          <SectionHeading
            badge="Direct Inquiries"
            title="Connect with Our Specialist Advisory"
            subtitle="Submit your details for structured department routing and an official case assessment within one business day."
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <Card padding="lg" className="border-veridian/40 bg-veridian/5 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-veridian/10 text-veridian">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
                    Inquiry Lodged Successfully
                  </h3>
                  <p className="mt-2 font-body text-sm text-ink-2 dark:text-dark-type/80">
                    Thank you for contacting Bhargesh Patel GlobalNex. Your request has been routed to
                    the respective department specialist. We will review your dossier and get back
                    to you within one business day.
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          serviceLabel: 'immigration',
                          message: '',
                          website: '',
                          consent: false,
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card padding="lg">
                  {serverError && (
                    <div className="mb-6 rounded-[2px] border border-seal/40 bg-seal/5 p-3 font-body text-xs text-seal dark:text-red-400">
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <Input
                      label="Full Legal Name *"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      error={errors.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        label="Email Address *"
                        type="email"
                        placeholder="rajesh@example.com"
                        value={formData.email}
                        error={errors.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />

                      <Input
                        label="Phone / Mobile Number *"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        error={errors.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <Select
                      label="Consultancy Practice / Service *"
                      options={SERVICE_OPTIONS}
                      value={formData.serviceLabel}
                      onChange={(e) => setFormData({ ...formData, serviceLabel: e.target.value })}
                    />

                    <Textarea
                      label="Case Description / Requirement *"
                      rows={5}
                      maxLength={2000}
                      placeholder="Briefly describe your profile, current status, country of interest, or corporate requirement..."
                      value={formData.message}
                      error={errors.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer font-body text-xs text-ink-2 dark:text-dark-type/80">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 rounded-[2px] border-rule text-seal focus:ring-seal"
                        />
                        <span>
                          I consent to Bhargesh Patel GlobalNex Private Limited collecting and processing
                          my personal details to respond to this consultation request.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1 font-body text-xs text-seal dark:text-red-400">{errors.consent}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        className="w-full justify-center py-3 text-sm"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        <span>Dispatch Inquiry to Department</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>

            {/* Department Inboxes & Office Details */}
            <div className="lg:col-span-5 space-y-6">
              <Card padding="md" className="bg-bond/40 dark:bg-dark-surface">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-dark-type">
                  Department Inboxes
                </h4>
                <div className="mt-4 space-y-3 font-mono text-xs text-ink-2 dark:text-dark-type/80">
                  <div className="border-b border-rule/60 pb-2 dark:border-dark-rule/60">
                    <span className="block text-[10px] uppercase text-ink-3">Immigration Practice:</span>
                    <a href="mailto:immigration@bhargeshglobalnex.com" className="font-bold text-seal hover:underline dark:text-red-400">
                      immigration@bhargeshglobalnex.com
                    </a>
                  </div>
                  <div className="border-b border-rule/60 pb-2 dark:border-dark-rule/60">
                    <span className="block text-[10px] uppercase text-ink-3">Study Abroad Practice:</span>
                    <a href="mailto:education@bhargeshglobalnex.com" className="font-bold text-seal hover:underline dark:text-red-400">
                      education@bhargeshglobalnex.com
                    </a>
                  </div>
                  <div className="border-b border-rule/60 pb-2 dark:border-dark-rule/60">
                    <span className="block text-[10px] uppercase text-ink-3">Tours & Travels:</span>
                    <a href="mailto:travel@bhargeshglobalnex.com" className="font-bold text-seal hover:underline dark:text-red-400">
                      travel@bhargeshglobalnex.com
                    </a>
                  </div>
                  <div className="border-b border-rule/60 pb-2 dark:border-dark-rule/60">
                    <span className="block text-[10px] uppercase text-ink-3">Export-Import Advisory:</span>
                    <a href="mailto:exports@bhargeshglobalnex.com" className="font-bold text-seal hover:underline dark:text-red-400">
                      exports@bhargeshglobalnex.com
                    </a>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-ink-3">Central Office:</span>
                    <a href="mailto:info@bhargeshglobalnex.com" className="font-bold text-seal hover:underline dark:text-red-400">
                      info@bhargeshglobalnex.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-dark-type">
                  Head Office Address
                </h4>
                <div className="mt-3 space-y-2 font-body text-xs text-ink-2 dark:text-dark-type/80">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-seal" />
                    <span>GlobalNex House, Corporate Road, Prahlad Nagar, Ahmedabad, Gujarat 380015, India</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-veridian" />
                    <span>+91 (079) 4900-5500</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
