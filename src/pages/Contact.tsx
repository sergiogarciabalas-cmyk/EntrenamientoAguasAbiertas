import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

export const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const FORMSPREE_URL = "https://formspree.io/f/xvzwrzeb";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

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

            const json = await response.json().catch(() => null);
            console.log("Formspree response:", response.status, json);

            if (response.ok && (!json || json.ok)) {
                setIsSuccess(true);
                form.reset();
            } else {
                const message =
                    (json && (json.error || (Array.isArray(json.errors) && json.errors[0]?.message))) ||
                    "No se ha podido enviar el mensaje. Inténtalo de nuevo en unos minutos.";
                console.error("Formspree error:", response.status, json);
                setErrorMessage(message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Ha ocurrido un error al enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.");
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Teléfono / WhatsApp</p>
                                    <a href="https://wa.me/34627767412" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        +34 627 767 412
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Redes Sociales</p>
                                    <a href="https://instagram.com/SergiSwimCoach" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        @SergiSwimCoach
                                    </a>
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

                                    {errorMessage && (
                                        <p style={{ color: '#f97373', fontSize: '0.9rem', margin: 0 }}>
                                            {errorMessage}
                                        </p>
                                    )}

                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', display: 'flex', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, marginTop: '0.5rem' }}>
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
