import { useState, useEffect } from 'react';
import { Waves, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Waves className="text-gradient" size={28} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ lineHeight: '1.2' }}>Sergi Swim <span className="text-gradient">Coach</span></span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--color-text-muted, #888)', letterSpacing: '0.05em', marginTop: '-2px' }}>Entrenamiento Aguas Abiertas</span>
                    </div>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/sobre-mi" className="nav-link">Sobre mi</Link>
                    <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                        <Link to="/servicios" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center' }}>
                            Servicios ▾
                        </Link>
                        <div className="dropdown-content glass" style={{
                            display: 'none', position: 'absolute', top: '100%', left: 0,
                            minWidth: '220px', padding: '1rem', borderRadius: '0.5rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 100
                        }}>
                            <Link to="/plan-entrenamiento-online-o-mixto" style={{ display: 'block', padding: '0.5rem 0', color: 'var(--color-text)', textDecoration: 'none' }}>Plan Entrenamiento Online</Link>
                            <Link to="/planes-entrenamiento-en-grupo" style={{ display: 'block', padding: '0.5rem 0', color: 'var(--color-text)', textDecoration: 'none' }}>Planes en Grupo</Link>
                            <Link to="/clinics-presenciales" style={{ display: 'block', padding: '0.5rem 0', color: 'var(--color-text)', textDecoration: 'none' }}>Clínics Presenciales</Link>
                            <Link to="/asesoramiento-entrenamiento" style={{ display: 'block', padding: '0.5rem 0', color: 'var(--color-text)', textDecoration: 'none' }}>Asesoramiento</Link>
                            <Link to="/informe-tecnico-y-antropometria" style={{ display: 'block', padding: '0.5rem 0', color: 'var(--color-text)', textDecoration: 'none' }}>Informe Técnico y Antrop.</Link>
                        </div>
                    </div>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/contacto" className="nav-link">Contacto</Link>
                    <Link to="/area-privada" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Área Privada
                    </Link>
                </div>
                <Menu className="mobile-menu-icon" style={{ display: 'none' }} />
            </div>
        </nav>
    );
    // restore
};
