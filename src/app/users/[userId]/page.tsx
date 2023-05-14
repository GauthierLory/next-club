import React, { PropsWithChildren } from 'react';
import createClient from '../../../lib/supabase-server';
import { redirect } from 'next/navigation';

export const revalidate = 0;
export async function Page({
  params,
  searchParams,
}: PropsWithChildren<{
  params: { userId: string };
  searchParams?: { [key: string]: string | undefined };
}>) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log('sessions@@@', session);
  if (!session) {
    redirect('/');
  }

  // throw new Error('Error in team page');
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.userId);
  console.log(users);

  if (!users) {
    redirect('/');
  }

  return (
    <div>
      userId page: {params.userId}
      {JSON.stringify(searchParams)}
      <br />
      users: {JSON.stringify(users)}
    </div>
  );
}

export default Page;
