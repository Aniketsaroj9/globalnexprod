import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ThemeToggle from '../../components/ThemeToggle';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide your corporate email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials or unauthorized access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Staff Portal Sign In | GlobalNex Admin</title>
      </Helmet>

      <div className="flex min-h-screen flex-col items-center justify-center bg-field/40 p-4 dark:bg-dark-bg">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          {/* Brand header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[2px] bg-seal text-paper shadow-md font-display text-2xl font-bold">
              GN
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-dark-type">
              GlobalNex Admin Console
            </h1>
            <p className="mt-1 font-mono text-xs text-ink-3 dark:text-dark-type/60">
              Authorized Personnel Access Only &bull; CIN: U74999GJ2020PTC112345
            </p>
          </div>

          <Card padding="lg" className="shadow-xl">
            {error && (
              <div className="mb-4 rounded-[2px] border border-seal/40 bg-seal/10 p-3 font-body text-xs text-seal dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Admin Email Address"
                type="email"
                placeholder="admin@globalnex.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Security Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                  className="w-full justify-center py-2.5"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Authenticate & Sign In</span>
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-rule/60 pt-4 text-center dark:border-dark-rule/60">
              <a
                href="/"
                className="font-mono text-xs text-ink-3 hover:text-ink dark:text-dark-type/60 dark:hover:text-dark-type"
              >
                &larr; Return to Public Website
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
