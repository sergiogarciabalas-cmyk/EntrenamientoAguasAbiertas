import { useState } from 'react';
import { Lock, ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { Link } from 'react-router-dom';

export const PrivateArea = () => {
    const [email, setEmail] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const FORMSPREE_URL = "https://formspree.io/f/xvzwrzeb";

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!privacyAccepted) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email, subject: "Nueva suscripción Newsletter" }),
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '100px' }}>
            <div className="container">
                <RevealOnScroll>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Lock size={48} className="text-gradient" style={{ margin: '0 auto 1rem' }} />
                        <h1 className="section-title">Área <span className="text-gradient">Privada</span></h1>
                        <p className="section-subtitle">Accede a tus planes de entrenamiento, contenido exclusivo y seguimiento de progreso.</p>
                    </div>
                </RevealOnScroll>

                <div className="services-grid" style={{ 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    maxWidth: '800px', 
                    margin: '0 auto',
                    gap: '2rem' 
                }}>
                    
                    {/* App de Entrenamiento */}
                    <RevealOnScroll className="delay-1">
                        <div className="service-card glass" style={{ 
                            textAlign: 'center', 
                            alignItems: 'center', 
                            height: '100%',
                            position: 'relative', // Importante para el clic
                            zIndex: 10            // Asegura que esté por encima de la animación
                        }}>
                            <div className="service-icon" style={{ margin: '0 auto 1rem' }}>
                                <ExternalLink size={32} />
                            </div>
                            <h3>App de Entrenamiento</h3>
                            <p>Accede a la plataforma Apex Swim para ver tus rutinas diarias y seguimiento de progreso.</p>
                            <a 
                                href="https://apex-swim.vercel.app/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary" 
                                style={{ 
                                    marginTop: '1.5rem', 
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                Iniciar Sesión <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                            </a>
                        </div>
                    </RevealOnScroll>

                    {/* Newsletter Exclusiva */}
                    <RevealOnScroll className="delay-2">
                        <div className="service-card glass" style={{ 
                            textAlign: 'center', 
                            alignItems: 'center', 
                            height: '100%',
                            position: 'relative', // Importante para el clic
                            zIndex: 10            // Asegura que esté por encima de la animación
                        }}>
                            <div className="service-icon" style={{ margin: '0 auto 1rem' }}>
                                <Mail size={32} />
                            </div>
                            <h3>Newsletter Exclusiva</h3>
                            
                            {status === 'success' ? (
                                <div style={{ padding: '1rem', color: 'var(--color-primary)' }}>
                                    <p>¡Gracias por suscribirte!</p>
                                    <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1rem' }}>Volver</button>
                                </div>
                            ) : (
                                <>
                                    <p>Recibe consejos técnicos y acceso prioritario a los clínics.</p>
                                    
                                    <form onSubmit={handleSubscribe} style={{ 
                                        marginTop: '1.5rem', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: '1rem', 
                                        width: '100%',
                                        position: 'relative',
                                        zIndex: 20
                                    }}>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Tu email..." 
                                            required 
                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                background: 'rgba(0, 0, 0, 0.2)',
                                                color: 'white',
                                                width: '100%',
                                            }}
                                        />
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem', textAlign: 'left', alignItems: 'flex-start' }}>
                                            <input 
                                                type="checkbox" 
                                                id="privacy-news" 
                                                required 
                                                checked={privacyAccepted}
                                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                                style={{ marginTop: '0.2rem', cursor: 'pointer' }}
                                            />
                                            <label htmlFor="privacy-news" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                                                Acepto la <Link to="/privacidad" style={{ color: 'var(--color-primary)' }}>Política de Privacidad</Link>.
                                            </label>
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="btn btn-outline" 
                                            disabled={isSubmitting || !privacyAccepted}
                                            style={{ 
                                                width: '100%', 
                                                justifyContent: 'center', 
                                                opacity: (!privacyAccepted || isSubmitting) ? 0.5 : 1,
                                                cursor: privacyAccepted ? 'pointer' : 'not-allowed'
                                            }}
                                        >
                                            {isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};
