'use client';

import { useState } from 'react';
import { ingestAction } from './actions';

interface IngestResult {
  success?: boolean;
  results?: {
    channelsCreated: number;
    channelsUpdated: number;
    videosCreated: number;
    videosUpdated: number;
  };
  error?: string;
  message?: string;
}

export default function YoutubeUpdate() {
  const [result, setResult] = useState<IngestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await ingestAction({
        channelId: 'UCJNuWmihoVgEnqOiBwYUtgg',
        maxResults: 5,
      });

      if (data.error) {
        setError(data.error || data.message || 'Unknown error');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'monospace' }}
    >
      <h1>YouTube Data Ingestion Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleUpdate}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fee',
            border: '1px solid #c00',
            marginBottom: '20px',
          }}
        >
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div style={{ padding: '15px', backgroundColor: '#efe', border: '1px solid #0c0' }}>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <h2>Request Details:</h2>
        <p>
          <strong>Channel ID:</strong> UCJNuWmihoVgEnqOiBwYUtgg
        </p>
        <p>
          <strong>Max Results:</strong> 5
        </p>
        <p>
          <strong>Method:</strong> Server Action
        </p>
      </div>
    </div>
  );
}
