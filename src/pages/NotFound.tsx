import { Link } from 'react-router-dom';
import { Waves, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const NotFound = () => {
    useSEO({
        title: 'Página no encontrada | Sergi García',
        description: 'Parece que hemos nadado demasiado lejos. Vuelve a la página principal de Sergi Swim Coach.'
    });

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '150px 2rem 50px' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <Waves size={80} style={{ color: 'var(--color-primary)', margin: '0 auto 2rem', animation: 'float 3s ease-in-out infinite' }} />
                
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
                    Error <span className="text-gradient">404</span>
                </h1>
                
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>
                    ¡Vaya! Parece que hemos nadado demasiado lejos.
                </h2>
                
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                    La página que buscas no existe o se la ha llevado la corriente. Puede que el enlace esté roto o haya cambiado de ubicación.
                </p>

                <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
                    <ArrowLeft size={18} /> Volver a tierra firme
                </Link>
            </div>
        </div>
    );
};
