'use client';

import Link from 'next/link';

import Auth from '../components/Auth';
import { useAuth, VIEWS } from '../components/AuthProvider';

export default function Home() {
  const { initial, user, view, signOut } = useAuth();

  if (initial) {
    return <div>Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <div>
        <h2>Welcome!</h2>
        <code>{user.role}</code>
        <Link href="/profile">
          Go to Profile
        </Link>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return <Auth view={view} />;
}
