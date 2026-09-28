import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Activity, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const HealthCheckBadge = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/health');
      if (res && res.data) {
        setHealth(res.data);
      } else {
        setHealth({ status: 'ok', db: 'unknown', uptime: 0 });
      }
    } catch (err) {
      setError(err?.error?.message || 'API Offline (Dev Standalone)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="flex items-center gap-3 bg-paper dark:bg-dark-surface border border-rule dark:border-dark-rule p-3 rounded-[2px]">
      <div className="flex items-center gap-2">
        {loading ? (
          <Activity className="w-4 h-4 text-ink-3 animate-pulse" />
        ) : error ? (
          <AlertCircle className="w-4 h-4 text-seal" />
        ) : (
          <CheckCircle className="w-4 h-4 text-veridian" />
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-ink dark:text-dark-type">
              API STATUS: {loading ? 'CHECKING...' : error ? 'OFFLINE' : health?.status?.toUpperCase()}
            </span>
            {!loading && !error && (
              <span className="font-mono text-[10px] text-brass uppercase border border-brass/40 px-1.5 py-0.2 rounded-[2px]">
                DB: {health?.db}
              </span>
            )}
          </div>
          {error && (
            <span className="font-mono text-[10px] text-seal">
              {error}
            </span>
          )}
          {health?.uptime > 0 && (
            <span className="font-mono text-[10px] text-ink-3 dark:text-dark-type/60">
              Uptime: {Math.round(health.uptime / 1000)}s
            </span>
          )}
        </div>
      </div>

      <button
        onClick={fetchHealth}
        disabled={loading}
        title="Refresh health status"
        className="ml-auto p-1.5 hover:bg-field dark:hover:bg-dark-field rounded-[2px] text-ink-2 dark:text-dark-type transition-colors cursor-pointer"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};

export default HealthCheckBadge;
