'use client';

import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <StyleProvider hashPriority="high" ssrInline>
          {children}
        </StyleProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
