import { getServerSession } from 'next-auth';
import React from 'react';
import { OPTIONS } from '../api/auth/[...nextauth]/route';
import LogoutButton from './logoutButton';

export default async function Dashboard() {
  const session = await getServerSession(OPTIONS);

  return (
    <div>
      Welcome: {session?.user?.email} <LogoutButton />
    </div>
  );
}
