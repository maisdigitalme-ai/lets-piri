import { useState, useEffect } from 'react'

const BG = '#0E7B8C'
const AMBER = '#f0c96a'
const AMBER_DARK = '#C9A84C'
const WHITE = '#f5f0e8'
const MUTED = '#8fb5c2'
const CARD_BG = 'rgba(255,255,255,0.06)'

const API_URL = '/api/subscribe'
const INGRESSO_URL = 'https://www.vaideingresso.com.br/lets-piri'

// Countdown abertura: 09/06/2026 12:00 Brasília
const TARGET_DATE = new Date('2026-06-09T12:00:00-03:00').getTime()
// Countdown encerramento: 11/06/2026 12:00 Brasília
const DEADLINE_DATE = new Date('2026-06-11T12:00:00-03:00').getTime()

function useDeadlineCountdown() {
  function calc() {
    const diff = Math.max(0, DEADLINE_DATE - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

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

// Contador progressivo baseado no tempo decorrido desde o lançamento
// Atualizado: 09/06/2026 — base 3.219, +1 a cada 20s
const COUNTER_BASE = 3219
const COUNTER_START_TS = new Date('2026-06-09T11:00:00-03:00').getTime()
const COUNTER_INTERVAL_MS = 20000

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
  const deadline = useDeadlineCountdown()
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
      setTimeout(() => { window.location.href = INGRESSO_URL }, 2000)
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
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: auto !important;
          min-height: 100vh !important;
          overflow-x: hidden !important;
          overflow-y: visible !important;
        }
        .pv-wrap {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(160deg, #0a5f6e 0%, ${BG} 45%, #1aa8bf 100%);
          color: ${WHITE};
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .pv-deco {
          position: absolute;
          background-image: url(/catavento.png);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }
        .pv-deco1 { top: 120px; right: -70px; width: 280px; height: 280px; }
        .pv-deco2 { bottom: 60px; left: -50px; width: 200px; height: 200px; }
        .pv-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          padding: 48px 20px 40px;
          text-align: center;
        }
        .pv-logo {
          width: clamp(110px, 38vw, 170px);
          height: auto;
          filter: brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(500%) hue-rotate(5deg) brightness(105%);
          margin-bottom: 28px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .pv-date {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          color: ${MUTED};
          text-transform: uppercase;
          margin-bottom: 28px;
          line-height: 1.8;
        }
        .pv-date span { color: ${AMBER}; font-weight: 600; }
        .pv-artists-wrap { width: 100%; margin-bottom: 20px; }
        .pv-banner-desktop { display: block; width: 100%; border-radius: 16px; }
        .pv-banner-mobile { display: none; width: 100%; border-radius: 16px; }
        @media (max-width: 600px) {
          .pv-banner-desktop { display: none; }
          .pv-banner-mobile { display: block; }
        }
        .pv-names {
          margin-top: 16px;
          display: table;
          width: 100%;
        }
        .pv-names-inner {
          display: table-row;
        }
        .pv-artist-col {
          display: table-cell;
          width: 50%;
          text-align: center;
          padding: 0 8px;
          vertical-align: top;
        }
        .pv-artist-name {
          font-size: clamp(13px, 3.5vw, 17px);
          font-weight: 600;
          color: ${WHITE};
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .pv-artist-support {
          font-size: clamp(9px, 2.2vw, 10.5px);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${MUTED};
          font-weight: 400;
          margin-top: 6px;
          line-height: 1.9;
        }
        .pv-divider {
          width: 32px;
          height: 1.5px;
          background: ${AMBER_DARK};
          opacity: 0.3;
          border-radius: 2px;
          margin: 8px auto 20px;
        }
        .pv-cd-title {
          font-size: clamp(20px, 5.5vw, 34px);
          font-weight: 600;
          margin-bottom: 22px;
          letter-spacing: -0.3px;
        }
        .pv-cd-row {
          display: table;
          margin: 0 auto 48px;
        }
        .pv-cd-cells {
          display: table-row;
        }
        .pv-cd-cell {
          display: table-cell;
          text-align: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(240,201,106,0.18);
          border-radius: 14px;
          padding: clamp(12px, 3vw, 20px) clamp(10px, 3.5vw, 22px);
          min-width: clamp(58px, 18vw, 86px);
          vertical-align: middle;
        }
        .pv-cd-cell + .pv-cd-cell { margin-left: clamp(6px, 2vw, 12px); }
        .pv-cd-num {
          display: block;
          font-size: clamp(28px, 8vw, 44px);
          font-weight: 600;
          color: ${AMBER};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .pv-cd-unit {
          display: block;
          font-size: clamp(7px, 1.8vw, 9.5px);
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-top: 6px;
          font-weight: 500;
        }
        .pv-proof {
          display: inline-block;
          background: rgba(240,201,106,0.07);
          border: 1px solid rgba(240,201,106,0.18);
          border-radius: 100px;
          padding: 10px 20px;
          margin-bottom: 40px;
          font-size: clamp(12px, 3.2vw, 13px);
        }
        .pv-proof-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
        .pv-card {
          width: 100%;
          max-width: 480px;
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: clamp(24px, 6vw, 40px) clamp(18px, 5vw, 36px);
          margin: 0 auto;
          text-align: left;
        }
        .pv-card-title {
          font-weight: 600;
          font-size: clamp(17px, 5vw, 22px);
          color: ${WHITE};
          margin-bottom: 8px;
        }
        .pv-card-sub {
          font-size: 13px;
          color: ${MUTED};
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .pv-field { margin-bottom: 16px; }
        .pv-label {
          display: block;
          font-weight: 600;
          font-size: 10px;
          color: ${MUTED};
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
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
          display: block;
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
          margin-top: 8px;
          width: 100%;
          text-transform: uppercase;
          -webkit-tap-highlight-color: transparent;
          display: block;
        }
        .pv-btn:active { opacity: 0.85; }
        .pv-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .pv-error { font-size: 13px; color: #ff8a80; text-align: center; margin-top: 8px; }
        .pv-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(240,201,106,0.15);
          border: 2px solid ${AMBER};
          display: table;
          margin: 0 auto 18px;
          text-align: center;
        }
        .pv-success-icon span { display: table-cell; vertical-align: middle; font-size: 22px; color: ${AMBER}; }
        .pv-success-title { font-weight: 600; font-size: 20px; color: ${WHITE}; text-align: center; margin-bottom: 8px; }
        .pv-success-text { font-size: 13px; color: ${MUTED}; text-align: center; line-height: 1.6; }
        .pv-fallback-btn {
          display: block; margin-top: 18px;
          font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 13px;
          letter-spacing: 0.05em; color: ${BG}; background: ${AMBER};
          border-radius: 10px; padding: 13px 20px; text-align: center;
          text-decoration: none; text-transform: uppercase;
        }
        .pv-footer {
          text-align: center;
          padding: 24px 20px;
          background: rgba(10,46,58,0.8);
          font-size: 11px;
          color: ${MUTED};
          letter-spacing: 1px;
          width: 100%;
          margin-top: 40px;
        }
        .pv-footer a { color: ${AMBER}; text-decoration: none; }
        .pv-open-now {
          font-size: 18px; font-weight: 600; color: ${AMBER};
          letter-spacing: 3px; padding: 14px; margin-bottom: 20px; text-align: center;
        }
      `}</style>

      <div className="pv-wrap">
        <div className="pv-deco pv-deco1" />
        <div className="pv-deco pv-deco2" />

        <div className="pv-inner">

          {/* LOGO */}
          <img src="/Logo-Lets-Piri.png" alt="Let's Piri" className="pv-logo" />

          {/* DATE */}
          <div className="pv-date">
            05 e 06 de setembro &nbsp;·&nbsp; <span>Pirenópolis, GO</span> &nbsp;·&nbsp; Véspera de feriado
          </div>

          {/* ARTISTS */}
          <div className="pv-artists-wrap">
            <img src="/BannerArtistas-1280x720.png" alt="Artistas Let's Piri" className="pv-banner-desktop" />
            <img src="/BannerArtistas-1080x1350.png" alt="Artistas Let's Piri" className="pv-banner-mobile" />

          </div>

          {/* DIVIDER */}
          <div className="pv-divider" />

          {/* INGRESSO CTA */}
          <div className="pv-open-now">INGRESSOS DISPONÍVEIS!</div>

          {/* SOCIAL PROOF */}
          <div className="pv-proof">
            <span className="pv-proof-dot" />
            <strong style={{ color: AMBER }}>{formatCount(count)}</strong>
            {' '}pessoas já garantiram sua pré-venda
          </div>

          {/* FORM CARD */}
          <div className="pv-card">
            {success ? (
              <div style={{ textAlign: 'center' }}>
                <div className="pv-success-icon"><span>✓</span></div>
                <p className="pv-success-title">Pré-venda garantida!</p>
                <p className="pv-success-text">Você será redirecionado para adquirir seu ingresso em instantes.</p>
                <a href={INGRESSO_URL} className="pv-fallback-btn">Adquirir ingresso agora</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="pv-card-title">Adquirir Ingresso</div>
                <p className="pv-card-sub">Preencha seus dados e garanta seu ingresso para o Let's Piri.</p>

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
                  {loading ? 'Aguarde...' : 'ADQUIRIR INGRESSO AGORA'}
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
