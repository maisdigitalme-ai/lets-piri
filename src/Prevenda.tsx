import { useState, useEffect } from 'react'

const BG = '#0E7B8C'
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    function calc() {
      const diff = TARGET_DATE - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])
  return timeLeft
}

// Contador baseado no tempo decorrido desde o lançamento da página
// Lançamento: 07/06/2026 17:00 Brasília — base 3.512
const COUNTER_BASE = 3512
const COUNTER_START_TS = new Date('2026-06-07T17:00:00-03:00').getTime()
const COUNTER_INTERVAL_MS = 20000 // +1 a cada 20s

function useCounter() {
  function calcCurrent() {
    const elapsed = Date.now() - COUNTER_START_TS
    const increments = Math.floor(elapsed / COUNTER_INTERVAL_MS)
    return COUNTER_BASE + Math.max(0, increments)
  }
  const [count, setCount] = useState(calcCurrent)
  useEffect(() => {
    const id = setInterval(() => setCount(calcCurrent), COUNTER_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
  return count
}

export default function Prevenda() {
  const { days, hours, minutes, seconds } = useCountdown()
  const count = useCounter()
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
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        #root { min-height: 100vh; }
        .pv-page {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(160deg, #0a5f6e 0%, ${BG} 45%, #1aa8bf 100%);
          color: ${WHITE};
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pv-deco {
          position: absolute;
          background-image: url(/catavento.png);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
        }
        .pv-deco1 { top: 120px; right: -70px; width: 280px; height: 280px; }
        .pv-deco2 { bottom: -50px; left: -50px; width: 200px; height: 200px; }
        .pv-container {
          width: 100%;
          max-width: 640px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 48px 20px 40px;
          position: relative;
          z-index: 1;
        }
        .pv-logo { width: clamp(110px, 38vw, 170px); height: auto; filter: brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(500%) hue-rotate(5deg) brightness(105%); margin-bottom: 18px; }
        .pv-date-badge {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          color: ${MUTED};
          text-transform: uppercase;
          margin-bottom: 28px;
          text-align: center;
          line-height: 1.8;
        }
        .pv-date-badge span { color: ${AMBER}; font-weight: 600; }
        .pv-artists-wrap { width: 100%; margin-bottom: 44px; }
        .pv-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(255,255,255,0.04);
          border: 1.5px dashed rgba(240,201,106,0.25);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: ${MUTED};
        }
        .pv-placeholder-text { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.4; }
        .pv-artists-names {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: clamp(20px, 8vw, 48px);
          flex-wrap: wrap;
        }
        .pv-artist-entry { display: flex; flex-direction: column; align-items: center; }
        .pv-artist-name {
          font-size: clamp(13px, 3.5vw, 17px);
          font-weight: 600;
          color: ${WHITE};
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
        }
        .pv-artist-support {
          font-size: clamp(9px, 2.2vw, 10.5px);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${MUTED};
          font-weight: 400;
          margin-top: 6px;
          line-height: 1.9;
          text-align: center;
        }
        .pv-divider { width: 32px; height: 1.5px; background: ${AMBER_DARK}; opacity: 0.3; border-radius: 2px; margin-bottom: 40px; }
        .pv-countdown-headline {
          font-size: clamp(20px, 5.5vw, 34px);
          font-weight: 600;
          margin-bottom: 22px;
          letter-spacing: -0.3px;
          text-align: center;
        }
        .pv-countdown {
          display: flex;
          gap: clamp(8px, 2.5vw, 14px);
          justify-content: center;
          margin-bottom: 48px;
          flex-wrap: nowrap;
        }
        .pv-countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(240,201,106,0.18);
          border-radius: 14px;
          padding: clamp(12px, 3vw, 20px) clamp(10px, 3.5vw, 24px);
          min-width: clamp(60px, 18vw, 88px);
          flex: 1;
          max-width: 100px;
        }
        .pv-count-num {
          font-size: clamp(28px, 8vw, 44px);
          font-weight: 600;
          color: ${AMBER};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .pv-count-unit {
          font-size: clamp(7px, 1.8vw, 9.5px);
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-top: 6px;
          font-weight: 500;
        }
        .pv-social-proof {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(240,201,106,0.07);
          border: 1px solid rgba(240,201,106,0.18);
          border-radius: 100px;
          padding: 10px 20px;
          margin-bottom: 40px;
          font-size: clamp(12px, 3.2vw, 13px);
          text-align: center;
        }
        .pv-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; flex-shrink: 0; }
        .pv-card {
          width: 100%;
          max-width: 480px;
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: clamp(24px, 6vw, 40px) clamp(18px, 5vw, 36px);
        }
        .pv-card-title { font-weight: 600; font-size: clamp(17px, 5vw, 22px); color: ${WHITE}; margin-bottom: 8px; }
        .pv-card-subtitle { font-size: 13px; color: ${MUTED}; margin-bottom: 24px; line-height: 1.6; }
        .pv-form { display: flex; flex-direction: column; gap: 16px; }
        .pv-field { display: flex; flex-direction: column; gap: 6px; }
        .pv-label { font-weight: 600; font-size: 10px; color: ${MUTED}; letter-spacing: 2.5px; text-transform: uppercase; }
        .pv-input {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          color: ${WHITE};
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 16px;
          width: 100%;
          outline: none;
          -webkit-appearance: none;
        }
        .pv-input::placeholder { color: rgba(143,181,194,0.5); }
        .pv-input:focus { border-color: rgba(240,201,106,0.4); background: rgba(255,255,255,0.09); }
        .pv-btn {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 2.5px;
          color: ${BG};
          background: ${AMBER};
          border: none;
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          margin-top: 6px;
          width: 100%;
          text-transform: uppercase;
          -webkit-tap-highlight-color: transparent;
        }
        .pv-btn:active { transform: scale(0.97); }
        .pv-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .pv-error { font-size: 13px; color: #ff8a80; text-align: center; }
        .pv-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(240,201,106,0.15);
          border: 2px solid ${AMBER};
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: ${AMBER}; margin: 0 auto 18px;
        }
        .pv-success-title { font-weight: 600; font-size: 20px; color: ${WHITE}; text-align: center; margin-bottom: 8px; }
        .pv-success-text { font-size: 13px; color: ${MUTED}; text-align: center; line-height: 1.6; }
        .pv-fallback-btn {
          display: block; margin-top: 18px;
          font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 13px;
          letter-spacing: 0.05em; color: ${BG}; background: ${AMBER};
          border-radius: 10px; padding: 13px 20px; text-align: center;
          text-decoration: none; text-transform: uppercase; width: 100%;
        }
        .pv-footer {
          text-align: center; padding: 24px 20px;
          background: rgba(10,46,58,0.8);
          font-size: 11px; color: ${MUTED}; letter-spacing: 1px; width: 100%;
        }
        .pv-footer a { color: ${AMBER}; text-decoration: none; }
        .pv-open-now { font-size: 18px; font-weight: 600; color: ${AMBER}; letter-spacing: 3px; padding: 14px; margin-bottom: 20px; text-align: center; }
        @media (max-width: 380px) {
          .pv-countdown { gap: 6px; }
          .pv-countdown-item { padding: 10px 8px; min-width: 56px; }
        }
      `}</style>

      <div className="pv-page">
        <div className="pv-deco pv-deco1" />
        <div className="pv-deco pv-deco2" />

        <div className="pv-container">

          {/* LOGO */}
          <img src="/Logo-Lets-Piri.png" alt="Let's Piri" className="pv-logo" />

          {/* DATE BADGE */}
          <div className="pv-date-badge">
            05 e 06 de setembro &nbsp;·&nbsp;{' '}
            <span>Pirenópolis, GO</span>
            &nbsp;·&nbsp; Véspera de feriado
          </div>

          {/* ARTISTS */}
          <div className="pv-artists-wrap">
            <div className="pv-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.2" style={{ opacity: 0.35 }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span className="pv-placeholder-text">arte dos artistas</span>
            </div>
            <div className="pv-artists-names">
              <div className="pv-artist-entry">
                <div className="pv-artist-name">Panda</div>
                <div className="pv-artist-support">CDB<br />Back 2 Brothers<br />A.Jota</div>
              </div>
              <div className="pv-artist-entry">
                <div className="pv-artist-name">Mariana Fagundes</div>
                <div className="pv-artist-support">Som de Faculdade<br />DJ Topo<br />Marllon</div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="pv-divider" />

          {/* COUNTDOWN */}
          {isOpen ? (
            <div className="pv-open-now">A PRÉ-VENDA ESTÁ ABERTA!</div>
          ) : (
            <>
              <div className="pv-countdown-headline">A pré-venda abre em:</div>
              <div className="pv-countdown">
                <div className="pv-countdown-item">
                  <span className="pv-count-num">{pad(days)}</span>
                  <span className="pv-count-unit">dias</span>
                </div>
                <div className="pv-countdown-item">
                  <span className="pv-count-num">{pad(hours)}</span>
                  <span className="pv-count-unit">horas</span>
                </div>
                <div className="pv-countdown-item">
                  <span className="pv-count-num">{pad(minutes)}</span>
                  <span className="pv-count-unit">min</span>
                </div>
                <div className="pv-countdown-item">
                  <span className="pv-count-num">{pad(seconds)}</span>
                  <span className="pv-count-unit">seg</span>
                </div>
              </div>
            </>
          )}

          {/* SOCIAL PROOF */}
          <div className="pv-social-proof">
            <div className="pv-dot" />
            <span>
              <strong style={{ color: AMBER }}>{formatCount(count)}</strong>
              {' '}pessoas já se cadastraram
            </span>
          </div>

          {/* FORM CARD */}
          <div className="pv-card">
            {success ? (
              <div style={{ textAlign: 'center' }}>
                <div className="pv-success-icon">✓</div>
                <p className="pv-success-title">Cadastro confirmado!</p>
                <p className="pv-success-text">Você será redirecionado para o grupo exclusivo em instantes.</p>
                <a href={WHATSAPP_URL} className="pv-fallback-btn">Entrar no grupo agora</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pv-form">
                <div className="pv-card-title">Pré-cadastro</div>
                <p className="pv-card-subtitle">Garanta seu acesso à pré-venda e entre no grupo exclusivo do festival.</p>

                <div className="pv-field">
                  <label className="pv-label">Nome completo</label>
                  <input name="nome" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange} className="pv-input" />
                </div>
                <div className="pv-field">
                  <label className="pv-label">E-mail</label>
                  <input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} className="pv-input" />
                </div>
                <div className="pv-field">
                  <label className="pv-label">Telefone / WhatsApp</label>
                  <input name="telefone" type="tel" placeholder="(DDD) 9 0000-0000" value={form.telefone} onChange={handleChange} className="pv-input" />
                </div>

                {error && <p className="pv-error">{error}</p>}

                <button type="submit" disabled={loading} className="pv-btn">
                  {loading ? 'Aguarde...' : 'Garantir pré-venda'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <footer className="pv-footer">
          <p>letspiri.com &nbsp;·&nbsp; <a href="https://instagram.com/letspiri">@letspiri</a></p>
          <p style={{ marginTop: '5px' }}>Pirenópolis, Goiás &nbsp;·&nbsp; Setembro 2026</p>
        </footer>
      </div>
    </>
  )
}
