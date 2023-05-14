import React from 'react';
import { Button } from '../../components/Form/Bouton';
// import {supabase} from "~/utils/supabaseClient";
// import supabase from '../../lib/supabase-browser';
import { UserTable } from '../../components/User/UserTable';
import createClient from '../../lib/supabase-server';
import { redirect } from 'next/navigation';
export default async function Page() {
  const supabase = createClient();
  const {data: { session }} = await supabase.auth.getSession();
  if (!session) redirect('/');
  const { data: users, error } = await supabase.from('profiles').select('*');

  return (
    <div>
      <div>
        <h1>Users index page</h1>
        <a href="/users/new">
          Create new user
        </a>
        <UserTable users={users} />
        <ul>
          {users?.map((user: any) => (
            <li key={user.id}>{user.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
