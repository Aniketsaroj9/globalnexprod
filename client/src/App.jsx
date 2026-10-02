import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Spinner from './components/ui/Spinner';

// Lazy-loaded Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/public/ServiceDetailPage'));
const SuccessStoriesPage = lazy(() => import('./pages/public/SuccessStoriesPage'));
const StoryDetailPage = lazy(() => import('./pages/public/StoryDetailPage'));
const BlogPage = lazy(() => import('./pages/public/BlogPage'));
const BlogPostDetailPage = lazy(() => import('./pages/public/BlogPostDetailPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/public/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/public/TermsPage'));

// Lazy-loaded Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage'));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage'));
const AdminStoriesPage = lazy(() => import('./pages/admin/AdminStoriesPage'));
const AdminServicesPage = lazy(() => import('./pages/admin/AdminServicesPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));

// Catch-all 404 Page
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Route Suspense Loading Fallback
const PageLoader = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
    <Spinner size="lg" />
    <span className="mt-3 font-mono text-xs text-ink-3 dark:text-dark-type/60">
      Loading document archive...
    </span>
  </div>
);

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Website Routes (Wrapped in PublicLayout: Navbar + Footer) */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about-us" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/success-stories" element={<SuccessStoriesPage />} />
                  <Route path="/success-stories/:slug" element={<StoryDetailPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
                  <Route path="/contact-us" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Admin Auth Route (Standalone) */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Admin Protected Routes (Wrapped in ProtectedRoute & AdminLayout) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="inquiries" element={<AdminInquiriesPage />} />
                  <Route path="blog" element={<AdminBlogPage />} />
                  <Route path="success-stories" element={<AdminStoriesPage />} />
                  <Route path="services" element={<AdminServicesPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
