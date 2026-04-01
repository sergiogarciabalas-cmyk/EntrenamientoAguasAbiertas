import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setStatus('loading');
        
        // Simulación de envío hasta conectar con una plataforma real
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(30,58,138,0.4) 0%, rgba(9,20,40,0.8) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            marginTop: '4rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Elemento decorativo de fondo */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-20%',
                width: '150%',
                height: '150%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    background: 'rgba(59,130,246,0.2)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: '#60A5FA'
                }}>
                    <Mail size={30} />
                </div>
                
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                    Sigue Nadando, Sigue Aprendiendo
                </h3>
                
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                    Únete a mi lista de correo y recibe consejos técnicos exclusivos, entrenamientos y análisis de aguas abiertas directamente en tu bandeja de entrada.
                </p>

                {status === 'success' ? (
                    <div style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '1rem', borderRadius: '0.5rem', display: 'inline-block' }}>
                        ¡Genial! Te has suscrito correctamente a la Newsletter.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="Tu mejor dirección de correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                flex: '1 1 200px',
                                padding: '1rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(0,0,0,0.4)',
                                color: 'white',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', flex: '0 0 auto' }}
                        >
                            {status === 'loading' ? 'Enviando...' : (
                                <>Suscribirme <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                )}
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>
                    Prometo no enviar spam. Solo natación de alto voltaje.
                </p>
            </div>
        </div>
    );
};
