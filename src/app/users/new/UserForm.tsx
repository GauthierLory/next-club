'use client';
import React from 'react';
// import supabase from '../../../lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function UserForm() {
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    try {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

      if (!error) {
        router.push(`/users`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type={'email'} required />
      <button type={'submit'}>
        Invite new user
      </button>
    </form>
  );
}

export default UserForm;
