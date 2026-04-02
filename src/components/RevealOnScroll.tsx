import { useState, useEffect, useRef } from 'react';

export const RevealOnScroll = ({ children, className = "" }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        // Fallback defensivo: nunca dejamos contenido importante oculto
        // si el observer falla en ciertos navegadores móviles.
        const fallbackTimeout = window.setTimeout(() => {
            setIsVisible(true);
        }, 250);

        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return () => window.clearTimeout(fallbackTimeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(element);

        // Comprobación manual instantánea por si ya está en viewport
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setIsVisible(true);
        }

        return () => {
            window.clearTimeout(fallbackTimeout);
            observer.disconnect();
        };
    }, [children]);

    return (
        <div
            ref={ref}
            className={`on-scroll ${isVisible ? 'visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
};
