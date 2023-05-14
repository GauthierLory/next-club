import React from 'react';
import { Button } from '../../components/Form/Bouton';
// import {supabase} from "~/utils/supabaseClient";
// import supabase from '../../lib/supabase-browser';
import { UserTable } from '../../components/User/UserTable';
import createClient from '../../lib/supabase-server';
import { redirect } from 'next/navigation';
import { Input } from '../../components/Form/Input';
import { TeamTable } from '../../components/Team/TeamTable';

export const revalidate = 0;
export default async function Page() {
  const supabase = createClient();
  const {data: { session }} = await supabase.auth.getSession();
  if (!session) redirect('/');
  // throw new Error('Error in board page');
  const { data: teams, error } = await supabase.from('teams').select('*');

  return (
    <div>
      <div>
        <h1>teams index page</h1>

        <a href="/teams/new">
          Create new team
        </a>

        <label htmlFor="email">Email</label>
        <input name="email" type={'email'} required />
        <TeamTable teams={teams} />
        <ul>
          {teams?.map((user: any) => (
            <li key={user.id}>{user.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
