import { useState, useEffect } from 'react';
import {
    Waves, ArrowRight,
    Users, MapPin, MessageCircle, Youtube, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { useSEO } from '../hooks/useSEO';

const heroImages = [
    '/carrusel-1.jpg',
    '/carrusel-2.jpg',
    '/carrusel-3.jpg',
    '/carrusel-4.jpg',
    '/carrusel-5.jpg'
];

export const Home = () => {
    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "SportsClub",
        "name": "Sergi Swim Coach - Entrenamiento Aguas Abiertas",
        "image": "https://entrenamientoaguasabiertas.com/og-image.jpg",
        "@id": "https://entrenamientoaguasabiertas.com/#sportsclub",
        "url": "https://entrenamientoaguasabiertas.com/",
        "telephone": "+34627767412",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mataró y alrededores",
            "addressLocality": "Mataró",
            "postalCode": "08301",
            "addressRegion": "Barcelona",
            "addressCountry": "ES"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.5381,
            "longitude": 2.4447
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "08:00",
            "closes": "21:00"
        },
        "sameAs": [
            "https://instagram.com/SergiSwimCoach",
            "https://www.youtube.com/channel/UC6-Hg55x3IAfAY_NcOkouAg"
        ],
        "coach": {
            "@type": "Person",
            "name": "Sergi García Balastegui",
            "jobTitle": "Entrenador de Aguas Abiertas y Natación de Alto Rendimiento",
            "url": "https://entrenamientoaguasabiertas.com/sobre-mi"
        }
    };

    useSEO({
        title: 'Entrenador de Aguas Abiertas y Natación | Sergi García',
        description: 'Descubre las aguas abiertas a otro nivel con Sergi García. Mejora tu forma física mediante la natación y prepárate para retos de aguas abiertas.',
        canonical: 'https://entrenamientoaguasabiertas.com/',
        schema: homeSchema
    });

    const [servicesData, setServicesData] = useState([]);
    const [testimonialsData, setTestimonialsData] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // State to track which images failed to load, avoiding unsafe manual DOM mutations
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

    // Carousel interval loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Load real data from Sanity
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

    // Achievements map for testimonials
    const achievementsMap: Record<string, string> = {
        'Pere Dalmau': '🏅 Cruces y Travesías de 30 km',
        'Guillem Pujol': '🏆 Campeón de España (10 km)',
        'César Palomeque': '🏊 Finisher Batalla de Rande (27 km)'
    };

    return (
        <>
            <style>{`
                @keyframes marquee-ltr {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .home-marquee-wrapper {
                    overflow: hidden;
                    width: 100%;
                    background: linear-gradient(90deg, rgba(0, 51, 102, 0.95), rgba(0, 136, 204, 0.95));
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    margin-top: 85px; /* Limpiar el navbar fixed */
                    z-index: 9999;
                    padding: 8px 0;
                    cursor: pointer;
                    display: flex;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .home-marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee-ltr 22s linear infinite;
                }
                .home-marquee-track:hover {
                    animation-play-state: paused;
                }
                .home-marquee-text {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #fff;
                    letter-spacing: 0.05em;
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                    padding-right: 3rem;
                    white-space: nowrap;
                }
            `}</style>
            
            <a 
                href="https://www.swimtific.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="home-marquee-wrapper" 
                title="Visitar Swimtific.com"
                style={{ textDecoration: 'none', display: 'flex' }}
            >
                <div className="home-marquee-track">
                    <div className="home-marquee-text">
                        <span>🚀 ¡LANZAMIENTO OFICIAL DE SWIMTIFIC! La nueva plataforma para nadadores y entrenadores. ¡Date de alta hoy y crea tu plan gratis!</span>
                        <span>🏊‍♂️ Conecta tus dispositivos (Garmin, Whoop, Polar, Oura, Strava) y analiza tu carga al instante.</span>
                        <span>⚡ Registra tu cuenta en menos de 1 minuto y empieza tu prueba gratuita de 14 días.</span>
                    </div>
                    <div className="home-marquee-text">
                        <span>🚀 ¡LANZAMIENTO OFICIAL DE SWIMTIFIC! La nueva plataforma para nadadores y entrenadores. ¡Date de alta hoy y crea tu plan gratis!</span>
                        <span>🏊‍♂️ Conecta tus dispositivos (Garmin, Whoop, Polar, Oura, Strava) y analiza tu carga al instante.</span>
                        <span>⚡ Registra tu cuenta en menos de 1 minuto y empieza tu prueba gratuita de 14 días.</span>
                    </div>
                </div>
            </a>

            {/* HERO SECTION */}
            <section className="hero" id="inicio" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden', padding: 0, display: 'flex', alignItems: 'center' }}>
                {heroImages.map((src, index) => (
                    <div
                        key={src}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url("${src}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: currentImageIndex === index ? 1 : 0,
                            transition: 'opacity 1.8s ease-in-out, transform 9s ease-out',
                            transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1.01)',
                            zIndex: 0
                        }}
                    ></div>
                ))}

                {/* Integration overlay gradient */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                            radial-gradient(ellipse at 50% 40%, rgba(15, 23, 42, 0.1) 0%, rgba(2, 6, 23, 0.5) 60%, rgba(2, 6, 23, 0.95) 100%),
                            linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.5) 50%, rgba(2, 6, 23, 0.95) 100%)
                        `,
                        zIndex: 1
                    }}
                ></div>
                
                <div className="container hero-grid" style={{ zIndex: 2, position: 'relative', gridTemplateColumns: '1fr', textAlign: 'center', margin: '0 auto', maxWidth: '800px', padding: '6rem 2rem 2rem' }}>
                    <div className="hero-content">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.25)', color: '#00f2fe', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2rem' }} className="fade-in-up">
                            <Star size={12} fill="#00f2fe" /> Alto Rendimiento
                        </div>

                        <h1 className="fade-in-up delay-1" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', lineHeight: '1.15', marginBottom: '1.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
                            Entrenamiento de Aguas Abiertas <br/><span className="text-gradient">y Natación</span>
                        </h1>
                        <p className="fade-in-up delay-2" style={{ fontSize: '1.2rem', color: '#cbd5e1', margin: '0 auto 3rem', lineHeight: '1.6', maxWidth: '650px', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                            Lleva tu natación en el mar a un nivel superior guiado por Sergi García. Planes personalizados, clínicas de tecnificación presenciales y táctica competitiva.
                        </p>

                        <div className="hero-actions fade-in-up delay-3" style={{ justifyContent: 'center' }}>
                            <Link to="/contacto" className="btn btn-primary" style={{ padding: '1rem 2.2rem', fontSize: '1.05rem', textDecoration: 'none' }}>
                                Empieza hoy <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="indicator-container">
                    {heroImages.map((_, index) => (
                        <div 
                            key={index} 
                            className={`indicator-bar ${currentImageIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                        >
                            <div className="indicator-progress"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="section" id="servicios">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="section-title">Servicios de <span className="text-gradient">Tecnificación y Alto Rendimiento</span></h2>
                            <p className="section-subtitle">Programas científicos adaptados a tus objetivos reales.</p>
                        </div>
                    </RevealOnScroll>

                    <div className="services-grid">
                        {servicesData.length > 0 ? (
                            servicesData.map((service: any, index: number) => {
                                const renderIcon = () => {
                                    if (service.icon === 'Users') return <Users size={28} />;
                                    if (service.icon === 'MapPin') return <MapPin size={28} />;
                                    return <MessageCircle size={28} />;
                                };
                                const getBadge = (title: string) => {
                                    if (title.toLowerCase().includes('plan')) return 'ONLINE';
                                    if (title.toLowerCase().includes('clínic')) return 'PRESENCIAL';
                                    return 'INDIVIDUAL';
                                };

                                return (
                                    <RevealOnScroll key={service._id || index} className={`delay-${(index % 3) + 1}`}>
                                        <Link to={`/servicios/${service.slug?.current || service.slug || ''}`} className="service-card glass" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div className="service-icon">{renderIcon()}</div>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#94a3b8', letterSpacing: '0.05em' }}>
                                                    {getBadge(service.title)}
                                                </span>
                                            </div>
                                            <h3>{service.title}</h3>
                                            <p>{service.description}</p>
                                            <span className="text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                                {service.linkText || 'Saber más'} <ArrowRight size={16} />
                                            </span>
                                        </Link>
                                    </RevealOnScroll>
                                );
                            })
                        ) : (
                            <>
                                <RevealOnScroll className="delay-1">
                                    <Link to="/servicios/plan-entrenamiento-online-o-mixto" className="service-card glass" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div className="service-icon"><Users size={28} /></div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#94a3b8', letterSpacing: '0.05em' }}>
                                                ONLINE
                                            </span>
                                        </div>
                                        <h3>Planes de entrenamiento</h3>
                                        <p>Preparación individualizada o en grupo. Diseñados científicamente adaptándose a tus horarios, objetivos de mar y ritmo.</p>
                                        <span className="text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                            Ver planes <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-2">
                                    <Link to="/servicios/clinics-presenciales" className="service-card glass" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div className="service-icon"><MapPin size={28} /></div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#94a3b8', letterSpacing: '0.05em' }}>
                                                PRESENCIAL
                                            </span>
                                        </div>
                                        <h3>Clínics presenciales</h3>
                                        <p>Sesiones técnicas intensivas en el mar. Grabación subacuática HD, análisis de brazada, corrección en directo y seguridad.</p>
                                        <span className="text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                            Reservar clínic <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-3">
                                    <Link to="/servicios/asesoramiento-entrenamiento" className="service-card glass" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div className="service-icon"><MessageCircle size={28} /></div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#94a3b8', letterSpacing: '0.05em' }}>
                                                CONSULTA
                                            </span>
                                        </div>
                                        <h3>Asesoría de entrenamiento</h3>
                                        <p>Sesión individual para resolver tus dudas sobre material técnico, alimentación, ritmo cardíaco y estrategia de travesías.</p>
                                        <span className="text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                            Consultar dudas <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </RevealOnScroll>
                            </>
                        )}
                    </div>

                    {/* YOUTUBE BLOCK */}
                    <RevealOnScroll className="delay-2">
                        <div className="youtube-cinema-card">
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifySelf: 'center', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', gap: '0.4rem' }}>
                                <Youtube size={14} fill="#ef4444" /> Canal de YouTube
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '2rem', color: 'white' }}>Formación y técnica gratuita en vídeo</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Descubre tutoriales, análisis de brazadas de élite y consejos de seguridad para dominar la natación en mar abierto.</p>
                            <a href="https://www.youtube.com/channel/UC6-Hg55x3IAfAY_NcOkouAg" target="_blank" rel="noreferrer" className="btn youtube-btn-neon">
                                <Youtube size={20} /> Ver clases en YouTube
                            </a>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="section testimonials" id="testimonios" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0, 242, 254, 0.02) 50%, transparent 100%)' }}>
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="section-title"><span className="text-gradient">Sergi García:</span> Tu Coach de Aguas Abiertas</h2>
                            <p className="section-subtitle">Conoce el impacto real y las travesías completadas por nuestros deportistas.</p>
                        </div>
                    </RevealOnScroll>

                    <div className="testimonial-grid">
                        {testimonialsData.length > 0 ? (
                            testimonialsData.map((testim: any, index: number) => {
                                const hasFailed = failedImages[testim._id];
                                return (
                                    <RevealOnScroll key={testim._id || index} className={`delay-${(index % 3) + 1}`}>
                                        <div className="testimonial-card glass">
                                            <Waves className="quote-icon" size={50} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'rgba(0, 242, 254, 0.05)' }} />
                                            <p className="testimonial-text" style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem', color: '#e2e8f0', position: 'relative' }}>
                                                "{testim.quote}"
                                            </p>
                                            <div className="testimonial-author">
                                                <div className="testimonial-avatar-wrapper">
                                                    {testim.imageUrl && !hasFailed ? (
                                                        <img 
                                                            src={testim.imageUrl} 
                                                            alt={testim.authorName} 
                                                            onError={() => setFailedImages(prev => ({ ...prev, [testim._id]: true }))}
                                                        />
                                                    ) : (
                                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: '#020617', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                            {testim.authorInitials || 'AN'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="author-info" style={{ marginLeft: '1rem' }}>
                                                    <h4 style={{ color: 'white', margin: 0 }}>{testim.authorName}</h4>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{testim.authorDetails}</span>
                                                    <br />
                                                    {achievementsMap[testim.authorName] && (
                                                        <span className="achievement-tag">
                                                            {achievementsMap[testim.authorName]}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                );
                            })
                        ) : (
                            <>
                                <RevealOnScroll className="delay-1">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={50} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'rgba(0, 242, 254, 0.05)' }} />
                                        <p className="testimonial-text" style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem', color: '#e2e8f0', position: 'relative' }}>
                                            "Sergi introdujo unas pautas de entrenamiento distintas y desconocidas para mí. Me inculcó una motivación extra que hizo mejorar mi rendimiento en piscina y en el mar. He logrado travesías de hasta 30Km."
                                        </p>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar-wrapper">
                                                {!failedImages['dalmau'] ? (
                                                    <img 
                                                        src="/dalmau.jpg" 
                                                        alt="Pere Dalmau" 
                                                        onError={() => setFailedImages(prev => ({ ...prev, dalmau: true }))}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: '#020617', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                        PD
                                                    </div>
                                                )}
                                            </div>
                                            <div className="author-info" style={{ marginLeft: '1rem' }}>
                                                <h4 style={{ color: 'white', margin: 0 }}>Pere Dalmau, 58</h4>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Ingeniero Industrial, Mataró</span>
                                                <br />
                                                <span className="achievement-tag">
                                                    🏅 Cruces y Travesías de 30 km
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-2">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={50} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'rgba(0, 242, 254, 0.05)' }} />
                                        <p className="testimonial-text" style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem', color: '#e2e8f0', position: 'relative' }}>
                                            "Sergi fue el entrenador en el que confié para mi preparación en el ciclo olímpico de 2016 a 2020. Mejoré todas mis marcas y me proclamé Campeón de España en 10Km. Sin él no lo hubiera conseguido."
                                        </p>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar-wrapper">
                                                {!failedImages['guillem'] ? (
                                                    <img 
                                                        src="/guillem.jpg" 
                                                        alt="Guillem Pujol" 
                                                        onError={() => setFailedImages(prev => ({ ...prev, guillem: true }))}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: '#020617', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                        GP
                                                    </div>
                                                )}
                                            </div>
                                            <div className="author-info" style={{ marginLeft: '1rem' }}>
                                                <h4 style={{ color: 'white', margin: 0 }}>Guillem Pujol, 25</h4>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Estudiante CAFE, Blanes</span>
                                                <br />
                                                <span className="achievement-tag">
                                                    🏆 Campeón de España (10 km)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll className="delay-3">
                                    <div className="testimonial-card glass">
                                        <Waves className="quote-icon" size={50} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'rgba(0, 242, 254, 0.05)' }} />
                                        <p className="testimonial-text" style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem', color: '#e2e8f0', position: 'relative' }}>
                                            "Quería nadar la Batalla de Rande (27Km) y encontré a Sergi. Planificó mi día a día con adaptación a mi disponibilidad y feedback diario. Completé el reto y además disfruté muchísimo de la prueba."
                                        </p>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar-wrapper">
                                                {!failedImages['cesar'] ? (
                                                    <img 
                                                        src="/cesar.jpg" 
                                                        alt="César Palomeque" 
                                                        onError={() => setFailedImages(prev => ({ ...prev, cesar: true }))}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: '#020617', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                        CP
                                                    </div>
                                                )}
                                            </div>
                                            <div className="author-info" style={{ marginLeft: '1rem' }}>
                                                <h4 style={{ color: 'white', margin: 0 }}>César Palomeque, 45</h4>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Policia Local, Ávila</span>
                                                <br />
                                                <span className="achievement-tag">
                                                    🏊 Finisher Batalla de Rande (27 km)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="section">
                <div className="container">
                    <RevealOnScroll>
                        <div className="cta-box text-center" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', marginBottom: '1.5rem' }}>Empieza a entrenar <span className="text-gradient">hoy conmigo</span></h2>
                            <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Hablemos de tus metas en el agua, evalúemos tu técnica y tracemos un plan científico a tu medida.</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/contacto" className="btn btn-primary" style={{ padding: '1rem 2.2rem', textDecoration: 'none' }}>
                                    Enviar Mensaje <MessageCircle size={18} />
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
};
