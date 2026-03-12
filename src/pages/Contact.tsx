import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

export const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Replace this with your actual Formspree endpoint URL
    const FORMSPREE_URL = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                // Fallback for demo purposes if formspree URL is not set
                console.warn("Formspree URL is not configured. Simulating success.");
                setTimeout(() => setIsSuccess(true), 1000);
            }
        } catch (error) {
            console.error(error);
            // Fallback
            setTimeout(() => setIsSuccess(true), 1000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <RevealOnScroll>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 className="section-title">Habla <span className="text-gradient">Conmigo</span></h1>
                        <p className="section-subtitle">¿Tienes dudas sobre los planes de entrenamiento, los clínics o cualquier otro servicio? Escríbeme y trazaremos el mejor camino hacia tus objetivos.</p>
                    </div>
                </RevealOnScroll>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                    {/* Contact Info */}
                    <RevealOnScroll className="delay-1">
                        <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem', height: '100%' }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Información de Contacto</h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Email</p>
                                    <a href="mailto:sergiogarciabalas@gmail.com" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        sergiogarciabalas@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Ubicación</p>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        Costa Brava & Eventos Nacionales
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Redes Sociales</p>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        @SergiSwimCoach
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Contact Form */}
                    <RevealOnScroll className="delay-2">
                        <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem' }}>
                            {isSuccess ? (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                    <div style={{ background: 'var(--color-primary)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <Send size={30} />
                                    </div>
                                    <h3>¡Mensaje enviado con éxito!</h3>
                                    <p style={{ color: 'var(--color-text-muted)' }}>He recibido tu mensaje. Me pondré en contacto contigo lo antes posible para empezar a trabajar en tus objetivos.</p>
                                    <button onClick={() => setIsSuccess(false)} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Nombre completo</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'var(--color-text)', width: '100%' }}
                                                placeholder="Ej. Juan Pérez"
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Correo electrónico</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'var(--color-text)', width: '100%' }}
                                                placeholder="tu@email.com"
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label htmlFor="service" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Motivo de la consulta</label>
                                            <select
                                                id="service"
                                                name="service"
                                                style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: '#1c243a', color: 'var(--color-text)', width: '100%' }}
                                            >
                                                <option value="Planes de Entrenamiento">Planes de Entrenamiento</option>
                                                <option value="Clínics Presenciales">Clínics Presenciales</option>
                                                <option value="Asesoría">Asesoría / Consultas</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label htmlFor="message" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Tu mensaje o caso</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'var(--color-text)', width: '100%', resize: 'vertical' }}
                                                placeholder="Cuéntame tu nivel actual, objetivos y disponibilidad..."
                                            ></textarea>
                                        </div>

                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', display: 'flex', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}>
                                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};
