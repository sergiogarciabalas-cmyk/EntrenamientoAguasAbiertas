import { useState, useEffect, useRef } from 'react';

export const RevealOnScroll = ({ children, className = "" }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
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

        if (ref.current) {
            observer.observe(ref.current);
            // Comprobación manual instantánea por si ya está en viewport
            const rect = (ref.current as HTMLElement).getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                setIsVisible(true);
            }
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
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
