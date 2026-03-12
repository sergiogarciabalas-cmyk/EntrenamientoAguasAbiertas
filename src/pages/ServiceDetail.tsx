import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import he from 'he';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ marginBottom: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '1.1rem', fontWeight: '500' }}
            >
                {question}
                {isOpen ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} color="var(--color-primary)" />}
            </button>
            {isOpen && (
                <div style={{ padding: '1.25rem', paddingTop: 0, background: 'rgba(255, 255, 255, 0.02)', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {answer}
                </div>
            )}
        </div>
    );
};

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <img
                    alt={value.alt || ' '}
                    loading="lazy"
                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                    style={{ width: '100%', borderRadius: '1rem', marginTop: '2rem', marginBottom: '2rem' }}
                />
            )
        },
        htmlBlock: ({ value }: any) => {
            if (!value?.html) return null;
            return (
                <div
                    className="wp-raw-html"
                    style={{ margin: '2rem 0', width: '100%', overflowX: 'auto' }}
                    dangerouslySetInnerHTML={{ __html: value.html }}
                />
            );
        }
    },
    block: {
        h1: ({ children }: any) => <h1 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '2rem' }}>{children}</h1>,
        h2: ({ children }: any) => <h2 className="section-title" style={{ marginTop: '2.5rem', marginBottom: '1.5rem', textAlign: 'left', fontSize: '1.5rem' }}>{children}</h2>,
        h3: ({ children }: any) => <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)', fontSize: '1.25rem' }}>{children}</h3>,
        normal: ({ children }: any) => {
            const cleanText = (text: string) => text.replace(/Solicita tu plan de entrenamiento en la zona de contacto\.?/gi, '').trim();
            const decoded = typeof children === 'string'
                ? cleanText(he.decode(children))
                : (Array.isArray(children) ? children.map(c => typeof c === 'string' ? cleanText(he.decode(c)) : c) : children);

            // Evitamos renderizar párrafos vacíos si todo el contenido era la frase eliminada
            if (!decoded || (Array.isArray(decoded) && decoded.every(d => !d))) return null;

            return <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>{decoded}</p>;
        },
        blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem', fontStyle: 'italic', margin: '2rem 0', color: 'var(--color-text-muted)' }}>{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '0', listStyle: 'none' }}>{children}</ul>,
        number: ({ children }: any) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>{children}</span>
            </li>
        ),
    },
    marks: {
        link: ({ children, value }: any) => {
            let href = value.href || '';
            if (href.includes('/contact-us')) {
                href = '/contacto';
            }
            if (href.includes('/about-us')) {
                return <strong style={{ color: 'var(--color-text)' }}>{children}</strong>;
            }

            const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
            const target = !href.startsWith('/') ? '_blank' : undefined;
            return (
                <a href={href} rel={rel} target={target} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                    {children}
                </a>
            );
        },
    },
}

export const ServiceDetail = ({ fixedSlug }: { fixedSlug?: string }) => {
    const { slug: urlSlug } = useParams();
    const slug = fixedSlug || urlSlug;
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.fetch(`
      *[_type in ["service", "page"] && slug.current == $slug][0]
    `, { slug }).then((data) => {
            setService(data);
            setLoading(false);
        }).catch(console.error);
    }, [slug]);

    if (loading) {
        return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Cargando servicio...</div>;
    }

    if (!service) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Servicio no encontrado</h2>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div className={`service-page-wrapper ${slug === 'webinars' ? 'webinars-page' : ''} ${slug === 'clinics-presenciales' ? 'clinics-page' : ''} ${slug === 'asesoramiento-entrenamiento' ? 'asesoramiento-page' : ''}`} style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>

            {/* Service Header */}
            <div style={{ background: 'var(--color-background-elevated)', padding: '4rem 0', marginBottom: '3rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <RevealOnScroll>
                        <Link to="/#servicios" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <ArrowLeft size={16} /> Volver a Servicios
                        </Link>

                        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                            <span className="text-gradient">{he.decode(service.title || '')}</span>
                        </h1>

                        {service.price && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--color-primary)', padding: '0.5rem 1.25rem', borderRadius: '2rem', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <Tag size={20} /> {service.price}
                            </div>
                        )}

                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            {service.description}
                        </p>

                        <Link to="/contacto" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            Contactar Ahora
                        </Link>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Service Content */}
            <article className="container" style={{ maxWidth: '800px' }}>
                {service.features && service.features.length > 0 && (
                    <RevealOnScroll>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                            {service.features.map((feature: string, idx: number) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                    <CheckCircle2 color="var(--color-primary)" size={24} style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                )}

                {service.content ? (
                    <RevealOnScroll className="delay-1">
                        <div className="portable-text-container" style={{ fontSize: '1.15rem' }}>
                            <PortableText
                                value={service.content.filter((block: any) => {
                                    if (block._type !== 'block' || !block.children) return true;
                                    const textContent = block.children.map((c: any) => c.text || '').join('');
                                    if (textContent.match(/Solicita tu plan de entrenamiento en la zona de contacto\.?/gi)) return false;
                                    if (textContent.match(/Solicita tu Clínic presencial en la zona de Contacto\.?/gi)) return false;
                                    if (textContent.match(/Reserva tu asesoramiento en la zona de Contacto\.?/gi)) return false;
                                    return true;
                                })}
                                components={ptComponents}
                            />
                        </div>
                    </RevealOnScroll>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-muted)' }}>
                        <p>El contenido detallado de este servicio se actualizará pronto.</p>
                    </div>
                )}

                {(slug === 'plan-entrenamiento-online-o-mixto' || slug === 'planes-entrenamiento-individualizados') && (
                    <RevealOnScroll>
                        <div style={{ marginTop: '3rem', padding: '2.5rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '1rem', border: '1px solid rgba(14, 165, 233, 0.2)', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.5rem' }}>¿Prefieres rodearte de un equipo?</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>También dispongo de grupos de entrenamiento presenciales o a distancia donde la motivación es el motor principal para tu progreso.</p>
                            <Link to="/servicios/planes-entrenamiento-en-grupo" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                                Ver Planes en Grupo
                            </Link>
                        </div>
                    </RevealOnScroll>
                )}

                {service.faqs && service.faqs.length > 0 && (
                    <RevealOnScroll>
                        <div style={{ marginTop: '4rem' }}>
                            <h2 className="section-title" style={{ marginBottom: '2rem', textAlign: 'left' }}>Preguntas <span className="text-gradient">Frecuentes</span></h2>
                            <div>
                                {service.faqs.map((faq: any, idx: number) => (
                                    <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

                <RevealOnScroll>
                    <div style={{ marginTop: '4rem', padding: '3.5rem 2rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(0, 0, 0, 0))', borderRadius: '1.5rem', textAlign: 'center', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>¿Listo para dar el siguiente paso?</h2>
                        <p style={{ marginBottom: '2.5rem', color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Plantea tu caso sin compromiso y empecemos a trabajar en tus metas hoy mismo.
                        </p>
                        <Link to="/contacto" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Hablemos de tus objetivos
                        </Link>
                    </div>
                </RevealOnScroll>
            </article>
        </div>
    );
};
