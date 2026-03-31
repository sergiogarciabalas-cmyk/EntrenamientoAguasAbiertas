import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import he from 'he';
import { useSEO } from '../hooks/useSEO';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

const ptComponents: any = {
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
        h2: ({ children }: any) => <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>{children}</h2>,
        h3: ({ children }: any) => <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{children}</h3>,
        normal: ({ children }: any) => {
            const decoded = typeof children === 'string' ? he.decode(children) : (Array.isArray(children) ? children.map(c => typeof c === 'string' ? he.decode(c) : c) : children);

            // Revisa si el contenido es "Sergi Garcia" para centrarlo
            let textValue = '';
            if (Array.isArray(decoded)) {
                textValue = decoded.map(c => typeof c === 'string' ? c : (c?.props?.children || '')).join('');
            } else if (typeof decoded === 'string') {
                textValue = decoded;
            }

            const isSergiGarcia = textValue.trim() === 'Sergi Garcia' || textValue.trim() === 'Sergi García';

            return <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', textAlign: isSergiGarcia ? 'center' : 'left' }}>{decoded}</p>;
        },
        blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem', fontStyle: 'italic', margin: '2rem 0', color: 'var(--color-text-muted)' }}>{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>{children}</ul>,
        number: ({ children }: any) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
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

export const Page = ({ fixedSlug }: { fixedSlug?: string }) => {
    // If fixedSlug is passed, use it, otherwise use the slug from the URL
    const { slug: urlSlug } = useParams();
    const slug = fixedSlug || urlSlug;

    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useSEO({
        title: pageData ? `${he.decode(pageData.title || '')} | Sergi García` : 'Cargando...',
        description: 'Página de información sobre servicios de natación y entrenamiento.'
    });

    useEffect(() => {
        client.fetch(`
      *[_type == "page" && slug.current == $slug][0]{
        title,
        content
      }
    `, { slug })
            .then((data) => {
                setPageData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Cargando página...</div>;
    }

    if (!pageData) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Página en construcción</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Pronto añadiremos el contenido desde tu panel de Sanity.</p>
                <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
            <article className="container" style={{ maxWidth: '800px' }}>
                <RevealOnScroll>
                    <h1 className="section-title text-gradient" style={{ textAlign: 'left', marginBottom: '3rem', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                        {he.decode(pageData.title || '')}
                    </h1>
                </RevealOnScroll>

                {pageData.content && (
                    <RevealOnScroll className="delay-1">
                        <div className="portable-text-container" style={{ fontSize: '1.1rem' }}>
                            <PortableText
                                value={pageData.content.filter((block: any) => {
                                    if (block._type !== 'block' || !block.children) return true;
                                    const textContent = block.children.map((c: any) => c.text || '').join('');
                                    if (textContent.match(/Para cualquier consulta ves a la zona de/gi)) return false;
                                    return true;
                                })}
                                components={ptComponents}
                            />
                        </div>
                    </RevealOnScroll>
                )}

                {(slug === 'servicios-sergi-swim-coach' || slug === 'about-us') && (
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
                )}
            </article>
        </div>
    );
};
