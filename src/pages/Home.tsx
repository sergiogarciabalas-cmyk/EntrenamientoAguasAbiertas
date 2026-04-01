import { useState, useEffect } from 'react';
import {
    Waves, ArrowRight,
    Users, MapPin, MessageCircle, Youtube
} from 'lucide-react';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const Home = () => {
    useSEO({
        title: 'Entrenador de Aguas Abiertas y Natación | Sergi García',
        description: 'Descubre las aguas abiertas a otro nivel con Sergi García. Mejora tu forma física mediante la natación y prepárate para retos de aguas abiertas.'
    });

    const [servicesData, setServicesData] = useState([]);
    const [testimonialsData, setTestimonialsData] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "service"]`).then(setServicesData).catch(console.error);
        client.fetch(`*[_type == "testimonial"]{
            _id,
            quote,
            authorName,
            authorInitials,
            authorDetails,
            "imageUrl": image.asset->url
        }`).then(setTestimonialsData).catch(console.error);
    }, []);

    return (
        <>
            <section className="hero" id="inicio" style={{
                backgroundImage: 'url("/hero-bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'local'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,9,20,0.95) 0%, rgba(4,9,20,0.4) 60%, rgba(4,9,20,0.1) 100%)' }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,9,20,1) 0%, rgba(4,9,20,0) 15%)' }}></div>
                
                <div className="container" style={{ zIndex: 1, position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div className="hero-content" style={{ textAlign: 'left', maxWidth: '700px', marginLeft: '0', paddingRight: '2rem' }}>
                        <h1 className="fade-in-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.15', marginBottom: '1.5rem' }}>
                            Entrenamiento de Aguas Abiertas <br/>y Natación con <span className="text-gradient">Sergi García</span>
                        </h1>
                        <p className="fade-in-up delay-1" style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            Descubre las aguas abiertas a otro nivel. Mejora tu forma física mediante la natación, prepárate para retos de aguas abiertas y aprende a entrenar dentro y fuera del agua.
                        </p>

                        <div className="hero-actions fade-in-up delay-3" style={{ justifyContent: 'flex-start' }}>
                            <Link to="/servicios" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                Empieza hoy <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="servicios">
                <div className="container">
                    <RevealOnScroll>
                        <h2 className="section-title">Servicios de <span className="text-gradient">Tecnificación y Alto Rendimiento</span></h2>
                        <p className="section-subtitle">Programas diseñados para adaptarse a tus objetivos, ya sea mejorar tu técnica, preparar una travesía o competir a alto nivel.</p>
                    </RevealOnScroll>

                    <div className="services-grid">
                        {servicesData.length > 0 ? (
                            servicesData.map((service: any, index: number) => {
                                const renderIcon = () => {
                                    if (service.icon === 'Users') return <Users size={32} />;
                                    if (service.icon === 'MapPin') return <MapPin size={32} />;
                                    return <MessageCircle size={32} />;
                                };
                                return (
                                    <RevealOnScroll key={service._id || index} className={`delay-${(index % 3) + 1}`}>
                                        <div className="service-card glass">
                                            <div className="service-icon">{renderIcon()}</div>
                                            <h3>{service.title}</h3>
                                            <p>{service.description}</p>
                                            <Link to={`/servicios/${service.slug?.current || ''}`} className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                                {service.linkText || 'Saber más'} <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </RevealOnScroll>
                                );
                            })
                        ) : (
                            <>
                                <RevealOnScroll className="delay-1">
                                    <div className="service-card glass">
                                        <div className="service-icon">
                                            <Users size={32} />
                                        </div>
                                        <h3>Planes de entrenamiento</h3>
                                        <p>Individual o en grupo. Configúralo como quieras según tus horarios, objetivos y nivel actual de natación.</p>
                                        <Link to="/servicios/plan-entrenamiento-online-o-mixto" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            Ver planes <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-2">
                                    <div className="service-card glass">
                                        <div className="service-icon">
                                            <MapPin size={32} />
                                        </div>
                                        <h3>Clínics presenciales</h3>
                                        <p>Sesiones inmersivas de un día entero o medio día. Trabajo técnico, grabación subacuática y tácticas de mar. A consultar, me adapto a tu necesidad.</p>
                                        <Link to="/servicios/clinics-presenciales" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            Reservar clínic o informe <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-3">
                                    <div className="service-card glass">
                                        <div className="service-icon">
                                            <MessageCircle size={32} />
                                        </div>
                                        <h3>Asesoría de entrenamiento</h3>
                                        <p>Resolveré todas tus dudas relacionadas con el entrenamiento, material, táctica de competición y seguridad en las aguas abiertas.</p>
                                        <Link to="/servicios/asesoramiento-entrenamiento" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            Consultar dudas <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </RevealOnScroll>
                            </>
                        )}
                    </div>

                    <RevealOnScroll className="delay-2">
                        <div style={{ marginTop: '4rem', textAlign: 'center', background: 'rgba(255, 0, 0, 0.05)', padding: '3rem 2rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 0, 0, 0.1)', maxWidth: '800px', margin: '4rem auto 0' }}>
                            <Youtube size={56} color="#ff0000" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.75rem', color: 'white' }}>Aprende gratis en mi canal de YouTube</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>Descubre decenas de vídeos con técnica, consejos y rutinas para mejorar tu eficiencia al nadar al estilo libre en aguas abiertas.</p>
                            <a href="https://www.youtube.com/channel/UC6-Hg55x3IAfAY_NcOkouAg" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255, 0, 0, 0.3)', color: '#ff0000', padding: '0.8rem 2rem', display: 'inline-flex', alignItems: 'center' }}>
                                <Youtube size={20} style={{ marginRight: '0.5rem' }} /> Ir al Canal de YouTube
                            </a>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            <section className="section testimonials" id="testimonios">
                <div className="container">
                    <RevealOnScroll>
                        <h2 className="section-title"><span className="text-gradient">Sergi García:</span> Tu Coach de Aguas Abiertas</h2>
                        <p className="section-subtitle">Conoce la experiencia de nadadores que han llevado su rendimiento al siguiente nivel.</p>
                    </RevealOnScroll>

                    <div className="testimonial-grid">
                        {testimonialsData.length > 0 ? (
                            testimonialsData.map((testim: any, index: number) => (
                                <RevealOnScroll key={testim._id || index} className={`delay-${(index % 3) + 1}`}>
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={60} />
                                        <p className="testimonial-text">"{testim.quote}"</p>
                                        <div className="testimonial-author">
                                            <div className="author-avatar" style={testim.imageUrl ? { background: 'transparent', width: '100px', height: '100px', padding: 0, overflow: 'hidden', flexShrink: 0 } : {}}>
                                                {testim.imageUrl ? (
                                                    <img src={testim.imageUrl} alt={testim.authorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).parentElement.style.background = 'var(--color-primary)'; (e.target as any).parentElement.innerText = testim.authorInitials || 'AN'; }} />
                                                ) : (
                                                    testim.authorInitials || 'AN'
                                                )}
                                            </div>
                                            <div className="author-info">
                                                <h4 style={{ color: 'white' }}>{testim.authorName}</h4>
                                                <span>{testim.authorDetails}</span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))
                        ) : (
                            <>
                                <RevealOnScroll className="delay-1">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={60} />
                                        <p className="testimonial-text">"Sergi introdujo unas pautas de entrenamiento distintas y desconocidas para mi. Me inculcó una motivación extra que hizo mejorar mi rendimiento en piscina y en el mar. He logrado travesías de hasta 30Km."</p>
                                        <div className="testimonial-author">
                                            <div className="author-avatar" style={{ background: 'transparent', width: '60px', height: '60px', padding: 0, overflow: 'hidden' }}>
                                                <img src="/dalmau.jpg" alt="Pere Dalmau" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).parentElement.style.background = 'var(--color-primary)'; (e.target as any).parentElement.innerText = 'PD'; }} />
                                            </div>
                                            <div className="author-info">
                                                <h4 style={{ color: 'white' }}>Pere Dalmau, 58</h4>
                                                <span>Ingeniero Industrial, Mataró</span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-2">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={60} />
                                        <p className="testimonial-text">"Sergi fue el entrenador en el que confié para mi preparación en el ciclo olímpico de 2016 a 2020. Mejoré todas mis marcas y me proclamé Campeón de España en 10Km. Sin él no lo hubiera conseguido."</p>
                                        <div className="testimonial-author">
                                            <div className="author-avatar" style={{ background: 'transparent', width: '60px', height: '60px', padding: 0, overflow: 'hidden' }}>
                                                <img src="/guillem.jpg" alt="Guillem Pujol" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).parentElement.style.background = 'var(--color-primary)'; (e.target as any).parentElement.innerText = 'GP'; }} />
                                            </div>
                                            <div className="author-info">
                                                <h4 style={{ color: 'white' }}>Guillem Pujol, 25</h4>
                                                <span>Estudiante CAFE, Blanes</span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-3">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={60} />
                                        <p className="testimonial-text">"Quería nadar la Batalla de Rande (27Km) y encontré a Sergi. Planificó mi día a día con adaptación a mi disponibilidad y feedback diario. Completé el reto y además disfruté muchísimo de la prueba."</p>
                                        <div className="testimonial-author">
                                            <div className="author-avatar" style={{ background: 'transparent', width: '60px', height: '60px', padding: 0, overflow: 'hidden' }}>
                                                <img src="/cesar.jpg" alt="César Palomeque" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).parentElement.style.background = 'var(--color-primary)'; (e.target as any).parentElement.innerText = 'CP'; }} />
                                            </div>
                                            <div className="author-info">
                                                <h4 style={{ color: 'white' }}>César Palomeque, 45</h4>
                                                <span>Policia Local, Ávila</span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <RevealOnScroll>
                        <div className="cta-box">
                            <h2>Empieza a entrenar <span className="text-gradient">hoy conmigo</span></h2>
                            <p>Plantéame tu caso sin compromiso. Evaluaremos tu situación actual y trazaremos el mejor camino hacia tus objetivos.</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/contacto" className="btn btn-primary">
                                    Contactar Ahora <MessageCircle size={18} style={{ marginLeft: '0.5rem' }} />
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
};
