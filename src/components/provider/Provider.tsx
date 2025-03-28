'use client';

// MAYBE: Verificar esto porqué creo que no lleva sessionprovider

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {

  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  )
}