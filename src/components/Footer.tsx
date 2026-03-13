import { Waves, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo" style={{ marginBottom: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Waves className="text-gradient" size={24} />
                            <span style={{ fontWeight: 'bold' }}>Sergi Swim <span className="text-gradient">Coach</span></span>
                        </Link>
                        <p>Mejora tu forma física mediante la natación y disfruta de las aguas abiertas a otro nivel.</p>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--color-text-muted)', alignItems: 'center' }}>
                            <a href="https://www.instagram.com/sergiswimcoach" target="_blank" rel="noreferrer" style={{ color: 'inherit' }} className="nav-link">
                                <Instagram style={{ cursor: 'pointer' }} size={20} />
                            </a>
                            <a href="https://www.youtube.com/channel/UC6-Hg55x3IAfAY_NcOkouAg" target="_blank" rel="noreferrer" style={{ color: 'inherit' }} className="nav-link">
                                <Youtube style={{ cursor: 'pointer' }} size={22} />
                            </a>
                            <a href="https://twitter.com/SergiGarcia77" target="_blank" rel="noreferrer" style={{ color: 'inherit' }} className="nav-link">
                                <svg style={{ cursor: 'pointer', fill: 'currentColor' }} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Menú Principal</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/sobre-mi">Sobre mi</Link></li>
                            <li><Link to="/servicios">Servicios</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/area-privada">Área Privada</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link to="/aviso-legal">Aviso Legal</Link></li>
                            <li><Link to="/privacidad">Política de Privacidad</Link></li>
                            <li><Link to="/cookies">Política de Cookies</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © {new Date().getFullYear()} ENTRENAMIENTO AGUAS ABIERTAS. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};
