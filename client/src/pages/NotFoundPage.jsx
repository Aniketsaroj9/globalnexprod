import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileQuestion, Home } from 'lucide-react';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Document Not Found | GlobalNex</title>
      </Helmet>

      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-rule bg-bond text-ink-3 dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type">
          <FileQuestion className="h-8 w-8 text-seal" />
        </div>
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-seal dark:text-red-400">
          Error 404 &bull; Record Missing
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-dark-type">
          Document Not Found in Archive
        </h1>
        <p className="mt-3 max-w-md font-body text-sm text-ink-3 dark:text-dark-type/70">
          The requested path or corporate dossier could not be located in our registry. It may have
          been relocated or archived.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link to="/">
            <Button variant="primary">
              <Home className="mr-2 h-4 w-4" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary">Browse Services</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
