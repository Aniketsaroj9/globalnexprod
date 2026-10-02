import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Award,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';

const ADMIN_NAV = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { path: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { path: '/admin/success-stories', label: 'Success Stories', icon: Award },
  { path: '/admin/services', label: 'Services', icon: Briefcase },
  { path: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-[2px] font-body text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-ink text-paper dark:bg-dark-type dark:text-dark-bg shadow-sm'
        : 'text-ink-2 hover:bg-field dark:text-dark-type/80 dark:hover:bg-dark-field'
    }`;

  return (
    <div className="flex min-h-screen bg-field/40 dark:bg-dark-bg text-ink dark:text-dark-type">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-rule bg-paper transition-transform duration-200 lg:static lg:translate-x-0 dark:border-dark-rule dark:bg-dark-surface ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-rule px-4 dark:border-dark-rule">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-seal text-paper font-display text-sm font-bold">
              GN
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold leading-tight">Admin Console</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 dark:text-dark-type/60">
                SmartConnect CRM
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-[2px] p-1 text-ink-3 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 space-y-1.5 p-3">
          <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-3 dark:text-dark-type/50">
            Management Ledger
          </div>
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={navLinkClass}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Footer */}
        <div className="border-t border-rule p-3 dark:border-dark-rule">
          <div className="mb-3 flex items-center gap-3 rounded-[2px] bg-field/60 p-2 dark:bg-dark-field/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink font-mono text-xs font-bold dark:bg-dark-surface dark:text-dark-type">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate font-body text-xs font-bold text-ink dark:text-dark-type">
                {user?.fullName || 'Administrator'}
              </span>
              <span className="truncate font-mono text-[10px] text-ink-3 dark:text-dark-type/60">
                {user?.email || 'admin@globalnex.com'}
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-[2px] px-3 py-2 font-mono text-xs text-ink-3 transition hover:bg-field hover:text-ink dark:text-dark-type/60 dark:hover:bg-dark-field dark:hover:text-dark-type"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="h-3.5 w-3.5" />
                View Live Website
              </span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-[2px] px-3 py-2 font-body text-xs font-semibold text-seal transition hover:bg-seal/10 dark:text-red-400 dark:hover:bg-seal/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 items-center justify-between border-b border-rule bg-paper px-4 sm:px-6 dark:border-dark-rule dark:bg-dark-surface">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-[2px] border border-rule p-1.5 text-ink lg:hidden dark:border-dark-rule dark:text-dark-type"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-veridian">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Authenticated Session</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
