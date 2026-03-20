'use client';

import { type ReactNode } from 'react';
import { JellyMorphScrollProvider } from '@/lib/jelly-morph-context';

export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <JellyMorphScrollProvider>
            {children}
        </JellyMorphScrollProvider>
    );
}
