import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from '../../components/SignOut';
import createClient from '../../lib/supabase-server';

export default async function Profile() {
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  if (!user) redirect('/');

  return (
    <div>
      <h2>User Profile</h2>
      <code>{user.email}</code>
      <div >Last Signed In:</div>
      <code >{new Date(user.last_sign_in_at).toUTCString()}</code>
      <Link href="/">
        Go Home
      </Link>
      <SignOut />
    </div>
  );
}
