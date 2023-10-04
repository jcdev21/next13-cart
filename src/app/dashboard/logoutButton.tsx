'use client';

import { Button } from 'antd';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function LogoutButton() {
  return (
    <Button type="primary" onClick={() => signOut()}>
      Logout
    </Button>
  );
}
