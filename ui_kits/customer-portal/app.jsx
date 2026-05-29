/* ──────────────────────────────────────────────────────────────────
   Customer-portal · interactive demo
   ────────────────────────────────────────────────────────────────── */
const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: "sante",   icon: "heart",    label: "Votre santé",    sub: "4 remboursements récents" },
  { id: "retraite", icon: "calendar", label: "Votre retraite", sub: "45 000,52 €" },
  { id: "epargne",  icon: "piggy",    label: "Votre épargne",  sub: "45 000,52 €" },
  { id: "prev",     icon: "file",     label: "Votre prévoyance", sub: "Couverture active" },
];

const REMBS = [
  { title: "Auditif",   date: "21/02/2026", person: { initials: "IC", name: "Inès Cordonier",  gender: "f" }, dep: "27,95 €", remb: "25,50 €",   glyph: Glyph.ear   },
  { title: "Dentiste",  date: "15/02/2026", person: { initials: "FH", name: "Fabrice Hérisson", gender: "m" }, dep: "25,40 €", remb: "12,40 €",   glyph: Glyph.tooth },
  { title: "Pharmacie", date: "14/02/2026", person: { initials: "IC", name: "Inès Cordonier",  gender: "f" }, dep: "18,40 €", paid: "Tiers payant", glyph: Glyph.pill  },
  { title: "Optique",   date: "08/02/2026", person: { initials: "MD", name: "Marie Dupont",    gender: "f" }, dep: "180,00 €", remb: "120,00 €", glyph: Glyph.eye   },
];

const CONTRACTS_RETRAITE = [
  { name: "Vivepargne",  num: "0123456789", sub: "Article 83 — collectif",  amount: "22 500,00 €", asOf: "19/06/2026" },
];
const CONTRACTS_EPARGNE = [
  { name: "Vivepargne",  num: "0123456789", sub: "Assurance vie multisupport", amount: "22 500,00 €", asOf: "19/06/2026" },
  { name: "Vivepargne",  num: "0987654321", sub: "PER individuel",              amount: "11 250,00 €", asOf: "19/06/2026" },
  { name: "Vivepargne",  num: "0246813579", sub: "Compte titres ordinaire",     amount: " 6 250,00 €", asOf: "19/06/2026" },
  { name: "Vivepargne",  num: "1357924680", sub: "Livret épargne",              amount: " 5 000,52 €", asOf: "19/06/2026" },
];

const DOCS = [
  { eyebrow: "DOCUMENTS CONTRACTUELS", date: "01/10/2026", title: "Notice d'information", issuer: "TEST AG", refNum: "RG1362691" },
  { eyebrow: "RELEVÉ ANNUEL",          date: "15/06/2026", title: "Situation au 31/12/2025", issuer: "TEST AG", refNum: "0123456789" },
  { eyebrow: "ATTESTATION",            date: "12/04/2026", title: "Attestation de droits", issuer: "TEST AG", refNum: "ATT-228491" },
  { eyebrow: "AVENANT",                date: "03/03/2026", title: "Avenant tiers payant", issuer: "TEST AG", refNum: "AV-009122" },
  { eyebrow: "DOCUMENTS CONTRACTUELS", date: "11/02/2026", title: "Conditions générales", issuer: "TEST AG", refNum: "CG-2026" },
];

const NOTIFS = [
  { title: "Votre remboursement Auditif a été versé", date: "il y a 2 h", read: false },
  { title: "Nouveau document disponible : Avenant tiers payant", date: "hier", read: false },
  { title: "Votre relevé annuel 2025 est en ligne", date: "il y a 4 j", read: true },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "santeBg": "blue",
  "retraiteBg": "white",
  "epargneBg": "blue",
  "documentsBg": "grey",
  "primaryColor": "#0242F4"
}/*EDITMODE-END*/;

const BG_OPTIONS = [
  { value: "blue",  label: "Bleu (tint)" },
  { value: "white", label: "Blanc" },
  { value: "grey",  label: "Gris" },
];

function App() {
  const { tweaks: t, setTweak } = useTweaks(TWEAK_DEFAULTS);

  // Live-bind the primary colour to a CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--ag-blue', t.primaryColor);
  }, [t.primaryColor]);

  const [active, setActive] = useState("sante");
  const [selectedRb, setSelRb] = useState(-1);
  const [selectedCt, setSelCt] = useState(-1);
  const [notifOpen, setNotifOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  function flashToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function jumpTo(id) {
    setActive(id);
    const el = document.getElementById("sec-" + id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  }

  function openAction(a) {
    const idx = selectedCt < 0 ? 0 : selectedCt;
    setModal({ kind: a.id, label: a.label, amount: "100,00", freq: "Mensuelle", contract: CONTRACTS_EPARGNE[idx].name });
  }

  function confirmAction() {
    const { label } = modal;
    setModal(null);
    flashToast(`${label} enregistré`);
  }

  return (
    <>
      <GlobalHeader user="Marie Dupont" initials="MD" onContact={() => flashToast("Un conseiller vous rappelle")} />
      <HeroBand />

      <main>
        {/* Santé / Mutuelle — also hosts the welcome card */}
        <section id="sec-sante" className={"section " + t.santeBg}>
          <div className="stage-inner">
            <WelcomeCard
              name="Marie Dupont"
              adherent="0123456789"
              activeSection={active}
              setActive={jumpTo}
              sections={SECTIONS}
              notifCount={NOTIFS.filter(n => !n.read).length}
              onBell={() => setNotifOpen(v => !v)}
            />
            <div style={{ height: 32 }} />
            <SectionHeader icon="heart" chipColor="green" title="Votre santé" />
            <div className="subtitle">Vos derniers remboursements</div>
            <div className="cols">
              <div className="stack-16">
                {REMBS.map((r, i) => (
                  <RemboursementCard key={i} {...r} selected={selectedRb === i} onClick={() => setSelRb(i)} />
                ))}
                <div><Link onClick={() => flashToast("Liste complète")}>Tous vos remboursements</Link></div>
              </div>
              <div className="side-rail">
                <TiersPayantCard
                  name="Marie Dupont"
                  from="15/01/2026"
                  to="31/12/2026"
                  onDownload={() => flashToast("Carte TP téléchargée")}
                />
                <div className="side-section">
                  <div className="h">Agir sur votre contrat</div>
                  <ActionGrid onAction={openAction} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Retraite */}
        <section id="sec-retraite" className={"section " + t.retraiteBg}>
          <div className="stage-inner">
            <SectionHeader
              icon="calendar"
              chipColor="green"
              title="Votre retraite supplémentaire"
              total="45 000,52 €"
              growth="1 524,01 €"
            />
            <div className="cols split">
              <DonutCard
                title="Répartition de votre retraite"
                items={[
                  { label: "Versements volontaires",    pct: 65, color: "var(--ag-green)" },
                  { label: "Abondement employeur",      pct:  5, color: "var(--ag-orange)" },
                  { label: "Versements obligatoires",   pct: 30, color: "var(--ag-purple)" },
                ]}
              />
              <div className="stack-16">
                <div className="subtitle" style={{ padding: 0 }}>Vos contrats</div>
                {CONTRACTS_RETRAITE.map((c, i) => <ContractCard key={i} {...c} selected={selectedCt === i} onClick={() => setSelCt(i)} />)}
                <div className="side-section" style={{ marginTop: 16 }}>
                  <div className="h">Agir sur votre contrat</div>
                  <div className="btn-row">
                    <Btn secondary onClick={() => openAction({id: "vers", label: "Faire un versement"})}>Faire un versement</Btn>
                    <Btn secondary onClick={() => openAction({id: "rachat", label: "Faire un rachat"})}>Faire un rachat</Btn>
                    <Btn secondary onClick={() => openAction({id: "prog", label: "Faire un versement programmé"})}>Faire un versement programmé</Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Épargne */}
        <section id="sec-epargne" className={"section " + t.epargneBg}>
          <div className="stage-inner">
            <SectionHeader
              icon="piggy"
              chipColor="green"
              title="Votre épargne"
              total="45 000,52 €"
              growth="1 524,01 €"
            />
            <div className="cols split">
              <DonutCard
                title="Répartition de votre épargne"
                items={[
                  { label: "Vivepargne — actions",   pct: 50, color: "var(--ag-green)" },
                  { label: "Vivepargne — obligations", pct: 12, color: "var(--ag-orange)" },
                  { label: "Livret + comptes",       pct: 38, color: "var(--ag-purple)" },
                ]}
              />
              <div className="stack-16">
                <div className="subtitle" style={{ padding: 0 }}>Vos contrats</div>
                {CONTRACTS_EPARGNE.map((c, i) => <ContractCard key={i} {...c} selected={selectedCt === i} onClick={() => setSelCt(i)} />)}
                <div className="side-section" style={{ marginTop: 16 }}>
                  <div className="h">Agir sur votre contrat</div>
                  <div className="btn-row">
                    <Btn secondary onClick={() => openAction({id: "vers", label: "Faire un versement"})}>Faire un versement</Btn>
                    <Btn secondary onClick={() => openAction({id: "rachat", label: "Faire un rachat"})}>Faire un rachat</Btn>
                    <Btn secondary onClick={() => openAction({id: "prog", label: "Faire un versement programmé"})}>Faire un versement programmé</Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section id="sec-prev" className={"section " + t.documentsBg}>
          <div className="stage-inner">
            <SectionHeader icon="file" purpleChip title="Vos derniers documents" />
            <DocumentStrip items={DOCS} onTile={d => flashToast(`Ouverture de « ${d.title} »`)} />
          </div>
        </section>
      </main>

      <NotifPanel open={notifOpen} items={NOTIFS} onClose={() => setNotifOpen(false)} />

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal ? modal.label : ""}
        primaryLabel="Confirmer"
        onPrimary={confirmAction}>
        {modal && (
          <>
            <label>
              Contrat
              <select defaultValue={modal.contract}>
                {CONTRACTS_EPARGNE.map((c, i) => <option key={i}>{c.name} · {c.num}</option>)}
              </select>
            </label>
            <label>
              Montant (€)
              <input type="text" defaultValue={modal.amount} />
            </label>
            {modal.kind === "prog" && (
              <label>
                Fréquence
                <select defaultValue={modal.freq}>
                  <option>Mensuelle</option>
                  <option>Trimestrielle</option>
                  <option>Annuelle</option>
                </select>
              </label>
            )}
            <div className="help">Aperçu uniquement — aucune transaction ne sera réellement enregistrée.</div>
          </>
        )}
      </Modal>

      <Toast open={!!toast}>{toast}</Toast>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Background par section" subtitle="Chaque bandeau remplit la page bord à bord.">
          <TweakRadio label="Santé" value={t.santeBg} onChange={v => setTweak("santeBg", v)} options={BG_OPTIONS} />
          <TweakRadio label="Retraite" value={t.retraiteBg} onChange={v => setTweak("retraiteBg", v)} options={BG_OPTIONS} />
          <TweakRadio label="Épargne" value={t.epargneBg} onChange={v => setTweak("epargneBg", v)} options={BG_OPTIONS} />
          <TweakRadio label="Documents" value={t.documentsBg} onChange={v => setTweak("documentsBg", v)} options={BG_OPTIONS} />
        </TweakSection>
        <TweakSection title="Brand">
          <TweakColor
            label="Couleur primaire"
            value={t.primaryColor}
            onChange={v => setTweak("primaryColor", v)}
            options={["#0242F4", "#1F4FA0", "#0E7C66", "#9747FF"]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
