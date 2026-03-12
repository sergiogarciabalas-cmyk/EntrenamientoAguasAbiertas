import { Lock, ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

export const PrivateArea = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className="container">
                <RevealOnScroll>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Lock size={48} className="text-gradient" style={{ margin: '0 auto 1rem' }} />
                        <h1 className="section-title">Área <span className="text-gradient">Privada</span></h1>
                        <p className="section-subtitle">Accede a tus planes de entrenamiento, contenido exclusivo y seguimiento de progreso.</p>
                    </div>
                </RevealOnScroll>

                <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
                    <RevealOnScroll className="delay-1">
                        <div className="service-card glass" style={{ textAlign: 'center', alignItems: 'center' }}>
                            <div className="service-icon" style={{ margin: '0 auto 1rem' }}>
                                <ExternalLink size={32} />
                            </div>
                            <h3>App de Entrenamiento</h3>
                            <p>Accede a la plataforma externa (TrainingPeaks, etc.) para ver tus rutinas diarias y subir tus entrenamientos.</p>
                            <a href="#" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                                Iniciar Sesión <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                            </a>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll className="delay-2">
                        <div className="service-card glass" style={{ textAlign: 'center', alignItems: 'center' }}>
                            <div className="service-icon" style={{ margin: '0 auto 1rem' }}>
                                <Mail size={32} />
                            </div>
                            <h3>Newsletter Exclusiva</h3>
                            <p>Únete a la comunidad. Recibe consejos técnicos, notificaciones de nuevos vídeos y acceso prioritario a los clínics.</p>
                            
                            <form 
                                action="https://formspree.io/f/YOUR_FORM_ID_HERE" 
                                method="POST"
                                style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                            >
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Tu mejor email..." 
                                    required 
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        background: 'rgba(0, 0, 0, 0.2)',
                                        color: 'white',
                                        outline: 'none',
                                        width: '100%',
                                        fontSize: '0.875rem'
                                    }}
                                />
                                <button type="submit" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                    Suscribirse
                                </button>
                            </form>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};
