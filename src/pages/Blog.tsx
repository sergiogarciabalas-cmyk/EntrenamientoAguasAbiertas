import { useState, useEffect } from 'react';
import { client } from '../sanity';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import he from 'he';
import { useSEO } from '../hooks/useSEO';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

export const Blog = () => {
    useSEO({
        title: 'Blog de Natación y Aguas Abiertas | Sergi García',
        description: 'Consejos, noticias, artículos de técnica y rutinas sobre entrenamiento en aguas abiertas y natación.'
    });

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        "authorName": author->name,
        mainImage,
        publishedAt,
        excerpt
      }
    `).then(setPosts).catch(console.error);
    }, []);

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className="container">
                <RevealOnScroll>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 className="section-title">Blog de <span className="text-gradient">Natación y Aguas Abiertas</span></h1>
                        <p className="section-subtitle">Consejos, noticias y artículos sobre entrenamiento en aguas abiertas.</p>
                    </div>
                </RevealOnScroll>

                <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {posts.length > 0 ? (
                        posts.map((post: any, index: number) => (
                            <RevealOnScroll key={post._id} className={`delay-${(index % 3) + 1}`}>
                                <Link to={`/blog/${post.slug?.current || post.slug || ''}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                    <div className="service-card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        {post.mainImage && (
                                            <img
                                                src={urlFor(post.mainImage).width(500).height(300).url()}
                                                alt={post.title}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            {post.publishedAt && (
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                                    {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                                                </p>
                                            )}
                                            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>{he.decode(post.title || '')}</h3>
                                            <p style={{ marginBottom: '1.5rem', flexGrow: 1, color: 'var(--color-text-muted)' }}>
                                                {post.excerpt ? he.decode(post.excerpt).substring(0, 120) + '...' : 'Haz clic para leer el artículo completo...'}
                                            </p>
                                            <div className="btn btn-primary" style={{ textAlign: 'center', width: '100%' }}>
                                                Leer Artículo
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--color-text-muted)' }}>
                            Aún no hay artículos publicados. ¡Vuelve pronto!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
