import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { ArrowLeft } from 'lucide-react';
import he from 'he';
import { useSEO } from '../hooks/useSEO';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

// Custom components to style the rich text correctly
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
            return <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>{decoded}</p>;
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

export const Post = () => {
    const { slug } = useParams();
    const [postData, setPostData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useSEO({
        title: postData ? `${he.decode(postData.title || '')} | Sergi García Blog` : 'Cargando artículo...',
        description: postData?.excerpt || 'Artículo del blog sobre natación y entrenamiento en aguas abiertas.'
    });

    useEffect(() => {
        client.fetch(`
      *[_type == "post" && slug.current == $slug][0]{
        title,
        "authorName": author->name,
        "authorImage": author->image,
        mainImage,
        publishedAt,
        body
      }
    `, { slug })
            .then((data) => {
                setPostData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Cargando artículo...</div>;
    }

    if (!postData) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Artículo no encontrado</h2>
                <Link to="/blog" className="btn btn-outline" style={{ marginTop: '1rem' }}>Volver al Blog</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
            <article className="container" style={{ maxWidth: '800px' }}>
                <RevealOnScroll>
                    <Link to="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                        <ArrowLeft size={16} /> Volver al Blog
                    </Link>

                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                        {he.decode(postData.title || '')}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        {postData.authorImage && (
                            <img
                                src={urlFor(postData.authorImage).width(50).height(50).url()}
                                alt={postData.authorName}
                                style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                        )}
                        <div>
                            <p style={{ fontWeight: 'bold', margin: 0 }}>{postData.authorName}</p>
                            {postData.publishedAt && (
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                    {new Date(postData.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    </div>
                </RevealOnScroll>

                {postData.mainImage && (
                    <RevealOnScroll className="delay-1">
                        <img
                            src={urlFor(postData.mainImage).width(1200).height(600).url()}
                            alt={postData.title}
                            style={{ width: '100%', borderRadius: '1rem', marginBottom: '3rem', objectFit: 'cover', maxHeight: '500px' }}
                        />
                    </RevealOnScroll>
                )}

                <RevealOnScroll className="delay-2">
                    <div className="portable-text-container" style={{ fontSize: '1.1rem' }}>
                        <PortableText value={postData.body} components={ptComponents} />
                    </div>
                </RevealOnScroll>
            </article>
        </div>
    );
};
