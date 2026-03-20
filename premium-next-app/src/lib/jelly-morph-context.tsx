'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';

// Shared mutable ref for scroll progress — avoids React re-renders
// Value: 0 when not in Services section, 0–1 during Services scroll
const ScrollProgressContext = createContext<React.MutableRefObject<number>>({ current: 0 });

export function useJellyMorphScrollProgress() {
    return useContext(ScrollProgressContext);
}

export function JellyMorphScrollProvider({ children }: { children: ReactNode }) {
    const scrollProgressRef = useRef<number>(0);
    return (
        <ScrollProgressContext.Provider value={scrollProgressRef}>
            {children}
        </ScrollProgressContext.Provider>
    );
}
