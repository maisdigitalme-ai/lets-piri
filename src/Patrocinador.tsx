import { useEffect, useRef, useState, useCallback } from 'react'

const AMBER = '#f0c96a'
const WHITE = '#f5f0e8'
const CARD_BG = 'rgba(255,255,255,0.06)'
const CARD_BORDER = 'rgba(240,201,106,0.18)'

export default function Patrocinador() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [contactForm, setContactForm] = useState({ nome: '', empresa: '', email: '', mensagem: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const carouselPhotos = [
    '/carousel/foto3.jpg',
    '/carousel/foto10.jpg',
    '/carousel/foto7.jpg',
    '/carousel/foto1.jpg',
    '/carousel/foto5.jpg',
    '/carousel/foto11.jpg',
    '/carousel/foto9.jpg',
    '/carousel/foto2.jpg',
    '/carousel/foto6.jpg',
    '/carousel/foto4.jpg',
    '/carousel/foto8.jpg',
  ]

  const nextSlide = useCallback(() => {
    setCarouselIndex(i => (i + 1) % carouselPhotos.length)
  }, [carouselPhotos.length])

  const prevSlide = useCallback(() => {
    setCarouselIndex(i => (i - 1 + carouselPhotos.length) % carouselPhotos.length)
  }, [carouselPhotos.length])

  useEffect(() => {
    carouselTimer.current = setInterval(nextSlide, 3500)
    return () => { if (carouselTimer.current) clearInterval(carouselTimer.current) }
  }, [nextSlide])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.12 }
    )
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((s) => observerRef.current?.observe(s))
    return () => observerRef.current?.disconnect()
  }, [])

  const visible = (id: string) => visibleSections.has(id)

  const animStyle = (id: string, delay = 0): React.CSSProperties => ({
    opacity: visible(id) ? 1 : 0,
    transform: visible(id) ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.email || !contactForm.nome) return
    setFormStatus('loading')
    try {
      await new Promise(r => setTimeout(r, 1200))
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important; padding: 0 !important;
          width: 100% !important; height: auto !important;
          min-height: 100vh !important;
          overflow-x: hidden !important; overflow-y: visible !important;
        }
        * { box-sizing: border-box; }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .sp-wrap {
          font-family: 'Poppins', sans-serif;
          background: #071e22;
          color: ${WHITE};
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .sp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding: 40px 24px;
        }
        .sp-hero-bg {
          position: absolute; inset: 0;
          background: url('/piri-bg-igreja.jpg') center center / cover no-repeat;
          z-index: 0;
        }
        .sp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(5,30,36,0.88) 0%, rgba(14,123,140,0.72) 50%, rgba(5,30,36,0.92) 100%);
          z-index: 1;
        }
        .sp-hero-content { position: relative; z-index: 2; max-width: 800px; }

        .sp-hero-tag {
          display: inline-block;
          border: 1px solid ${AMBER};
          color: ${AMBER};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 20px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .sp-hero-title {
          font-size: clamp(52px, 10vw, 100px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          color: ${WHITE};
          margin: 0 0 8px;
        }
        .sp-hero-title span { color: ${AMBER}; }
        .sp-hero-sub {
          font-size: clamp(14px, 2.5vw, 20px);
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(245,240,232,0.7);
          margin: 0 0 32px;
        }
        .sp-hero-divider {
          width: 60px; height: 2px;
          background: ${AMBER};
          margin: 0 auto 32px;
        }
        .sp-hero-info {
          display: flex; flex-direction: column; gap: 10px; align-items: center;
          font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,240,232,0.6);
        }
        .sp-hero-info span { display: flex; align-items: center; gap: 8px; }
        .sp-hero-info strong { color: ${AMBER}; font-weight: 600; }
        .sp-hero-scroll {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(245,240,232,0.4); font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          animation: bounce 2s infinite;
        }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

        /* ─── DECO CATAVENTOS ─── */
        .sp-deco {
          position: absolute; pointer-events: none;
          background: url('/catavento.png') center/contain no-repeat;
          opacity: 0.06; z-index: 1;
        }
        .sp-deco-spin { animation: spin 30s linear infinite; }
        .sp-deco-spin-rev { animation: spin-rev 40s linear infinite; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        /* ─── SECTIONS ─── */
        .sp-section {
          position: relative; padding: 80px 24px;
          max-width: 1100px; margin: 0 auto;
        }
        .sp-section-full {
          position: relative; padding: 80px 24px;
        }
        .sp-section-dark {
          background: rgba(0,0,0,0.25);
        }

        .sp-label {
          font-size: 11px; font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; color: ${AMBER};
          margin-bottom: 12px;
        }
        .sp-h2 {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 800; line-height: 1.1;
          color: ${WHITE}; margin: 0 0 20px;
        }
        .sp-h2 span { color: ${AMBER}; }
        .sp-lead {
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 300; line-height: 1.8;
          color: rgba(245,240,232,0.8);
          max-width: 680px;
        }
        .sp-divider {
          width: 48px; height: 2px;
          background: ${AMBER}; margin: 24px 0;
        }

        /* ─── MANIFESTO / CONCEITO ─── */
        .sp-conceito-words {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 12px 20px; margin: 32px 0;
        }
        .sp-conceito-word {
          font-size: clamp(22px, 4vw, 40px);
          font-weight: 800; letter-spacing: -0.5px;
          color: ${AMBER}; opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .sp-conceito-word.visible {
          opacity: 1; transform: translateY(0);
        }
        .sp-conceito-sep {
          font-size: clamp(22px, 4vw, 40px);
          font-weight: 300; color: rgba(245,240,232,0.2);
          align-self: center;
        }
        .sp-conceito-body {
          max-width: 820px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; margin-top: 56px;
        }
        .sp-conceito-block {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,201,106,0.12);
          border-radius: 16px; padding: 28px 24px;
          backdrop-filter: blur(8px);
        }
        .sp-conceito-block-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: ${AMBER}; margin-bottom: 12px;
        }
        .sp-conceito-block p {
          font-size: clamp(14px, 1.8vw, 16px);
          font-weight: 300; line-height: 1.8;
          color: rgba(245,240,232,0.8); margin: 0;
        }
        .sp-conceito-quote {
          max-width: 680px; margin: 48px auto 0;
          text-align: center;
          font-size: clamp(16px, 2.2vw, 20px);
          font-weight: 300; line-height: 1.8;
          color: rgba(245,240,232,0.7);
          font-style: italic;
          border-top: 1px solid rgba(240,201,106,0.2);
          padding-top: 40px;
        }
        .sp-conceito-quote strong {
          color: ${WHITE}; font-style: normal; font-weight: 600;
        }
        @media (max-width: 768px) {
          .sp-conceito-body { grid-template-columns: 1fr; gap: 16px; }
        }

        /* ─── GRID STATS ─── */
        .sp-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px; margin-top: 48px;
        }
        .sp-stat {
          background: ${CARD_BG};
          border: 1px solid ${CARD_BORDER};
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          backdrop-filter: blur(8px);
        }
        .sp-stat-num {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900; color: ${AMBER};
          line-height: 1;
        }
        .sp-stat-label {
          font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,240,232,0.6);
          margin-top: 8px;
        }

        /* ─── CARROSSEL ─── */
        .sp-carousel-outer {
          margin-top: 48px;
        }

        /* ── DESKTOP: 3 colunas visíveis ── */
        .sp-carousel-desktop {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .sp-carousel-desktop-item {
          aspect-ratio: 9/16;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease;
        }
        .sp-carousel-desktop-item.dc-center {
          transform: scale(1.04);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          z-index: 2;
        }
        .sp-carousel-desktop-item.dc-side {
          opacity: 0.5;
          transform: scale(0.95);
        }
        .sp-carousel-desktop-item img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center; display: block;
        }

        /* ── MOBILE: 1 foto por vez, tela cheia ── */
        .sp-carousel-mobile {
          display: none;
          position: relative;
        }
        .sp-carousel-mobile-viewport {
          overflow: hidden;
          border-radius: 20px;
          width: 100%;
          aspect-ratio: 9/16;
        }
        .sp-carousel-mobile-track {
          display: flex;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .sp-carousel-mobile-slide {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
        }
        .sp-carousel-mobile-slide img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center; display: block;
        }

        /* controles compartilhados */
        .sp-carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
        }
        .sp-carousel-btn {
          background: rgba(240,201,106,0.12);
          border: 1px solid rgba(240,201,106,0.35);
          color: ${AMBER};
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 22px; line-height: 1;
          transition: background 0.25s, transform 0.2s;
        }
        .sp-carousel-btn:hover { background: rgba(240,201,106,0.25); transform: scale(1.08); }
        .sp-carousel-dots { display: flex; gap: 6px; align-items: center; }
        .sp-carousel-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(240,201,106,0.3);
          transition: background 0.4s, width 0.4s, border-radius 0.4s;
          cursor: pointer;
        }
        .sp-carousel-dot.active {
          background: ${AMBER}; width: 20px; border-radius: 3px;
        }

        @media (max-width: 768px) {
          .sp-carousel-desktop { display: none; }
          .sp-carousel-mobile { display: block; }
          .sp-carousel-btn { width: 40px; height: 40px; font-size: 20px; }
        }

        /* ─── LINE-UP ─── */
        .sp-lineup-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px; margin-top: 48px;
        }
        .sp-lineup-card {
          background: ${CARD_BG};
          border: 1px solid ${CARD_BORDER};
          border-radius: 20px; padding: 36px 32px;
          backdrop-filter: blur(8px);
        }
        .sp-lineup-date {
          font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: ${AMBER}; margin-bottom: 16px;
        }
        .sp-lineup-headliner {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900; color: ${AMBER};
          line-height: 1; margin-bottom: 24px;
        }
        .sp-lineup-support {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .sp-lineup-support li {
          font-size: 13px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,240,232,0.7);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* ─── PÚBLICO ─── */
        .sp-publico-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
          margin-top: 48px;
        }
        .sp-publico-tags {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 24px;
        }
        .sp-tag {
          background: rgba(240,201,106,0.1);
          border: 1px solid rgba(240,201,106,0.3);
          color: ${AMBER};
          font-size: 12px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 8px 16px; border-radius: 100px;
        }
        .sp-publico-img {
          border-radius: 20px; overflow: hidden;
          aspect-ratio: 4/3;
        }
        .sp-publico-img img {
          width: 100%; height: 100%; object-fit: cover;
        }

        /* ─── BENEFÍCIOS ─── */
        .sp-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px; margin-top: 48px;
        }
        .sp-benefits-col h3 {
          font-size: 14px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: ${AMBER}; margin: 0 0 20px;
        }
        .sp-benefit-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 14px; color: rgba(245,240,232,0.85);
          font-weight: 400;
        }
        .sp-benefit-check {
          width: 20px; height: 20px; flex-shrink: 0;
          background: rgba(240,201,106,0.15);
          border: 1px solid rgba(240,201,106,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: ${AMBER}; font-size: 10px; margin-top: 1px;
        }

        /* ─── COTAS ─── */
        .sp-cotas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-top: 48px;
        }
        .sp-cota-card {
          background: ${CARD_BG};
          border: 1px solid ${CARD_BORDER};
          border-radius: 24px; padding: 40px 32px;
          text-align: center; position: relative;
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .sp-cota-card:hover {
          transform: translateY(-8px);
          border-color: rgba(240,201,106,0.5);
        }
        .sp-cota-card.featured {
          border-color: ${AMBER};
          background: rgba(240,201,106,0.08);
        }
        .sp-cota-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: ${AMBER}; color: #071e22;
          font-size: 10px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 4px 16px; border-radius: 100px;
        }
        .sp-cota-name {
          font-size: 12px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: ${AMBER}; margin-bottom: 16px;
        }
        .sp-cota-price {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 900; color: ${WHITE};
          line-height: 1; margin-bottom: 8px;
        }
        .sp-cota-price span {
          font-size: 16px; font-weight: 400;
          color: rgba(245,240,232,0.5);
          vertical-align: super;
        }
        .sp-cota-desc {
          font-size: 13px; color: rgba(245,240,232,0.6);
          line-height: 1.6; margin-bottom: 24px;
        }
        .sp-cota-divider {
          width: 32px; height: 1px;
          background: rgba(240,201,106,0.3);
          margin: 0 auto 24px;
        }

        /* ─── CTA FINAL ─── */
        .sp-cta-section {
          position: relative;
          min-height: 60vh;
          display: flex; align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
          padding: 80px 24px;
        }
        .sp-cta-bg {
          position: absolute; inset: 0;
          background: url('/piri-por-do-sol.jpg') center center / cover no-repeat;
          z-index: 0;
        }
        .sp-cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(5,30,36,0.9) 0%, rgba(14,123,140,0.75) 50%, rgba(5,30,36,0.95) 100%);
          z-index: 1;
        }
        .sp-cta-content { position: relative; z-index: 2; max-width: 700px; }

        /* ─── FORM ─── */
        .sp-form {
          display: flex; flex-direction: column; gap: 16px;
          margin-top: 32px; max-width: 560px; margin-left: auto; margin-right: auto;
        }
        .sp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .sp-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(240,201,106,0.2);
          border-radius: 12px; padding: 14px 18px;
          color: ${WHITE}; font-family: 'Poppins', sans-serif;
          font-size: 14px; outline: none; width: 100%;
          transition: border-color 0.3s;
        }
        .sp-input::placeholder { color: rgba(245,240,232,0.35); }
        .sp-input:focus { border-color: rgba(240,201,106,0.6); }
        .sp-textarea { resize: vertical; min-height: 100px; }

        /* ─── BUTTONS ─── */
        .sp-btn-gold {
          background: ${AMBER};
          color: #071e22;
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 16px 40px; border-radius: 100px;
          border: none; cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
          display: inline-block; text-decoration: none;
        }
        .sp-btn-gold:hover { background: #e8b84a; transform: scale(1.03); }
        .sp-btn-outline {
          background: transparent;
          color: ${AMBER};
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 36px; border-radius: 100px;
          border: 1px solid ${AMBER}; cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block; text-decoration: none;
        }
        .sp-btn-outline:hover { background: rgba(240,201,106,0.1); }

        /* ─── FOOTER ─── */
        .sp-footer {
          background: rgba(0,0,0,0.4);
          padding: 40px 24px; text-align: center;
          font-size: 12px; color: rgba(245,240,232,0.35);
          letter-spacing: 1px;
        }
        .sp-footer img { height: 36px; margin-bottom: 16px; opacity: 0.6; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .sp-lineup-grid { grid-template-columns: 1fr; }
          .sp-cotas-grid { grid-template-columns: 1fr; }
          .sp-publico-grid { grid-template-columns: 1fr; }
          .sp-benefits-grid { grid-template-columns: 1fr; }
          .sp-photo-grid { grid-template-columns: 1fr 1fr; }
          .sp-photo-item.tall { grid-row: span 1; aspect-ratio: 4/3; }
          .sp-form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sp-wrap">

        {/* ─── HERO ─── */}
        <section className="sp-hero">
          <div className="sp-hero-bg" />
          <div className="sp-hero-overlay" />
          {/* Cataventos decorativos animados */}
          <div className="sp-deco sp-deco-spin" style={{ width: 400, height: 400, top: -80, right: -100, opacity: 0.05 }} />
          <div className="sp-deco sp-deco-spin-rev" style={{ width: 250, height: 250, bottom: 60, left: -60, opacity: 0.06 }} />
          <div className="sp-deco sp-deco-spin" style={{ width: 160, height: 160, top: '40%', right: '8%', opacity: 0.04 }} />

          <div className="sp-hero-content">
            <div className="sp-hero-tag">Projeto Comercial 2026</div>
            <h1 className="sp-hero-title">LET'S <span>PIRI</span></h1>
            <p className="sp-hero-sub">O vento traz novos ares</p>
            <div className="sp-hero-divider" />
            <div className="sp-hero-info">
              <span><strong>05 e 06</strong> de Setembro</span>
              <span>Pirenópolis, Goiás</span>
              <span><strong>6.000 a 8.000</strong> pessoas/dia</span>
            </div>
          </div>

          <div className="sp-hero-scroll">
            <span>Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="8" r="2" fill="currentColor">
                <animate attributeName="cy" values="8;14;8" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </section>

        {/* ─── CONCEITO ─── */}
        <section className="sp-section-full" style={{ background: 'linear-gradient(180deg, #071e22 0%, rgba(14,123,140,0.12) 50%, #071e22 100%)', padding: '100px 24px' }}>
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <div className="sp-deco sp-deco-spin" style={{ width: 280, height: 280, top: -40, right: -60, opacity: 0.05 }} />

            <div id="s-manifesto" data-animate style={animStyle('s-manifesto')}>
              <p className="sp-label" style={{ textAlign: 'center' }}>O Conceito</p>

              {/* Palavras de impacto */}
              <div className="sp-conceito-words">
                {['Let’s', 'é', 'movimento.', 'Let’s', 'é', 'liberdade.', 'Let’s', 'é', 'partir.'].map((w, i) => (
                  <span
                    key={i}
                    className={`sp-conceito-word${visible('s-manifesto') ? ' visible' : ''}`}
                    style={{ transitionDelay: `${i * 0.08}s`, color: [1,4,7].includes(i) ? 'rgba(245,240,232,0.35)' : undefined }}
                  >{w}</span>
                ))}
              </div>

              {/* 2 blocos */}
              <div className="sp-conceito-body">
                <div className="sp-conceito-block">
                  <div className="sp-conceito-block-label">O nome</div>
                  <p>Let’s significa <strong style={{color:'#f0c96a',fontWeight:600}}>vamos</strong>. Vamos viajar, reunir os amigos, sair da rotina, viver algo novo. E não existe momento melhor para isso do que o feriado da Independência, que por natureza já representa liberdade.</p>
                </div>
                <div className="sp-conceito-block">
                  <div className="sp-conceito-block-label">O símbolo</div>
                  <p>O catavento é movido pelo vento. Representa <strong style={{color:'#f0c96a',fontWeight:600}}>movimento, novos caminhos e a liberdade de escolher para onde ir</strong>. Foi dessa ideia que nasceu o festival.</p>
                </div>
                <div className="sp-conceito-block">
                  <div className="sp-conceito-block-label">A experiência</div>
                  <p>Cenografia autoral, elementos inspirados em Pirenópolis, espaços instagramáveis e áreas de convivência. Um ambiente pensado para encantar e estimular conexão.</p>
                </div>
                <div className="sp-conceito-block">
                  <div className="sp-conceito-block-label">A proposta</div>
                  <p>Música, natureza, turismo e experiência caminhando juntos. Não apenas mais um evento: <strong style={{color:'#f0c96a',fontWeight:600}}>uma nova forma de viver o feriado</strong> em Pirenópolis.</p>
                </div>
              </div>

              {/* Quote final + stats */}
              <div className="sp-conceito-quote">
                O público não procura apenas shows.<br />
                Procura <strong>histórias para viver.</strong><br />
                E marcas relevantes precisam estar presentes nesses momentos.
              </div>

              {/* Números */}
              <div className="sp-stats" style={{ marginTop: 56 }}>
                {[
                  { num: '6 | 8K', label: 'Pessoas por dia' },
                  { num: '2', label: 'Dias de festival' },
                  { num: '10+', label: 'Atrações no palco' },
                  { num: '1,2M+', label: 'Views mensais' },
                ].map((s, i) => (
                  <div key={i} id={`stat-${i}`} data-animate style={animStyle(`stat-${i}`, i * 0.1)} className="sp-stat">
                    <div className="sp-stat-num">{s.num}</div>
                    <div className="sp-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PIRENÓPOLIS ─── */}
        <section className="sp-section-full" style={{ background: '#071e22' }}>
          <div className="sp-section">
            <div id="s-piri" data-animate style={animStyle('s-piri')}>
              <p className="sp-label">O Destino</p>
              <h2 className="sp-h2">Por que <span>Pirenópolis?</span></h2>
              <div className="sp-divider" />
              <p className="sp-lead">Fundada em 1727 e reconhecida como Patrimônio Histórico Nacional, Pirenópolis reúne história, natureza e experiências que transformaram a cidade em um dos destinos mais desejados do Centro-Oeste.</p>
              <p className="sp-lead" style={{ marginTop: 20 }}>Cachoeiras, gastronomia, ruas de pedra, passeios de quadriciclo, arquitetura colonial e o pôr do sol na Serra dos Pireneus criam uma atmosfera única para quem busca viver algo além da rotina.</p>
              <p className="sp-lead" style={{ marginTop: 20, fontStyle: 'italic', color: '#f0c96a', fontWeight: 500 }}>No Let's Piri, o destino não é apenas o cenário. A experiência começa quando a viagem começa.</p>
            </div>

            <div id="s-carousel" data-animate style={animStyle('s-carousel')} className="sp-carousel-outer">

              {/* DESKTOP: 3 fotos visíveis */}
              <div className="sp-carousel-desktop">
                {[-1, 0, 1].map((offset) => {
                  const idx = (carouselIndex + offset + carouselPhotos.length) % carouselPhotos.length
                  return (
                    <div key={offset} className={`sp-carousel-desktop-item${offset === 0 ? ' dc-center' : ' dc-side'}`}>
                      <img src={carouselPhotos[idx]} alt={`Pirenópolis ${idx + 1}`} loading="lazy" />
                    </div>
                  )
                })}
              </div>

              {/* MOBILE: 1 foto por vez, deslize horizontal */}
              <div className="sp-carousel-mobile">
                <div className="sp-carousel-mobile-viewport">
                  <div
                    className="sp-carousel-mobile-track"
                    style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                  >
                    {carouselPhotos.map((src, i) => (
                      <div key={i} className="sp-carousel-mobile-slide">
                        <img src={src} alt={`Pirenópolis ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div className="sp-carousel-controls">
                <button
                  className="sp-carousel-btn"
                  onClick={() => { prevSlide(); if (carouselTimer.current) { clearInterval(carouselTimer.current); carouselTimer.current = setInterval(nextSlide, 3500) } }}
                  aria-label="Anterior"
                >‹</button>
                <div className="sp-carousel-dots">
                  {carouselPhotos.map((_, i) => (
                    <div
                      key={i}
                      className={`sp-carousel-dot${i === carouselIndex ? ' active' : ''}`}
                      onClick={() => { setCarouselIndex(i) }}
                    />
                  ))}
                </div>
                <button
                  className="sp-carousel-btn"
                  onClick={() => { nextSlide(); if (carouselTimer.current) { clearInterval(carouselTimer.current); carouselTimer.current = setInterval(nextSlide, 3500) } }}
                  aria-label="Próxima"
                >›</button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONCEITO VISUAL ─── */}
        <section className="sp-section-full sp-section-dark">
          <div className="sp-section">
            <div id="s-conceito" data-animate style={animStyle('s-conceito')}>
              <p className="sp-label">O Conceito Visual</p>
              <h2 className="sp-h2">Um festival pensado<br />para ser <span>vivido</span></h2>
              <div className="sp-divider" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginTop: 40 }}>
              {['Cataventos', 'Banderolas', 'Pôr do sol', 'Natureza', 'Espaços instagramáveis', 'Áreas de convivência', 'Experiências sensoriais', 'Cenografia imersiva'].map((item, i) => (
                <div key={i} id={`conceito-${i}`} data-animate style={{ ...animStyle(`conceito-${i}`, i * 0.07), background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 12, padding: '20px 16px', textAlign: 'center', fontSize: 13, fontWeight: 500, color: 'rgba(245,240,232,0.8)', backdropFilter: 'blur(8px)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LINE-UP ─── */}
        <section className="sp-section-full" style={{ background: '#071e22' }}>
          <div className="sp-section">
            <div id="s-lineup" data-animate style={animStyle('s-lineup')}>
              <p className="sp-label">Line-up 2026</p>
              <h2 className="sp-h2">Grandes nomes.<br /><span>Dois dias inesquecíveis.</span></h2>
              <div className="sp-divider" />
            </div>
            <div className="sp-lineup-grid">
              <div id="lineup-1" data-animate style={animStyle('lineup-1', 0.1)} className="sp-lineup-card">
                <div className="sp-lineup-date">05 | Set | Sábado</div>
                <div className="sp-lineup-headliner">PANDA</div>
                <ul className="sp-lineup-support">
                  {['CDB', 'Back 2 Brothers', 'Marllon', 'A.Jota'].map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div id="lineup-2" data-animate style={animStyle('lineup-2', 0.2)} className="sp-lineup-card">
                <div className="sp-lineup-date">06 | Set | Domingo</div>
                <div className="sp-lineup-headliner" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>MARIANA<br />FAGUNDES</div>
                <ul className="sp-lineup-support">
                  {['Som de Faculdade', 'DJ Topo', 'Marllon', 'A.Jota'].map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PÚBLICO ─── */}
        <section className="sp-section-full sp-section-dark">
          <div className="sp-section">
            <div id="s-publico" data-animate style={animStyle('s-publico')}>
              <p className="sp-label">Nosso Público</p>
              <h2 className="sp-h2">Pessoas que<br /><span>amplificam marcas</span></h2>
              <div className="sp-divider" />
            </div>
            <div className="sp-publico-grid">
              <div id="publico-text" data-animate style={animStyle('publico-text', 0.1)}>
                <p className="sp-lead">O público do Let's Piri viaja. Compartilha. Produz conteúdo. Marca localização. Indica experiências. Influencia decisões.</p>
                <p className="sp-lead" style={{ marginTop: 16 }}>Cada experiência vivida dentro do evento gera alcance muito além dos portões.</p>
                <div className="sp-publico-tags">
                  {['Classe A e B', '20 a 40 anos', 'Alto poder de consumo', 'Público conectado', 'Consumidor de turismo', 'Gastronomia & entretenimento'].map(t => (
                    <span key={t} className="sp-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div id="publico-img" data-animate style={animStyle('publico-img', 0.2)} className="sp-publico-img">
                <img src="/piri-amigos.jpg" alt="Público Let's Piri" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ALCANCE ─── */}
        <section className="sp-section-full" style={{ background: '#071e22' }}>
          <div className="sp-section">
            <div id="s-alcance" data-animate style={animStyle('s-alcance')}>
              <p className="sp-label">Alcance Digital</p>
              <h2 className="sp-h2">Mais de <span>1,2 milhão</span><br />de visualizações mensais</h2>
              <div className="sp-divider" />
              <p className="sp-lead">Somando os canais do projeto e das produtoras. Presença espontânea em veículos de comunicação, influenciadores e canais de entretenimento. Conteúdo antes, durante e depois do evento.</p>
            </div>
            <div className="sp-stats" style={{ marginTop: 48 }}>
              {[
                { num: '1,2M+', label: 'Views mensais' },
                { num: '100%', label: 'Cobertura digital' },
                { num: '3 fases', label: 'Antes • Durante • Depois' },
                { num: '∞', label: 'Alcance orgânico' },
              ].map((s, i) => (
                <div key={i} id={`alcance-${i}`} data-animate style={animStyle(`alcance-${i}`, i * 0.1)} className="sp-stat">
                  <div className="sp-stat-num">{s.num}</div>
                  <div className="sp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BENEFÍCIOS ─── */}
        <section className="sp-section-full sp-section-dark">
          <div className="sp-section">
            <div id="s-beneficios" data-animate style={animStyle('s-beneficios')}>
              <p className="sp-label">Sua Marca no Let's Piri</p>
              <h2 className="sp-h2">Não apenas exposição.<br /><span>Conexão.</span></h2>
              <div className="sp-divider" />
              <p className="sp-lead">O Let's Piri foi desenhado para que as marcas façam parte da experiência vivida pelo público.</p>
            </div>
            <div className="sp-benefits-grid">
              <div id="ben-1" data-animate style={animStyle('ben-1', 0.1)} className="sp-benefits-col">
                <h3>No Evento</h3>
                {['Presença em palco', 'Arena principal', 'Entrada do evento', 'Áreas premium', 'Lounges exclusivos', 'Praça gastronômica', 'Photopoints', 'Ativações especiais', 'Distribuição de brindes', 'Exclusividade de segmento', 'Experiências proprietárias'].map(b => (
                  <div key={b} className="sp-benefit-item">
                    <span className="sp-benefit-check">✓</span>
                    {b}
                  </div>
                ))}
              </div>
              <div id="ben-2" data-animate style={animStyle('ben-2', 0.2)} className="sp-benefits-col">
                <h3>No Digital</h3>
                {['Plano de mídia', 'Redes sociais', 'Influenciadores', 'Press kits', 'Aftermovie oficial', 'Videocases', 'Conteúdo colaborativo', 'Menções do apresentador', 'Cobertura do evento'].map(b => (
                  <div key={b} className="sp-benefit-item">
                    <span className="sp-benefit-check">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── COTAS ─── */}
        <section className="sp-section-full" style={{ background: '#071e22' }}>
          <div className="sp-section">
            <div id="s-cotas" data-animate style={animStyle('s-cotas')}>
              <p className="sp-label">Cotas de Patrocínio</p>
              <h2 className="sp-h2">Escolha como sua<br />marca <span>quer estar presente</span></h2>
              <div className="sp-divider" />
            </div>
            <div className="sp-cotas-grid">
              {[
                {
                  name: 'Apresenta', price: '150.000', featured: true,
                  badge: 'Maior Visibilidade',
                  desc: 'A marca apresenta oficialmente o Let\'s Piri. Exclusividade de segmento. Maior visibilidade do projeto.',
                },
                {
                  name: 'Diamante', price: '90.000', featured: false,
                  badge: null,
                  desc: 'Alta visibilidade. Ativação física e digital. Presença qualificada em todos os pontos de contato.',
                },
                {
                  name: 'Ouro', price: '60.000', featured: false,
                  badge: null,
                  desc: 'Presença qualificada nos principais pontos de contato do evento.',
                },
              ].map((c, i) => (
                <div key={i} id={`cota-${i}`} data-animate style={animStyle(`cota-${i}`, i * 0.15)} className={`sp-cota-card${c.featured ? ' featured' : ''}`}>
                  {c.badge && <div className="sp-cota-badge">{c.badge}</div>}
                  <div className="sp-cota-name">{c.name}</div>
                  <div className="sp-cota-price"><span>R$</span> {c.price}</div>
                  <div className="sp-cota-divider" />
                  <p className="sp-cota-desc">{c.desc}</p>
                  <a href="#contato" className="sp-btn-outline" style={{ fontSize: 11, padding: '10px 24px' }}>Quero esta cota</a>
                </div>
              ))}
            </div>
            <div id="s-tailor" data-animate style={{ ...animStyle('s-tailor', 0.2), marginTop: 48, background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20, padding: '40px 32px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <p className="sp-label">Projetos Personalizados</p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: '0 0 12px' }}>Cada marca possui objetivos diferentes</h3>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: 15, maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.7 }}>Por isso, também desenvolvemos projetos tailor-made para ativações exclusivas e experiências proprietárias dentro do Let's Piri.</p>
              <a href="#contato" className="sp-btn-gold">Fale com a gente</a>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section id="contato" className="sp-cta-section">
          <div className="sp-cta-bg" />
          <div className="sp-cta-overlay" />
          <div className="sp-deco sp-deco-spin" style={{ width: 500, height: 500, top: -100, right: -150, opacity: 0.05 }} />
          <div className="sp-deco sp-deco-spin-rev" style={{ width: 300, height: 300, bottom: -60, left: -80, opacity: 0.06 }} />
          <div className="sp-cta-content">
            <div id="s-cta" data-animate style={animStyle('s-cta')}>
              <p className="sp-label">Contato Comercial</p>
              <h2 className="sp-h2" style={{ marginBottom: 8 }}>O vento traz<br /><span>novos ares</span></h2>
              <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: 15, marginBottom: 0, lineHeight: 1.7 }}>
                Grandes experiências começam antes mesmo de acontecer.<br />
                Grandes marcas sabem reconhecer os momentos certos para estar presentes.
              </p>

              {formStatus === 'success' ? (
                <div style={{ marginTop: 40, background: 'rgba(240,201,106,0.1)', border: `1px solid ${AMBER}`, borderRadius: 16, padding: '32px 24px' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                  <p style={{ color: AMBER, fontWeight: 600, fontSize: 16, margin: 0 }}>Mensagem enviada com sucesso!</p>
                  <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: 13, margin: '8px 0 0' }}>Nossa equipe comercial entrará em contato em breve.</p>
                </div>
              ) : (
                <form className="sp-form" onSubmit={handleSubmit}>
                  <div className="sp-form-row">
                    <input className="sp-input" placeholder="Seu nome" value={contactForm.nome} onChange={e => setContactForm(p => ({ ...p, nome: e.target.value }))} />
                    <input className="sp-input" placeholder="Empresa / Marca" value={contactForm.empresa} onChange={e => setContactForm(p => ({ ...p, empresa: e.target.value }))} />
                  </div>
                  <input className="sp-input" type="email" placeholder="E-mail comercial" value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} />
                  <textarea className="sp-input sp-textarea" placeholder="Conte um pouco sobre o interesse da sua marca..." value={contactForm.mensagem} onChange={e => setContactForm(p => ({ ...p, mensagem: e.target.value }))} />
                  <button type="submit" className="sp-btn-gold" style={{ alignSelf: 'center' }} disabled={formStatus === 'loading'}>
                    {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="sp-footer">
          <div>
            <img src="/Logo-Lets-Piri.png" alt="Let's Piri" />
            <p style={{ margin: '0 0 4px' }}>Let's Piri Festival • 05 e 06 de Setembro de 2026 • Pirenópolis, Goiás</p>
            <p style={{ margin: 0 }}>One Life Entretenimento • Boêmios Eventos • TopHits Music • Nobel Music</p>
          </div>
        </footer>

      </div>
    </>
  )
}
