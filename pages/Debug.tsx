// pages/Debug.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import { requireAdmin } from '@/middleware/admin';
import pool from '@/utils/db';
import NextAuthOptions from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default function DebugPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Run query</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const session: any = await getServerSession(req, res, NextAuthOptions);
  console.log('test session', session);
  // console.log("admin session",session)
  if (
    !session ||
    !session.user ||
    session.user.name !== 'Admin' ||
    session.user.email !== 'admin@kobe.pann'
  ) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
