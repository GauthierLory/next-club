import React from 'react';
import Link from 'next/link';

type UserTableProps = {
  users: any;
};

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr
            key={user.id}
          >
            <td>
              <div>
                <span>{user.id}</span>
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
                  <Link href={`/users/${user.id}`}>See</Link>
                </div>
                <div>
                  Edit
                </div>
                <div>
                  Delete
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
