import React, { PropsWithChildren } from 'react';
import createClient from '../../../lib/supabase-server';
import { redirect } from 'next/navigation';

export const revalidate = 0;
export async function Page({
  params,
  searchParams,
}: PropsWithChildren<{
  params: { teamId: string };
  searchParams?: { [key: string]: string | undefined };
}>) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/');
  }

  // throw new Error('Error in team page');
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', params.teamId);

    const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', params.teamId);

  if (!teams) {
    redirect('/');
  }

  return (
    <div>
      teamId page: {params.teamId}
      {JSON.stringify(searchParams)}
      <br />
      team: {JSON.stringify(teams)}
      members: {JSON.stringify(members)}
    </div>
  );
}

export default Page;
