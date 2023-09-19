import { getServerSession } from 'next-auth';
import React from 'react';
import { OPTIONS } from '../api/auth/[...nextauth]/route';

export default async function Dashboard() {
  const session = await getServerSession(OPTIONS);

  return <div>Welcome: {session?.user?.email}</div>;
}
