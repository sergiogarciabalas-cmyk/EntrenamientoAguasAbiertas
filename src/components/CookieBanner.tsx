import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            zIndex: 9999,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{ color: 'white', fontSize: '0.9rem', lineHeight: '1.5' }}>
                <p style={{ margin: 0 }}>
                    Utilizamos cookies propias y de terceros para analizar nuestros servicios y mostrarte publicidad relacionada con tus preferencias mediante el análisis de tus hábitos de navegación. 
                    Puedes leer más en nuestra <Link to="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Política de Cookies</Link>.
                </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                    onClick={() => setIsVisible(false)} 
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                    Rechazar
                </button>
                <button 
                    onClick={acceptCookies} 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
                >
                    Aceptar todas
                </button>
            </div>
        </div>
    );
};