import { useState, useEffect } from 'react';
import { Waves, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
            
            // Calculate scroll progress percentage
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownTimeoutRef = useState<{ timer: any }>({ timer: null })[0];

    const handleMouseEnter = () => {
        if (dropdownTimeoutRef.timer) clearTimeout(dropdownTimeoutRef.timer);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.timer = setTimeout(() => {
            setDropdownOpen(false);
        }, 250);
    };

    useEffect(() => {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`navbar-premium-wrapper ${scrolled ? 'scrolled' : ''}`}>
            {/* Scroll progress bar */}
            <div 
                className="scroll-progress-indicator" 
                style={{ width: `${scrollProgress}%` }}
            ></div>

            <div className="container" style={{ padding: 0 }}>
                <div className="nav-capsule">
                    <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Waves className="text-gradient" size={28} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ lineHeight: '1.2', color: '#ffffff', fontWeight: 800 }}>Sergi Swim <span className="text-gradient">Coach</span></span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--color-text-muted, #888)', letterSpacing: '0.05em', marginTop: '-2px' }}>Entrenamiento Aguas Abiertas</span>
                        </div>
                    </Link>
                    
                    <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} style={mobileMenuOpen ? { display: 'flex', position: 'absolute', top: '100%', left: '1rem', right: '1rem', background: 'rgba(15, 23, 42, 0.98)', padding: '2rem', borderRadius: '20px', flexDirection: 'column', border: '1px solid rgba(255, 255, 255, 0.08)', gap: '1.5rem', boxShadow: '0 20px 45px rgba(0,0,0,0.6)' } : {}}>
                        <Link to="/" className="nav-link" style={{ color: '#ffffff', fontWeight: 600 }}>Inicio</Link>
                        <Link to="/sobre-mi" className="nav-link">Sobre mí</Link>
                        <div 
                            className="dropdown" 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ position: 'relative', display: 'inline-block' }}
                        >
                            <Link 
                                to="/servicios" 
                                className="nav-link" 
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                onClick={() => setDropdownOpen(false)}
                            >
                                Servicios ▾
                            </Link>
                            <div 
                                className="dropdown-content glass" 
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    display: dropdownOpen ? 'block' : 'none',
                                    position: 'absolute',
                                    top: 'calc(100% + 6px)',
                                    left: 0,
                                    minWidth: '240px',
                                    padding: '0.75rem',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                                    zIndex: 1000,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(15, 23, 42, 0.96)',
                                    backdropFilter: 'blur(16px)'
                                }}
                            >
                                <Link to="/servicios/plan-entrenamiento-online-o-mixto" onClick={() => setDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '0.55rem 0.75rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>Plan Entrenamiento Online</Link>
                                <Link to="/servicios/planes-entrenamiento-en-grupo" onClick={() => setDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '0.55rem 0.75rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>Planes en Grupo</Link>
                                <Link to="/servicios/clinics-presenciales" onClick={() => setDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '0.55rem 0.75rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>Clínics Presenciales</Link>
                                <Link to="/servicios/asesoramiento-entrenamiento" onClick={() => setDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '0.55rem 0.75rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>Asesoramiento</Link>
                                <Link to="/servicios/informe-tecnico-y-antropometria" onClick={() => setDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '0.55rem 0.75rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}>Informe Técnico y Antrop.</Link>
                                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '0.4rem 0' }}></div>
                                <a 
                                    href="https://swimtific.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTimeout(() => setDropdownOpen(false), 200);
                                    }}
                                    className="dropdown-item-highlight"
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        padding: '0.55rem 0.75rem', 
                                        color: '#00f2fe', 
                                        fontWeight: 'bold', 
                                        textDecoration: 'none',
                                        background: 'rgba(0, 242, 254, 0.08)',
                                        border: '1px solid rgba(0, 242, 254, 0.2)',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span>App Swimtific</span> <span>🚀</span>
                                </a>
                            </div>
                        </div>
                        <Link to="/blog" className="nav-link">Blog</Link>
                        <Link to="/contacto" className="nav-link">Contacto</Link>
                        <Link to="/area-privada" className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px' }}>
                            Área Privada
                        </Link>
                    </div>

                    <button 
                        className="mobile-menu-btn" 
                        style={{ background: 'none', border: 'none', color: 'white', display: 'none', cursor: 'pointer', zIndex: 101 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú móvil'}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
