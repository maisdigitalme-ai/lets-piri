import { useEffect, useState } from 'react'

const BG = '#071e22'
const AMBER = '#f0c96a'
const AMBER_DARK = '#c9a84c'
const WHITE = '#f7f4eb'
const MUTED = 'rgba(247,244,235,0.68)'
const CARD_BG = 'rgba(255,255,255,0.045)'

const INGRESSO_URL = 'https://www.vaideingresso.com.br/lets-piri'
const TERMO_MENORES_URL = '/Autoriza%C3%A7%C3%A3odeEntradaePermanenciadeMenores-LetsPiri.pdf'
const ESTACIONAMENTO_URL = 'https://www.vaideingresso.com.br/estacionamento-lets-piri'
const EVENT_START_AT = new Date('2026-09-05T00:00:00-03:00').getTime()

function getCountdown() {
  const distance = Math.max(0, EVENT_START_AT - Date.now())
  return {
    isToday: distance === 0,
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60)
  }
}

const padCountdown = (value: number) => String(value).padStart(2, '0')

export default function NovaPg() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const handleNewsletter = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: newsletterEmail.split('@')[0], email: newsletterEmail, telefone: '00000000000' }),
      })
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const faqItems: Array<{ q: string; a: string }> = [
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
      a: 'FRONTSTAGE\nA pista principal, bem em frente ao palco. Ideal para quem gosta de curtir os shows no meio da galera e sentir toda a energia do evento.\n\nInclui:\n• Acesso ao Frontstage\n• Área de descanso\n• Banheiros premium climatizados\n• Bares\n• Serviço de garçom\n\nBACKSTAGE\nÁrea elevada com visão panorâmica do palco. Perfeita para quem busca mais conforto e sofisticação, sem abrir mão da animação.\n\nInclui:\n• Acesso livre ao Frontstage\n• Bares exclusivos\n• Serviço de garçom\n\nLOUNGES\nEspaços privativos para grupos de até 13 pessoas. Ideal para quem deseja curtir com amigos ou familiares em um ambiente reservado e confortável.\n\nInclui:\n• Lounge mobiliado com sofá e bistrô\n• 1 kit exclusivo Let\'s Piri com garrafa de Campari autografada por Panda e Mariana Fagundes\n• Acesso livre às outras áreas\n• Banheiros premium climatizados\n• Bares exclusivos\n• Serviço de garçom'
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
      a: 'Sim. Adolescentes de 16 e 17 anos poderão acessar o evento desde que estejam acompanhados pelos pais ou responsável legal e apresentem o Termo de Responsabilidade devidamente preenchido e assinado.\n\nMenores de 15 anos ou menos somente poderão entrar acompanhados pelos pais ou responsável legal.\n\nRecomendamos que todos os menores e responsáveis portem documento oficial com foto para apresentação na entrada do evento.'
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
          background: ${BG};
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
          padding: clamp(16px, 3vw, 32px) 20px;
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
          text-align: left;
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
          transition: max-height 0.6s ease;
          padding: 0 20px;
        }
        
        .np-faq-item.active .np-faq-answer {
          max-height: 2000px;
          padding: 0 20px 20px;
        }
        
        .np-faq-answer-text {
          font-size: 14px;
          line-height: 1.8;
          color: ${MUTED};
          white-space: pre-line;
          text-align: left;
          padding: 4px 0;
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
            padding: 24px 16px;
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

        /* Adaptação premium inspirada em /patrocinador */
        html, body { background: ${BG}; }

        .np-hero-shell {
          position: relative;
          min-height: min(760px, 100vh);
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(240,201,106,0.14);
        }

        .np-hero-bg {
          position: absolute;
          inset: 0;
          background: url('/piri-bg-igreja.jpg') center 38% / cover no-repeat;
          opacity: 0.42;
          transform: scale(1.03);
        }

        .np-hero-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7,30,34,0.72) 0%, rgba(7,30,34,0.33) 36%, rgba(7,30,34,0.76) 83%, ${BG} 100%);
        }

        .np-hero {
          z-index: 2;
          padding: 64px 20px 104px;
        }

        .np-logo {
          filter: drop-shadow(0 0 20px rgba(240,201,106,0.24));
          margin-bottom: 22px;
        }

        .np-date {
          display: inline-block;
          color: ${MUTED};
          background: rgba(7,30,34,0.46);
          border: 1px solid rgba(240,201,106,0.26);
          border-radius: 999px;
          padding: 9px 17px;
          margin-bottom: 14px;
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 2.25px;
          backdrop-filter: blur(10px);
        }

        .np-date span { color: ${AMBER}; }

        .np-countdown {
          display: flex;
          width: fit-content;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 42px;
          margin: 0 auto 22px;
          padding: 8px 16px;
          color: ${WHITE};
          background: rgba(7,30,34,0.56);
          border: 1px solid rgba(240,201,106,0.28);
          border-radius: 999px;
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .np-countdown-label {
          padding-right: 12px;
          color: ${MUTED};
          border-right: 1px solid rgba(240,201,106,0.22);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2px;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .np-countdown-values { display: inline-flex; align-items: center; gap: 8px; }
        .np-countdown-unit { display: inline-flex; align-items: baseline; gap: 3px; }
        .np-countdown-unit strong { color: ${WHITE}; font-size: 14px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
        .np-countdown-unit small { color: ${AMBER}; font-size: 7px; font-weight: 600; letter-spacing: 0.7px; text-transform: uppercase; }
        .np-countdown-separator { color: rgba(240,201,106,0.52); font-size: 11px; line-height: 1; }
        .np-countdown-today { min-width: 168px; color: ${AMBER}; background: rgba(240,201,106,0.10); font-size: 13px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; }

        .np-banner-desktop, .np-banner-mobile {
          border: 1px solid rgba(240,201,106,0.22);
          box-shadow: 0 24px 70px rgba(0,0,0,0.42), 0 0 0 1px rgba(7,30,34,0.26);
        }

        .np-divider {
          width: 54px;
          margin: 27px auto 22px;
          background: linear-gradient(90deg, transparent, ${AMBER}, transparent);
          opacity: 1;
        }

        .np-hero-cta, .np-card a, .np-newsletter-btn {
          display: inline-block;
          color: ${BG} !important;
          background: ${AMBER} !important;
          border-radius: 10px !important;
          padding: 16px 30px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          line-height: 1;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 8px 26px rgba(240,201,106,0.26);
          transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), background 180ms ease, box-shadow 180ms ease;
        }

        .np-hero-cta:hover, .np-card a:hover, .np-newsletter-btn:hover {
          background: ${AMBER_DARK} !important;
          color: ${BG} !important;
          transform: translateY(-3px);
          box-shadow: 0 14px 34px rgba(240,201,106,0.34);
        }

        .np-hero-ctas {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .np-hero-cta-secondary {
          color: ${AMBER} !important;
          background: rgba(7,30,34,0.56) !important;
          border: 1px solid rgba(240,201,106,0.52);
          box-shadow: none;
        }

        .np-hero-cta-secondary:hover {
          color: ${BG} !important;
          background: ${AMBER} !important;
        }

        .np-hero-cta-pix {
          color: #062126 !important;
          background: #4ecdc4 !important;
          box-shadow: 0 8px 26px rgba(78,205,196,0.24);
        }

        .np-hero-cta-pix:hover {
          color: #062126 !important;
          background: #78e3dc !important;
          box-shadow: 0 14px 34px rgba(78,205,196,0.34);
        }

        .np-hero-cta-parking {
          color: #251511 !important;
          background: #e89576 !important;
          box-shadow: 0 8px 26px rgba(232,149,118,0.24);
        }

        .np-hero-cta-parking:hover {
          color: #251511 !important;
          background: #f2ad91 !important;
          box-shadow: 0 14px 34px rgba(232,149,118,0.34);
        }

        .np-hero-cta:active, .np-card a:active, .np-newsletter-btn:active { transform: scale(0.97); }

        .np-scroll-hint {
          position: absolute;
          bottom: 27px;
          left: 50%;
          z-index: 2;
          transform: translateX(-50%);
          color: rgba(247,244,235,0.60);
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .np-scroll-hint span { color: ${AMBER}; font-size: 17px; line-height: 1; }

        .np-section {
          max-width: 1060px;
          padding: clamp(54px, 7vw, 88px) 22px;
          border-top: 1px solid rgba(240,201,106,0.12);
        }

        .np-section-title {
          color: ${WHITE};
          line-height: 1.14;
          letter-spacing: -0.9px;
          margin-bottom: 25px;
        }

        .np-section-title::before {
          content: 'LET\'S PIRI';
          display: block;
          margin-bottom: 13px;
          color: ${AMBER};
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3.6px;
          text-transform: uppercase;
        }

        .np-section-subtitle { color: ${MUTED}; max-width: 760px; }

        .np-card, .np-grid-card, .np-prog-card, .np-faq-item, .np-newsletter {
          background: linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025));
          border-color: rgba(240,201,106,0.18);
          box-shadow: 0 10px 30px rgba(0,0,0,0.16);
        }

        .np-prog-grid { gap: 20px; margin-top: 36px; }

        .np-prog-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: clamp(28px, 5vw, 38px);
          transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1), border-color 220ms ease, box-shadow 220ms ease;
        }

        .np-prog-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20%;
          width: 60%;
          height: 2px;
          background: ${AMBER};
          opacity: 0.75;
        }

        .np-prog-card:hover, .np-grid > div:hover {
          transform: translateY(-6px);
          border-color: rgba(240,201,106,0.45);
          box-shadow: 0 18px 42px rgba(0,0,0,0.34);
        }

        .np-prog-date { color: ${AMBER}; font-size: 11px; letter-spacing: 2.4px; }
        .np-prog-artist { color: ${WHITE}; }
        .np-prog-support, .np-grid-card-text, .np-faq-answer-text, .np-newsletter-text { color: ${MUTED}; }

        .np-grid { gap: 20px !important; }

        .np-grid > div {
          background: rgba(255,255,255,0.03);
          border-color: rgba(240,201,106,0.18) !important;
          border-radius: 18px !important;
          transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1), border-color 220ms ease, box-shadow 220ms ease;
        }

        .np-grid > div > img {
          filter: saturate(0.82) contrast(1.05);
          transition: transform 420ms cubic-bezier(0.23, 1, 0.32, 1), filter 420ms ease;
        }

        .np-grid > div:hover > img { transform: scale(1.045); filter: saturate(1) contrast(1.05); }
        .np-grid-card-title { color: ${WHITE}; }

        .np-faq-item { margin-bottom: 12px; border-radius: 14px; }
        .np-faq-question { padding: 20px 22px; width: 100%; border: 0; background: transparent; font-family: inherit; }
        .np-faq-question:hover { background: rgba(240,201,106,0.055); }
        .np-faq-icon { color: ${AMBER}; font-size: 15px; }
        .np-faq-item.active { border-color: rgba(240,201,106,0.42); }
        .np-faq-answer-text { border-top: 1px solid rgba(240,201,106,0.12); padding-top: 16px; }
        .np-minor-term-block { max-width: 700px; margin: 30px auto 0; padding: clamp(24px, 5vw, 34px); background: linear-gradient(145deg, rgba(240,201,106,0.11), rgba(255,255,255,0.035)); border: 1px solid rgba(240,201,106,0.42); border-radius: 16px; box-shadow: 0 14px 38px rgba(0,0,0,0.24); text-align: center; }
        .np-minor-term-kicker { margin: 0 0 10px; color: ${AMBER}; font-size: 10px; font-weight: 600; letter-spacing: 2.6px; text-transform: uppercase; }
        .np-minor-term-title { margin: 0 0 10px; color: ${WHITE}; font-size: clamp(18px, 4vw, 24px); line-height: 1.3; }
        .np-minor-term-text { max-width: 560px; margin: 0 auto 20px; color: ${MUTED}; font-size: 13px; line-height: 1.7; }
        .np-minor-term-link { display: flex; width: 100%; align-items: center; justify-content: center; gap: 12px; color: ${BG}; background: ${AMBER}; border: 1px solid ${AMBER}; border-radius: 10px; padding: 16px 20px; text-decoration: none; font-size: clamp(12px, 2.4vw, 15px); font-weight: 700; letter-spacing: 0.4px; box-shadow: 0 9px 28px rgba(240,201,106,0.24); transition: background 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease; }
        .np-minor-term-link:hover { color: ${BG}; background: #f5d784; border-color: #f5d784; transform: translateY(-2px); box-shadow: 0 14px 34px rgba(240,201,106,0.34); }
        .np-minor-term-arrow { font-size: 20px; line-height: 1; }

        .np-newsletter { border-radius: 18px; max-width: 620px; }
        .np-newsletter-input { border-color: rgba(240,201,106,0.24); background: rgba(7,30,34,0.55); }
        .np-newsletter-input:focus { outline: none; border-color: ${AMBER}; box-shadow: 0 0 0 3px rgba(240,201,106,0.11); }

        .np-footer {
          margin-top: 0;
          padding: 36px 20px;
          background: #051518;
          border-top: 1px solid rgba(240,201,106,0.16);
        }

        @media (max-width: 600px) {
          .np-hero-shell { min-height: auto; }
          .np-hero { padding: 54px 16px 92px; }
          .np-date { font-size: 9px; padding: 8px 13px; letter-spacing: 1.55px; }
          .np-countdown { gap: 9px; padding: 8px 12px; }
          .np-countdown-label { padding-right: 9px; font-size: 7px; letter-spacing: 1.5px; }
          .np-countdown-values { gap: 6px; }
          .np-countdown-unit strong { font-size: 13px; }
          .np-countdown-unit small { font-size: 6px; }
          .np-hero-ctas { flex-direction: column; }
          .np-hero-cta { width: 100%; max-width: 360px; }
          .np-section { padding: 52px 16px; }
          .np-section-title::before { letter-spacing: 2.8px; }
        }
      `}</style>

      <div className="np-wrap">
        <div className="np-deco np-deco1" />
        <div className="np-deco np-deco2" />

        {/* HERO */}
        <section className="np-hero-shell">
          <div className="np-hero-bg" />
          <div className="np-hero-shade" />
          <div className="np-deco np-deco1" />
          <div className="np-hero">
            <img src="/Logo-Lets-Piri.png" alt="Let's Piri" className="np-logo" />

            <div className="np-artists-wrap">
              <img src="/BannerArtistas-1280x720.png" alt="Artistas Let's Piri" className="np-banner-desktop" />
              <img src="/BannerArtistas-1080x1350.png" alt="Artistas Let's Piri" className="np-banner-mobile" />
            </div>

            <div className="np-date">
              05 e 06 de setembro <span>·</span> Pirenópolis, GO <span>·</span> Véspera de feriado
            </div>

            {countdown.isToday ? (
              <div className="np-countdown np-countdown-today" role="timer" aria-live="polite">É HOJE</div>
            ) : (
              <div className="np-countdown" role="timer" aria-live="polite" aria-label={`${countdown.days} dias, ${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos para o evento`}>
                <span className="np-countdown-values">
                  <span className="np-countdown-unit"><strong>{padCountdown(countdown.days)}</strong><small>dias</small></span>
                  <span className="np-countdown-separator">:</span>
                  <span className="np-countdown-unit"><strong>{padCountdown(countdown.hours)}</strong><small>h</small></span>
                  <span className="np-countdown-separator">:</span>
                  <span className="np-countdown-unit"><strong>{padCountdown(countdown.minutes)}</strong><small>m</small></span>
                  <span className="np-countdown-separator">:</span>
                  <span className="np-countdown-unit"><strong>{padCountdown(countdown.seconds)}</strong><small>s</small></span>
                </span>
              </div>
            )}
            <div className="np-hero-ctas">
              <a href={INGRESSO_URL} target="_blank" rel="noopener noreferrer" className="np-hero-cta">
                Adquirir ingresso
              </a>
              <a href="https://wa.me/556291436445?text=Ol%C3%A1%21%20Quero%20reservar%20um%20lounge%20para%20o%20Let%27s%20Piri." target="_blank" rel="noopener noreferrer" className="np-hero-cta np-hero-cta-secondary" aria-label="Reservar lounge pelo WhatsApp">
                Reservar lounge
              </a>
              <a href="https://wa.me/556292861883?text=Ol%C3%A1%21%20Quero%20comprar%20meu%20ingresso%20via%20PIX%20sem%20taxa%20para%20o%20Let%27s%20Piri." target="_blank" rel="noopener noreferrer" className="np-hero-cta np-hero-cta-pix" aria-label="Comprar ingresso PIX sem taxa pelo WhatsApp">
                Ingresso PIX sem taxa
              </a>
              <a href={ESTACIONAMENTO_URL} target="_blank" rel="noopener noreferrer" className="np-hero-cta np-hero-cta-parking" aria-label="Comprar ticket de estacionamento para o Let's Piri">
                Ticket Estacionamento
              </a>
            </div>
          </div>
          <div className="np-scroll-hint" aria-hidden="true">Conheça a experiência <span>↓</span></div>
        </section>

        {/* ─── STORYTELLING ─── */}
        <section className="np-section">
          <h2 className="np-section-title">O que é Let's Piri?</h2>
          <p className="np-section-subtitle" style={{ fontStyle: 'italic', fontWeight: 500, lineHeight: 2 }}>
            LET'S é movimento.<br />
            É convite.<br />
            É ir.<br />
            É experiência.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 24 }}>
            O Let's Piri nasce para transformar o feriado da Independência em uma experiência diferente em Pirenópolis.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 20 }}>
            Mais do que um evento, é um encontro entre música, natureza, pôr do sol, amigos e uma atmosfera pensada para ser vivida do início ao fim.
          </p>
          <p className="np-section-subtitle" style={{ marginTop: 20 }}>
            Nos dias 05 e 06 de setembro, Pirenópolis recebe uma proposta que foge do comum. Um festival ao ar livre, conectado à natureza, com cenografia imersiva, espaços instagramáveis, grandes artistas e experiências criadas para quem busca viver algo além dos shows.
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
          <div className="np-card" style={{ marginTop: '40px', marginBottom: '0px', marginLeft: 'auto', marginRight: 'auto' }}>
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
                <button
                  type="button"
                  className="np-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  aria-expanded={expandedFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{item.q}</span>
                  <span className="np-faq-icon" aria-hidden="true">▼</span>
                </button>
                <div id={`faq-answer-${idx}`} className="np-faq-answer">
                  <div className="np-faq-answer-text">{item.a}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="np-minor-term-block">
            <p className="np-minor-term-kicker">Documento obrigatório para menores</p>
            <h3 className="np-minor-term-title">Termo de Responsabilidade para Menores</h3>
            <p className="np-minor-term-text">Menores de idade devem apresentar o termo de responsabilidade devidamente preenchido e assinado, conforme as orientações da organização.</p>
            <a className="np-minor-term-link" href={TERMO_MENORES_URL} target="_blank" rel="noopener noreferrer" download>
              <span>Baixar Termo de Responsabilidade para Menores</span>
              <span className="np-minor-term-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="np-section">
          <div className="np-newsletter">
            <h3 className="np-newsletter-title">Fique por dentro</h3>
            <p className="np-newsletter-text">
              Receba novidades, line-up, viradas de lote e experiências em primeira mão
            </p>
            {newsletterStatus === 'success' ? (
              <p style={{ color: AMBER, fontWeight: 600, textAlign: 'center', marginTop: '16px' }}>
                ✓ Inscrito com sucesso! Verifique seu e-mail.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  className="np-newsletter-input"
                  placeholder="seu@email.com"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNewsletter()}
                  disabled={newsletterStatus === 'loading'}
                />
                <button
                  className="np-newsletter-btn"
                  onClick={handleNewsletter}
                  disabled={newsletterStatus === 'loading'}
                  style={{ opacity: newsletterStatus === 'loading' ? 0.7 : 1 }}
                >
                  {newsletterStatus === 'loading' ? 'Enviando...' : 'Inscrever-se'}
                </button>
                {newsletterStatus === 'error' && (
                  <p style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center', marginTop: '8px' }}>
                    Erro ao inscrever. Tente novamente.
                  </p>
                )}
              </>
            )}
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
