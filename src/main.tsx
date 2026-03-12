import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StudioPage from './Studio.tsx'
import { Home } from './pages/Home.tsx'
import { PrivateArea } from './pages/PrivateArea.tsx'
import { Blog } from './pages/Blog.tsx'
import { Post } from './pages/Post.tsx'
import { Page } from './pages/Page.tsx'
import { Contact } from './pages/Contact.tsx'
import { ServiceDetail } from './pages/ServiceDetail.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
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
        </Route>
        <Route path="/studio/*" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
