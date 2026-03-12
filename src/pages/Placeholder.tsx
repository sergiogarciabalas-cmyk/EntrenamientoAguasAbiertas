import { RevealOnScroll } from '../components/RevealOnScroll';

export const Placeholder = ({ title }: { title: string }) => {
    return (
        <div style={{ paddingTop: '150px', minHeight: '60vh', textAlign: 'center' }}>
            <div className="container">
                <RevealOnScroll>
                    <h1 className="section-title">{title}</h1>
                    <p className="section-subtitle">Esta página está en construcción como parte de la migración del antiguo entorno de WordPress.</p>
                </RevealOnScroll>
            </div>
        </div>
    );
};
