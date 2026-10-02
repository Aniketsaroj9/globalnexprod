import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Inbox, Search, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import api from '../../lib/api';

export const AdminInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '15',
      });
      if (search.trim()) queryParams.append('q', search.trim());
      if (statusFilter) queryParams.append('status', statusFilter);

      const res = await api.get(`/admin/inquiries?${queryParams.toString()}`);
      if (res.success && res.data) {
        setInquiries(res.data);
        if (res.meta) setMeta(res.meta);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await api.patch(`/admin/inquiries/${id}`, { status: newStatus });
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const statusBadgeVariant = (status) => {
    switch (status) {
      case 'NEW':
        return 'stamp';
      case 'READ':
        return 'brass';
      case 'ARCHIVED':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Inquiries Ledger | GlobalNex Admin</title>
      </Helmet>

      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rule pb-4 dark:border-dark-rule">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink dark:text-dark-type">
              Client Inquiries Ledger
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              Department consultation requests, contact logs & lead routing
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <Card padding="md" className="mb-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <Input
                placeholder="Search by client name, email, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="READ">READ</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </Select>
            </div>
            <div className="sm:col-span-3">
              <Button type="submit" variant="secondary" className="w-full justify-center">
                <Search className="mr-2 h-4 w-4" />
                <span>Search</span>
              </Button>
            </div>
          </form>
        </Card>

        {/* Inquiries Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : inquiries.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No Inquiries Found"
            description="No inquiries match the current filter criteria."
          />
        ) : (
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs">
                <thead className="border-b border-rule bg-bond/50 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-3 dark:border-dark-rule dark:bg-dark-field/50 dark:text-dark-type/60">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule dark:divide-dark-rule">
                  {inquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className="transition hover:bg-field/40 dark:hover:bg-dark-field/40 cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant={statusBadgeVariant(inq.status)}>{inq.status}</Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-ink-3 dark:text-dark-type/60">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink dark:text-dark-type">
                        {inq.name}
                      </td>
                      <td className="px-4 py-3 text-ink-2 dark:text-dark-type/80">
                        {inq.serviceLabel || 'General'}
                      </td>
                      <td className="px-4 py-3 font-mono text-ink-3 dark:text-dark-type/60">
                        {inq.email}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-2">
                          {inq.status === 'NEW' && (
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(inq.id, 'READ')}
                              className="font-mono text-xs font-semibold text-seal hover:underline dark:text-red-400"
                            >
                              Mark Read
                            </button>
                          )}
                          <Button
                            variant="ghost"
                            className="p-1 text-xs"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-rule dark:border-dark-rule">
              <Pagination
                currentPage={page}
                totalPages={meta.totalPages || 1}
                totalItems={meta.total}
                pageSize={15}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </Card>
        )}

        {/* Inquiry Detail Modal */}
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={selectedInquiry?.name || 'Inquiry Details'}
          subtitle={`Received: ${selectedInquiry?.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : ''}`}
        >
          {selectedInquiry && (
            <div className="space-y-4 font-body text-xs">
              <div className="grid grid-cols-2 gap-4 rounded-[2px] border border-rule bg-bond/40 p-3 dark:border-dark-rule dark:bg-dark-field/30">
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-3">Email:</span>
                  <p className="font-semibold text-ink dark:text-dark-type">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-3">Phone:</span>
                  <p className="font-semibold text-ink dark:text-dark-type">{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-3">Service Practice:</span>
                  <p className="font-semibold text-seal dark:text-red-400">{selectedInquiry.serviceLabel || 'General'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-3">Source:</span>
                  <p className="font-semibold text-ink dark:text-dark-type">{selectedInquiry.source || 'contact-page'}</p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-ink-3">Client Message:</span>
                <div className="mt-1 rounded-[2px] border border-rule bg-paper p-3 text-sm leading-relaxed text-ink-2 dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type/90 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-rule pt-4 dark:border-dark-rule">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-3">Set Status:</span>
                  <div className="inline-flex gap-1">
                    {['NEW', 'READ', 'ARCHIVED'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusUpdate(selectedInquiry.id, st)}
                        className={`rounded-[2px] px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition ${
                          selectedInquiry.status === st
                            ? 'bg-ink text-paper dark:bg-dark-type dark:text-dark-bg'
                            : 'border border-rule text-ink hover:bg-field dark:border-dark-rule dark:text-dark-type'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" onClick={() => setSelectedInquiry(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default AdminInquiriesPage;
