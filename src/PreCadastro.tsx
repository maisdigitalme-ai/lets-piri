import { useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfPyjEAMHwwmBZYSdzt_QpTUi0elrNdsG3ReB0vZnS5bjC-BRVIJY6x9YPg5PzMwxc/exec'
const WHATSAPP_URL = 'https://chat.whatsapp.com/LMeymmvmLJzCPDXsJuck7q'

export default function PreCadastro() {
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
    setError('')
    setLoading(true)
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSuccess(true)
      setTimeout(() => {
        window.location.href = WHATSAPP_URL
      }, 2000)
    } catch {
      setError('Algo deu errado. Tente novamente.')
      setLoading(false)
    }
  }

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

        {/* Card */}
        {!success ? (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Pré-cadastro</h2>
            <p style={styles.cardSubtitle}>
              Garanta seu acesso à pré-venda e entre no grupo exclusivo do festival.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Nome completo</label>
                <input
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="name"
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
                  autoComplete="email"
                />
              </div>

              <div style={styles.fieldWrap}>
                <label style={styles.label}>Telefone / WhatsApp</label>
                <input
                  name="telefone"
                  type="tel"
                  placeholder="(62) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="tel"
                />
              </div>

              {error && <p style={styles.errorMsg}>{error}</p>}

              <button type="submit" disabled={loading} style={{
                ...styles.btn,
                ...(loading ? styles.btnLoading : {}),
              }}>
                {loading ? 'Enviando...' : 'Garantir Pré-Venda'}
              </button>
            </form>
          </div>
        ) : (
          <div style={styles.card}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>Você está na lista!</h2>
            <p style={styles.successText}>
              Redirecionando para o grupo do WhatsApp...
            </p>
          </div>
        )}

        {/* Footer */}
        <p style={styles.footer}>
          Pirenópolis, Goiás &nbsp;·&nbsp; Setembro 2026
        </p>
      </div>
    </div>
  )
}

const TEAL_DARK = '#155c50'
const GOLD = '#F5C469'
const BG = '#0d3d2e'
const CARD_BG = 'rgba(255,255,255,0.06)'
const WHITE = '#ffffff'
const WHITE_MUTED = 'rgba(255,255,255,0.65)'

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: `linear-gradient(160deg, ${BG} 0%, #1a5c4a 50%, ${TEAL_DARK} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
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
    marginBottom: '28px',
  },
  logo: {
    width: 'clamp(160px, 50vw, 240px)',
    height: 'auto',
    filter: 'none',
  },
  taglineWrap: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  tagline: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(13px, 3.5vw, 15px)',
    lineHeight: '1.8',
    color: WHITE_MUTED,
    margin: 0,
    letterSpacing: '0.01em',
  },
  eventInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '36px',
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
    margin: '0 0 28px 0',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '18px',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: '12px',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  },
  input: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    color: WHITE,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '13px 16px',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  btn: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.04em',
    color: BG,
    background: `linear-gradient(135deg, ${GOLD} 0%, #e8a93a 100%)`,
    border: 'none',
    borderRadius: '10px',
    padding: '15px',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'opacity 0.2s, transform 0.15s',
    width: '100%',
    textTransform: 'uppercase' as const,
  },
  btnLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  errorMsg: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '13px',
    color: '#ff8a80',
    margin: '0',
    textAlign: 'center' as const,
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `rgba(245,196,105,0.15)`,
    border: `2px solid ${GOLD}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: GOLD,
    margin: '0 auto 20px',
  },
  successTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '22px',
    color: WHITE,
    textAlign: 'center' as const,
    margin: '0 0 10px 0',
  },
  successText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    color: WHITE_MUTED,
    textAlign: 'center' as const,
    margin: 0,
    lineHeight: '1.6',
  },
  footer: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '12px',
    color: 'rgba(255,255,255,0.35)',
    marginTop: '32px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },
}
