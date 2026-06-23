import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const FORMSPREE_URL = "https://formspree.io/f/xvzwrzeb";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !privacyAccepted) return;
        
        setStatus('loading');
        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email, subject: "Nueva suscripción Newsletter General" }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setPrivacyAccepted(false);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%' }}>
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
                                disabled={status === 'loading' || !privacyAccepted}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem 2rem',
                                    flex: '0 0 auto',
                                    opacity: (!privacyAccepted || status === 'loading') ? 0.5 : 1,
                                    cursor: (privacyAccepted && status !== 'loading') ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {status === 'loading' ? 'Enviando...' : (
                                    <>Suscribirme <ArrowRight size={18} /></>
                                )}
                            </button>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', textAlign: 'left', alignItems: 'flex-start' }}>
                            <input
                                type="checkbox"
                                id="privacy-newsletter"
                                required
                                checked={privacyAccepted}
                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                style={{ marginTop: '0.2rem', cursor: 'pointer' }}
                            />
                            <label htmlFor="privacy-newsletter" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                                Acepto la <Link to="/privacidad" style={{ color: 'var(--color-primary)' }}>Política de Privacidad</Link> y el envío de comunicaciones.
                            </label>
                        </div>

                        {status === 'error' && (
                            <p style={{ fontSize: '0.85rem', color: '#EF4444', textAlign: 'left', margin: '0' }}>
                                Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.
                            </p>
                        )}
                    </form>
                )}
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>
                    Prometo no enviar spam. Solo natación de alto voltaje.
                </p>
            </div>
        </div>
    );
};
