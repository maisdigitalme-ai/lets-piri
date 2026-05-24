import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const ARTISTS_DAY1 = [
  { name: "PANDA", highlight: true },
  { name: "CDB" },
  { name: "JOHN DJ" },
  { name: "MARLLON" },
  { name: "+ 1 ?" },
];

const ARTISTS_DAY2 = [
  { name: "MARIANA FAGUNDES", highlight: true },
  { name: "SOM DE FACULDADE" },
  { name: "VINICIUS CAVALCANTE" },
  { name: "MARLLON" },
  { name: "+ 1 ?" },
];

const TIMELINE = [
  {
    date: "25/05",
    day: "Segunda",
    title: "Lançamento Oficial",
    items: [
      {
        time: "11h00",
        type: "collab",
        label: "1º Collab | Save The Date",
        details: [
          { key: "Plataforma", value: "Instagram" },
          { key: "Collab", value: "Jordanna Plácido, Gley Rodrigues, Cristiano Carvalho, Rapha Eduardo, Allef Junior" },
          { key: "Conteúdo", value: "Arte visual Save The Date com datas e conceito" },
          { key: "CTA", value: "Site pré-cadastro → redireciona para grupo WhatsApp" },
          { key: "Copywriting", value: 'Tema "viagem inesquecível", sensação de desejo' },
        ],
      },
    ],
  },
  {
    date: "26/05",
    day: "Terça",
    title: "Conceito",
    items: [
      {
        time: null,
        type: "video",
        label: "Vídeo Conceito | Let's Piri",
        details: [
          { key: "Direção", value: "Allef Leite" },
          { key: "Plataforma", value: "Instagram (Reels + Stories + TikTok)" },
          { key: "Conteúdo", value: "Cinematografia de Pirenópolis (cachoeiras, rua de pedra, pôr do sol) + Pedreira (amigos, brinde, música, liberdade)" },
          { key: "Tom", value: "Inspirador, emocional, aspiracional" },
          { key: "Copywriting", value: "Narrativa sobre o conceito do evento, conexão entre a natureza e o sertanejo; sensação de liberdade e vivência" },
        ],
      },
    ],
  },
  {
    date: "27/05",
    day: "Quarta",
    title: "Autoridade",
    items: [
      {
        time: null,
        type: "influencer",
        label: "Vídeo Influenciadores | Agência Rapha Eduardo",
        details: [
          { key: "Plataforma", value: "Instagram (Stories + Reels)" },
          { key: "Influenciador", value: "A definir pela agência de Rapha Eduardo" },
          { key: "Conteúdo", value: "Convite sobre o evento (estrutura, vibe, diferencial)" },
          { key: "Foco", value: "Autoridade, desejo, exclusividade" },
          { key: "CTA", value: "Site pré-cadastro → redireciona para grupo WhatsApp" },
          { key: "Copywriting", value: "Recomendação pessoal, exclusividade, vibe do evento" },
        ],
      },
    ],
  },
  {
    date: "28/05",
    day: "Quinta",
    title: "Lançamento dos Artistas Principais",
    items: [
      {
        time: "12h00",
        type: "arte",
        label: "Arte Estática | Confirmação dos Artistas Principais",
        details: [],
      },
      {
        time: "18h00",
        type: "collab",
        label: "Collab Vídeo Convidativo | Panda + Mari Fagundes + Let's Piri",
        details: [
          { key: "Plataforma", value: "Instagram (Reels + Stories)" },
          { key: "Collab", value: "Panda, Mariana Fagundes, Rafael Cabral, MJ Music, +1 do escritório" },
          { key: "Conteúdo", value: "Vídeo dinâmico convidando para o evento (experiência completa)" },
          { key: "CTA", value: "Site pré-cadastro → redireciona para grupo WhatsApp" },
          { key: "Copywriting", value: "Foco na experiência, clima de Pirenópolis, convite direto" },
        ],
      },
    ],
  },
  {
    date: "Após 28/05",
    day: "Ação Paralela",
    title: "Divulgação em Massa nos Portais",
    items: [
      {
        time: null,
        type: "portal",
        label: "Publi Notícia | Portais de Notícias",
        details: [
          { key: "Formato", value: "Release humanizado (turismo + experiência + novidade)" },
          { key: "Abrangência", value: "16 portais regionais (Goiânia, Brasília, Pirenópolis e interior)" },
        ],
        portals: true,
      },
    ],
  },
  {
    date: "01 ou 02/06",
    day: "Segunda ou Terça",
    title: "Coquetel de Lançamento",
    items: [
      {
        time: null,
        type: "evento",
        label: "Evento Presencial | Casa do Rapha Eduardo",
        details: [
          { key: "Local", value: "Casa do Rapha Eduardo" },
          { key: "Formato", value: "Encontro com influenciadores, parceiros, formadores de opinião" },
          { key: "Objetivo", value: "Gerar buzz, criar conteúdo, fortalecer relacionamentos" },
          { key: "Presença", value: "Possibilidade de Panda e Mariana Fagundes" },
          { key: "Estrutura", value: "Bebidas (Patrocínio) · Frios (Patrocínio) · Palco, Som e Iluminação (Patrocínio)" },
        ],
      },
    ],
  },
];

const PORTALS = [
  [
    { handle: "@guiacurtamais", name: "Curta Mais" },
    { handle: "@curtamaispirenopolis", name: "Curta Mais Piri" },
    { handle: "@curtamaisbsb", name: "Curta Mais Brasília" },
    { handle: "@maisgoias", name: "Mais Goiás" },
    { handle: "@maisbrasilia", name: "Mais Brasília" },
    { handle: "@portal6noticias", name: "Portal 6" },
  ],
  [
    { handle: "@anapolis.noticias", name: "Anápolis Notícia" },
    { handle: "@portaljaragua", name: "Portal Jaraguá" },
    { handle: "@impacto_uruacu", name: "Impacto Uruçu" },
    { handle: "@gmaisnoticia", name: "Gmais Notícias" },
    { handle: "@rioverde24h", name: "Rio Verde Notícias" },
    { handle: "@guiaoquefazerembrasilia", name: "Guia O Que Fazer em Brasília" },
  ],
  [
    { handle: "Piripiri Noticias", name: "Piripiri Notícias" },
    { handle: "@portalpiri", name: "Portal Piri" },
    { handle: "@piridicas", name: "Piri Dicas" },
    { handle: "@experimentepiri", name: "Experimente Piri" },
  ],
];

const NEXT_STEPS = [
  "Definir budgets de tráfego pago (Meta + TikTok)",
  "Criar landing page e configurar automação WhatsApp",
  "Selecionar influenciadores (micro e médios)",
  "Preparar kits criativos para influenciadores",
  "Confirmar datas de gravação (Panda, Mariana, Rapha Eduardo)",
  "Mapear ativações internas (lounges, áreas instagramáveis, gastronomia)",
  "Estruturar viradas de lote e gatilhos de urgência",
  "Criar grupo de influenciadores (WhatsApp)",
  "Definir local do evento (visitar Pedreira e Aeroporto de Pirenópolis)",
  "Estruturar logística e hospedagem",
];

const NAV_ITEMS = [
  { id: "festival", label: "Festival" },
  { id: "cronograma", label: "Cronograma" },
  { id: "estrategias", label: "Estratégias" },
  { id: "infraestrutura", label: "Infraestrutura" },
  { id: "trafego", label: "Tráfego" },
  { id: "ativacoes", label: "Ativações" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "proximos", label: "Próximos Passos" },
];

// ─── Paleta de cores (Réveillon Saudade) ─────────────────────────────────────
const C = {
  bg:          "#f5ede8",   // bege/areia rosado | fundo principal
  surface:     "#faf3ef",   // bege mais claro | cards
  surfaceW:    "#ffffff",   // branco | cards elevados
  teal:        "#1d7265",   // verde-teal profundo | nav, destaques
  tealDark:    "#155c50",   // verde-teal escuro | hover, nav bg
  tealSoft:    "#e8f4f1",   // verde-teal muito suave | badges
  fg:          "#0d3d2e",   // verde-escuro | texto principal
  fgLight:     "#ffffff",   // branco | texto sobre teal
  muted:       "#5a8a78",   // verde-médio | texto secundário
  border:      "rgba(26,107,94,0.14)",
  borderStrong:"rgba(26,107,94,0.28)",
};

// ─── Tag Component ────────────────────────────────────────────────────────────

function Tag({ type }: { type: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    collab:     { bg: C.tealSoft, color: C.teal,    label: "Collab" },
    video:      { bg: "#e8f0f4", color: "#2a6080",  label: "Vídeo" },
    portal:     { bg: "#f4ede8", color: "#7a4a2a",  label: "Portal" },
    influencer: { bg: "#f0ece8", color: "#6b4a3a",  label: "Influenciador" },
    arte:       { bg: "#eef4e8", color: "#3a6020",  label: "Arte" },
  };
  const t = map[type] ?? { bg: C.tealSoft, color: C.teal, label: type };
  return (
    <span
      className="font-sans text-sm px-2.5 py-0.5 rounded-full font-medium"
      style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}22` }}
    >
      {t.label}
    </span>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  id, label, title, children, teal = false,
}: {
  id: string; label: string; title: string; children: React.ReactNode; teal?: boolean;
}) {
  return (
    <section
      id={id}
      className="py-20"
      style={{ background: teal ? C.teal : C.bg }}
    >
      <div className="container">
        <div className="mb-10">
          <p
            className="font-sans text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: teal ? "rgba(255,255,255,0.60)" : C.teal }}
          >
            {label}
          </p>
          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: teal ? C.fgLight : C.fg }}
          >
            {title}
          </h2>
          <div
            className="mt-5 h-px"
            style={{
              background: teal
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
                : `linear-gradient(90deg, transparent, ${C.borderStrong}, transparent)`,
            }}
          />
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── Timeline Card | aberto por padrão ───────────────────────────────────────

function TimelineCard({ item }: { item: typeof TIMELINE[0]["items"][0] & { portals?: boolean } }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="cursor-pointer select-none rounded-xl p-4 transition-all duration-200"
      style={{
        background: C.surfaceW,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 8px rgba(26,107,94,0.05)",
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {item.time && (
              <span className="font-sans text-sm font-semibold" style={{ color: C.teal }}>{item.time}</span>
            )}
            <Tag type={item.type} />
          </div>
          <p className="font-sans text-sm font-medium leading-snug" style={{ color: C.fg }}>{item.label}</p>
        </div>
        <span
          className="text-sm mt-0.5 transition-transform duration-200"
          style={{ color: C.muted, transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
        >
          ▾
        </span>
      </div>

      {open && item.details.length > 0 && (
        <div className="mt-4 pt-4 border-t space-y-2.5" style={{ borderColor: C.border }}>
          {item.details.map((d, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span
                className="font-sans font-semibold whitespace-nowrap min-w-[90px] pt-0.5"
                style={{ color: C.teal }}
              >
                {d.key}
              </span>
              <span className="leading-relaxed" style={{ color: C.muted }}>{d.value}</span>
            </div>
          ))}
        </div>
      )}
      {open && item.portals && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PORTALS.map((col, ci) => (
              <div key={ci} className="space-y-2">
                {col.map((portal, pi) => (
                  <div key={pi}>
                    <span className="font-sans text-sm font-semibold block" style={{ color: C.fg }}>{portal.handle}</span>
                    <span className="font-sans text-sm" style={{ color: C.muted }}>{portal.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pre-cadastro Form ────────────────────────────────────────────────────────

function PreCadastroForm() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid ${C.borderStrong}`,
    background: C.bg,
    color: C.fg,
    fontSize: "0.875rem",
    fontFamily: "Space Grotesk, sans-serif",
    outline: "none",
    transition: "border-color 150ms ease",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.open("https://wa.me/", "_blank");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="font-display text-2xl mb-2" style={{ color: C.teal }}>Cadastro realizado!</div>
        <p className="font-sans text-sm" style={{ color: C.muted }}>Redirecionando para o grupo WhatsApp...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-sans text-sm font-semibold tracking-widest uppercase block mb-2" style={{ color: C.teal }}>Nome</label>
        <input style={inputStyle} type="text" placeholder="Seu nome completo"
          value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required />
      </div>
      <div>
        <label className="font-sans text-sm font-semibold tracking-widest uppercase block mb-2" style={{ color: C.teal }}>E-mail</label>
        <input style={inputStyle} type="email" placeholder="seu@email.com"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
      </div>
      <div>
        <label className="font-sans text-sm font-semibold tracking-widest uppercase block mb-2" style={{ color: C.teal }}>Telefone</label>
        <input style={inputStyle} type="tel" placeholder="(62) 9 0000-0000"
          value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} required />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-full font-sans text-sm font-semibold tracking-wide transition-all duration-200"
        style={{
          background: C.teal,
          color: C.fgLight,
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.08em",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = C.tealDark)}
        onMouseLeave={e => (e.currentTarget.style.background = C.teal)}
      >
        Garantir meu lugar
      </button>
    </form>
  );
}

// ─── Checklist ────────────────────────────────────────────────────────────────

function Checklist() {
  const STORAGE_KEY = "lets_piri_checklist";
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return NEXT_STEPS.map(() => false);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = (i: number) => {
    setChecked(c => { const next = [...c]; next[i] = !next[i]; return next; });
  };

  const done = checked.filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: C.border }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(done / NEXT_STEPS.length) * 100}%`, background: C.teal }}
          />
        </div>
        <span className="font-sans text-sm font-semibold" style={{ color: C.teal }}>
          {done}/{NEXT_STEPS.length}
        </span>
      </div>
      <div className="space-y-3">
        {NEXT_STEPS.map((step, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer group">
            <div
              className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all duration-150"
              style={{
                border: `1.5px solid ${checked[i] ? C.teal : C.borderStrong}`,
                background: checked[i] ? C.teal : "transparent",
                cursor: "pointer",
              }}
              onClick={() => toggle(i)}
            >
              {checked[i] && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className="text-sm leading-relaxed transition-colors duration-200"
              style={{
                color: checked[i] ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.90)",
                textDecoration: checked[i] ? "line-through" : "none",
              }}
            >
              {step}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("festival");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ background: C.bg, color: C.fg, minHeight: "100vh" }}>

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: `${C.tealDark}f5`,
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid rgba(255,255,255,0.10)`,
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14">
            <img
              src="/logo.png"
              alt="Let's Piri Festival"
              style={{ height: "36px", width: "auto" }}
            />

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-sans text-sm tracking-wide transition-all duration-150"
                  style={{
                    color: activeSection === item.id ? C.fgLight : "rgba(255,255,255,0.60)",
                    fontWeight: activeSection === item.id ? 600 : 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1"
              style={{ color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setMobileMenuOpen(o => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileMenuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
            <div className="container flex flex-col gap-3">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-sans text-sm tracking-widest uppercase transition-colors"
                  style={{
                    color: activeSection === item.id ? C.fgLight : "rgba(255,255,255,0.60)",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero | fundo teal como o Réveillon Saudade ── */}
      <section
        id="festival"
        className="pt-32 pb-24 relative overflow-hidden"
        style={{ background: C.teal }}
      >
        {/* Textura sutil de luz | como o reflexo da água nas cachoeiras */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.07) 0%, transparent 70%)`,
          }}
        />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="font-sans text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              Pirenópolis, Goiás
            </p>

            <div className="flex justify-center mb-10">
              <img
                src="/logo.png"
                alt="Let's Piri Festival"
                style={{ height: "clamp(48px, 10vw, 90px)", width: "auto" }}
              />
            </div>

            <div
              className="mb-10 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
            />

            {/* Dates */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <div className="text-center">
                <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.60)" }}>Sábado</p>
                <p className="font-display text-5xl" style={{ color: C.fgLight }}>05</p>
                <p className="font-sans text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>Setembro 2025</p>
              </div>
              <div className="hidden sm:block w-px h-14" style={{ background: "rgba(255,255,255,0.20)" }} />
              <div className="text-center">
                <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.60)" }}>Domingo</p>
                <p className="font-display text-5xl" style={{ color: C.fgLight }}>06</p>
                <p className="font-sans text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>Setembro 2025</p>
              </div>
            </div>

            {/* Concept tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["Festival Boutique", "Experiência", "Lifestyle", "Conexão Social"].map(tag => (
                <span
                  key={tag}
                  className="font-sans text-sm rounded-full px-4 py-1.5"
                  style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              Final de semana prolongado em Pirenópolis | Feriado de 7 de setembro (segunda-feira)
            </p>
          </div>

          {/* Artist grid */}
          <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Day 1 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.80)" }}
                />
                <div>
                  <p className="font-sans text-sm font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.60)" }}>05 de Setembro</p>
                  <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Sábado</p>
                </div>
              </div>
              <div className="space-y-3">
                {ARTISTS_DAY1.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-sans text-sm w-4" style={{ color: "rgba(255,255,255,0.35)" }}>{i + 1}</span>
                    <span
                      className="font-sans font-semibold"
                      style={{
                        color: a.highlight ? C.fgLight : "rgba(255,255,255,0.75)",
                        fontSize: a.highlight ? "1rem" : "0.875rem",
                      }}
                    >
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.80)" }} />
                <div>
                  <p className="font-sans text-sm font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.60)" }}>06 de Setembro</p>
                  <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Domingo</p>
                </div>
              </div>
              <div className="space-y-3">
                {ARTISTS_DAY2.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-sans text-sm w-4" style={{ color: "rgba(255,255,255,0.35)" }}>{i + 1}</span>
                    <span
                      className="font-sans font-semibold"
                      style={{
                        color: a.highlight ? C.fgLight : "rgba(255,255,255,0.75)",
                        fontSize: a.highlight ? "1rem" : "0.875rem",
                      }}
                    >
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cronograma | fundo bege ── */}
      <Section id="cronograma" label="Estratégia de Lançamento" title="Cronograma">
        <div className="space-y-8">
          {TIMELINE.map((block, bi) => (
            <div key={bi} className="flex gap-5">
              {/* Date column */}
              <div className="flex flex-col items-center">
<div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: C.fg }} />
              <div className="w-px flex-1 mt-1" style={{ background: C.borderStrong, minHeight: "3rem" }} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="mb-3">
                  <span className="font-display text-xl" style={{ color: C.teal }}>{block.date}</span>
                  <span className="font-sans text-sm ml-2" style={{ color: C.muted }}>({block.day})</span>
                  <p className="font-sans text-sm font-semibold uppercase tracking-widest mt-1" style={{ color: C.fg, opacity: 0.5 }}>
                    {block.title}
                  </p>
                </div>
                <div className="space-y-3">
                  {block.items.map((item, ii) => (
                    <TimelineCard key={ii} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estratégias | fundo teal ── */}
      <section id="estrategias" className="py-20" style={{ background: C.teal }}>
        <div className="container">
          <div className="mb-10">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Ações Paralelas</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: C.fgLight }}>Estratégias</h2>
            <div className="mt-5 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Influenciadores */}
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Grupo de Influenciadores</p>
              <p className="font-sans text-sm mb-1" style={{ color: "rgba(255,255,255,0.50)" }}>Jordana · Rapha Eduardo</p>
              <p className="font-sans text-sm mb-4 leading-relaxed" style={{ color: C.fgLight }}>
                Reforçar o boom de lançamento e divulgação durante o período do evento.
              </p>
              <div className="space-y-2">
                {[
                  "Criação de grupo exclusivo (WhatsApp)",
                  "Distribuição de conteúdo, materiais e briefings",
                  "Coordenação de posts simultâneos nos momentos-chave",
                  "Suporte durante o evento (5 e 6/09) para cobertura em tempo real",
                  "Pós-evento: engajamento e retenção para próximas edições",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>—</span>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mailing */}
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Disparo de Mailing</p>
              <p className="font-sans text-sm mb-1" style={{ color: "rgba(255,255,255,0.50)" }}>Ticketeira</p>
              <p className="font-sans text-sm mb-4 leading-relaxed" style={{ color: C.fgLight }}>
                Ampliar alcance nas principais regiões: Brasília e Goiânia.
              </p>
              <div className="space-y-3">
                {[
                  { key: "Público-Alvo", value: '"Cê Tá Doido" em Brasília e Goiânia' },
                  { key: "Disparos", value: "Lançamento (28/05) e Viradas de Lote" },
                  { key: "Mensagem", value: "Convite exclusivo, link de pré-cadastro, urgência" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-sans text-sm font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>{item.key}</p>
                    <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coquetel */}
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Coquetel de Lançamento</p>
              <p className="font-sans text-sm mb-1" style={{ color: "rgba(255,255,255,0.50)" }}>01 ou 02/06 · Segunda ou Terça</p>
              <p className="font-sans text-sm mb-4 leading-relaxed" style={{ color: C.fgLight }}>
                Evento presencial na casa do Rapha Eduardo.
              </p>
              <div className="space-y-2 mb-4">
                {["Bebidas (Patrocínio)", "Frios (Patrocínio)", "Palco, Som e Iluminação (Patrocínio)"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>—</span>
                    <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                {["Gravação de conteúdo para redes sociais", "Apresentação oficial do evento", "Networking entre influenciadores e patrocinadores"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>·</span>
                    <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Infraestrutura | fundo bege ── */}
      <Section id="infraestrutura" label="Digital" title="Infraestrutura Digital">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-xl p-6" style={{ background: C.surfaceW, border: `1px solid ${C.border}` }}>
              <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: C.teal }}>Estrutura</p>
              <div className="space-y-4">
                {[
                  { key: "Landing Page", value: "Pré-cadastro com redirecionamento automático para grupo WhatsApp" },
                  { key: "Pagamento", value: "Pix sem taxa + Ticketeira (configurar)" },
                  { key: "Atendimento", value: "WhatsApp dedicado + número de telefone" },
                  { key: "Grupos WhatsApp", value: "Regionalizados (Goiânia, Anápolis, Pirenópolis, Brasília) + Master (influenciadores)" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="font-sans text-sm font-semibold min-w-[110px] pt-0.5" style={{ color: C.teal }}>{item.key}</span>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: C.muted }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ background: C.surfaceW, border: `1px solid ${C.border}`, boxShadow: "0 4px 32px rgba(26,107,94,0.08)" }}>
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: C.teal }}>Pré-cadastro</p>
            <p className="font-display text-xl mb-5" style={{ color: C.fg }}>Garanta sua vaga</p>
            <PreCadastroForm />
          </div>
        </div>
      </Section>

      {/* ── Tráfego Pago | fundo bege ── */}
      <Section id="trafego" label="Campanhas" title="Tráfego Pago">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Meta Ads */}
          <div className="rounded-xl p-6" style={{ background: C.surfaceW, border: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#e8f0f8", border: "1px solid #c0d4e8" }}>
                <span className="font-sans text-sm font-bold" style={{ color: "#1877f2" }}>M</span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold tracking-widest uppercase" style={{ color: C.teal }}>Meta Ads</p>
                <p className="font-sans text-sm" style={{ color: C.muted }}>Facebook · Instagram</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Lookalike", desc: "Réveillon Viva Piri + banco de dados", tags: ["Lookalike", "Retargeting"] },
                { name: "Regional", desc: "Segmentação por regiões: Goiânia, Brasília, Pirenópolis, Anápolis, Jaraguá, Goianésia, Cocalzinho e demais", tags: ["Geolocalização"] },
                { name: "Interesses", desc: "Seguidores de perfis: Piri Lounge, Piri Dicas, Henrique e Juliano Manifesto, Buteco Goiânia, Soho Lounge, Moema e demais perfis de eventos similares", tags: ["Comportamento", "Interesses"] },
              ].map((camp, i) => (
                <div key={i} className="pl-0">
                  <p className="font-sans text-sm font-semibold mb-1" style={{ color: C.fg }}>{camp.name}</p>
                  <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: C.muted }}>{camp.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {camp.tags.map(t => (
                      <span key={t} className="font-sans text-sm px-2 py-0.5 rounded-full" style={{ background: C.tealSoft, color: C.teal, border: `1px solid ${C.teal}22` }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TikTok Ads */}
          <div className="rounded-xl p-6" style={{ background: C.surfaceW, border: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f0e8f4", border: "1px solid #d0b8e0" }}>
                <span className="font-sans text-sm font-bold" style={{ color: "#6a0dad" }}>T</span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold tracking-widest uppercase" style={{ color: C.teal }}>TikTok Ads</p>
                <p className="font-sans text-sm" style={{ color: C.muted }}>TikTok</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Trending & Viral", desc: "Conteúdo nativo em formato vertical, aproveitando tendências e sons populares para maximizar alcance orgânico", tags: ["TopView", "In-Feed"] },
                { name: "Regional", desc: "Segmentação geográfica focada em Goiânia, Brasília, Anápolis e Pirenópolis com criativos regionalizados", tags: ["Geolocalização", "Interesses"] },
              ].map((camp, i) => (
                <div key={i} className="pl-0">
                  <p className="font-sans text-sm font-semibold mb-1" style={{ color: C.fg }}>{camp.name}</p>
                  <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: C.muted }}>{camp.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {camp.tags.map(t => (
                      <span key={t} className="font-sans text-sm px-2 py-0.5 rounded-full" style={{ background: C.tealSoft, color: C.teal, border: `1px solid ${C.teal}22` }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Ativações | fundo teal ── */}
      <section id="ativacoes" className="py-20" style={{ background: C.teal }}>
        <div className="container">
          <div className="mb-10">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Presença Física</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: C.fgLight }}>Ativações e Divulgações</h2>
            <div className="mt-5 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { city: "Brasília", subtitle: null, items: ["Buscar parceiros em bares e casas noturnas locais", "Elaborar ativação", "Produzir materiais: adesivos, banners, panfletos", "Distribuição permanente durante todo o período"] },
              { city: "Goiânia", subtitle: null, items: ["Buscar parceiros em bares e casas noturnas", "Elaborar ativação", "Produzir materiais: adesivos, banners, panfletos", "Distribuir na primeira quinzena de junho", "Coordenar com influenciadores locais"] },
              { city: "Anápolis", subtitle: null, items: ["Buscar parceiros em bares e casas noturnas", "Elaborar ativação", "Produzir materiais: adesivos, banners, panfletos", "Distribuir na primeira quinzena de junho"] },
              { city: "Pirenópolis", subtitle: null, items: ["Buscar parceiros em bares e casas noturnas locais", "Elaborar ativação", "Produzir materiais: adesivos, banners, panfletos", "Distribuição permanente durante todo o período"] },
              { city: "Flex Goiânia", subtitle: "Autoridade · Vaidade · Presença Premium", items: ["Buscar parceira flex", "Produzir materiais: banners premium, adesivos, cartazes", "Distribuir na primeira quinzena de junho", "Salões de beleza e spas", "Lojas de moda e lifestyle", "Estacionamentos de shoppings"] },
            ].map((city, ci) => (
              <div key={ci} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
                <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.60)" }}>{city.city}</p>
                {city.subtitle && (
                  <p className="font-sans text-sm mb-3" style={{ color: "rgba(255,255,255,0.50)" }}>{city.subtitle}</p>
                )}
                <div className="mt-3 space-y-2">
                  {city.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-sm flex-shrink-0" style={{ color: "rgba(255,255,255,0.45)" }}>—</span>
                      <span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                  <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
                    Materiais: Adesivos · Banners · Panfletos com QR code · Cartazes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conteúdo Adicional | fundo bege ── */}
      <Section id="conteudo" label="Briefings" title="Conteúdo Adicional">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              artist: "PANDA",
              location: "Villa do Comendador",
              subtitle: "Curtindo com a família",
              items: [
                "Criar insight e briefing do vídeo",
                "Tema: Panda curtindo Pirenópolis (exploração, natureza, atmosfera)",
                "Plataformas: Instagram (Reels + Stories), TikTok",
                "Objetivo: Autenticidade, conexão emocional, antecipação",
              ],
            },
            {
              artist: "MARIANA FAGUNDES",
              location: "Villa do Comendador",
              subtitle: null,
              items: [
                "Criar insight e briefing do vídeo",
                "Tema: Mariana Fagundes curtindo Pirenópolis (exploração, natureza, atmosfera)",
                "Plataformas: Instagram (Reels + Stories), TikTok",
                "Objetivo: Autenticidade, conexão emocional, antecipação",
              ],
            },
          ].map((brief, bi) => (
            <div key={bi} className="rounded-xl p-6" style={{ background: C.surfaceW, border: `1px solid ${C.border}` }}>
              <div className="mb-4">
                <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: C.teal }}>Vídeo</p>
                <p className="font-display text-2xl" style={{ color: C.fg }}>{brief.artist}</p>
                <p className="font-sans text-sm mt-1" style={{ color: C.muted }}>
                  {brief.location}{brief.subtitle ? ` | ${brief.subtitle}` : ""}
                </p>
              </div>
              <div className="space-y-2">
                {brief.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-sm flex-shrink-0" style={{ color: C.teal }}>—</span>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: C.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>



      {/* ── Próximos Passos | fundo teal ── */}
      <section id="proximos" className="py-20" style={{ background: C.teal }}>
        <div className="container">
          <div className="mb-10">
            <p className="font-sans text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>Checklist</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: C.fgLight }}>Próximos Passos</h2>
            <div className="mt-5 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
          </div>
          <div className="max-w-2xl">
            <p className="font-sans text-sm mb-8" style={{ color: "rgba(255,255,255,0.60)" }}>
              O progresso é salvo automaticamente no seu navegador.
            </p>
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <Checklist />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10" style={{ background: C.tealDark, borderTop: `1px solid rgba(255,255,255,0.10)` }}>
        <div className="container text-center">
          <p className="font-display text-2xl mb-2" style={{ color: C.fgLight }}>Let's Piri Festival</p>
          <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
            5 e 6 de Setembro · Pirenópolis, Goiás · Estratégia de Lançamento 2025
          </p>
        </div>
      </footer>

    </div>
  );
}
