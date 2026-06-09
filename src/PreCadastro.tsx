import { useState, useEffect } from 'react'

const INGRESSO_URL = 'https://www.vaideingresso.com.br/lets-piri'

// Countdown até 11/06/2026 às 12:00 horário de Brasília (UTC-3 = 15:00 UTC)
const DEADLINE = new Date('2026-06-11T15:00:00Z').getTime()

function useCountdown() {
  function calc() {
    const diff = Math.max(0, DEADLINE - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      ended: diff === 0,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function PreCadastro() {
  const cd = useCountdown()

  return (
    <div style={styles.page}>
      {/* Background decorative elements */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <img src="/Logo-Lets-Piri.png" alt="Let's Piri Festival" style={styles.logo} />
        </div>

        {/* Tagline */}
        <div style={styles.taglineWrap}>
          <p style={styles.tagline}>
            Uma experiência criada pra sentir.<br />
            Da música ao cenário.<br />
            Do pôr do sol até o último arrepio.
          </p>
        </div>

        {/* Event info */}
        <div style={styles.eventInfo}>
          <span style={styles.eventBadge}>05 e 06 de Setembro</span>
          <span style={styles.eventDot}>·</span>
          <span style={styles.eventBadge}>Pirenópolis, GO</span>
        </div>

        {/* Card de compra */}
        <div style={styles.card}>
          {!cd.ended ? (
            <>
              <p style={styles.prevendaLabel}>Pré-venda encerra em:</p>

              {/* Countdown */}
              <div style={styles.cdRow}>
                <div style={styles.cdBox}>
                  <span style={styles.cdNum}>{pad(cd.days)}</span>
                  <span style={styles.cdUnit}>DIAS</span>
                </div>
                <span style={styles.cdSep}>:</span>
                <div style={styles.cdBox}>
                  <span style={styles.cdNum}>{pad(cd.hours)}</span>
                  <span style={styles.cdUnit}>HORAS</span>
                </div>
                <span style={styles.cdSep}>:</span>
                <div style={styles.cdBox}>
                  <span style={styles.cdNum}>{pad(cd.minutes)}</span>
                  <span style={styles.cdUnit}>MIN</span>
                </div>
                <span style={styles.cdSep}>:</span>
                <div style={styles.cdBox}>
                  <span style={styles.cdNum}>{pad(cd.seconds)}</span>
                  <span style={styles.cdUnit}>SEG</span>
                </div>
              </div>

              <div style={styles.divider} />

              <h2 style={styles.cardTitle}>Garanta seu ingresso</h2>
              <p style={styles.cardSubtitle}>
                Lote promocional disponível por tempo limitado. Após o encerramento, o preço muda.
              </p>

              <a
                href={INGRESSO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btn}
              >
                COMPRAR INGRESSO
              </a>
            </>
          ) : (
            <>
              <h2 style={styles.cardTitle}>A pré-venda encerrou</h2>
              <p style={styles.cardSubtitle}>
                Os ingressos ainda estão disponíveis. Garanta o seu agora.
              </p>
              <a
                href={INGRESSO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btn}
              >
                COMPRAR INGRESSO
              </a>
            </>
          )}
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          Pirenópolis, Goiás &nbsp;·&nbsp; Setembro 2026
        </p>
      </div>
    </div>
  )
}

const GOLD = '#F5C469'
const BG = '#0E7B8C'
const CARD_BG = 'rgba(255,255,255,0.08)'
const WHITE = '#ffffff'
const WHITE_MUTED = 'rgba(255,255,255,0.70)'

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: `linear-gradient(160deg, #0a5f6e 0%, ${BG} 45%, #1aa8bf 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px 24px',
    boxSizing: 'border-box' as const,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif",
  },
  bgCircle1: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(245,196,105,0.07)',
    pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(29,114,101,0.25)',
    pointerEvents: 'none',
  },
  container: {
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
    position: 'relative',
    zIndex: 1,
  },
  logoWrap: {
    marginBottom: '20px',
  },
  logo: {
    width: 'clamp(130px, 42vw, 200px)',
    height: 'auto',
    filter: 'none',
  },
  taglineWrap: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  tagline: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '1.8',
    color: WHITE_MUTED,
    margin: 0,
    letterSpacing: '0.01em',
  },
  eventInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '24px',
  },
  eventBadge: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: '12px',
    color: GOLD,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  eventDot: {
    color: GOLD,
    opacity: 0.5,
    fontSize: '14px',
  },
  card: {
    width: '100%',
    background: CARD_BG,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '20px',
    padding: 'clamp(24px, 6vw, 40px) clamp(20px, 6vw, 36px)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
    textAlign: 'center' as const,
  },
  prevendaLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: '13px',
    color: WHITE_MUTED,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    margin: '0 0 16px 0',
  },
  cdRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '4px',
  },
  cdBox: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '10px',
    padding: '10px 14px',
    minWidth: '58px',
  },
  cdNum: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(22px, 6vw, 32px)',
    color: GOLD,
    lineHeight: 1.1,
  },
  cdUnit: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: '9px',
    color: WHITE_MUTED,
    letterSpacing: '0.1em',
    marginTop: '4px',
  },
  cdSep: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(20px, 5vw, 28px)',
    color: GOLD,
    opacity: 0.5,
    lineHeight: 1,
    marginBottom: '14px',
  },
  divider: {
    width: '32px',
    height: '1.5px',
    background: GOLD,
    opacity: 0.25,
    borderRadius: '2px',
    margin: '20px auto 20px',
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: 'clamp(18px, 5vw, 22px)',
    color: WHITE,
    margin: '0 0 8px 0',
    letterSpacing: '-0.01em',
  },
  cardSubtitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    color: WHITE_MUTED,
    margin: '0 0 24px 0',
    lineHeight: '1.6',
  },
  btn: {
    display: 'block',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.06em',
    color: BG,
    background: `linear-gradient(135deg, ${GOLD} 0%, #e8a93a 100%)`,
    border: 'none',
    borderRadius: '10px',
    padding: '15px',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box' as const,
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  footer: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '12px',
    color: 'rgba(255,255,255,0.35)',
    marginTop: '20px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },
}
