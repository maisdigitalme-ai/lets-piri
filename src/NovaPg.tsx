import { useState } from 'react'

const BG = '#0E7B8C'
const TEAL = '#1d7265'
const AMBER = '#f0c96a'
const AMBER_DARK = '#C9A84C'
const WHITE = '#f5f0e8'
const MUTED = '#8fb5c2'
const CARD_BG = 'rgba(255,255,255,0.06)'

const INGRESSO_URL = 'https://www.vaideingresso.com.br/lets-piri'

export default function NovaPg() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqItems = [
    {
      q: 'O que está incluso no ingresso?',
      a: 'O ingresso inclui acesso a todas as ativações, áreas do festival e experiências. Consulte a tabela de lotes para mais detalhes.'
    },
    {
      q: 'Qual é a programação completa?',
      a: 'Temos 2 dias de festival: 05 de setembro com Panda e 06 de setembro com Mariana Fagundes, além de DJs e artistas complementares.'
    },
    {
      q: 'Onde acontece o evento?',
      a: 'O evento acontecerá em Pirenópolis, Goiás, em um local com vista para as cachoeiras e a natureza da região.'
    },
    {
      q: 'Qual a idade mínima?',
      a: 'Evento proibido para menores de 18 anos. Será necessário apresentar documento de identidade na entrada.'
    },
    {
      q: 'Posso comprar ingresso avulso?',
      a: 'Sim, temos opções de ingressos para cada dia do festival. Consulte a tabela de lotes para escolher a melhor opção.'
    },
    {
      q: 'Como funciona a hospedagem?',
      a: 'Pirenópolis oferece várias opções de hospedagem. Recomendamos reservar com antecedência para garantir o melhor local.'
    }
  ]

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: auto !important;
          min-height: 100vh !important;
          overflow-x: hidden !important;
          overflow-y: visible !important;
        }
        
        * { box-sizing: border-box; }
        
        .np-wrap {
          font-family: 'Poppins', sans-serif;
          background: ${WHITE};
          color: #1a1a1a;
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        /* ─── HERO ─── */
        .np-hero {
          background: linear-gradient(135deg, ${TEAL} 0%, ${BG} 100%);
          color: ${WHITE};
          padding: clamp(60px, 12vw, 120px) 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .np-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(240,201,106,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(240,201,106,0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .np-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .np-logo {
          width: clamp(100px, 30vw, 180px);
          height: auto;
          margin-bottom: 24px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          filter: brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(500%) hue-rotate(5deg) brightness(105%);
        }
        
        .np-hero-date {
          font-size: clamp(11px, 2.5vw, 14px);
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 16px;
          font-weight: 500;
        }
        
        .np-hero-title {
          font-size: clamp(32px, 8vw, 56px);
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.2;
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -1px;
        }
        
        .np-hero-subtitle {
          font-size: clamp(14px, 3vw, 18px);
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .np-cta-primary {
          display: inline-block;
          background: ${AMBER};
          color: ${TEAL};
          padding: clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px);
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: clamp(13px, 2.5vw, 15px);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        
        .np-cta-primary:hover {
          background: ${AMBER_DARK};
          transform: translateY(-2px);
        }
        
        .np-cta-primary:active {
          transform: translateY(0);
        }
        
        /* ─── SECTION ─── */
        .np-section {
          padding: clamp(60px, 10vw, 100px) 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .np-section-alt {
          background: ${TEAL};
          color: ${WHITE};
        }
        
        .np-section-title {
          font-size: clamp(28px, 6vw, 44px);
          font-weight: 700;
          margin-bottom: 40px;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -0.5px;
        }
        
        .np-section-subtitle {
          font-size: clamp(16px, 3vw, 20px);
          line-height: 1.8;
          margin-bottom: 30px;
          text-align: center;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }
        
        /* ─── GRID ─── */
        .np-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        
        .np-card {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: clamp(24px, 5vw, 32px);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .np-section-alt .np-card {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
        }
        
        .np-card:hover {
          border-color: ${AMBER};
          transform: translateY(-4px);
        }
        
        .np-card-title {
          font-size: clamp(16px, 3vw, 20px);
          font-weight: 700;
          margin-bottom: 12px;
          font-family: 'Cormorant Garamond', serif;
        }
        
        .np-card-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${MUTED};
        }
        
        .np-section-alt .np-card-text {
          color: rgba(255,255,255,0.8);
        }
        
        /* ─── PROGRAMAÇÃO ─── */
        .np-prog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .np-prog-card {
          background: ${WHITE};
          border: 2px solid ${TEAL};
          border-radius: 16px;
          padding: clamp(32px, 6vw, 48px);
          text-align: center;
        }
        
        .np-prog-date {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .np-prog-artist {
          font-size: clamp(24px, 5vw, 36px);
          font-weight: 700;
          color: ${TEAL};
          margin-bottom: 20px;
          font-family: 'Cormorant Garamond', serif;
        }
        
        .np-prog-support {
          font-size: 13px;
          color: ${MUTED};
          line-height: 1.8;
          letter-spacing: 0.5px;
        }
        
        /* ─── INGRESSOS ─── */
        .np-tickets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        
        .np-ticket-card {
          background: ${WHITE};
          border: 2px solid ${TEAL};
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .np-ticket-card:hover {
          border-color: ${AMBER};
          box-shadow: 0 8px 24px rgba(29, 114, 101, 0.15);
        }
        
        .np-ticket-name {
          font-size: 16px;
          font-weight: 700;
          color: ${TEAL};
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .np-ticket-price {
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 700;
          color: ${AMBER};
          margin-bottom: 8px;
          font-family: 'Cormorant Garamond', serif;
        }
        
        .np-ticket-info {
          font-size: 12px;
          color: ${MUTED};
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .np-ticket-cta {
          display: block;
          background: ${TEAL};
          color: ${WHITE};
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        
        .np-ticket-cta:hover {
          background: ${AMBER};
          color: ${TEAL};
        }
        
        /* ─── FAQ ─── */
        .np-faq-list {
          max-width: 700px;
          margin: 40px auto 0;
        }
        
        .np-faq-item {
          background: ${WHITE};
          border: 1px solid ${TEAL};
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        
        .np-section-alt .np-faq-item {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }
        
        .np-faq-question {
          padding: 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          user-select: none;
        }
        
        .np-section-alt .np-faq-question {
          color: ${WHITE};
        }
        
        .np-faq-question:hover {
          background: rgba(29, 114, 101, 0.05);
        }
        
        .np-section-alt .np-faq-question:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .np-faq-icon {
          font-size: 20px;
          transition: transform 0.3s ease;
        }
        
        .np-faq-item.active .np-faq-icon {
          transform: rotate(180deg);
        }
        
        .np-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding: 0 20px;
        }
        
        .np-faq-item.active .np-faq-answer {
          max-height: 300px;
          padding: 0 20px 20px;
        }
        
        .np-faq-answer-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${MUTED};
        }
        
        .np-section-alt .np-faq-answer-text {
          color: rgba(255,255,255,0.8);
        }
        
        /* ─── NEWSLETTER ─── */
        .np-newsletter {
          max-width: 600px;
          margin: 40px auto 0;
          background: ${WHITE};
          border: 2px solid ${TEAL};
          border-radius: 16px;
          padding: clamp(32px, 6vw, 48px);
          text-align: center;
        }
        
        .np-section-alt .np-newsletter {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.3);
        }
        
        .np-newsletter-title {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 700;
          margin-bottom: 16px;
          font-family: 'Cormorant Garamond', serif;
        }
        
        .np-newsletter-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${MUTED};
          margin-bottom: 24px;
        }
        
        .np-section-alt .np-newsletter-text {
          color: rgba(255,255,255,0.8);
        }
        
        .np-newsletter-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid ${TEAL};
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          margin-bottom: 12px;
        }
        
        .np-newsletter-input::placeholder {
          color: ${MUTED};
        }
        
        .np-newsletter-btn {
          width: 100%;
          padding: 14px 16px;
          background: ${TEAL};
          color: ${WHITE};
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        
        .np-newsletter-btn:hover {
          background: ${AMBER};
          color: ${TEAL};
        }
        
        /* ─── FOOTER ─── */
        .np-footer {
          background: ${TEAL};
          color: ${WHITE};
          padding: 40px 20px;
          text-align: center;
          font-size: 13px;
          letter-spacing: 0.5px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .np-footer-text {
          margin: 8px 0;
        }
        
        .np-footer a {
          color: ${AMBER};
          text-decoration: none;
          font-weight: 600;
        }
        
        .np-footer a:hover {
          text-decoration: underline;
        }
        
        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .np-section {
            padding: 40px 16px;
          }
          
          .np-grid {
            grid-template-columns: 1fr;
          }
          
          .np-prog-grid {
            grid-template-columns: 1fr;
          }
          
          .np-tickets-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="np-wrap">
        {/* ─── HERO ─── */}
        <section className="np-hero">
          <div className="np-hero-inner">
            <img src="/Logo-Lets-Piri.png" alt="Let's Piri" className="np-logo" />
            <div className="np-hero-date">05 e 06 de setembro · Pirenópolis, GO</div>
            <h1 className="np-hero-title">Let's Piri</h1>
            <p className="np-hero-subtitle">Um final de semana que as pessoas esperam viver o ano inteiro.</p>
            <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" className="np-cta-primary">
              Comprar Ingresso
            </a>
          </div>
        </section>

        {/* ─── URGÊNCIA DO LOTE ─── */}
        <section className="np-section">
          <div className="np-section-subtitle">
            🎟️ <strong>1º Lote disponível</strong> — Garanta seu lugar antes que esgote
          </div>
        </section>

        {/* ─── STORYTELLING ─── */}
        <section className="np-section np-section-alt">
          <h2 className="np-section-title">O que é Let's Piri?</h2>
          <p className="np-section-subtitle">
            Saudade é o que fica. Let's Piri é sobre presença, intensidade e tudo aquilo que continua depois. Entre as ruas de pedra, as cachoeiras e o pôr do sol de Pirenópolis, propomos uma experiência que vai além da festa. É sobre amigos, liberdade, música e a energia boa que só existe quando tudo se alinha.
          </p>
          <p className="np-section-subtitle" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', fontWeight: 400, marginTop: 20 }}>
            O vento traz novos ares. E Pirenópolis é o lugar onde tudo faz sentido.
          </p>
        </section>

        {/* ─── PIRENÓPOLIS ─── */}
        <section className="np-section">
          <h2 className="np-section-title">Pirenópolis</h2>
          <p className="np-section-subtitle">
            O lugar faz parte de tudo. Entre dunas de história, cachoeiras cristalinas, ruas de pedra que contam séculos e o pôr do sol que muda o ritmo dos dias, Pirenópolis não é só cenário. É o que molda a experiência.
          </p>
          <div className="np-grid">
            <div className="np-card">
              <div className="np-card-title">Cachoeiras</div>
              <div className="np-card-text">Mergulhe nas águas cristalinas e sinta a energia da natureza</div>
            </div>
            <div className="np-card">
              <div className="np-card-title">Ruas de Pedra</div>
              <div className="np-card-text">Caminhe pela história colonial e sinta o charme do lugar</div>
            </div>
            <div className="np-card">
              <div className="np-card-title">Pôr do Sol</div>
              <div className="np-card-text">Viva o momento mágico que marca o ritmo de cada dia</div>
            </div>
          </div>
        </section>

        {/* ─── PROGRAMAÇÃO ─── */}
        <section className="np-section np-section-alt">
          <h2 className="np-section-title">Programação</h2>
          <div className="np-prog-grid">
            <div className="np-prog-card">
              <div className="np-prog-date">05 de setembro</div>
              <div className="np-prog-artist">PANDA</div>
              <div className="np-prog-support">
                Com: CDB, John DJ, Marllon e +1<br />
                <strong>Experiência completa do festival</strong>
              </div>
            </div>
            <div className="np-prog-card">
              <div className="np-prog-date">06 de setembro</div>
              <div className="np-prog-artist">MARIANA FAGUNDES</div>
              <div className="np-prog-support">
                Com: Som de Faculdade, Vinicius Cavalcante, Marllon e +1<br />
                <strong>Experiência completa do festival</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EXPERIÊNCIAS ─── */}
        <section className="np-section">
          <h2 className="np-section-title">Experiências</h2>
          <p className="np-section-subtitle">
            Além da música, o Let's Piri é sobre viver Pirenópolis em sua totalidade
          </p>
          <div className="np-grid">
            <div className="np-card">
              <div className="np-card-title">🎵 Música</div>
              <div className="np-card-text">Artistas principais e DJs em um ambiente único</div>
            </div>
            <div className="np-card">
              <div className="np-card-title">🍹 Gastronomia</div>
              <div className="np-card-text">Comida boa, bebidas geladas e momentos inesquecíveis</div>
            </div>
            <div className="np-card">
              <div className="np-card-title">🌄 Natureza</div>
              <div className="np-card-text">Explore as cachoeiras e a beleza natural da região</div>
            </div>
            <div className="np-card">
              <div className="np-card-title">👥 Comunidade</div>
              <div className="np-card-text">Encontre pessoas que vibram na mesma frequência</div>
            </div>
          </div>
        </section>

        {/* ─── INGRESSOS ─── */}
        <section className="np-section np-section-alt">
          <h2 className="np-section-title">Ingressos</h2>
          <p className="np-section-subtitle">
            Escolha a forma de viver o Let's Piri e garanta seu lugar
          </p>
          <div className="np-tickets-grid">
            <div className="np-ticket-card">
              <div className="np-ticket-name">1º Lote</div>
              <div className="np-ticket-price">R$ 199</div>
              <div className="np-ticket-info">Acesso aos 2 dias<br />Quantidade limitada</div>
              <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" className="np-ticket-cta">Comprar</a>
            </div>
            <div className="np-ticket-card">
              <div className="np-ticket-name">Ingresso 1 Dia</div>
              <div className="np-ticket-price">R$ 129</div>
              <div className="np-ticket-info">Escolha seu dia<br />05 ou 06 de setembro</div>
              <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" className="np-ticket-cta">Comprar</a>
            </div>
            <div className="np-ticket-card">
              <div className="np-ticket-name">VIP</div>
              <div className="np-ticket-price">R$ 399</div>
              <div className="np-ticket-info">Acesso VIP aos 2 dias<br />Benefícios exclusivos</div>
              <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" className="np-ticket-cta">Comprar</a>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="np-section">
          <h2 className="np-section-title">Perguntas Frequentes</h2>
          <div className="np-faq-list">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className={`np-faq-item ${expandedFaq === idx ? 'active' : ''}`}
              >
                <div
                  className="np-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className="np-faq-icon">▼</span>
                </div>
                <div className="np-faq-answer">
                  <div className="np-faq-answer-text">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="np-section np-section-alt">
          <div className="np-newsletter">
            <h3 className="np-newsletter-title">Fique por dentro</h3>
            <p className="np-newsletter-text">
              Receba novidades, line-up, viradas de lote e experiências em primeira mão
            </p>
            <input
              type="email"
              className="np-newsletter-input"
              placeholder="seu@email.com"
            />
            <button className="np-newsletter-btn">Inscrever-se</button>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="np-footer">
          <div className="np-footer-text">
            Let's Piri Festival · 05 e 06 de setembro de 2026
          </div>
          <div className="np-footer-text">
            Pirenópolis, Goiás · <a href="https://instagram.com/letspiri" target="_blank" rel="noopener noreferrer">@letspiri</a>
          </div>
          <div className="np-footer-text" style={{ marginTop: 16, fontSize: 11 }}>
            © 2026 Let's Piri. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </>
  )
}
