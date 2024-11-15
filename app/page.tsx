'use client';

import { useState, useEffect } from 'react';
import PRList from '../components/PRList';

export default function Home() {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const response = await fetch('/api/fetch-prs');
        const data = await response.json();
        setPRs(data);
      } catch (error) {
        console.error('Failed to fetch PRs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, []);

  if (loading) return <p>Loading...</p>;

  console.log('prs', prs)

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Open PRs</h1>
      {prs.length > 0 ? <PRList prs={prs} /> : <p>No open PRs found.</p>}
    </div>
  );
}
