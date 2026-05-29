/* ──────────────────────────────────────────────────────────────────
   Customer-portal · component library
   Compiled with Babel-standalone via <script type="text/babel">.
   Exports components to `window` so app.jsx can pick them up.
   ────────────────────────────────────────────────────────────────── */
const { useState, useEffect, useRef } = React;

/* ---------- Tiny primitives -------------------------------------- */
function Icon({ name, className = "", style }) {
  return <span className={`i i-${name} ${className}`} style={style} aria-hidden="true" />;
}

function IconChip({ icon, color = "blue", size = 32, on = false, dark = false, purple = false, style }) {
  const bg = on ? "var(--ag-blue)" :
  dark ? "var(--ag-ink)" :
  purple ? "rgba(114,41,245,.14)" :
  color === "green" ? "var(--ag-green-tint)" :
  "var(--ag-blue-tint)";
  const fg = on || dark ? "#fff" :
  purple ? "var(--ag-purple)" :
  color === "green" ? "var(--ag-green)" :
  "var(--ag-blue)";
  return (
    <span
      className="ic-chip"
      style={{
        width: size, height: size, borderRadius: 4, background: bg, color: fg,
        display: "inline-grid", placeItems: "center", flex: "none", ...style
      }}>
      <Icon name={icon} style={{ width: size * 0.55, height: size * 0.55 }} />
    </span>);

}

function Avatar({ initials, gender = "f" }) {
  return <span className={`av ${gender}`}>{initials}</span>;
}

function Pill({ kind = "r", children }) {
  return <span className={`pill ${kind}`}>{children}</span>;
}

function GrowthPill({ amount = "1 245,67 €" }) {
  return (
    <span className="pill grow">
      <span className="arrow"><Icon name="arrow-up" /></span>
      {amount}
    </span>);

}

function Link({ children, dark = false, icon = "arrow-enter", onClick, cta = false }) {
  return (
    <button
      type="button"
      className={`link ${dark ? "dark" : ""} ${cta ? "cta" : ""}`}
      onClick={onClick}>
      {children}
      {icon && <span className="gi"><Icon name={icon} /></span>}
    </button>);

}

function Btn({ children, secondary = false, onClick, icon, type = "button", disabled }) {
  return (
    <button type={type} className={`btn ${secondary ? "secondary" : ""}`} onClick={onClick} disabled={disabled}>
      {icon && <span className="gi">{icon}</span>}
      {children}
    </button>);

}

/* ---------- Header -------------------------------------------------- */
function GlobalHeader({ user = "Marie Dupont", initials = "MD", onContact }) {
  return (
    <header className="gnav">
      <div className="brand">
        <span className="mark" aria-hidden="true" />
        <span className="wordmark">TEST AG<span className="sub">ESPACE CLIENT</span></span>
        <span className="product">Votre espace personnel</span>
      </div>
      <div className="gnav-right">
        <button className="gnav-btn" onClick={onContact}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" /></svg>
          Contact
        </button>
        <button className="gnav-user">
          <span className="av">{initials}</span>
          {user}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4" /></svg>
        </button>
      </div>
    </header>);

}

/* ---------- Hero band ---------------------------------------------- */
function HeroBand() {
  return <div className="hero" aria-hidden="true" />;
}

/* ---------- Welcome card + nav ------------------------------------- */
function WelcomeCard({ name, adherent, activeSection, setActive, onBell, sections, notifCount = 2 }) {
  return (
    <section className="welcome">
      <div className="welcome-top">
        <div>
          <div className="greet">Bienvenue {name}</div>
          <div className="adh">N°Adhérent : {adherent}</div>
        </div>
        <button
          className={"notif-trigger" + (notifCount > 0 ? " has-new" : "")}
          aria-label="Notifications"
          onClick={onBell}>
          <Icon name="bell" />
        </button>
      </div>
      <nav className="welcome-nav">
        {sections.map((s) =>
        <button
          key={s.id}
          className={"tab" + (activeSection === s.id ? " active" : "")}
          onClick={() => setActive(s.id)}>
            <span className="chip"><Icon name={s.icon} /></span>
            <span className="col">
              <span className="label">{s.label}</span>
              <span className="sub">{s.sub}</span>
            </span>
          </button>
        )}
      </nav>
    </section>);

}

/* ---------- Section header ----------------------------------------- */
function SectionHeader({ icon = "heart", chipColor = "green", purpleChip = false, title, total, growth, anchor }) {
  return (
    <div id={anchor}>
      <div className="section-head">
        <div className="left">
          <span className={"chip" + (chipColor === "green" ? " green-tint" : "") + (purpleChip ? " purple-tint" : "")}>
            <Icon name={icon} />
          </span>
          <span className="title">{title}</span>
        </div>
        {(total || growth) &&
        <div className="right">
            {growth && <GrowthPill amount={growth} />}
            {total && <span className="meta">{total}</span>}
          </div>
        }
      </div>
      <div className="rule" style={{ height: 1, background: "var(--ag-green)", marginTop: -4, marginBottom: 16 }} />
    </div>);

}

/* ---------- Remboursement row -------------------------------------- */
function RemboursementCard({ title, date, person, dep, remb, paid, selected, onClick, glyph }) {
  return (
    <article className={"rb-card" + (selected ? " is-selected" : "")} onClick={onClick}>
      <div className="left">
        <div className="topl">
          <span className="gico">{glyph}</span>
          <span className="title">{title}</span>
          <span className="date">soin du {date}</span>
        </div>
        <div className="who">
          <Avatar initials={person.initials} gender={person.gender} />
          <span style={{ font: "400 14px/1.4 var(--font-sans)", color: "var(--ag-ink)" }}>{person.name}</span>
        </div>
      </div>
      <div className="right">
        <div className="pricepair">
          <span className="amount">{dep}</span>
          <Pill kind="d">Dépensé</Pill>
        </div>
        <div className="pricepair">
          {remb ? <><span className="amount">{remb}</span><Pill kind="r">Remboursé</Pill></> :
          <><span className="amount">—</span><Pill kind="tp">{paid || "Tiers payant"}</Pill></>}
        </div>
      </div>
    </article>);

}

/* ---------- Contract card ------------------------------------------ */
function ContractCard({ name, num, sub, amount, asOf, selected, onClick }) {
  return (
    <article className={"contract" + (selected ? " is-selected" : "")} onClick={onClick}>
      <div className="rail">
        <Icon name="file" />
      </div>
      <div className="body">
        <div>
          <span className="name">{name}</span>
          <span className="num">· {num}</span>
          <div className="sub">{sub}</div>
        </div>
        <div className="price-col">
          <div className="price">{amount}</div>
          <div className="priceSub">Estim. au {asOf}</div>
        </div>
      </div>
    </article>);

}

/* ---------- Tiers-payant card -------------------------------------- */
function TiersPayantCard({ name, from, to, onDownload }) {
  return (
    <section className="tp-card">
      <div className="top">
        <div>
          <div className="title">Votre carte tiers payant</div>
          <div className="date">du {from} au {to}</div>
        </div>
        <span className="crest" title="Co-brand · Test AG ✕ employer">TA</span>
      </div>
      <div className="name">{name}</div>
      <button className="dl-btn" onClick={onDownload}>
        <span className="gi">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></svg>
        </span>
        <span className="label">Télécharger votre carte TP</span>
      </button>
    </section>);

}

/* ---------- Action grid -------------------------------------------- */
function ActionGrid({ onAction }) {
  const actions = [
  { id: "vers", label: "Faire un versement",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" strokeLinecap="round" /></svg> },
  { id: "rachat", label: "Faire un rachat",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="9" r="3.5" /><path d="M5 20c1-4 5-5 7-5s6 1 7 5" strokeLinecap="round" /></svg> },
  { id: "prog", label: "Faire un versement programmé",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" /></svg> }];

  return (
    <div className="cta-stack">
      {actions.map((a) =>
      <Btn key={a.id} secondary icon={<span style={{ width: 20, height: 20, color: "currentColor" }}>{a.svg}</span>} onClick={() => onAction(a)}>{a.label}</Btn>
      )}
    </div>);

}

/* ---------- Document tile + strip ---------------------------------- */
function DocumentTile({ eyebrow, date, title, issuer, refNum, onClick }) {
  return (
    <article className="doc-tile" onClick={onClick}>
      <div className="topR">
        <div className="eyebrow"><Icon name="file" /> {eyebrow}</div>
        <span className="date">{date}</span>
      </div>
      <div>
        <div className="title">{title}</div>
        <div className="meta"><div className="tick" /><span className="b">{issuer}</span><span>{refNum}</span></div>
      </div>
    </article>);

}

function DocumentStrip({ items, onTile }) {
  return (
    <div className="doc-strip">
      {items.map((d, i) => <DocumentTile key={i} {...d} onClick={() => onTile(d)} />)}
    </div>);

}

/* ---------- Donut card --------------------------------------------- */
function DonutCard({ title, items }) {
  // items: [{label, pct, color}]
  let cumul = 0;
  const stops = items.map(({ pct, color }) => {
    const a = cumul;cumul += pct;
    return `${color} ${a}% ${cumul}%`;
  }).join(", ");
  return (
    <div className="donut-card" style={{ justifyContent: "center", alignItems: "center" }}>
      <div className="lab">{title}</div>
      <div className="donut" style={{ background: `conic-gradient(${stops})` }} />
      <ul className="legend">
        {items.map((it, i) =>
        <li key={i}><span className="swatch" style={{ background: it.color }} />{it.label}</li>
        )}
      </ul>
    </div>);

}

/* ---------- Notification panel ------------------------------------- */
function NotifPanel({ open, items, onClose }) {
  return (
    <div className={"notif-panel" + (open ? " open" : "")}>
      <div className="head">Notifications</div>
      <ul>
        {items.map((n, i) =>
        <li key={i} className={n.read ? "read" : ""}>
            <span className="dot" />
            <div>
              <div className="ntitle">{n.title}</div>
              <div className="ndate">{n.date}</div>
            </div>
          </li>
        )}
      </ul>
      <div style={{ alignSelf: "flex-end" }}>
        <Link onClick={onClose} icon={null}>Fermer</Link>
      </div>
    </div>);

}

/* ---------- Modal -------------------------------------------------- */
function Modal({ open, onClose, title, children, primaryLabel = "Confirmer", onPrimary }) {
  return (
    <div className={"scrim" + (open ? " open" : "")} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <div className="row">
          <Btn secondary onClick={onClose}>Annuler</Btn>
          <Btn onClick={onPrimary}>{primaryLabel}</Btn>
        </div>
      </div>
    </div>);

}

/* ---------- Toast -------------------------------------------------- */
function Toast({ open, children }) {
  return (
    <div className={"toast" + (open ? " open" : "")}>
      <span className="dot" />
      {children}
    </div>);

}

/* ---------- Glyphs ------------------------------------------------- */
const Glyph = {
  ear: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 4a6 6 0 0 1 6 6c0 2.5-1.5 3.5-2.5 4.5S11 17 11 18.5a2.5 2.5 0 1 1-5 0c0-3 .5-4.5 .5-7.5a5.5 5.5 0 0 1 .5-2.5" /><path d="M12 9a2 2 0 0 0-4 0" /></svg>,
  tooth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M7 4c2 0 2 1.5 5 1.5S15 4 17 4a3 3 0 0 1 3 3c0 4-1.5 6-2 9-.5 2.5-1 4-2 4s-1.5-1.5-2-3.5S13 13 12 13s-1.5 1.5-2 3.5S9 20 8 20s-1.5-1.5-2-4c-.5-3-2-5-2-9a3 3 0 0 1 3-3z" /></svg>,
  pill: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" /><path d="M9 7.5l5.2 9" /></svg>,
  eye: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
};

/* ---------- Export ------------------------------------------------- */
Object.assign(window, {
  Icon, IconChip, Avatar, Pill, GrowthPill, Link, Btn,
  GlobalHeader, HeroBand, WelcomeCard, SectionHeader,
  RemboursementCard, ContractCard, TiersPayantCard,
  ActionGrid, DocumentTile, DocumentStrip, DonutCard,
  NotifPanel, Modal, Toast, Glyph
});