import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import { Analytics } from '@vercel/analytics/react'
const PrivateArea = lazy(() => import('./pages/PrivateArea.tsx').then(m => ({ default: m.PrivateArea })))
const Blog = lazy(() => import('./pages/Blog.tsx').then(m => ({ default: m.Blog })))
const Post = lazy(() => import('./pages/Post.tsx').then(m => ({ default: m.Post })))
const Page = lazy(() => import('./pages/Page.tsx').then(m => ({ default: m.Page })))
const Contact = lazy(() => import('./pages/Contact.tsx').then(m => ({ default: m.Contact })))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.tsx').then(m => ({ default: m.ServiceDetail })))
const NotFound = lazy(() => import('./pages/NotFound.tsx').then(m => ({ default: m.NotFound })))
const StudioPage = lazy(() => import('./Studio.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}><div className="loading-spinner"></div></div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="area-privada" element={<PrivateArea />} />
            <Route path="sobre-mi" element={<Page fixedSlug="about-us" />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<Post />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="aviso-legal" element={<Page fixedSlug="aviso-legal" />} />
            <Route path="privacidad" element={<Page fixedSlug="politica-de-privacidad" />} />
            <Route path="cookies" element={<Page fixedSlug="politica-de-cookies" />} />
            <Route path="webinars" element={<Page fixedSlug="webinars" />} />
            <Route path="clases-presenciales" element={<Page fixedSlug="clases-presenciales" />} />

            {/* Old WordPress root-level service routes for SEO / Backward compatibility */}
            <Route path="clinics-presenciales" element={<ServiceDetail fixedSlug="clinics-presenciales" />} />
            <Route path="plan-entrenamiento-online-o-mixto" element={<ServiceDetail fixedSlug="plan-entrenamiento-online-o-mixto" />} />
            <Route path="planes-entrenamiento-en-grupo" element={<ServiceDetail fixedSlug="planes-entrenamiento-en-grupo" />} />
            <Route path="informe-tecnico-y-antropometria" element={<ServiceDetail fixedSlug="informe-tecnico-y-antropometria" />} />
            <Route path="asesoramiento-entrenamiento" element={<ServiceDetail fixedSlug="asesoramiento-entrenamiento" />} />
            <Route path="servicios">
              <Route index element={<Page fixedSlug="servicios-sergi-swim-coach" />} />
              <Route path=":slug" element={<ServiceDetail />} />
            </Route>
            
            {/* Catch-all route for missing pages */}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
