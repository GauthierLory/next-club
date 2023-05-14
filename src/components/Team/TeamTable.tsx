'use client';
import React from 'react';
import Link from 'next/link';
import supabase from '../../lib/supabase-browser';
import { useRouter } from 'next/navigation';
type TeamTableProps = {
  teams: any;
};

export const TeamTable = ({ teams }: TeamTableProps) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('teams').delete().eq('id', id);
    if (!error) {
      router.push('/teams');
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team: any) => (
          <tr
            key={team.id}
          >
            <td>
              <div>
                <span>{team.name}</span>
              </div>
            </td>
            <td>
              <div>
                <span>{team.name}</span>
              </div>
            </td>
            <td>
              <span>
                Active
              </span>
            </td>
            <td>
              <div>
                <div>
                  <Link href={`/teams/${team.id}`}>See</Link>
                </div>
                <div>
                  Edit
                </div>
                <button
                  onClick={() => handleDelete(team.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
