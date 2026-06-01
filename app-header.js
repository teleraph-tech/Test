/* =============================================================
   Test AG — Global app header
   Usage: <header data-app-header data-active="accueil|sante|retraite|suivi|documents"></header>
   ============================================================= */
(function () {
  // ─── Styles (injected once) ──────────────────────────────────
  const CSS = `
    .app-header {
      position: sticky; top: 0; z-index: 40;
      background: #fff;
      border-bottom: 1px solid var(--border-rule);
    }

    /* ── Row 1 (utility / brand) ─────────────────────────────── */
    .ah-row1 {
      padding: 14px 48px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px;
      border-bottom: 1px solid var(--border-rule);
    }
    .ah-brand { display: flex; align-items: center; gap: 16px; }
    .ah-brand .mark {
      width: 38px; height: 38px; border-radius: 6px;
      background: var(--ag-blue);
      position: relative; overflow: hidden; flex: none;
    }
    .ah-brand .mark::before,
    .ah-brand .mark::after { content: ""; position: absolute; inset: 0; }
    .ah-brand .mark::before {
      background: var(--ag-ink);
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    .ah-brand .mark::after {
      background: var(--ag-green);
      clip-path: polygon(50% 0, 100% 0, 100% 50%, 50% 50%);
    }
    .ah-brand .wordmark {
      font: 700 16px/1 var(--font-sans);
      color: var(--ag-ink);
      letter-spacing: 0.02em;
    }
    .ah-brand .divider {
      width: 1px; height: 32px; background: var(--border-rule); margin: 0 8px;
    }
    .ah-brand .page-title {
      font: 500 18px/1.2 var(--font-sans);
      color: var(--ag-ink);
    }

    .ah-actions { display: flex; align-items: center; gap: 12px; }
    .ah-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 16px; height: 46px;
      border-radius: var(--r-md);
      font: 700 14px/1 var(--font-sans);
      cursor: pointer;
      background: #fff;
      color: var(--ag-ink);
      border: 1px solid var(--ag-ink);
      transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
    }
    .ah-btn:hover {
      background: var(--ag-blue);
      border-color: var(--ag-blue);
      color: #fff;
    }
    .ah-btn .gi { width: 18px; height: 18px; display: inline-grid; place-items: center; }
    .ah-btn .gi svg { width: 18px; height: 18px; }
    .ah-btn.profile { padding-right: 12px; }
    .ah-btn.profile .av {
      width: 24px; height: 24px; border-radius: 50%;
      background: var(--ag-pink); color: var(--ag-ink);
      border: 2px solid var(--ag-pink);
      display: inline-grid; place-items: center;
      font: 400 12px/1 var(--font-sans);
      margin-left: -4px;
    }

    /* ── Row 2 (global nav) ──────────────────────────────────── */
    .ah-row2 {
      padding: 0 48px;
      display: flex; align-items: stretch; justify-content: space-between;
      gap: 16px;
    }
    .ah-nav {
      display: flex; align-items: stretch;
      gap: 0;
    }
    .ah-nav-group {
      display: flex; align-items: stretch;
    }
    .ah-nav-group + .ah-nav-group {
      border-left: 1px solid var(--border-rule);
      margin-left: 16px;
      padding-left: 16px;
    }

    .ah-link {
      position: relative;
      display: inline-flex; align-items: center; gap: 10px;
      padding: 18px 20px;
      font: 700 14px/1 var(--font-sans);
      color: var(--ag-ink);
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      text-decoration: none;
      cursor: pointer;
      white-space: nowrap;
      transition: color 120ms ease, border-color 120ms ease;
    }
    .ah-link:hover { color: var(--ag-blue); }
    .ah-link.active {
      color: var(--ag-blue);
      border-bottom-color: var(--ag-blue);
    }
    .ah-link .ic {
      width: 18px; height: 18px;
      color: currentColor;
      display: inline-grid; place-items: center;
      flex: none;
    }
    .ah-link .ic .i { width: 18px; height: 18px; }
    .ah-link .caret {
      width: 12px; height: 12px;
      display: inline-grid; place-items: center;
      color: var(--ag-grey);
      margin-left: -2px;
    }
    .ah-link:hover .caret,
    .ah-link.active .caret { color: currentColor; }
    .ah-link .caret svg {
      width: 12px; height: 12px;
      transition: transform 120ms ease;
    }

    /* Dropdown */
    .ah-drop {
      position: relative;
    }
    .ah-drop-menu {
      position: absolute;
      top: 100%; left: 8px;
      min-width: 260px;
      background: #fff;
      border-radius: var(--r-md);
      box-shadow: var(--shadow-card);
      padding: 8px;
      display: none;
      flex-direction: column;
      z-index: 50;
      border: 1px solid var(--border-rule);
    }
    .ah-drop:hover .ah-drop-menu,
    .ah-drop:focus-within .ah-drop-menu { display: flex; }
    .ah-drop:hover .ah-link .caret svg,
    .ah-drop:focus-within .ah-link .caret svg {
      transform: rotate(180deg);
    }
    .ah-drop-menu a {
      display: flex; flex-direction: column;
      gap: 2px;
      padding: 10px 12px;
      border-radius: 6px;
      font: 700 13px/1.35 var(--font-sans);
      color: var(--ag-ink);
      text-decoration: none;
      transition: background 120ms ease, color 120ms ease;
    }
    .ah-drop-menu a .sub {
      font: 400 12px/1.4 var(--font-sans);
      color: var(--fg-2);
    }
    .ah-drop-menu a:hover {
      background: var(--ag-blue-tint);
      color: var(--ag-blue);
    }
    .ah-drop-menu a:hover .sub { color: var(--ag-blue); }

    /* Notification (right side of row 2) */
    .ah-notif {
      position: relative;
      display: inline-flex; align-items: center; gap: 10px;
      padding: 18px 20px 18px 16px;
      background: transparent; border: none;
      cursor: pointer;
      font: 700 14px/1 var(--font-sans);
      color: var(--ag-ink);
      transition: color 120ms ease;
    }
    .ah-notif:hover { color: var(--ag-blue); }
    .ah-notif .bell-wrap {
      position: relative;
      width: 22px; height: 22px;
      display: inline-grid; place-items: center;
      color: currentColor;
    }
    .ah-notif .bell-wrap .i { width: 20px; height: 20px; }
    .ah-notif .badge {
      position: absolute; top: -4px; right: -6px;
      min-width: 16px; height: 16px; padding: 0 4px;
      border-radius: 9999px;
      background: var(--ag-orange); color: #fff;
      border: 2px solid #fff;
      font: 700 9px/12px var(--font-sans);
      display: inline-grid; place-items: center;
    }

    @media (max-width: 1180px) {
      .ah-row1, .ah-row2 { padding-left: 24px; padding-right: 24px; }
      .ah-link { padding: 16px 14px; gap: 8px; }
      .ah-nav-group + .ah-nav-group { margin-left: 8px; padding-left: 8px; }
    }
    @media (max-width: 900px) {
      .ah-row2 { overflow-x: auto; }
      .ah-brand .page-title { display: none; }
    }
  `;

  // ─── Markup ──────────────────────────────────────────────────
  function arrowDown() {
    return `<span class="caret" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"></path></svg>
    </span>`;
  }
  function homeIcon() {
    return `<span class="ic" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 11.5L12 4l9 7.5"></path>
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"></path>
      </svg>
    </span>`;
  }
  function fileIcon() {
    return `<span class="ic" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
        <path d="M14 3v5h5"></path>
        <path d="M8 13h8"></path>
        <path d="M8 17h6"></path>
      </svg>
    </span>`;
  }
  function listIcon() {
    return `<span class="ic" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6h11"></path>
        <path d="M9 12h11"></path>
        <path d="M9 18h11"></path>
        <circle cx="5" cy="6" r="1.5"></circle>
        <circle cx="5" cy="12" r="1.5"></circle>
        <circle cx="5" cy="18" r="1.5"></circle>
      </svg>
    </span>`;
  }

  function render(active) {
    return `
      <div class="ah-row1">
        <div class="ah-brand">
          <span class="mark" aria-hidden="true"></span>
          <span class="wordmark">TEST AG</span>
          <span class="divider" aria-hidden="true"></span>
          <span class="page-title">Votre Espace client</span>
        </div>
        <div class="ah-actions">
          <button class="ah-btn" type="button">
            <span class="gi" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"></path>
              </svg>
            </span>
            Contact
          </button>
          <button class="ah-btn profile" type="button">
            <span class="av" aria-hidden="true">MD</span>
            Marie Dupont
            <span class="gi" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6l4 4 4-4"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div class="ah-row2">
        <nav class="ah-nav" aria-label="Navigation principale">
          <div class="ah-nav-group">
            <a class="ah-link ${active==='accueil'?'active':''}" href="index.html">
              ${homeIcon()}
              Accueil
            </a>
            <div class="ah-drop">
              <a class="ah-link ${active==='sante'?'active':''}" href="index.html#sante">
                <span class="ic" aria-hidden="true"><span class="i i-heart"></span></span>
                Votre santé
                ${arrowDown()}
              </a>
              <div class="ah-drop-menu" role="menu">
                <a href="index.html#sante">Vos remboursements <span class="sub">5 derniers · 30 jours</span></a>
                <a href="index.html#sante">Votre carte tiers payant <span class="sub">Valable jusqu'au 31/12/2026</span></a>
                <a href="#">Vos garanties <span class="sub">Mutuelle Santé Confort</span></a>
                <a href="#">Trouver un praticien <span class="sub">Réseau de soins Test AG</span></a>
              </div>
            </div>
            <div class="ah-drop">
              <a class="ah-link ${active==='retraite'?'active':''}" href="index.html#retraite">
                <span class="ic" aria-hidden="true"><span class="i i-calendar"></span></span>
                Votre retraite
                ${arrowDown()}
              </a>
              <div class="ah-drop-menu" role="menu">
                <a href="Détails Épargne.html">Plan Épargne Retraite Entreprise <span class="sub">Vivépargne · 22 500,00 €</span></a>
                <a href="index.html#retraite">PER Entreprise <span class="sub">Decathlon · 45 000,52 €</span></a>
                <a href="#">Simuler ma retraite <span class="sub">Estimation personnalisée</span></a>
                <a href="#">Mes bénéficiaires <span class="sub">Mettre à jour la clause</span></a>
              </div>
            </div>
          </div>
          <div class="ah-nav-group">
            <a class="ah-link ${active==='suivi'?'active':''}" href="#">
              ${listIcon()}
              Suivi de demande
            </a>
            <a class="ah-link ${active==='documents'?'active':''}" href="#">
              ${fileIcon()}
              Documents
            </a>
          </div>
        </nav>
        <button class="ah-notif" type="button" aria-label="Notifications (3 non lues)">
          <span class="bell-wrap" aria-hidden="true">
            <span class="i i-bell"></span>
            <span class="badge">3</span>
          </span>
          Notifications
        </button>
      </div>
    `;
  }

  function init() {
    // Inject CSS once
    if (!document.getElementById('app-header-css')) {
      const s = document.createElement('style');
      s.id = 'app-header-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    document.querySelectorAll('[data-app-header]').forEach(el => {
      const active = el.getAttribute('data-active') || 'accueil';
      el.classList.add('app-header');
      el.innerHTML = render(active);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
