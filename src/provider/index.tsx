'use client';

import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <StyleProvider hashPriority="high" ssrInline>
        {children}
      </StyleProvider>
    </ReduxProvider>
  );
}
