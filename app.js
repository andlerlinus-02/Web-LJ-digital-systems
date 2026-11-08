/**
 * LJ Digital Systems — Interactive Application Logic (Enterprise Dark Tech Edition)
 * Founders: Linus & Jasper
 * Target: Inhabergeführte Nischenbetriebe, Fachdienstleister & Spezialunternehmen
 */

const AGENT_TIERS = {
  tier1: {
    id: 'tier1',
    badge: 'STUFE 1 • STARTER',
    title: '24/7 Smart Frontdesk & Anfragesystem',
    subtitle: 'Rund-um-die-Uhr digitaler Kundenempfang, strukturierte Projekterfassung, Datei-/Foto-Upload und automatische Weiterleitung ins Postfach.',
    connectedNodes: ['node-web', 'node-mail'],
    capabilities: [
      'Nimmt Kundenanfragen 24/7 in Echtzeit entgegen und filtert Standardfragen',
      'Erfasst Pflicht-Eckdaten (Projektumfang, Maße, Dringlichkeit, Wunschtermine)',
      'Ermöglicht direkten Upload von Plänen, Skizzen, Problemfotos oder Typenschildern',
      'Übergibt fertig vorqualifizierte Projektakten direkt an Ihr Büro-Postfach'
    ],
    scenarios: [
      {
        name: 'Prompt 1: Spezialauftrag vorqualifizieren (Maße & Fotos)',
        customerMsg: 'Kundenanfrage (20:15 Uhr): "Guten Abend, wir benötigen ein Angebot für eine Spezialanfertigung / Fachleistung für unseren Betrieb. Maße und Fotos liegen vor."',
        agentReply: 'Guten Abend! Gerne nehmen wir Ihre Anfrage auf. Bitte laden Sie hier kurz Ihre Maße, Skizzen oder Fotos hoch und wählen Sie das gewünschte Ausführungsfenster.',
        customerFollowup: 'Kunde lädt 3 Detailfotos & Maßblatt hoch: "Ausführung idealerweise im nächsten Monat."',
        agentFinal: '✓ Anfrage vollständig qualifiziert: Eckdaten, Maße und 3 Fotos erfasst. Projektakte strukturiert im Büro-Postfach abgelegt. Der Inhaber erhält eine Benachrichtigung zur Freigabe.',
        logs: [
          { time: '[20:15:02]', tag: 'INCOMING', color: 'text-amber-400', text: 'Website-Anfrage außerhalb der Geschäftszeiten erkannt' },
          { time: '[20:15:04]', tag: 'INPUT_PARSE', color: 'text-amber-200', text: 'Strukturierte Pflichtfelder & Foto-Upload abgefragt' },
          { time: '[20:15:08]', tag: 'UPLOAD_VERIFY', color: 'text-emerald-400', text: '3 Dateien empfangen (Pläne & Typenschilder validiert)' },
          { time: '[20:15:10]', tag: 'HANDOVER', color: 'text-amber-300', text: 'Fertige Projektakte an kontakt@lj-digital-systems.de übergeben ✓' }
        ]
      },
      {
        name: 'Prompt 2: Notfall-Filter & Terminslot-Vergabe',
        customerMsg: 'Anfrage: "Unser System steht still, wir brauchen dringend einen Techniker oder Gutachter vor Ort!"',
        agentReply: 'Dringlichkeit erkannt. Liegt ein kompletter Betriebsstillstand vor? Falls ja: Bitte bestätigen Sie kurz Ihren Standort, wir reservieren sofort das nächste Notfall-Zeitfenster.',
        customerFollowup: 'Standort bestätigt: "Gewerbepark Süd, Tor 4 – Stillstand seit 30 Minuten."',
        agentFinal: '✓ Express-Ticket priorisiert erstellt. Einsatzleiter per SMS & Push alarmiert. Kunden-Bestätigung mit geschätzter Ankunftszeit versendet.',
        logs: [
          { time: '[11:02:10]', tag: 'PRIORITY_ALERT', color: 'text-amber-400', text: 'Dringlichkeit: Hoch / Betriebsstillstand verifiziert' },
          { time: '[11:02:14]', tag: 'DISPO_TRIGGER', color: 'text-emerald-400', text: 'Standort abgeglichen & Team-Bereitschaft alarmiert' },
          { time: '[11:02:18]', tag: 'SMS_SENT', color: 'text-amber-300', text: 'Push-Benachrichtigung an Einsatzteam übermittelt ✓' }
        ]
      }
    ],
    topicValue: 'Stufe 1: 24/7 Smart Frontdesk & Anfragesystem'
  },
  tier2: {
    id: 'tier2',
    badge: 'STUFE 2 • BELIEBTESTE WAHL',
    title: 'Interner Büro- & Angebots-Assistent',
    subtitle: 'Sicherer Lesezugriff auf freigegebene Preislisten, Vorlagen & Kundenakten – generiert fertige Angebotsentwürfe zur 1-Klick-Freigabe durch den Inhaber.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail'],
    capabilities: [
      'Geschützter Lesezugriff auf freigegebene Ordner (Preislisten, Vorlagen, Kundenhistorie)',
      'Erstellt passgenaue Angebotsentwürfe nach Ihren betrieblichen Vorgaben & Rabattstaffeln',
      'Keine unbemerkten Mails: Bereitstellung zur 1-Klick-Freigabe durch den Inhaber',
      'Spart wöchentlich 8–15 Stunden lästige Dokumenten- und Kalkulationsarbeit'
    ],
    scenarios: [
      {
        name: 'Prompt 1: Angebot aus Preisliste 2026 & Vorlage erstellen',
        customerMsg: 'Inhaber-Befehl: "Erstelle einen Angebotsentwurf basierend auf unserer Preisliste 2026 und der Projektvorlage für Neukunde Meyer."',
        agentReply: 'Geschützter Zugriff auf Ordner /Kalkulationen_2026 und /Vorlagen aktiv. Bestandsdaten und Leistungspositionen wurden extrahiert und in den Standard-Angebotsrahmen eingefügt.',
        customerFollowup: 'Prüfung: "Bitte 5% Projekt-Nachlass einrechnen und als Freigabe-Entwurf bereitlegen."',
        agentFinal: '✓ Angebotsentwurf fertig kalkuliert (Netto: 5.420 €). PDF unter /Entwuerfe/Angebot_Meyer_2026.pdf abgelegt. E-Mail-Entwurf liegt im Postfach – 1 Klick zur Freigabe genügt.',
        logs: [
          { time: '[08:42:01]', tag: 'STORAGE_AUTH', color: 'text-amber-400', text: 'Rollenbasierter Zugriff: /Preislisten/2026.xlsx & /Vorlagen/Angebot.docx' },
          { time: '[08:42:04]', tag: 'DATA_EXTRACT', color: 'text-amber-200', text: 'Artikelpreise, Stundenkontingente & Nachlass kalkuliert' },
          { time: '[08:42:07]', tag: 'DRAFT_GEN', color: 'text-emerald-400', text: 'Rechtssicheres Angebots-PDF generiert & archiviert' },
          { time: '[08:42:09]', tag: 'WAIT_APPROVAL', color: 'text-amber-300', text: 'Bereit zur 1-Klick-Freigabe durch den Inhaber ✓' }
        ]
      },
      {
        name: 'Prompt 2: Dokumentensuche & Leistungsabgleich',
        customerMsg: 'Rückfrage: "Welche Konditionen und Spezifikationen hatten wir beim Projekt Weber im Vorjahr vereinbart?"',
        agentReply: 'Durchsuche freigegebenen Speicher... Gefunden in /Projekte_2025/Weber_GmbH: Sondervereinbarung Stundensatz 85 €, Garantieerweiterung auf 36 Monate.',
        customerFollowup: 'Kopiere diese Konditionen direkt in den neuen Entwurf für das Folgeprojekt.',
        agentFinal: '✓ Konditionen übernommen. Nachtrags-Angebot mit identischen Parametern erzeugt und zur Prüfung auf das Inhaber-Dashboard gelegt.',
        logs: [
          { time: '[14:20:11]', tag: 'FILE_SEARCH', color: 'text-amber-400', text: 'Indexierter Scan von 3.400 PDF-Akten in 1,2 Sekunden' },
          { time: '[14:20:13]', tag: 'KNOWLEDGE_SYNC', color: 'text-amber-200', text: 'Historische Konditionen aus Projektakte 2025 übernommen' },
          { time: '[14:20:16]', tag: 'DRAFT_UPDATED', color: 'text-emerald-400', text: 'Folgeangebot aktualisiert & zur Freigabe bereit ✓' }
        ]
      },
      {
        name: 'Projektplaner & Dokumentenprüfung',
        customerMsg: 'Kunde lädt CAD-Skizze hoch. Prüfe Vollständigkeit, erfasse Maße und erstelle Auftragsordner im Firmennetzwerk.',
        agentReply: 'CAD-Skizze empfangen und gescannt: 100% Vollständigkeit verifiziert. Wandstärken, Anschlüsse und Maßketten extrahiert. Auftragsordner im Firmennetzwerk angelegt.',
        customerFollowup: 'Prüfprotokoll und Angebotsentwurf zur finalen 1-Klick-Freigabe bereitlegen.',
        agentFinal: '✓ Dokument #2026-84 zur 1-Klick-Freigabe bereitgelegt. Zugriff auf /Preise_2026.xlsx protokolliert, vertrauliche Chef-Ordner gesperrt.',
        logs: [
          { time: '[08:29:12]', tag: 'AUTH_OK', color: 'text-emerald-400', text: 'Verifiziere Berechtigung: Zugriff auf /Preise_2026.xlsx gewährt.' },
          { time: '[08:29:13]', tag: 'SECURITY_CHECK', color: 'text-amber-400', text: 'Sicherheits-Check: Vertrauliche Ordner gesperrt.' },
          { time: '[08:29:14]', tag: 'APPROVAL_READY', color: 'text-emerald-400', text: 'Dokument #2026-84 zur 1-Klick-Freigabe bereitgelegt.' }
        ]
      }
    ],
    topicValue: 'Stufe 2: Interner Büro- & Angebots-Assistent'
  },
  tier3: {
    id: 'tier3',
    badge: 'STUFE 3 • AUTONOM',
    title: 'Vollintegrierte Betriebs-Automation',
    subtitle: 'Tiefe Verknüpfung mit Firmennetzwerk, Cloud-Speichern, CRM/ERP und Branchensoftware. Führt Arbeitsabläufe nach Freigabe autonom aus.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail', 'node-network'],
    capabilities: [
      'Tiefe Systemanbindung an Branchen-ERP, Buchhaltung, Cloud-Speicher & Kalender',
      'Führt Folgeprozesse nach Inhaber-Freigabe autonom über mehrere Programme aus',
      'Automatischer Abgleich von Materialbeständen, Dispositions-Terminen & Projektordnern',
      'Lückenloser Audit-Trail: Jede Systemaktion wird transparent protokolliert'
    ],
    scenarios: [
      {
        name: 'Prompt 1: Autonomer Auftragsstart nach digitaler Signatur',
        customerMsg: 'System-Ereignis: Angebot #2026-089 wurde vom Auftraggeber digital freigegeben.',
        agentReply: 'Auftragsfreigabe registriert. Starte vollintegrierte Prozesskette: 1) Kundenstatus im ERP auf "Aktiv" gesetzt. 2) Projektordner im Netzwerk angelegt.',
        customerFollowup: 'Folgeschritte: Materialbestellung & Ausführungstermin planen.',
        agentFinal: '✓ Abgeschlossen: Dispositions-Slot im Teamkalender geblockt, Materialbedarf an Lieferantenschnittstelle übermittelt, Auftragsbestätigung versendet.',
        logs: [
          { time: '[09:10:02]', tag: 'EVENT_TRIGGER', color: 'text-amber-400', text: 'Digitale Signatur registriert -> Workflow gestartet' },
          { time: '[09:10:05]', tag: 'ERP_WRITE', color: 'text-amber-200', text: 'Kundenakte im Branchensystem erzeugt & Projektpfad gesichert' },
          { time: '[09:10:08]', tag: 'DISPO_SYNC', color: 'text-emerald-400', text: 'Team-Kalender KW 48 geblockt & Bestätigung versendet' },
          { time: '[09:10:11]', tag: 'PIPELINE_OK', color: 'text-amber-300', text: 'End-to-End Workflow fehlerfrei abgeschlossen ✓' }
        ]
      }
    ],
    topicValue: 'Stufe 3: Vollintegrierte Betriebs-Automation'
  },
  custom: {
    id: 'custom',
    badge: 'INDIVIDUELL',
    title: 'Maßgeschneiderte Spezial-Architektur',
    subtitle: 'Spezifische Schnittstellen, Spezialdatenbanken oder proprietäre Software. Linus & Jasper entwickeln Ihre maßgeschneiderte Lösung.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail', 'node-network'],
    capabilities: [
      'Direkte API-Konnektoren zu Spezialsoftware, Gutachter-Tools & Planungs-Software',
      'Multimodale Erfassung (Sprachnotizen, Baupläne, Schadensfotos & Messprotokolle)',
      '100% DSGVO-konforme Architektur auf deutschen & europäischen Servern',
      'Persönlich konzipiert und implementiert durch Linus & Jasper'
    ],
    scenarios: [
      {
        name: 'Prompt 1: Multimodale Schadens- & Projektanalyse vor Ort',
        customerMsg: 'Eingang: Sprachmemo des Projektleiters vor Ort + 4 Baustellenfotos zur Schadensdokumentation.',
        agentReply: 'Sprachmemo transkribiert. Bildanalyse der 4 Fotos durchgeführt: Rissbildungen & Maßangaben erkannt und dem Gutachten zugeordnet.',
        customerFollowup: 'Erstelle den Entwurf für das Zwischengutachten.',
        agentFinal: '✓ Zwischenbericht im Gutachten-Format erzeugt. Mängel fotodokumentiert im freigegebenen Projektordner abgelegt.',
        logs: [
          { time: '[15:30:01]', tag: 'AUDIO_PARSE', color: 'text-amber-400', text: 'Sprachmemo transkribiert & Fachbegriffe zugeordnet' },
          { time: '[15:30:04]', tag: 'VISION_API', color: 'text-amber-200', text: '4 Fotos analysiert & Bauschäden strukturiert erfasst' },
          { time: '[15:30:08]', tag: 'REPORT_READY', color: 'text-emerald-400', text: 'Berichtsentwurf zur Freigabe bereitgestellt ✓' }
        ]
      }
    ],
    topicValue: 'Individuelle Speziallösung'
  }
};

let currentTierKey = 'tier2';
let currentScenarioIndex = 0;

function selectSimulatorTier(tierKey, scenarioIdx = 0) {
  currentTierKey = tierKey;
  currentScenarioIndex = scenarioIdx;
  const tier = AGENT_TIERS[tierKey];
  if (!tier) return;

  // Update simulator tab buttons
  document.querySelectorAll('[data-sim-tab]').forEach((btn) => {
    const isSelected = btn.getAttribute('data-sim-tab') === tierKey;
    if (isSelected) {
      btn.classList.add('tier-tab-active', 'text-white');
      btn.classList.remove('text-slate-400', 'border-slate-800');
    } else {
      btn.classList.remove('tier-tab-active', 'text-white');
      btn.classList.add('text-slate-400', 'border-slate-800');
    }
  });

  const badgeEl = document.getElementById('sim-tier-badge');
  const titleEl = document.getElementById('sim-tier-title');
  const subtitleEl = document.getElementById('sim-tier-subtitle');
  const ctaBtn = document.getElementById('sim-tier-cta');

  if (badgeEl) badgeEl.textContent = tier.badge;
  if (titleEl) titleEl.textContent = tier.title;
  if (subtitleEl) subtitleEl.textContent = tier.subtitle;
  if (ctaBtn) {
    ctaBtn.setAttribute('onclick', `scrollToContactWithTopic('${tier.topicValue}')`);
  }

  // Update capabilities list
  const capList = document.getElementById('sim-capabilities-list');
  if (capList) {
    capList.innerHTML = tier.capabilities
      .map(
        (cap) => `
        <li class="flex items-start gap-2.5 text-xs text-slate-300">
          <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>${cap}</span>
        </li>`
      )
      .join('');
  }

  // Visual Node Connections
  const allNodeIds = ['node-web', 'node-storage', 'node-mail', 'node-network'];
  allNodeIds.forEach((nodeId) => {
    const el = document.getElementById(nodeId);
    const statusEl = document.getElementById(`${nodeId}-status`);
    if (!el) return;
    const isConnected = tier.connectedNodes.includes(nodeId);
    if (isConnected) {
      el.classList.remove('opacity-40', 'border-slate-800', 'bg-slate-900/40');
      el.classList.add('border-amber-500/50', 'bg-slate-900/90', 'shadow-md');
      if (statusEl) {
        statusEl.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-amber-400 pulse-node"></span><span class="text-amber-400 font-medium">Aktiv verbunden</span>`;
      }
    } else {
      el.classList.add('opacity-40', 'border-slate-800', 'bg-slate-900/40');
      el.classList.remove('border-amber-500/50', 'bg-slate-900/90', 'shadow-md');
      if (statusEl) {
        statusEl.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-slate-600"></span><span class="text-slate-500">Inaktiv</span>`;
      }
    }
  });

  // Scenario Buttons
  const scenarioSwitcher = document.getElementById('sim-scenario-buttons');
  if (scenarioSwitcher) {
    if (tier.scenarios.length > 1) {
      scenarioSwitcher.innerHTML = tier.scenarios
        .map(
          (sc, idx) => `
          <button
            type="button"
            onclick="selectSimulatorTier('${tierKey}', ${idx})"
            class="px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              idx === scenarioIdx
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:text-slate-200'
            }"
          >
            ${sc.name}
          </button>`
        )
        .join('');
    } else {
      scenarioSwitcher.innerHTML = `<span class="text-xs text-amber-400 font-medium">${tier.scenarios[0].name}</span>`;
    }
  }

  // Chat conversation
  const scenario = tier.scenarios[scenarioIdx] || tier.scenarios[0];
  const chatContainer = document.getElementById('sim-chat-stream');
  if (chatContainer && scenario) {
    chatContainer.innerHTML = `
      <div class="flex flex-col gap-3">
        <!-- Input -->
        <div class="flex items-start gap-3">
          <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
            EIN
          </div>
          <div class="rounded-xl rounded-tl-none bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 text-xs text-slate-200 max-w-[90%]">
            ${scenario.customerMsg}
          </div>
        </div>

        <!-- System response -->
        <div class="flex items-start justify-end gap-3">
          <div class="rounded-xl rounded-tr-none bg-amber-950/70 border border-amber-500/30 px-3.5 py-2 text-xs text-white max-w-[90%] shadow-md">
            <div class="flex items-center gap-1.5 text-[10px] font-semibold text-amber-300 mb-0.5">
              <span class="h-1.5 w-1.5 rounded-full bg-amber-400 pulse-node"></span>
              LJ System (${tier.badge.split('•')[0].trim()})
            </div>
            ${scenario.agentReply}
          </div>
        </div>

        <!-- Follow-up -->
        <div class="flex items-start gap-3">
          <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
            EIN
          </div>
          <div class="rounded-xl rounded-tl-none bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 text-xs text-slate-200 max-w-[90%]">
            ${scenario.customerFollowup}
          </div>
        </div>

        <!-- Final approval preview -->
        <div class="flex items-start justify-end gap-3">
          <div class="rounded-xl rounded-tr-none bg-slate-900 border border-emerald-500/40 px-3.5 py-2 text-xs text-emerald-100 max-w-[90%] shadow-md">
            <div class="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 mb-0.5">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Bereitgestellt zur 1-Klick-Freigabe
            </div>
            ${scenario.agentFinal}
          </div>
        </div>
      </div>
    `;
  }

  // System Execution Logs (Schwarzer Kasten, Monospace, grüner/akzentuierter Text)
  const logContainer = document.getElementById('sim-terminal-logs');
  if (logContainer && scenario) {
    logContainer.innerHTML = scenario.logs
      .map(
        (log) => `
        <div class="flex items-start gap-2.5 font-mono text-xs py-1.5 border-b border-white/5 last:border-0 leading-relaxed">
          <span class="text-emerald-400 font-bold shrink-0">${log.time.startsWith('[') ? log.time : `[${log.time}]`}</span>
          <span class="${log.color} font-bold shrink-0">[${log.tag}]</span>
          <span class="text-slate-100 font-mono">${log.text}</span>
        </div>`
      )
      .join('');
  }
}

/* ==========================================================================
   Unified Contact Flow & Direct Submission to kontakt@lj-digital-systems.de
   ========================================================================== */

let selectedTopics = new Set(['Stufe 2: Interner Büro- & Angebots-Assistent']);
let selectedSlot = 'Flexibel / Nach Vereinbarung';

function toggleTopicChip(topicName, btnElement) {
  if (selectedTopics.has(topicName)) {
    if (selectedTopics.size > 1) {
      selectedTopics.delete(topicName);
      btnElement.classList.remove('topic-chip-active');
    }
  } else {
    selectedTopics.add(topicName);
    btnElement.classList.add('topic-chip-active');
  }
  updateHiddenFormSummary();
}

function selectTimeSlot(slotLabel, btnElement) {
  selectedSlot = slotLabel;
  document.querySelectorAll('[data-slot-chip]').forEach((el) => {
    el.classList.remove('slot-chip-active');
  });
  if (btnElement) {
    btnElement.classList.add('slot-chip-active');
  }
  updateHiddenFormSummary();
}

function updateHiddenFormSummary() {
  const summaryDisplay = document.getElementById('selected-config-summary');
  if (summaryDisplay) {
    const topicsArr = Array.from(selectedTopics);
    summaryDisplay.textContent = `${topicsArr.join(' + ')} • Wunschfenster: ${selectedSlot}`;
  }
}

function scrollToContactWithTopic(topicName) {
  selectedTopics.clear();
  selectedTopics.add(topicName);

  document.querySelectorAll('[data-topic-chip]').forEach((btn) => {
    const chipTopic = btn.getAttribute('data-topic-chip');
    if (chipTopic === topicName) {
      btn.classList.add('topic-chip-active');
    } else {
      btn.classList.remove('topic-chip-active');
    }
  });

  updateHiddenFormSummary();

  const contactSection = document.getElementById('kontakt');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('contact-submit-btn');
  const submitBtnText = document.getElementById('contact-submit-btn-text');

  const name = document.getElementById('contact-name')?.value.trim() || '';
  const company = document.getElementById('contact-company')?.value.trim() || 'Nicht angegeben';
  const email = document.getElementById('contact-email')?.value.trim() || '';
  const phone = document.getElementById('contact-phone')?.value.trim() || 'Nicht angegeben';
  const message = document.getElementById('contact-message')?.value.trim() || 'Keine zusätzliche Nachricht';
  const topicsText = Array.from(selectedTopics).join(', ');

  const subjectPlain = `Anfrage Potenzialanalyse: ${company !== 'Nicht angegeben' ? company : name} – LJ Digital Systems`;
  const subjectEncoded = encodeURIComponent(subjectPlain);
  const bodyLines = [
    `Hallo Linus und Jasper,`,
    ``,
    `ich interessiere mich für eine unverbindliche 15-Minuten-Potenzialanalyse für unseren Betrieb.`,
    ``,
    `--- AUSGEWÄHLTE BEREICHE ---`,
    `• Schwerpunkte: ${topicsText}`,
    `• Bevorzugtes Gesprächsfenster: ${selectedSlot}`,
    ``,
    `--- KONTAKTDATEN ---`,
    `• Name: ${name}`,
    `• Unternehmen / Spezialisierung: ${company}`,
    `• E-Mail: ${email}`,
    `• Telefon für Rückruf: ${phone}`,
    ``,
    `--- BESCHREIBUNG DES ENG-PASSES ---`,
    `${message}`
  ];

  const fullTextPlain = bodyLines.join('\n');
  const mailtoUrl = `mailto:kontakt@lj-digital-systems.de?subject=${subjectEncoded}&body=${encodeURIComponent(fullTextPlain)}`;

  if (submitBtn) submitBtn.disabled = true;
  if (submitBtnText) submitBtnText.textContent = 'Wird direkt übermittelt...';

  const feedbackBox = document.getElementById('contact-feedback-box');
  const feedbackTitle = document.getElementById('contact-feedback-title');
  const feedbackDesc = document.getElementById('contact-feedback-desc');
  const previewTextEl = document.getElementById('contact-summary-preview');
  const directMailBtn = document.getElementById('contact-direct-mailto');

  if (previewTextEl) previewTextEl.textContent = fullTextPlain;
  if (directMailBtn) directMailBtn.setAttribute('href', mailtoUrl);

  try {
    const response = await fetch('https://formsubmit.co/ajax/kontakt@lj-digital-systems.de', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subjectPlain,
        Name: name,
        Unternehmen: company,
        Email: email,
        Telefon: phone,
        Ausgewaehlte_Themen: topicsText,
        Wunschtermin_Erstgespraech: selectedSlot,
        Nachricht: message,
        _template: 'table'
      })
    });

    const result = await response.json();

    if (response.ok && (result.success === 'true' || result.success === true)) {
      if (feedbackTitle) {
        feedbackTitle.textContent = '✓ Vielen Dank! Ihre Anfrage wurde direkt an LJ Digital Systems gesendet.';
      }
      if (feedbackDesc) {
        feedbackDesc.innerHTML =
          'Wir haben Ihre Angaben für die 15-Minuten-Potenzialanalyse unter <strong>kontakt@lj-digital-systems.de</strong> erhalten und melden uns verlässlich zum gewünschten Zeitfenster bei Ihnen.';
      }
      if (feedbackBox) feedbackBox.classList.remove('hidden');
    } else {
      throw new Error('Fallback to mailto');
    }
  } catch (err) {
    if (feedbackTitle) {
      feedbackTitle.textContent = '✓ Vielen Dank! Ihre Anfrage wurde direkt an LJ Digital Systems gesendet.';
    }
    if (feedbackDesc) {
      feedbackDesc.innerHTML =
        'Sollte die automatische Übertragung blockiert sein, klicken Sie einfach auf den Button unten, um die Anfrage direkt über Ihr E-Mail-Programm abzusenden:';
    }
    if (feedbackBox) feedbackBox.classList.remove('hidden');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitBtnText) submitBtnText.textContent = 'Rückruf anfordern (Kostenlos & Unverbindlich)';
  }
}

function copyRequestText() {
  const previewEl = document.getElementById('contact-summary-preview');
  if (previewEl) {
    navigator.clipboard.writeText(previewEl.textContent).then(() => {
      alert('Anfragetext in die Zwischenablage kopiert!');
    });
  }
}

/* ==========================================================================
   Floating Chatbot Assistant Widget
   ========================================================================== */

let chatWidgetOpen = false;

function toggleChatWidget() {
  const box = document.getElementById('chat-widget-box');
  chatWidgetOpen = !chatWidgetOpen;
  if (box) {
    if (chatWidgetOpen) {
      box.classList.remove('hidden');
      const input = document.getElementById('chat-widget-input');
      if (input) input.focus();
    } else {
      box.classList.add('hidden');
    }
  }
}

function appendChatMessage(sender, text, ctaTopic = null) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'user' ? 'flex justify-end' : 'flex justify-start';

  if (sender === 'user') {
    msgDiv.innerHTML = `
      <div class="rounded-xl rounded-tr-none bg-amber-600 px-3.5 py-2.5 text-xs text-white max-w-[85%] shadow">
        ${text}
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="rounded-xl rounded-tl-none bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 max-w-[90%] shadow">
        <div class="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1">LJ Digital Systems Assistent</div>
        <p class="leading-relaxed">${text}</p>
        ${
          ctaTopic
            ? `<button onclick="toggleChatWidget(); scrollToContactWithTopic('${ctaTopic}')" class="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 px-2.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition">
                <span>Passendes Thema im Formular wählen</span>
                <span>→</span>
              </button>`
            : ''
        }
      </div>
    `;
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function askQuickBotQuestion(questionText) {
  appendChatMessage('user', questionText);
  setTimeout(() => {
    respondToUserChat(questionText);
  }, 400);
}

function handleChatWidgetSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chat-widget-input');
  if (!input) return;
  const userText = input.value.trim();
  if (!userText) return;

  appendChatMessage('user', userText);
  input.value = '';

  setTimeout(() => {
    respondToUserChat(userText);
  }, 450);
}

function respondToUserChat(userText) {
  const lower = userText.toLowerCase();

  if (lower.includes('stufe') || lower.includes('unterschied') || lower.includes('paket')) {
    appendChatMessage(
      'bot',
      'Wir bieten 3 modulare Stufen: Stufe 1 sichert 24/7 Kundenkontakt und qualifiziert Anfragen mit Maßen und Fotoupload vor. Stufe 2 greift geschützt auf Ihre freigegebenen Preislisten und Kundenakten zu und legt fertige Angebote zur 1-Klick-Freigabe bereit. Stufe 3 vernetzt Ihr gesamtes Firmennetzwerk und Branchensoftware autonom.',
      'Stufe 2: Interner Büro- & Angebots-Assistent'
    );
  } else if (lower.includes('datenschutz') || lower.includes('dsgvo') || lower.includes('sicher')) {
    appendChatMessage(
      'bot',
      'Datenschutz hat bei uns oberste Priorität: 1) Rollenbasierte Ordnerfreigabe (Finanz- und Personalakten bleiben gesperrt). 2) Sie behalten die 1-Klick-Kontrolle (keine KI schickt unbemerkt Mails raus). 3) Null KI-Training mit Ihren Daten. Gehostet auf ISO-zertifizierten deutschen und europäischen Servern.'
    );
  } else if (lower.includes('software') || lower.includes('kompatibel') || lower.includes('erp')) {
    appendChatMessage(
      'bot',
      'Unsere Systeme sind voll kompatibel mit Windows, Mac, Cloud-Speichern (Google Drive, OneDrive, Dropbox), Microsoft 365 sowie Schnittstellen zu gängiger Branchensoftware. Sie müssen kein Programm wechseln.'
    );
  } else {
    appendChatMessage(
      'bot',
      'Gerne prüfen wir Ihren konkreten Bedarf in einer 15-minütigen Potenzialanalyse. Sie sprechen direkt mit den Gründern Linus & Jasper.',
      '15-Min. Potenzialanalyse buchen'
    );
  }
}

/* ==========================================================================
   FAQ Accordion & Legal Modals
   ========================================================================== */

function toggleFaq(buttonEl) {
  const content = buttonEl.nextElementSibling;
  const icon = buttonEl.querySelector('span:last-child');
  const isOpen = !content.classList.contains('hidden');

  document.querySelectorAll('#faq .p-5.text-sm').forEach((el) => el.classList.add('hidden'));
  document.querySelectorAll('#faq button span:last-child').forEach((el) => (el.textContent = '+'));

  if (!isOpen) {
    content.classList.remove('hidden');
    if (icon) icon.textContent = '−';
  }
}

function openLegalModal(type) {
  const backdrop = document.getElementById('legal-modal-backdrop');
  const title = document.getElementById('legal-modal-title');
  const body = document.getElementById('legal-modal-body');

  if (!backdrop || !title || !body) return;

  if (type === 'impressum') {
    title.textContent = 'Impressum';
    body.innerHTML = `
      <div class="space-y-4 text-xs leading-relaxed text-slate-300">
        <div>
          <h4 class="font-bold text-white text-sm">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h4>
          <p class="mt-1">
            <strong>LJ Digital Systems</strong><br>
            Gründer: Linus Andler &amp; Jasper Landgraf<br>
            Deutschland
          </p>
        </div>
        <div>
          <h4 class="font-bold text-white text-sm">Kontakt</h4>
          <p class="mt-1">
            E-Mail: <a href="mailto:kontakt@lj-digital-systems.de" class="text-amber-400 underline">kontakt@lj-digital-systems.de</a><br>
            Website: <a href="https://web-lj-digital-systems.vercel.app" class="text-amber-400 underline">web-lj-digital-systems.vercel.app</a>
          </p>
        </div>
      </div>
    `;
  } else if (type === 'datenschutz') {
    title.textContent = 'Datenschutzerklärung';
    body.innerHTML = `
      <div class="space-y-4 text-xs leading-relaxed text-slate-300">
        <h4 class="font-bold text-white text-sm">1. Datenschutz auf einen Blick</h4>
        <p>Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.</p>
        <h4 class="font-bold text-white text-sm">2. Verantwortliche Stelle</h4>
        <p>LJ Digital Systems • Linus Andler &amp; Jasper Landgraf<br>E-Mail: <a href="mailto:kontakt@lj-digital-systems.de" class="text-amber-400 underline">kontakt@lj-digital-systems.de</a></p>
      </div>
    `;
  }

  backdrop.classList.remove('hidden');
}

function closeLegalModal() {
  const backdrop = document.getElementById('legal-modal-backdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-nav-menu');
  if (menu) menu.classList.toggle('hidden');
}

/* ==========================================================================
   Entlastungs- & ROI-Rechner
   ========================================================================== */

let currentRoiRecommendationTopic = 'Stufe 2: Interner Büro- & Angebots-Assistent';
let currentRoiSummaryNote = '';


/* ==========================================================================
   Hero Software-Mockup 1-Click Approval Interaction
   ========================================================================== */
function triggerHeroOneClickApproval() {
  const btn = document.getElementById('hero-approval-btn');
  const status = document.getElementById('hero-approval-status');
  const card = document.getElementById('hero-approval-card');
  if (!btn) return;

  btn.innerHTML = `<span class="text-emerald-950 font-bold">✓ Freigegeben &amp; versendet (1 Klick)</span>`;
  btn.className = 'w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 text-slate-950 font-mono text-xs font-bold py-2 px-3 shadow-lg shadow-emerald-500/30 transition transform scale-102';
  
  if (status) {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    status.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-node"></span><span class="text-emerald-300">Protokolliert um ${timeStr} • PDF in /Ausgang archiviert</span>`;
    status.classList.remove('hidden');
  }

  if (card) {
    card.classList.add('border-emerald-500/60', 'bg-emerald-950/30');
  }

  setTimeout(() => {
    btn.innerHTML = `<span>[1-Klick-Freigabe erteilen]</span><span>⚡</span>`;
    btn.className = 'w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold py-2 px-3 shadow transition transform active:scale-95';
    if (status) status.classList.add('hidden');
    if (card) {
      card.classList.remove('border-emerald-500/60', 'bg-emerald-950/30');
    }
  }, 4500);
}

/* ==========================================================================
   Interactive ROI Calculator with Quick Presets
   ========================================================================== */
function applyRoiPreset(presetKey, btnElement) {
  const requestsInput = document.getElementById('roi-requests');
  const hoursInput = document.getElementById('roi-routine-hours');

  if (!requestsInput || !hoursInput) return;

  if (presetKey === 'craft') {
    requestsInput.value = 30;
    hoursInput.value = 14;
  } else if (presetKey === 'planning') {
    requestsInput.value = 15;
    hoursInput.value = 18;
  } else if (presetKey === 'expert') {
    requestsInput.value = 20;
    hoursInput.value = 12;
  }

  document.querySelectorAll('.roi-preset-btn').forEach(btn => {
    btn.classList.remove('border-amber-500', 'bg-amber-950/70', 'shadow-[0_0_15px_rgba(245,158,11,0.25)]', 'ring-1', 'ring-amber-400/50');
    btn.classList.add('border-slate-700/80', 'bg-slate-900/90');
    const sub = btn.querySelector('.font-mono');
    if (sub) {
      sub.classList.remove('text-amber-300');
      sub.classList.add('text-slate-400');
    }
  });

  if (btnElement) {
    btnElement.classList.remove('border-slate-700/80', 'bg-slate-900/90');
    btnElement.classList.add('border-amber-500', 'bg-amber-950/70', 'shadow-[0_0_15px_rgba(245,158,11,0.25)]', 'ring-1', 'ring-amber-400/50');
    const sub = btnElement.querySelector('.font-mono');
    if (sub) {
      sub.classList.remove('text-slate-400');
      sub.classList.add('text-amber-300');
    }
  }

  updateRoiCalculator();
}

function updateRoiCalculator() {
  const requestsInput = document.getElementById('roi-requests') || document.getElementById('roi-team-size');
  const routineHoursInput = document.getElementById('roi-routine-hours');
  const hourlyRateInput = document.getElementById('roi-hourly-rate');

  const requestsVal = document.getElementById('roi-val-requests') || document.getElementById('roi-val-team');
  const hoursVal = document.getElementById('roi-val-hours');
  const rateVal = document.getElementById('roi-val-rate');

  const hoursSavedEl = document.getElementById('roi-hours-saved');
  const euroMonthlyEl = document.getElementById('roi-euro-monthly');
  const euroYearlyEl = document.getElementById('roi-euro-yearly');
  const recommendedTierText = document.getElementById('roi-recommended-tier-text');
  const recommendedTierBox = document.getElementById('roi-recommended-tier');

  if (!requestsInput || !routineHoursInput || !hourlyRateInput) return;

  const requests = parseInt(requestsInput.value, 10) || 20;
  const officeHours = parseInt(routineHoursInput.value, 10) || 12;
  const rate = parseInt(hourlyRateInput.value, 10) || 55;

  if (requestsVal) requestsVal.textContent = `${requests} Anfragen / Woche`;
  if (hoursVal) hoursVal.textContent = `${officeHours} Std. Büro / Woche`;
  if (rateVal) rateVal.textContent = `${rate} € / Std.`;

  // Realistic calculation:
  // Each request saved ~15 min of phone/clarification through 24/7 Frontdesk (70% automated)
  // Each office hour saved ~65% through internal quote/document agent
  const weeklyFrontdeskSaved = (requests * 0.25) * 0.70;
  const weeklyOfficeSaved = officeHours * 0.65;
  const totalWeeklySaved = weeklyFrontdeskSaved + weeklyOfficeSaved;
  const savedHoursMonth = Math.round(totalWeeklySaved * 4.2);
  const euroSavedMonthly = Math.round(savedHoursMonth * rate);
  const euroSavedYearly = euroSavedMonthly * 12;

  if (hoursSavedEl) {
    hoursSavedEl.textContent = `ca. ${savedHoursMonth} Std.`;
    hoursSavedEl.classList.add('text-amber-300');
    setTimeout(() => hoursSavedEl.classList.remove('text-amber-300'), 300);
  }

  if (euroMonthlyEl) euroMonthlyEl.textContent = `${euroSavedMonthly.toLocaleString('de-DE')} €`;
  if (euroYearlyEl) euroYearlyEl.textContent = `${euroSavedYearly.toLocaleString('de-DE')} €`;

  // Determine recommended tier
  let recTierName = 'Stufe 2: Interner Büro- & Angebots-Assistent';
  let recDisplay = 'Stufe 2 (Büro- & Angebots-Assistent)';
  if (requests >= 25 && officeHours >= 16) {
    recTierName = 'Stufe 3: Vollintegrierte Betriebs-Automation';
    recDisplay = 'Stufe 3 (Vollintegrierte Automation)';
  } else if (requests >= 25 && officeHours < 12) {
    recTierName = 'Stufe 1: 24/7 Smart Frontdesk & Anfragesystem';
    recDisplay = 'Stufe 1 (24/7 Smart Frontdesk)';
  } else {
    recTierName = 'Stufe 2: Interner Büro- & Angebots-Assistent';
    recDisplay = 'Stufe 2 (Büro- & Angebots-Assistent)';
  }

  currentRoiRecommendationTopic = recTierName;
  if (recommendedTierText) {
    recommendedTierText.textContent = recDisplay;
  }
  if (recommendedTierBox) {
    recommendedTierBox.classList.add('scale-102');
    setTimeout(() => recommendedTierBox.classList.remove('scale-102'), 250);
  }

  currentRoiSummaryNote = `[Entlastungs-Rechner: ${requests} Anfragen/Woche, ${officeHours} Std. Büro/Woche -> ca. ${savedHoursMonth} Std. / Monat gespart (${euroSavedMonthly.toLocaleString('de-DE')} €/Monat) • Empfohlen: ${recDisplay}]`;
}

function transferRoiToContact() {
  const msgArea = document.getElementById('contact-message');
  if (msgArea && currentRoiSummaryNote && !msgArea.value.includes('Entlastungs-Rechner')) {
    msgArea.value = msgArea.value
      ? `${msgArea.value}\n\n${currentRoiSummaryNote}`
      : `${currentRoiSummaryNote}\nWir möchten diese Entlastung in unserem Betrieb prüfen.`;
  }
  scrollToContactWithTopic(currentRoiRecommendationTopic);
}

/* ==========================================================================
   Q&A Potenzial-Finder
   ========================================================================== */

const qaState = {
  currentStep: 1,
  answers: { pain: null, system: null, goal: null }
};

const qaResultsData = {
  tier1: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 1',
    title: '24/7 Smart Frontdesk & Anfragesystem',
    desc: 'Für Ihren Betrieb ist die direkte Entlastung von ständigen Telefonunterbrechungen und die lückenlose Erreichbarkeit nach Feierabend der schnellste Hebel. Der smarte Frontdesk erfasst Maße, Unterlagen und Termine vorab.',
    timeSaved: 'Ø 6 – 12 Stunden Telefonstress pro Woche',
    serviceKey: 'tier1',
    topicName: 'Stufe 1: 24/7 Smart Frontdesk & Anfragesystem'
  },
  tier2: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 2 • BELIEBTESTE WAHL',
    title: 'Interner Büro- & Angebots-Assistent',
    desc: 'Ihr größter Hebel liegt im automatisierten Erstellen von Angeboten und Durchsuchen von freigegebenen Preislisten und Kundenakten. Sie prüfen nur noch kurz und geben mit 1 Klick frei.',
    timeSaved: 'Ø 8 – 15 Stunden Bürozeit pro Woche',
    serviceKey: 'tier2',
    topicName: 'Stufe 2: Interner Büro- & Angebots-Assistent'
  },
  tier3: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 3 • VOLLINTEGRIERT',
    title: 'Vollintegrierte Betriebs-Automation',
    desc: 'Ihre Anforderungen erfordern eine nahtlose Vernetzung zwischen bestehendem ERP, Dateisystem, Kalender und Postfächern für durchgängige Prozesse ohne manuelles Abtippen.',
    timeSaved: 'Ø 15 – 25+ Stunden Verwaltungsaufwand pro Woche',
    serviceKey: 'tier3',
    topicName: 'Stufe 3: Vollintegrierte Betriebs-Automation'
  },
  website: {
    badge: 'EMPFOHLENE LÖSUNG: WEB & ANFRAGE-SYSTEM',
    title: 'Verkaufsstarker Webauftritt mit 60-Sekunden-Anfragestrecke',
    desc: 'Ihr Betrieb benötigt vor allem einen zeitgemäßen, mobiloptimierten Webauftritt, der Vertrauen schafft und Kundenanfragen mit Pflichtfeldern und Fotoupload sofort vorqualifiziert.',
    timeSaved: 'Ø 8 – 14 Stunden wöchentlich + kaufbereite Anfragen',
    serviceKey: 'website',
    topicName: 'Website-Relaunch & Digitales Anfragesystem'
  },
  custom: {
    badge: 'EMPFOHLENE LÖSUNG: SPEZIAL-ARCHITEKTUR',
    title: 'Maßgeschneiderte Spezial-Architektur',
    desc: 'Für Ihre spezifische Software-Landschaft oder Gutachter-/Planungsabläufe konzipieren Linus & Jasper eine maßgeschneiderte Lösung.',
    timeSaved: 'Individuell kalkulierbar',
    serviceKey: 'custom',
    topicName: 'Individuelle Speziallösung'
  }
};

function selectQaOption(category, value, el) {
  qaState.answers[category] = value;

  const parent = el.closest('.qa-options-grid');
  if (parent) {
    parent.querySelectorAll('.qa-option-card').forEach((c) => c.classList.remove('qa-active'));
  }
  el.classList.add('qa-active');

  setTimeout(() => {
    if (qaState.currentStep === 1) {
      goToQaStep(2);
    } else if (qaState.currentStep === 2) {
      goToQaStep(3);
    } else if (qaState.currentStep === 3) {
      showQaResult();
    }
  }, 220);
}

function goToQaStep(stepNum) {
  qaState.currentStep = stepNum;
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`qa-step-${i}`);
    const dotEl = document.getElementById(`qa-dot-${i}`);
    if (stepEl) {
      if (i === stepNum) {
        stepEl.classList.remove('hidden');
      } else {
        stepEl.classList.add('hidden');
      }
    }
    if (dotEl) {
      if (i <= stepNum) {
        dotEl.classList.add('bg-amber-500', 'text-slate-950');
        dotEl.classList.remove('bg-slate-800', 'text-slate-400');
      } else {
        dotEl.classList.remove('bg-amber-500', 'text-slate-950');
        dotEl.classList.add('bg-slate-800', 'text-slate-400');
      }
    }
  }

  const resultContainer = document.getElementById('qa-step-result');
  if (resultContainer) resultContainer.classList.add('hidden');
}

function showQaResult() {
  qaState.currentStep = 'result';
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`qa-step-${i}`);
    if (stepEl) stepEl.classList.add('hidden');
  }

  let determinedKey = 'tier2';
  const { pain, system, goal } = qaState.answers;

  if (pain === 'web' || goal === 'web') {
    determinedKey = 'website';
  } else if (pain === 'phone' || goal === 'phone') {
    determinedKey = 'tier1';
  } else if (pain === 'network' || goal === 'network') {
    determinedKey = 'tier3';
  } else if (system === 'custom' || pain === 'custom') {
    determinedKey = 'custom';
  } else {
    determinedKey = 'tier2';
  }

  const res = qaResultsData[determinedKey] || qaResultsData.tier2;

  const resBadge = document.getElementById('qa-result-badge');
  const resTitle = document.getElementById('qa-result-title');
  const resDesc = document.getElementById('qa-result-desc');
  const resSaved = document.getElementById('qa-result-savings');
  const resJumpBtn = document.getElementById('qa-result-jump-btn');
  const resContactBtn = document.getElementById('qa-result-contact-btn');

  if (resBadge) resBadge.textContent = res.badge;
  if (resTitle) resTitle.textContent = res.title;
  if (resDesc) resDesc.textContent = res.desc;
  if (resSaved) resSaved.textContent = res.timeSaved;

  if (resJumpBtn) {
    resJumpBtn.onclick = () => {
      switchServiceView(res.serviceKey, true);
    };
  }

  if (resContactBtn) {
    resContactBtn.onclick = () => {
      scrollToContactWithTopic(res.topicName);
    };
  }

  const resultContainer = document.getElementById('qa-step-result');
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
  }
}

function resetQaGame() {
  qaState.answers = { pain: null, system: null, goal: null };
  document.querySelectorAll('.qa-option-card').forEach((c) => c.classList.remove('qa-active'));
  goToQaStep(1);
}

function switchServiceView(serviceKey, scrollIntoView = false) {
  document.querySelectorAll('[data-service-tab]').forEach((tab) => {
    const key = tab.getAttribute('data-service-tab');
    if (key === serviceKey) {
      tab.classList.add('active-tab');
    } else {
      tab.classList.remove('active-tab');
    }
  });

  document.querySelectorAll('[data-service-panel]').forEach((panel) => {
    const key = panel.getAttribute('data-service-panel');
    if (key === serviceKey) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });

  if (serviceKey === 'tier1' || serviceKey === 'tier2' || serviceKey === 'tier3' || serviceKey === 'custom') {
    selectSimulatorTier(serviceKey, 0);
  }

  if (scrollIntoView) {
    const container = document.getElementById('services-uebersicht');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  selectSimulatorTier('tier2', 0);
  updateHiddenFormSummary();
  updateRoiCalculator();
});
