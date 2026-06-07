import { useState, useEffect } from 'react'

const BG = '#0c3545'
const AMBER = '#f0c96a'
const AMBER_DARK = '#C9A84C'
const WHITE = '#f5f0e8'
const MUTED = '#8fb5c2'
const CARD_BG = 'rgba(255,255,255,0.06)'

const API_URL = '/api/subscribe'
const WHATSAPP_URL = 'https://chat.whatsapp.com/DFbq1shJ6zD559HivKtbLb'

// Countdown target: 09/06/2026 12:00 Brasília (UTC-3)
const TARGET_DATE = new Date('2026-06-09T12:00:00-03:00').getTime()

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    function calc() {
      const diff = TARGET_DATE - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
      })
    }
    calc()
    const id = setInterval(calc, 10000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function useCounter(start: number, intervalMs: number) {
  const [count, setCount] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return count
}

export default function Prevenda() {
  const { days, hours, minutes } = useCountdown()
  const count = useCounter(3512, 20000)
  const isOpen = TARGET_DATE - Date.now() <= 0

  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (name === 'telefone') {
      const digits = value.replace(/\D/g, '').slice(0, 11)
      let formatted = digits
      if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`
      if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
      setForm(f => ({ ...f, telefone: formatted }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim()) {
      setError('Preencha todos os campos para continuar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      setTimeout(() => { window.location.href = WHATSAPP_URL }, 2000)
    } catch {
      setError('Algo deu errado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const formatCount = (n: number) => n.toLocaleString('pt-BR')

  return (
    <div style={styles.page}>
      {/* bg circles */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>

        {/* 1. LOGO */}
        <div style={styles.logoWrap}>
          <img src="/logo-full.png" alt="Let's Piri" style={styles.logo} />
        </div>

        {/* 2. DATE BADGE */}
        <div style={styles.dateBadge}>
          05 e 06 de setembro &nbsp;·&nbsp;{' '}
          <span style={{ color: AMBER, fontWeight: 600 }}>Pirenópolis, GO</span>
          &nbsp;·&nbsp; Véspera de feriado
        </div>

        {/* 3. ARTIST PLACEHOLDER */}
        <div style={styles.artistsWrap}>
          <div style={styles.artistsPlaceholder}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.2" style={{ opacity: 0.35 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span style={styles.placeholderText}>arte dos artistas</span>
          </div>

          <div style={styles.artistsNames}>
            <div style={styles.artistEntry}>
              <div style={styles.artistName}>Panda</div>
              <div style={styles.artistSupport}>CDB<br />Back 2 Brothers<br />A.Jota</div>
            </div>
            <div style={styles.artistEntry}>
              <div style={styles.artistName}>Mariana Fagundes</div>
              <div style={styles.artistSupport}>Som de Faculdade<br />DJ Topo<br />Marllon</div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div style={styles.divider} />

        {/* 4. COUNTDOWN */}
        {isOpen ? (
          <div style={styles.openNow}>A PRÉ-VENDA ESTÁ ABERTA!</div>
        ) : (
          <>
            <div style={styles.countdownHeadline}>A pré-venda abre em:</div>
            <div style={styles.countdown}>
              <div style={styles.countdownItem}>
                <span style={styles.countNum}>{pad(days)}</span>
                <span style={styles.countUnit}>dias</span>
              </div>
              <div style={styles.countdownItem}>
                <span style={styles.countNum}>{pad(hours)}</span>
                <span style={styles.countUnit}>horas</span>
              </div>
              <div style={styles.countdownItem}>
                <span style={styles.countNum}>{pad(minutes)}</span>
                <span style={styles.countUnit}>min</span>
              </div>
            </div>
          </>
        )}

        {/* 5. SOCIAL PROOF */}
        <div style={styles.socialProof}>
          <div style={styles.dot} />
          <span>
            <strong style={{ color: AMBER }}>{formatCount(count)}</strong>
            {' '}pessoas já se cadastraram
          </span>
        </div>

        {/* 6. FORM CARD */}
        <div style={styles.card}>
          {success ? (
            <div style={{ textAlign: 'center' }}>
              <div style={styles.successIcon}>✓</div>
              <p style={styles.successTitle}>Cadastro confirmado!</p>
              <p style={styles.successText}>
                Você será redirecionado para o grupo exclusivo em instantes.
              </p>
              <a href={WHATSAPP_URL} style={styles.fallbackBtn}>
                Entrar no grupo agora
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.cardTitle}>Pré-cadastro</div>
              <p style={styles.cardSubtitle}>
                Garanta seu acesso à pré-venda e entre no grupo exclusivo do festival.
              </p>

              <div style={styles.fieldWrap}>
                <label style={styles.label}>Nome completo</label>
                <input
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldWrap}>
                <label style={styles.label}>E-mail</label>
                <input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldWrap}>
                <label style={styles.label}>Telefone / WhatsApp</label>
                <input
                  name="telefone"
                  type="tel"
                  placeholder="(DDD) 9 0000-0000"
                  value={form.telefone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {error && <p style={styles.errorMsg}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.btn, ...(loading ? styles.btnLoading : {}) }}
              >
                {loading ? 'Aguarde...' : 'Garantir pré-venda'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>letspiri.com &nbsp;·&nbsp; <a href="https://instagram.com/letspiri" style={{ color: AMBER, textDecoration: 'none' }}>@letspiri</a></p>
        <p style={{ marginTop: '6px' }}>Pirenópolis, Goiás &nbsp;·&nbsp; Setembro 2026</p>
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: `linear-gradient(175deg, ${BG} 0%, #15475b 55%, #1e6070 100%)`,
    color: WHITE,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(240,201,106,0.07)',
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
    maxWidth: '640px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '52px 24px 40px',
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  logoWrap: { marginBottom: '20px' },
  logo: {
    width: 'clamp(130px, 42vw, 180px)',
    height: 'auto',
  },
  dateBadge: {
    fontSize: '10.5px',
    fontWeight: 500,
    letterSpacing: '3.5px',
    color: MUTED,
    textTransform: 'uppercase',
    marginBottom: '32px',
    textAlign: 'center',
  },
  artistsWrap: {
    width: '100%',
    marginBottom: '52px',
  },
  artistsPlaceholder: {
    width: '100%',
    aspectRatio: '16/9',
    background: 'rgba(255,255,255,0.04)',
    border: `1.5px dashed rgba(240,201,106,0.25)`,
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: MUTED,
  },
  placeholderText: {
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    opacity: 0.45,
  },
  artistsNames: {
    marginTop: '18px',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  artistEntry: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  artistName: {
    fontSize: '17px',
    fontWeight: 600,
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  artistSupport: {
    fontSize: '10.5px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: MUTED,
    fontWeight: 400,
    marginTop: '7px',
    lineHeight: 1.9,
    textAlign: 'center',
  },
  divider: {
    width: '36px',
    height: '1.5px',
    background: AMBER_DARK,
    opacity: 0.3,
    borderRadius: '2px',
    marginBottom: '44px',
  },
  countdownHeadline: {
    fontSize: 'clamp(22px, 5vw, 36px)',
    fontWeight: 600,
    marginBottom: '24px',
    letterSpacing: '-0.3px',
    textAlign: 'center',
  },
  openNow: {
    fontSize: '20px',
    fontWeight: 600,
    color: AMBER,
    letterSpacing: '3px',
    padding: '16px',
    marginBottom: '24px',
  },
  countdown: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    marginBottom: '56px',
  },
  countdownItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid rgba(240,201,106,0.18)`,
    borderRadius: '16px',
    padding: '20px 26px',
    minWidth: '90px',
  },
  countNum: {
    fontSize: '44px',
    fontWeight: 600,
    color: AMBER,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  countUnit: {
    fontSize: '9.5px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: MUTED,
    marginTop: '8px',
    fontWeight: 500,
  },
  socialProof: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(240,201,106,0.07)',
    border: `1px solid rgba(240,201,106,0.18)`,
    borderRadius: '100px',
    padding: '10px 22px',
    marginBottom: '44px',
    fontSize: '13px',
  },
  dot: {
    width: '7px',
    height: '7px',
    background: '#4ade80',
    borderRadius: '50%',
    flexShrink: 0,
    animation: 'pulse 2s infinite',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    background: CARD_BG,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: 'clamp(28px, 6vw, 40px) clamp(22px, 6vw, 36px)',
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 'clamp(18px, 5vw, 22px)',
    color: WHITE,
    margin: '0 0 8px 0',
    letterSpacing: '-0.01em',
  },
  cardSubtitle: {
    fontWeight: 400,
    fontSize: '14px',
    color: MUTED,
    margin: '0 0 28px 0',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontWeight: 600,
    fontSize: '10px',
    color: MUTED,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    color: WHITE,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '14px 18px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  btn: {
    fontFamily: "'Poppins', sans-serif",
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
    transition: 'opacity 0.2s, transform 0.15s',
  },
  btnLoading: { opacity: 0.7, cursor: 'not-allowed' },
  errorMsg: {
    fontSize: '13px',
    color: '#ff8a80',
    margin: 0,
    textAlign: 'center',
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `rgba(240,201,106,0.15)`,
    border: `2px solid ${AMBER}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: AMBER,
    margin: '0 auto 20px',
  },
  successTitle: {
    fontWeight: 600,
    fontSize: '22px',
    color: WHITE,
    textAlign: 'center',
    margin: '0 0 10px 0',
  },
  successText: {
    fontSize: '14px',
    color: MUTED,
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.6,
  },
  fallbackBtn: {
    display: 'block',
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '13px',
    letterSpacing: '0.05em',
    color: BG,
    background: AMBER,
    border: 'none',
    borderRadius: '10px',
    padding: '13px 20px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    width: '100%',
    boxSizing: 'border-box',
  },
  footer: {
    textAlign: 'center',
    padding: '28px 24px',
    background: 'rgba(10,46,58,0.8)',
    fontSize: '11.5px',
    color: MUTED,
    letterSpacing: '1px',
    width: '100%',
  },
}
