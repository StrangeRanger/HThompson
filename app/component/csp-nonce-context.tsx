"use client";

import { createContext, useContext } from "react";

const CspNonceContext = createContext<string | undefined>(undefined);

interface CspNonceProviderProps {
  children: React.ReactNode;
  nonce?: string;
}

export function CspNonceProvider({ children, nonce }: CspNonceProviderProps) {
  return (
    <CspNonceContext.Provider value={nonce}>
      {children}
    </CspNonceContext.Provider>
  );
}

export function useCspNonce(): string | undefined {
  return useContext(CspNonceContext);
}
