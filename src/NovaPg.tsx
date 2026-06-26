import { useState } from 'react'

const BG = '#0E7B8C'
const AMBER = '#f0c96a'
const AMBER_DARK = '#C9A84C'
const WHITE = '#f5f0e8'
const MUTED = '#f5f0e8'
const CARD_BG = 'rgba(255,255,255,0.06)'

const INGRESSO_URL = 'https://www.vaideingresso.com.br/lets-piri'

export default function NovaPg() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqItems = [
    {
      q: 'Como será o evento?',
      a: 'O Let’s Piri acontecerá nos dias 05 e 06 de setembro, sábado e domingo. E você ainda terá a segunda-feira, 07 de setembro, feriado da Independência, para descansar e curtir Pirenópolis com calma.\n\nProgramação por dia:\n\n05/09 | Sábado — 16h às 02h\n06/09 | Domingo — 16h às 02h'
    },
    {
      q: 'O evento será Open Bar?',
      a: 'Não. As bebidas serão comercializadas dentro do evento, e as marcas parceiras e opções disponíveis serão divulgadas em breve.'
    },
    {
      q: 'Quais são as áreas do evento e suas diferenças?',
      a: 'FRONTSTAGE\nA pista principal, bem em frente ao palco. Ideal para quem gosta de curtir os shows no meio da galera e sentir toda a energia do evento.\nInclui: Acesso ao Frontstage • Área de descanso • Banheiros premium climatizados • Bares • Serviço de garçom\n\nBACKSTAGE\nÁrea elevada com visão panorâmica do palco. Perfeita para quem busca mais conforto e sofisticação, sem abrir mão da animação.\nInclui: Acesso livre ao Frontstage • Bares exclusivos • Serviço de garçom\n\nLOUNGES\nEspaços privativos para grupos de até 13 pessoas. Ideal para quem deseja curtir com amigos ou familiares em um ambiente reservado e confortável.\nInclui: Lounge mobiliado com sofá e bistrô • 1 kit exclusivo Let’s Piri com garrafa de Campari autografada por Panda e Mariana Fagundes • Acesso livre às outras áreas • Banheiros premium climatizados • Bares exclusivos • Serviço de garçom'
    },
    {
      q: 'Qual o local do evento?',
      a: 'O local oficial será divulgado em breve. Mas já podemos adiantar: será um espaço imersivo, ao ar livre e totalmente conectado à natureza, pensado para fazer parte da experiência do Let’s Piri.'
    },
    {
      q: 'Haverá praça de alimentação?',
      a: 'Sim! Teremos uma praça de alimentação com diversas opções gastronômicas disponíveis durante os dois dias de evento.'
    },
    {
      q: 'O local tem estacionamento?',
      a: 'Sim. O evento contará com estacionamento privativo e seguro, com capacidade para mais de 500 carros.'
    },
    {
      q: 'Como encontrar hospedagem em Pirenópolis?',
      a: 'Pirenópolis oferece diversas opções de hospedagem para todos os estilos e bolso. Você pode pesquisar e reservar sua acomodação através de plataformas como Airbnb.com.br e Booking.com.\n\nAlém disso, o Let’s Piri possui parcerias com pousadas e hotéis da região. As indicações e benefícios exclusivos serão divulgados em nossos canais oficiais. Acompanhe o Instagram do Let’s Piri para ficar por dentro das novidades.'
    },
    {
      q: 'Menores de idade podem entrar?',
      a: 'Sim. Adolescentes de 16 e 17 anos poderão acessar o evento desde que estejam acompanhados pelos pais ou responsável legal e apresentem o Termo de Responsabilidade devidamente preenchido e assinado (documento que será disponibilizado em breve).\n\nMenores de 15 anos ou menos somente poderão entrar acompanhados pelos pais ou responsável legal.\n\nRecomendamos que todos os menores e responsáveis portem documento oficial com foto para apresentação na entrada do evento.'
    },
    {
      q: 'Política de Reembolso',
      a: 'Conforme o Art. 49 do Código de Defesa do Consumidor, oferecemos reembolso integral de ingressos e lounges adquiridos, desde que a solicitação seja feita em até 7 dias após a compra.\n\nImportante: o pedido de reembolso só será aceito se realizado até 48 horas antes do início do evento. Ou seja, mesmo dentro do prazo de 7 dias, a solicitação precisa respeitar esse limite mínimo.\n\nExemplo: se o evento ocorrer em menos de 7 dias após a compra, o reembolso não será possível.\n\nApós o prazo de 7 dias ou nas 48 horas que antecedem o evento, não serão aceitos pedidos de devolução, salvo em casos de cancelamento ou adiamento do evento.\n\nPara solicitar reembolso, entre em contato com nossa equipe de atendimento.'
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
          background: linear-gradient(160deg, rgba(10, 95, 110, 0.92) 0%, rgba(14, 123, 140, 0.92) 45%, rgba(26, 168, 191, 0.92) 100%),
                      url('/piri-bg-igreja.jpg') center center / cover no-repeat;
          background-attachment: fixed;
          color: ${WHITE};
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        .np-deco {
          position: absolute;
          background-image: url(/catavento.png);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }
        
        .np-deco1 { top: 120px; right: -70px; width: 280px; height: 280px; }
        .np-deco2 { bottom: 60px; left: -50px; width: 200px; height: 200px; }
        
        /* ─── HERO ─── */
        .np-hero {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 20px 16px;
          text-align: center;
        }
        
        .np-logo {
          width: clamp(110px, 38vw, 170px);
          height: auto;
          filter: brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(500%) hue-rotate(5deg) brightness(105%);
          margin-bottom: 28px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        
        .np-date {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          color: ${MUTED};
          text-transform: uppercase;
          margin-bottom: 28px;
          line-height: 1.8;
        }
        
        .np-date span { color: ${AMBER}; font-weight: 600; }
        
        .np-artists-wrap { width: 100%; margin-bottom: 20px; }
        .np-banner-desktop { display: block; width: 100%; max-width: 960px; border-radius: 16px; }
        .np-banner-mobile { display: none; width: 100%; border-radius: 16px; }
        
        @media (max-width: 600px) {
          .np-banner-desktop { display: none; }
          .np-banner-mobile { display: block; }
        }
        
        .np-divider {
          width: 32px;
          height: 1.5px;
          background: ${AMBER_DARK};
          opacity: 0.3;
          border-radius: 2px;
          margin: 8px auto 20px;
        }
        
        .np-open-now {
          font-size: 18px; 
          font-weight: 600; 
          color: ${AMBER};
          letter-spacing: 3px; 
          padding: 14px; 
          margin-bottom: 20px; 
          text-align: center;
        }
        
        /* ─── CARD ─── */
        .np-card {
          width: 100%;
          max-width: 480px;
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: clamp(24px, 6vw, 40px) clamp(18px, 5vw, 36px);
          margin: 0 auto;
          text-align: left;
        }
        
        .np-card-title {
          font-weight: 600;
          font-size: clamp(17px, 5vw, 22px);
          color: ${WHITE};
          margin-bottom: 8px;
        }
        
        .np-card-sub {
          font-size: 13px;
          color: ${MUTED};
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        /* ─── SECTION ─── */
        .np-section {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: clamp(24px, 4vw, 48px) 20px;
          text-align: center;
        }
        
        .np-section-title {
          font-size: clamp(28px, 6vw, 44px);
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          letter-spacing: -0.5px;
        }
        
        .np-section-subtitle {
          font-size: clamp(14px, 3vw, 18px);
          line-height: 1.8;
          margin-bottom: 16px;
          text-align: center;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
        }
        
        /* ─── GRID ─── */
        .np-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        
        .np-grid-card {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: clamp(24px, 5vw, 32px);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .np-grid-card:hover {
          border-color: ${AMBER};
          transform: translateY(-4px);
        }
        
        .np-grid-card-title {
          font-size: clamp(16px, 3vw, 20px);
          font-weight: 700;
          margin-bottom: 12px;
        }
        
        .np-grid-card-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${MUTED};
        }
        
        /* ─── PROGRAMAÇÃO ─── */
        .np-prog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        
        .np-prog-card {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: clamp(20px, 4vw, 32px);
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
          color: ${AMBER};
          margin-bottom: 20px;
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
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .np-ticket-card:hover {
          border-color: ${AMBER};
          transform: translateY(-4px);
        }
        
        .np-ticket-name {
          font-size: 16px;
          font-weight: 700;
          color: ${AMBER};
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .np-ticket-price {
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 700;
          color: ${AMBER};
          margin-bottom: 8px;
        }
        
        .np-ticket-info {
          font-size: 12px;
          color: ${MUTED};
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .np-ticket-cta {
          display: block;
          background: ${AMBER};
          color: ${BG};
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
          background: ${AMBER_DARK};
          transform: translateY(-2px);
        }
        
        /* ─── FAQ ─── */
        .np-faq-list {
          max-width: 700px;
          margin: 40px auto 0;
        }
        
        .np-faq-item {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
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
          color: ${WHITE};
        }
        
        .np-faq-question:hover {
          background: rgba(255,255,255,0.05);
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
        
        /* ─── NEWSLETTER ─── */
        .np-newsletter {
          max-width: 600px;
          margin: 40px auto 0;
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: clamp(32px, 6vw, 48px);
          text-align: center;
        }
        
        .np-newsletter-title {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .np-newsletter-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${MUTED};
          margin-bottom: 24px;
        }
        
        .np-newsletter-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          background: rgba(255,255,255,0.06);
          color: ${WHITE};
          margin-bottom: 12px;
        }
        
        .np-newsletter-input::placeholder {
          color: ${MUTED};
        }
        
        .np-newsletter-btn {
          width: 100%;
          padding: 14px 16px;
          background: ${AMBER};
          color: ${BG};
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
          background: ${AMBER_DARK};
        }
        
        /* ─── FOOTER ─── */
        .np-footer {
          text-align: center;
          padding: 24px 20px;
          background: rgba(10,46,58,0.8);
          font-size: 11px;
          color: ${MUTED};
          letter-spacing: 1px;
          width: 100%;
          margin-top: 40px;
        }
        
        .np-footer a { color: ${AMBER}; text-decoration: none; }
        
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
        
        @media (max-width: 768px) {
          .np-wrap {
            background-attachment: scroll !important;
            background-position: center center !important;
          }
        }
      `}</style>

      <div className="np-wrap">
        <div className="np-deco np-deco1" />
        <div className="np-deco np-deco2" />

        {/* ─── HERO ─── */}
        <div className="np-hero">
          <img src="/Logo-Lets-Piri.png" alt="Let's Piri" className="np-logo" />
          
          <div className="np-date">
            05 e 06 de setembro &nbsp;·&nbsp; <span>Pirenópolis, GO</span> &nbsp;·&nbsp; Véspera de feriado
          </div>

          <div className="np-artists-wrap">
            <img src="/BannerArtistas-1280x720.png" alt="Artistas Let's Piri" className="np-banner-desktop" />
            <img src="/BannerArtistas-1080x1350.png" alt="Artistas Let's Piri" className="np-banner-mobile" />
          </div>

        </div>

        {/* ─── STORYTELLING ─── */}
        <section className="np-section">
          <h2 className="np-section-title">O que é Let's Piri?</h2>
          <p className="np-section-subtitle">
            O Let's Piri nasce para transformar o feriado da Independência em uma experiência diferente em Pirenópolis.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 20 }}>
            Mais do que um evento, é um encontro entre música, natureza, pôr do sol, amigos e uma atmosfera pensada para ser vivida do início ao fim.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 20 }}>
            Nos dias 05 e 06 de setembro, Piri recebe uma proposta que foge do comum: cenografia viva, espaços instagramáveis, line-up diverso e aquela energia de quem escolheu sair da rotina para viver algo que realmente vale a pena lembrar.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 20, fontWeight: 500 }}>
            Aqui, a cidade não é só cenário.<br />Pirenópolis faz parte da experiência.
          </p>
        </section>

        {/* ─── PROGRAMAÇÃO ─── */}
        <section className="np-section">
          <h2 className="np-section-title">Programação</h2>
          <div className="np-prog-grid">
            <div className="np-prog-card">
              <div className="np-prog-date">05 | Set — Sábado</div>
              <div className="np-prog-artist">PANDA</div>
              <div className="np-prog-support">
                CDB<br />B2 BROTHERS<br />MARLLON<br />A.JOTA
              </div>
            </div>
            <div className="np-prog-card">
              <div className="np-prog-date">06 | Set — Domingo</div>
              <div className="np-prog-artist">MARIANA FAGUNDES</div>
              <div className="np-prog-support">
                SOM DE FACULDADE<br />DJ TOPO<br />MARLLON<br />A.JOTA
              </div>
            </div>
          </div>

          {/* Card ingresso abaixo da Programação */}
          <div className="np-card" style={{ marginTop: '40px', marginBottom: '40px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p className="np-card-sub" style={{ textAlign: 'center', marginBottom: 0 }}>Garanta seu lugar no Let's Piri e viva uma experiência inesquecível em Pirenópolis.</p>
            <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '2.5px',
              color: BG,
              background: AMBER,
              border: 'none',
              borderRadius: '10px',
              padding: '16px',
              cursor: 'pointer',
              marginTop: '8px',
              width: '100%',
              textTransform: 'uppercase',
              textDecoration: 'none',
              textAlign: 'center'
            }}>
              Adquirir Ingresso Agora
            </a>
          </div>
        </section>

        {/* ─── PIRENÓPOLIS / EXPERIÊNCIAS ─── */}
        <section className="np-section">
          <h2 className="np-section-title">Por que viver o Let's Piri em Pirenópolis?</h2>
          <div className="np-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '40px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-cachoeira.jpg" alt="Cachoeiras" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Cachoeiras</div>
                <div className="np-grid-card-text">Mergulhe nas águas cristalinas e sinta a energia da natureza</div>
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-ruas-pedra.jpg" alt="Ruas de Pedra" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Ruas de Pedra</div>
                <div className="np-grid-card-text">Caminhe pela história colonial e sinta o charme do lugar</div>
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-por-do-sol.jpg" alt="Pôr do Sol" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Pôr do Sol</div>
                <div className="np-grid-card-text">Quando o céu vira parte da experiência.</div>
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-musica.jpg" alt="Música" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Música</div>
                <div className="np-grid-card-text">Do pôr do sol até o último show</div>
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-gastronomia.jpg" alt="Gastronomia" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Gastronomia</div>
                <div className="np-grid-card-text">A pausa perfeita entre uma experiência e outra</div>
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
              <img src="/piri-amigos.jpg" alt="Amigos" style={{ width: '100%', height: '494px', objectFit: 'cover', display: 'block' }} />
              <div className="np-grid-card" style={{ borderRadius: '0', border: 'none', padding: '20px' }}>
                <div className="np-grid-card-title">Amigos</div>
                <div className="np-grid-card-text">Traga sua turma. O resto a gente prepara.</div>
              </div>
            </div>
          </div>

          {/* Card ingresso abaixo de Por que viver o Let's Piri */}
          <div className="np-card" style={{ marginTop: '32px' }}>
            <p className="np-card-sub" style={{ textAlign: 'center', marginBottom: 0 }}>Garanta seu lugar no Let's Piri e viva uma experiência inesquecível em Pirenópolis.</p>
            <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '2.5px',
              color: BG,
              background: AMBER,
              border: 'none',
              borderRadius: '10px',
              padding: '16px',
              cursor: 'pointer',
              marginTop: '8px',
              width: '100%',
              textTransform: 'uppercase',
              textDecoration: 'none',
              textAlign: 'center'
            }}>
              Adquirir Ingresso Agora
            </a>
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
        <section className="np-section">
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
          <p>letspiri.com &nbsp;·&nbsp; <a href="https://instagram.com/letspiri">@letspiri</a></p>
          <p style={{ marginTop: '5px' }}>Pirenópolis, Goiás &nbsp;·&nbsp; Setembro 2026</p>
        </footer>
      </div>
    </>
  )
}
