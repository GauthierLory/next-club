import React from 'react';
import Link from 'next/link';
import createClient from '../lib/supabase-server';
import SignOut from '../components/SignOut';

async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
 <div>
   {user ? (
          <ul>
            <SignOut />
            <Link
              href="/users"
            >
              <h5>Users</h5>
            </Link>
            <Link
              href="/profile"
            >
              <h5>
                Go to profile
              </h5>
            </Link>
            <Link
              href="/teams"
            >
              <h5>
                Teams
              </h5>
            </Link>
          </ul>
        ) : (
          <ul>
            <Link
              href="/"
            >
              <h5>Sign In</h5>
            </Link>
          </ul>
        )}
 </div>
  );
}

export default Header;
