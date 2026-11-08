/**
 * LJ Digital Systems — Interactive Application Logic
 * Includes:
 * 1. 3-Tier AI Agent Live Simulator (Chat + Network Nodes + Execution Terminal)
 * 2. Unified Conversion Flow (Topic Pre-selection + Quick Call Slot Picker + Form to lj.systems.de@gmail.com)
 * 3. Floating Interactive LJ AI Demo Assistant (Bottom-Right)
 * 4. FAQ Accordion & Mobile Menu
 */

const AGENT_TIERS = {
  tier1: {
    id: 'tier1',
    badge: 'STUFE 1 • STARTER',
    title: 'Smart Frontdesk & Anfrage-Agent',
    subtitle: '24/7 Kunden-Kommunikation, intelligente Vorqualifizierung & strukturierte Lead-Erfassung direkt auf Ihrer Website.',
    connectedNodes: ['node-web', 'node-mail'],
    capabilities: [
      'Beantwortet Kundenfragen rund um die Uhr in Echtzeit',
      'Fragt automatisch alle wichtigen Projektdaten & Eckdaten ab',
      'Filtert unpassende Anfragen vor und übergibt qualifizierte Leads',
      'Direkte Benachrichtigung per E-Mail oder Messenger ans Team'
    ],
    scenarios: [
      {
        name: 'Szenario A: Neue Kundenanfrage am Feierabend',
        customerMsg: 'Guten Abend! Wir suchen kurzfristig Unterstützung für ein Projekt nächsten Monat. Haben Sie noch Kapazitäten und wie läuft das ab?',
        agentReply: 'Guten Abend! Ja, für kommenden Monat haben wir noch freie Projektfenster. Damit unser Team Ihnen morgen früh direkt eine konkrete Einschätzung geben kann: Um welchen Leistungsumfang geht es genau und wo liegt der Einsatzort?',
        customerFollowup: 'Es geht um eine Komplettsanierung (ca. 140 m²) in Köln. Fotos und Maße habe ich schon da.',
        agentFinal: 'Perfekt, vielen Dank! Ich habe Ihre Eckdaten (140 m², Köln) strukturiert aufgenommen. Sie können die Fotos direkt hier hochladen – Ihr persönlicher Ansprechpartner meldet sich morgen bis 09:30 Uhr mit einem Vorschlag bei Ihnen.',
        logs: [
          { time: '20:14:02', tag: 'INCOMING', color: 'text-sky-400', text: 'Neue Website-Anfrage außerhalb der Bürozeiten erkannt' },
          { time: '20:14:03', tag: 'INTENT', color: 'text-indigo-400', text: 'Anliegen klassifiziert: Konkrete Projektanfrage (Hohe Priorität)' },
          { time: '20:14:05', tag: 'QUALIFY', color: 'text-emerald-400', text: 'Pflichtfelder abgefragt: Umfang (140 m²), Ort (Köln), Unterlagen' },
          { time: '20:14:08', tag: 'HANDOVER', color: 'text-amber-300', text: 'Qualifizierte Lead-Zusammenfassung an Team-Postfach gesendet ✓' }
        ]
      },
      {
        name: 'Szenario B: Häufige Standardfrage abfangen',
        customerMsg: 'Bieten Sie auch eine Erstberatung vor Ort an und wie schnell bekommt man einen Termin?',
        agentReply: 'Ja, wir bieten eine unverbindliche Erstberatung an – wahlweise direkt vor Ort oder digital. In der Regel erhalten Sie innerhalb von 48 Stunden einen Termin. Soll ich Ihnen direkt zwei freie Zeitfenster für diese Woche reservieren?',
        customerFollowup: 'Gerne am Donnerstagvormittag, falls noch etwas frei ist.',
        agentFinal: 'Donnerstag um 10:00 Uhr ist für Sie vorgemerkt! Bitte hinterlassen Sie noch kurz Ihren Namen und Ihre Rückrufnummer, dann senden wir Ihnen sofort die Bestätigung zu.',
        logs: [
          { time: '11:05:10', tag: 'FAQ_MATCH', color: 'text-sky-400', text: 'Standardfrage zu Erstberatung & Vorlaufzeit automatisch beantwortet' },
          { time: '11:05:14', tag: 'CONVERSION', color: 'text-emerald-400', text: 'Interessent aktiv in Terminvereinbarung übergeleitet' },
          { time: '11:05:19', tag: 'LEAD_SAVED', color: 'text-amber-300', text: 'Terminwunsch (Do, 10:00 Uhr) inkl. Kontaktdaten erfasst ✓' }
        ]
      }
    ],
    topicValue: 'KI-Agent Stufe 1 (Smart Frontdesk)'
  },
  tier2: {
    id: 'tier2',
    badge: 'STUFE 2 • PRO (EMPFOHLEN)',
    title: 'Interner Wissens- & Büro-Agent',
    subtitle: 'Greift geschützt auf Ihren Firmenspeicher, Dokumente, Preislisten und Kalender zu – bereitet Angebote vor und entlastet das Büro massiv.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail'],
    capabilities: [
      'Direkter Lesezugriff auf Firmenspeicher (PDFs, Preislisten, Vorlagen, Projektdaten)',
      'Automatische Angebotserstellung & Dokumenten-Vorbereitung nach Ihren Vorgaben',
      'Intelligente E-Mail-Verarbeitung, Zusammenfassung & Antwort-Entwürfe',
      'Automatischer Kalender-Abgleich & direkte Terminbuchung ohne Hin-und-Her'
    ],
    scenarios: [
      {
        name: 'Szenario A: Zugriff auf Firmenspeicher & Kalkulations-Vorbereitung',
        customerMsg: 'Chef-Anweisung (Intern): "Such mir bitte aus dem Firmenspeicher das letzte Projekt von Kunde Müller raus und erstelle auf Basis unserer aktuellen Preisliste 2026 einen Entwurf für die Erweiterung."',
        agentReply: 'Ich habe im Firmenspeicher unter /Projekte_2025/Mueller_GmbH die Bestandsdaten und Maße gefunden. Auf Basis der aktuellen Preisliste_2026.xlsx habe ich den Angebotsentwurf (Pos. 1–4, netto 4.850 €) erstellt.',
        customerFollowup: 'Super, bitte noch 5 % Stammkunden-Rabatt einrechnen und als PDF in den Entwürfe-Ordner legen.',
        agentFinal: 'Erledigt! 5 % Stammkunden-Rabatt wurden abgezogen (neu: 4.607,50 € netto). Die fertige PDF liegt unter /Angebote_2026/Entwurf_Mueller_Erweiterung.pdf bereit und der E-Mail-Entwurf an Herrn Müller ist vorbereitet.',
        logs: [
          { time: '08:42:11', tag: 'STORAGE_AUTH', color: 'text-sky-400', text: 'Geschützter Zugriff auf Firmenspeicher (/Projekte_2025 & /Preislisten)' },
          { time: '08:42:13', tag: 'DOC_PARSE', color: 'text-indigo-400', text: 'Bestandsakte "Mueller_GmbH" & "Preisliste_2026.xlsx" ausgelesen' },
          { time: '08:42:16', tag: 'CALC_ENGINE', color: 'text-emerald-400', text: 'Positionen kalkuliert + 5% Rabatt angewendet -> PDF generiert' },
          { time: '08:42:18', tag: 'MAIL_DRAFT', color: 'text-amber-300', text: 'PDF im Speicher abgelegt & E-Mail-Entwurf zur Freigabe bereitgestellt ✓' }
        ]
      },
      {
        name: 'Szenario B: Kundenanfrage mit Live-Bestands- & Dokumentenabgleich',
        customerMsg: 'Kundenanfrage per Mail: "Haben Sie das Ersatzteil Modell X-400 auf Lager und können Sie mir das Datenblatt schicken?"',
        agentReply: 'Ich habe automatisch im internen Lager-Dokument und im Technik-Ordner nachgesehen: Modell X-400 ist 4x vorrätig. Ich sende Ihnen hiermit direkt das offizielle PDF-Datenblatt mit.',
        customerFollowup: 'Perfekt, bitte 2 Stück auf meinen Namen für Abholung morgen reservieren.',
        agentFinal: '2x Modell X-400 sind für morgen auf Ihren Namen reserviert. Die Bestandsliste im Firmenspeicher wurde aktualisiert und das Lager-Team informiert.',
        logs: [
          { time: '14:19:04', tag: 'STORAGE_READ', color: 'text-sky-400', text: 'Durchsuche Firmenspeicher: /Lager/Bestand.xlsx & /Technik/Datenblaetter/' },
          { time: '14:19:06', tag: 'MATCH_FOUND', color: 'text-emerald-400', text: 'Bestand geprüft (4 Stück) + Datei "Datenblatt_X400.pdf" angehängt' },
          { time: '14:19:10', tag: 'UPDATE_FILE', color: 'text-amber-300', text: 'Reservierung eingetragen & Team-Benachrichtigung ausgelöst ✓' }
        ]
      }
    ],
    topicValue: 'KI-Agent Stufe 2 (Wissens- & Büro-Agent)'
  },
  tier3: {
    id: 'tier3',
    badge: 'STUFE 3 • FULL NETWORK AUTONOMOUS',
    title: 'Vollintegrierter Unternehmens- & Netzwerk-Agent',
    subtitle: 'Vernetzt mit dem gesamten Firmennetzwerk, Speicher, CRM/ERP und allen Schnittstellen – erledigt komplexe End-to-End-Prozesse komplett selbstständig.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail', 'node-network'],
    capabilities: [
      'Sicherer Vollzugriff auf das gesamte Firmennetzwerk, Datenbanken & Cloud-Speicher',
      'Führt mehrstufige Prozesse über mehrere Programme hinweg autonom aus',
      'Aktualisiert CRM, Buchhaltungs-Vorbereitung, Projektordner & Team-Aufgaben automatisch',
      'Individuelle Sicherheits- & Freigaberegeln (Sie behalten jederzeit die volle Kontrolle)'
    ],
    scenarios: [
      {
        name: 'Szenario A: Kompletter Auftrags-Workflow über das gesamte Netzwerk',
        customerMsg: 'System-Trigger: Kunde Schmidt hat das Angebot #2026-118 digital bestätigt.',
        agentReply: 'Auftragsbestätigung erkannt. Starte autonomen End-to-End-Workflow im Firmennetzwerk: 1) Kundenstatus im CRM auf "Aktiver Auftrag" gesetzt. 2) Projektordner im Netzlaufwerk inkl. Checklisten angelegt.',
        customerFollowup: 'Automatischer Folge-Schritt: Material & Team-Disposition prüfen.',
        agentFinal: 'Erledigt: Benötigte Komponenten wurden mit dem Lagerbestand abgeglichen, Bestellliste für Großhandel vorbereitet, Kalender-Block für das Ausführungsteam in KW 47 eingetragen und Auftragsbestätigung inkl. Zeitplan an Kunde Schmidt versendet.',
        logs: [
          { time: '09:01:02', tag: 'NET_TRIGGER', color: 'text-sky-400', text: 'Webhook empfangen: Angebot #2026-118 akzeptiert' },
          { time: '09:01:04', tag: 'CRM_SYNC', color: 'text-indigo-400', text: 'Firmennetzwerk: CRM-Akte aktualisiert & Projektstruktur im Speicher erzeugt' },
          { time: '09:01:07', tag: 'ERP_DISPO', color: 'text-emerald-400', text: 'Materialbedarf berechnet, Team-Kalender KW 47 geblockt' },
          { time: '09:01:10', tag: 'AUTONOMOUS_OK', color: 'text-amber-300', text: 'Kompletter Workflow in 8 Sek. abgeschlossen – Zusammenfassung an Geschäftsführung ✓' }
        ]
      },
      {
        name: 'Szenario B: Projektabschluss, Dokumentation & Rechnungs-Vorbereitung',
        customerMsg: 'Team-Meldung vom Einsatzort: "Projekt Weber abgeschlossen, Abnahmeprotokoll und 6 Fotos wurden hochgeladen."',
        agentReply: 'Ich habe die 6 Fotos und das Protokoll im Netzwerk-Ordner /Projekte/Weber geprüft und archiviert. Alle vereinbarten Leistungen aus dem Angebot sind als erledigt dokumentiert.',
        customerFollowup: 'Bitte Abschluss-Prozess im System durchlaufen lassen.',
        agentFinal: 'Abschluss-Workflow ausgeführt: 1) Projektdokumentation als sauberes PDF im Kundenordner gespeichert. 2) Schlussrechnungs-Entwurf im Buchhaltungssystem mit exakten Aufmaßen angelegt. 3) Dankes-Mail mit Bewertungs-Link für Freitag vorgemerkt.',
        logs: [
          { time: '16:30:11', tag: 'NET_SCAN', color: 'text-sky-400', text: 'Neue Dateien im Netzwerk-Pfad /Projekte/Weber/Abnahme erkannt' },
          { time: '16:30:14', tag: 'VERIFY_DATA', color: 'text-indigo-400', text: 'Abgleich Soll/Ist mit Ursprungsangebot im Firmenspeicher: 100% vollständig' },
          { time: '16:30:18', tag: 'BILLING_PREP', color: 'text-emerald-400', text: 'Rechnungsdaten an Buchhaltungs-Schnittstelle übergeben' },
          { time: '16:30:21', tag: 'WORKFLOW_DONE', color: 'text-amber-300', text: 'Akte geschlossen & Nachfass-Automatisierung geplant ✓' }
        ]
      }
    ],
    topicValue: 'KI-Agent Stufe 3 (Vollintegrierter Netzwerk-Agent)'
  },
  custom: {
    id: 'custom',
    badge: 'CUSTOM • INDIVIDUELLE KI-SYSTEME',
    title: 'Maßgeschneiderte KI-Sonderlösungen & Spezial-Workflows',
    subtitle: 'Sie haben spezielle Abläufe, eigene Branchensoftware oder besondere Ideen im KI-Bereich? Wir entwickeln genau den Agenten, den Ihr Betrieb braucht.',
    connectedNodes: ['node-web', 'node-storage', 'node-mail', 'node-network'],
    capabilities: [
      'Anbindung an branchenspezifische Fachsoftware & individuelle Datenbanken',
      'Sprach-KI / Telefon-Agenten, Foto-/Dokumenten-Analyse oder Spezial-Kalkulatoren',
      'Kombination aus modernisierter Website, Kundenportal und internen KI-Agenten',
      'Modulare Architektur: Jederzeit erweiterbar, wenn Ihr Unternehmen wächst'
    ],
    scenarios: [
      {
        name: 'Szenario: Individueller Spezial-Workflow nach Kundenwunsch',
        customerMsg: 'Anforderung: "Wir bekommen täglich Fotos, Skizzen und Sprachnachrichten von Kunden und Mitarbeitern. Kann eine KI das automatisch auswerten und im System zuordnen?"',
        agentReply: 'Ja! Unser Custom-Agent nimmt Sprachnachrichten und Fotos entgegen, wandelt Sprache präzise in strukturierte Aufgaben um, erkennt relevante Details auf den Bildern und legt alles automatisch in der richtigen Kundenakte im Firmennetzwerk ab.',
        customerFollowup: 'Und wenn Rückfragen offen sind?',
        agentFinal: 'Dann erstellt der Agent automatisch eine gezielte Rückfrage oder markiert den Punkt übersichtlich für den Projektleiter im Dashboard. Genau so, wie Ihr interner Ablauf es vorsieht.',
        logs: [
          { time: '13:10:01', tag: 'CUSTOM_API', color: 'text-sky-400', text: 'Multimodaler Input empfangen (Sprachnotiz + 4 Projektfotos)' },
          { time: '13:10:04', tag: 'AI_VISION', color: 'text-indigo-400', text: 'Transkription & Bildanalyse durchgeführt -> Kunde & Projekt erkannt' },
          { time: '13:10:07', tag: 'NET_SYNC', color: 'text-emerald-400', text: 'Daten in Branchensoftware & Firmenspeicher synchronisiert' },
          { time: '13:10:09', tag: 'CUSTOM_OK', color: 'text-amber-300', text: 'Individueller Spezial-Workflow erfolgreich abgeschlossen ✓' }
        ]
      }
    ],
    topicValue: 'Individueller KI-Sonderwunsch / Custom Solution'
  }
};

let currentTierKey = 'tier2';
let currentScenarioIndex = 0;

function selectSimulatorTier(tierKey, scenarioIdx = 0) {
  currentTierKey = tierKey;
  currentScenarioIndex = scenarioIdx;
  const tier = AGENT_TIERS[tierKey];
  if (!tier) return;

  // Update tab buttons
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

  // Update Header Info
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

  // Update Capabilities List
  const capList = document.getElementById('sim-capabilities-list');
  if (capList) {
    capList.innerHTML = tier.capabilities
      .map(
        (cap) => `
        <li class="flex items-start gap-2.5 text-sm text-slate-300 animate-fade-slide">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sky-400">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>${cap}</span>
        </li>`
      )
      .join('');
  }

  // Update Active Network Nodes visual indicator
  const allNodeIds = ['node-web', 'node-storage', 'node-mail', 'node-network'];
  allNodeIds.forEach((nodeId) => {
    const el = document.getElementById(nodeId);
    const statusEl = document.getElementById(`${nodeId}-status`);
    if (!el) return;
    const isConnected = tier.connectedNodes.includes(nodeId);
    if (isConnected) {
      el.classList.remove('opacity-40', 'border-slate-800', 'bg-slate-900/40');
      el.classList.add('border-sky-500/50', 'bg-blue-950/30', 'shadow-lg', 'shadow-sky-950/40');
      if (statusEl) {
        statusEl.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-400 pulse-node"></span><span class="text-emerald-400 font-medium">Aktiv verbunden</span>`;
      }
    } else {
      el.classList.add('opacity-40', 'border-slate-800', 'bg-slate-900/40');
      el.classList.remove('border-sky-500/50', 'bg-blue-950/30', 'shadow-lg', 'shadow-sky-950/40');
      if (statusEl) {
        statusEl.innerHTML = `<span class="h-2 w-2 rounded-full bg-slate-600"></span><span class="text-slate-500">Ab höherer Stufe</span>`;
      }
    }
  });

  // Render Scenario Switcher Buttons if multiple scenarios exist
  const scenarioSwitcher = document.getElementById('sim-scenario-buttons');
  if (scenarioSwitcher) {
    if (tier.scenarios.length > 1) {
      scenarioSwitcher.innerHTML = tier.scenarios
        .map(
          (sc, idx) => `
          <button
            type="button"
            onclick="selectSimulatorTier('${tierKey}', ${idx})"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              idx === scenarioIdx
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'bg-slate-800/70 text-slate-400 border border-slate-700/60 hover:text-slate-200'
            }"
          >
            ${sc.name}
          </button>`
        )
        .join('');
    } else {
      scenarioSwitcher.innerHTML = `<span class="text-xs text-sky-400 font-medium">${tier.scenarios[0].name}</span>`;
    }
  }

  // Render Chat Conversation & System Logs
  const scenario = tier.scenarios[scenarioIdx] || tier.scenarios[0];
  const chatContainer = document.getElementById('sim-chat-stream');
  if (chatContainer && scenario) {
    chatContainer.innerHTML = `
      <div class="flex flex-col gap-3 animate-fade-slide">
        <!-- Trigger / Input -->
        <div class="flex items-start gap-3">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
            IN
          </div>
          <div class="rounded-2xl rounded-tl-none bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 text-xs sm:text-sm text-slate-200 max-w-[90%]">
            ${scenario.customerMsg}
          </div>
        </div>

        <!-- Agent First Action -->
        <div class="flex items-start justify-end gap-3">
          <div class="rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-600/90 to-indigo-600/90 border border-sky-400/30 px-4 py-2.5 text-xs sm:text-sm text-white max-w-[90%] shadow-md">
            <div class="flex items-center gap-1.5 text-[11px] font-semibold text-sky-200 mb-1">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
              LJ Agent (${tier.badge.split('•')[0].trim()})
            </div>
            ${scenario.agentReply}
          </div>
        </div>

        <!-- Follow-up -->
        <div class="flex items-start gap-3">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
            IN
          </div>
          <div class="rounded-2xl rounded-tl-none bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 text-xs sm:text-sm text-slate-200 max-w-[90%]">
            ${scenario.customerFollowup}
          </div>
        </div>

        <!-- Agent Final Resolution -->
        <div class="flex items-start justify-end gap-3">
          <div class="rounded-2xl rounded-tr-none bg-gradient-to-br from-emerald-950/90 to-slate-900/95 border border-emerald-500/40 px-4 py-2.5 text-xs sm:text-sm text-emerald-100 max-w-[90%] shadow-md">
            <div class="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Automatisch ausgeführt
            </div>
            ${scenario.agentFinal}
          </div>
        </div>
      </div>
    `;
  }

  const logContainer = document.getElementById('sim-terminal-logs');
  if (logContainer && scenario) {
    logContainer.innerHTML = scenario.logs
      .map(
        (log) => `
        <div class="flex items-start gap-2.5 text-xs font-mono-code py-1 border-b border-slate-800/60 last:border-0 animate-fade-slide">
          <span class="text-slate-500 shrink-0">${log.time}</span>
          <span class="${log.color} font-semibold shrink-0">[${log.tag}]</span>
          <span class="text-slate-300">${log.text}</span>
        </div>`
      )
      .join('');
  }
}

/* ==========================================================================
   Unified Contact & Conversion Flow (Pre-selection + Call Slot + Form)
   ========================================================================== */

let selectedTopics = new Set(['KI-Agent Stufe 2 (Wissens- & Büro-Agent)']);
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
    summaryDisplay.textContent = `${topicsArr.join(' + ')} • Terminwunsch: ${selectedSlot}`;
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
    `Hallo LJ Digital Systems Team,`,
    ``,
    `ich interessiere mich für eine unverbindliche Potenzialanalyse / Erstberatung.`,
    ``,
    `--- AUSGEWÄHLTE BEREICHE ---`,
    `• Themen: ${topicsText}`,
    `• Wunschfenster für 15-Min-Erstgespräch: ${selectedSlot}`,
    ``,
    `--- KONTAKTDATEN ---`,
    `• Name: ${name}`,
    `• Unternehmen / Branche: ${company}`,
    `• E-Mail: ${email}`,
    `• Telefon / Rückruf: ${phone}`,
    ``,
    `--- PROJEKTDETAILS / NACHRICHT ---`,
    `${message}`
  ];

  const fullTextPlain = bodyLines.join('\n');
  const mailtoUrl = `mailto:lj.systems.de@gmail.com?subject=${subjectEncoded}&body=${encodeURIComponent(fullTextPlain)}`;

  // Set loading state on button
  if (submitBtn) submitBtn.disabled = true;
  if (submitBtnText) submitBtnText.textContent = 'Wird direkt gesendet...';

  const feedbackBox = document.getElementById('contact-feedback-box');
  const feedbackTitle = document.getElementById('contact-feedback-title');
  const feedbackDesc = document.getElementById('contact-feedback-desc');
  const previewTextEl = document.getElementById('contact-summary-preview');
  const directMailBtn = document.getElementById('contact-direct-mailto');

  if (previewTextEl) previewTextEl.textContent = fullTextPlain;
  if (directMailBtn) directMailBtn.setAttribute('href', mailtoUrl);

  try {
    const response = await fetch('https://formsubmit.co/ajax/lj.systems.de@gmail.com', {
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
          'Wir haben Ihre Angaben für die kostenlose Potenzialanalyse unter <strong>lj.systems.de@gmail.com</strong> erhalten und melden uns zeitnah bei Ihnen. Unten sehen Sie Ihre Zusammenfassung (inkl. Backup-Optionen):';
      }
    } else {
      throw new Error('Fallback to mailto');
    }
  } catch (err) {
    // Fallback if offline or blocked: open mail client + show copy box
    if (feedbackTitle) {
      feedbackTitle.textContent = '✓ Ihre Anfrage wurde vorbereitet!';
    }
    if (feedbackDesc) {
      feedbackDesc.innerHTML =
        'Bitte bestätigen Sie den Versand kurz in Ihrem E-Mail-Programm an <strong>lj.systems.de@gmail.com</strong> oder nutzen Sie den Kopier-Button unten:';
    }
    window.location.href = mailtoUrl;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitBtnText) submitBtnText.textContent = 'Potenzialanalyse jetzt anfordern';
    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function copyRequestText() {
  const previewTextEl = document.getElementById('contact-summary-preview');
  const copyBtnText = document.getElementById('copy-btn-label');
  if (!previewTextEl) return;

  navigator.clipboard.writeText(previewTextEl.textContent).then(() => {
    if (copyBtnText) {
      const original = copyBtnText.textContent;
      copyBtnText.textContent = 'Kopiert! ✓';
      setTimeout(() => {
        copyBtnText.textContent = original;
      }, 2500);
    }
  });
}

/* ==========================================================================
   Floating Interactive LJ AI Assistant (Bottom-Right Demo Chatbot)
   ========================================================================== */

let isChatWidgetOpen = false;

function toggleChatWidget() {
  const panel = document.getElementById('lj-chat-widget-panel');
  const badge = document.getElementById('lj-chat-unread-badge');
  if (!panel) return;

  isChatWidgetOpen = !isChatWidgetOpen;
  if (isChatWidgetOpen) {
    panel.classList.remove('hidden');
    if (badge) badge.classList.add('hidden');
    const input = document.getElementById('lj-chat-input');
    if (input) setTimeout(() => input.focus(), 120);
  } else {
    panel.classList.add('hidden');
  }
}

const CHATBOT_KNOWLEDGE = [
  {
    keywords: ['stufe', 'unterschied', '1', '2', '3', 'agent', 'paket'],
    reply: `Wir bieten **3 aufeinander aufbauende KI-Agenten-Stufen** an:\n\n• **Stufe 1 (Smart Frontdesk):** Beantwortet 24/7 Kundenanfragen auf Ihrer Website und qualifiziert Leads vor.\n• **Stufe 2 (Wissens- & Büro-Agent):** Greift sicher auf Ihren Firmenspeicher (PDFs, Preislisten, Dokumente) zu, bereitet Angebote vor und plant Termine.\n• **Stufe 3 (Full-Network Agent):** Ist mit dem gesamten Firmennetzwerk & CRM/ERP verbunden und erledigt komplette Arbeitsabläufe selbstständig.\n\nZusätzlich setzen wir jederzeit **individuelle KI-Sonderwünsche** um!`,
    suggestedTopic: 'KI-Agent Stufe 2 (Wissens- & Büro-Agent)'
  },
  {
    keywords: ['website', 'webseite', 'homepage', 'relaunch', 'überarbeitung', 'neu'],
    reply: `Bei einer **Website-Überarbeitung** verwandeln wir veraltete Seiten in ein modernes, verkaufsstarkes System: Schnell, mobil perfekt bedienbar, vertrauenswürdig und auf Wunsch direkt mit digitaler Anfrage-Vorqualifizierung oder einem KI-Assistenten gekoppelt.`,
    suggestedTopic: 'Website-Überarbeitung & Modernisierung'
  },
  {
    keywords: ['sicher', 'datenschutz', 'dsgvo', 'speicher', 'netzwerk', 'zugriff', 'daten'],
    reply: `**Datensicherheit steht an erster Stelle:** Unsere Agenten arbeiten mit klar definierten Zugriffsrechten (Role-Based Access). Sie entscheiden genau, welche Ordner im Firmenspeicher oder welche Schnittstellen der Agent lesen oder bearbeiten darf. Sensible Aktionen können jederzeit mit einer 1-Klick-Freigabe durch Sie versehen werden.`,
    suggestedTopic: 'KI-Agent Stufe 3 (Vollintegrierter Netzwerk-Agent)'
  },
  {
    keywords: ['preis', 'kosten', 'teuer', 'angebot', 'was kostet'],
    reply: `Da jedes Unternehmen eine andere IT-Struktur hat, arbeiten wir nicht mit starren Standard-Schubladen, sondern prüfen in einer **kostenlosen 15-Minuten-Potenzialanalyse**, welche Stufe Ihnen sofort die meiste Arbeitszeit spart. Danach erhalten Sie ein transparentes Festpreis-Angebot.`,
    suggestedTopic: 'Allgemeine Potenzialanalyse & Beratung'
  },
  {
    keywords: ['sonderwunsch', 'speziell', 'individuell', 'custom', 'branche'],
    reply: `Ja, absolut! Neben unseren 3 Kern-Stufen entwickeln wir **maßgeschneiderte KI-Lösungen** – z.B. Anbindungen an spezielle Branchensoftware, automatische Auswertung von Baustellen-/Projektfotos, Sprachnotizen oder individuelle Kalkulations-Agenten.`,
    suggestedTopic: 'Individueller KI-Sonderwunsch / Custom Solution'
  }
];

function appendChatMessage(sender, text, ctaTopic = null) {
  const messagesBox = document.getElementById('lj-chat-messages');
  if (!messagesBox) return;

  const wrapper = document.createElement('div');
  wrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} animate-fade-slide`;

  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\n/g, '<br>');

  if (sender === 'user') {
    wrapper.innerHTML = `
      <div class="rounded-2xl rounded-tr-none bg-blue-600 px-3.5 py-2.5 text-xs sm:text-sm text-white max-w-[85%] shadow">
        ${formattedText}
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="rounded-2xl rounded-tl-none bg-slate-800 border border-slate-700/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 max-w-[90%] shadow">
        <div class="text-[10px] font-semibold uppercase tracking-wider text-sky-400 mb-1">LJ Digital Assistant</div>
        <div>${formattedText}</div>
        ${
          ctaTopic
            ? `<button onclick="toggleChatWidget(); scrollToContactWithTopic('${ctaTopic}')" class="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 px-2.5 py-1.5 text-xs font-medium text-sky-300 hover:bg-sky-500/30 transition">
                <span>Jetzt für "${ctaTopic}" anfragen</span>
                <span>→</span>
              </button>`
            : ''
        }
      </div>
    `;
  }

  messagesBox.appendChild(wrapper);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function askQuickBotQuestion(questionText) {
  appendChatMessage('user', questionText);
  setTimeout(() => {
    respondToUserChat(questionText);
  }, 320);
}

function handleChatWidgetSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('lj-chat-input');
  if (!input || !input.value.trim()) return;
  const userText = input.value.trim();
  input.value = '';
  appendChatMessage('user', userText);
  setTimeout(() => {
    respondToUserChat(userText);
  }, 350);
}

function respondToUserChat(userText) {
  const lower = userText.toLowerCase();
  let matched = null;

  for (const item of CHATBOT_KNOWLEDGE) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      matched = item;
      break;
    }
  }

  if (matched) {
    appendChatMessage('bot', matched.reply, matched.suggestedTopic);
  } else {
    appendChatMessage(
      'bot',
      `Vielen Dank für Ihre Frage! Wir unterstützen Unternehmen mit **modernen Website-Überarbeitungen** sowie **automatisierten KI-Agenten (Stufe 1 bis 3)**, die auf Wunsch direkt mit Ihrem Firmenspeicher und Netzwerk arbeiten. Sollen wir Ihr Anliegen kurz in einer kostenlosen Potenzialanalyse besprechen?`,
      'Allgemeine Potenzialanalyse & Beratung'
    );
  }
}

/* ==========================================================================
   FAQ Accordion & Legal Modal Helpers
   ========================================================================== */

function toggleFaq(buttonEl) {
  const content = buttonEl.nextElementSibling;
  const icon = buttonEl.querySelector('[data-faq-icon]');
  if (!content) return;

  const isOpen = !content.classList.contains('hidden');
  if (isOpen) {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

function openLegalModal(type) {
  const modal = document.getElementById('legal-modal');
  const title = document.getElementById('legal-modal-title');
  const body = document.getElementById('legal-modal-body');
  if (!modal || !title || !body) return;

  if (type === 'impressum') {
    title.textContent = 'Impressum';
    body.innerHTML = `
      <div class="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div>
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Angaben gemäß § 5 DDG</h4>
          <p>
            <strong>LJ Digital Systems</strong><br>
            Vertreten durch die Geschäftsführung / Inhaber<br>
            Deutschland
          </p>
        </div>

        <div>
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Kontakt</h4>
          <p>
            E-Mail: <a href="mailto:lj.systems.de@gmail.com" class="text-sky-400 underline hover:text-sky-300">lj.systems.de@gmail.com</a><br>
            Website: <a href="https://web-lj-digital-systems.vercel.app" class="text-sky-400 underline hover:text-sky-300">web-lj-digital-systems.vercel.app</a>
          </p>
        </div>

        <div>
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h4>
          <p>
            LJ Digital Systems<br>
            Kontakt: <a href="mailto:lj.systems.de@gmail.com" class="text-sky-400 underline">lj.systems.de@gmail.com</a>
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Haftung für Inhalte</h4>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Haftung für Links</h4>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">Urheberrecht</h4>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">EU-Streitschlichtung / Verbraucherstreitbeilegung</h4>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline">https://ec.europa.eu/consumers/odr/</a>.<br>
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    `;
  } else {
    title.textContent = 'Datenschutzerklärung';
    body.innerHTML = `
      <div class="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div>
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">1. Datenschutz auf einen Blick</h4>
          <p class="mb-2">
            <strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          <p>
            <strong>Datenerfassung auf dieser Website:</strong> Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle“ dieser Datenschutzerklärung entnehmen.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">2. Verantwortliche Stelle</h4>
          <p>
            <strong>LJ Digital Systems</strong><br>
            E-Mail: <a href="mailto:lj.systems.de@gmail.com" class="text-sky-400 underline hover:text-sky-300">lj.systems.de@gmail.com</a><br>
            Website: <a href="https://web-lj-digital-systems.vercel.app" class="text-sky-400 underline hover:text-sky-300">web-lj-digital-systems.vercel.app</a>
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">3. Hosting & Bereitstellung der Website</h4>
          <p>
            Wir hosten unsere Website bei <strong>Vercel</strong> (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA). Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp und aufgerufene Seiten. Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline">https://vercel.com/legal/privacy-policy</a>. Der Einsatz erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren, schnellen und effizienten Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">4. Datenerfassung auf dieser Website</h4>
          <p class="mb-2">
            <strong>Kontaktformular & Potenzialanalyse:</strong> Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, Unternehmen, E-Mail-Adresse, Telefonnummer, gewählte Leistungsbereiche und Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung).
          </p>
          <p>
            <strong>Formularübertragung (FormSubmit):</strong> Für die sichere Weiterleitung von Anfragen nutzen wir FormSubmit. Ihre Daten werden verschlüsselt an unsere E-Mail-Adresse weitergeleitet. Es erfolgt keine Weitergabe an unbefugte Dritte oder Nutzung zu Werbezwecken.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">5. Datensicherheit bei KI- und Automatisierungslösungen</h4>
          <p>
            LJ Digital Systems legt größten Wert auf Vertraulichkeit und Datensicherheit. Bei der Konzeption und Bereitstellung unserer KI-Agenten und Schnittstellen (Stufen 1 bis 3) gilt:
          </p>
          <ul class="list-disc pl-5 space-y-1 mt-1 text-slate-300">
            <li>Geschäftliche Daten und Dokumente unserer Kunden werden nicht zur öffentlichen Modell-Trainierung verwendet.</li>
            <li>Der Zugriff auf Unternehmensdaten erfolgt ausschließlich über geschützte Schnittstellen mit rollenbasierten Freigaben.</li>
            <li>Sensible Prozesse unterliegen konfigurierbaren Bestätigungs- und Kontrollschritten durch den Kunden.</li>
          </ul>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">6. Ihre Rechte als betroffene Person</h4>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten (Art. 15 DSGVO). Sie haben außerdem ein Recht, die Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) oder Einschränkung der Verarbeitung (Art. 18 DSGVO) dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu (Art. 77 DSGVO).
          </p>
          <p class="mt-2">
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter <a href="mailto:lj.systems.de@gmail.com" class="text-sky-400 underline">lj.systems.de@gmail.com</a> an uns wenden.
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="font-bold text-white text-sm sm:text-base mb-1">7. SSL- bzw. TLS-Verschlüsselung</h4>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeLegalModal() {
  const modal = document.getElementById('legal-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-nav-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

/* ==========================================================================
   Website Overhaul Before / After Interactive Showcase
   ========================================================================== */

function switchWebsiteShowcase(mode) {
  const beforePanel = document.getElementById('showcase-before-panel');
  const afterPanel = document.getElementById('showcase-after-panel');
  const btnBefore = document.getElementById('btn-showcase-before');
  const btnAfter = document.getElementById('btn-showcase-after');

  if (!beforePanel || !afterPanel || !btnBefore || !btnAfter) return;

  if (mode === 'before') {
    beforePanel.classList.remove('hidden');
    afterPanel.classList.add('hidden');

    btnBefore.className =
      'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 text-white shadow transition';
    btnAfter.className =
      'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition';
  } else {
    beforePanel.classList.add('hidden');
    afterPanel.classList.remove('hidden');

    btnAfter.className =
      'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-600/25 transition';
    btnBefore.className =
      'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition';
  }
}

/* ==========================================================================
   Interactive Time-Savings & ROI Calculator
   ========================================================================== */

let currentRoiRecommendationTopic = 'KI-Agent Stufe 2 (Wissens- & Büro-Agent)';
let currentRoiSummaryNote = '';

function updateRoiCalculator() {
  const inquiriesInput = document.getElementById('roi-inquiries');
  const officeHoursInput = document.getElementById('roi-office-hours');
  if (!inquiriesInput || !officeHoursInput) return;

  const inquiriesPerWeek = parseInt(inquiriesInput.value, 10) || 20;
  const officeHoursPerWeek = parseInt(officeHoursInput.value, 10) || 12;

  // Update slider value labels
  const inqLabel = document.getElementById('roi-inquiries-val');
  const hoursLabel = document.getElementById('roi-office-hours-val');
  if (inqLabel) inqLabel.textContent = `${inquiriesPerWeek} Anfragen / Woche`;
  if (hoursLabel) hoursLabel.textContent = `${officeHoursPerWeek} Std. / Woche`;

  // Calculation:
  // ~8 mins saved per pre-qualified inquiry & follow-up + ~65% of routine office/doc/quote prep hours saved
  const savedHoursFromInquiriesPerWeek = (inquiriesPerWeek * 8) / 60;
  const savedHoursFromOfficePerWeek = officeHoursPerWeek * 0.65;
  const totalSavedHoursWeek = savedHoursFromInquiriesPerWeek + savedHoursFromOfficePerWeek;
  const savedHoursMonth = Math.round(totalSavedHoursWeek * 4.3);
  const savedWorkdaysYear = Math.max(1, Math.round((savedHoursMonth * 12) / 8));

  const monthEl = document.getElementById('roi-result-hours');
  const daysEl = document.getElementById('roi-result-days');
  const recBadgeEl = document.getElementById('roi-rec-badge');
  const recTitleEl = document.getElementById('roi-rec-title');
  const recDescEl = document.getElementById('roi-rec-desc');

  if (monthEl) monthEl.textContent = `ca. ${savedHoursMonth} Std.`;
  if (daysEl) daysEl.textContent = `${savedWorkdaysYear} Arbeitstage`;

  // Determine recommended tier based on workload
  if (officeHoursPerWeek <= 6 && inquiriesPerWeek <= 20) {
    currentRoiRecommendationTopic = 'KI-Agent Stufe 1 (Smart Frontdesk)';
    if (recBadgeEl) recBadgeEl.textContent = 'EMPFEHLUNG: STUFE 1 + MODERNE WEBSITE';
    if (recTitleEl) recTitleEl.textContent = 'Smart Frontdesk & Digitale Anfrage-Strecke';
    if (recDescEl) {
      recDescEl.textContent =
        'Ideal, um Kundenanfragen rund um die Uhr strukturiert aufzunehmen und Telefonunterbrechungen im Alltag sofort zu reduzieren.';
    }
  } else if (officeHoursPerWeek <= 18) {
    currentRoiRecommendationTopic = 'KI-Agent Stufe 2 (Wissens- & Büro-Agent)';
    if (recBadgeEl) recBadgeEl.textContent = 'EMPFEHLUNG: STUFE 2 (PRO)';
    if (recTitleEl) recTitleEl.textContent = 'Interner Wissens- & Büro-Agent mit Speicherzugriff';
    if (recDescEl) {
      recDescEl.textContent =
        'Der größte Hebel für Ihren Betrieb: Der Agent greift auf Ihren Firmenspeicher & Preislisten zu, bereitet Angebote vor und nimmt Ihnen den Großteil der Büroarbeit ab.';
    }
  } else {
    currentRoiRecommendationTopic = 'KI-Agent Stufe 3 (Vollintegrierter Netzwerk-Agent)';
    if (recBadgeEl) recBadgeEl.textContent = 'EMPFEHLUNG: STUFE 3 (FULL NETWORK)';
    if (recTitleEl) recTitleEl.textContent = 'Vollintegrierter Unternehmens- & Netzwerk-Agent';
    if (recDescEl) {
      recDescEl.textContent =
        'Bei Ihrem hohen Volumen lohnt sich die Voll-Vernetzung mit dem gesamten Firmennetzwerk, Speicher und CRM für autonome End-to-End-Prozesse.';
    }
  }

  currentRoiSummaryNote = `[Zeitersparnis-Rechner: Aktuell ca. ${inquiriesPerWeek} Anfragen/Woche & ${officeHoursPerWeek} Std. Büroarbeit/Woche -> Berechnetes Einsparpotenzial: ca. ${savedHoursMonth} Std./Monat]`;
}

function transferRoiToContact() {
  const msgArea = document.getElementById('contact-message');
  if (msgArea && currentRoiSummaryNote && !msgArea.value.includes('Zeitersparnis-Rechner')) {
    msgArea.value = msgArea.value
      ? `${msgArea.value}\n\n${currentRoiSummaryNote}`
      : `${currentRoiSummaryNote}\nWir möchten prüfen, wie wir diese Zeitersparnis in unserem Betrieb umsetzen können.`;
  }
  scrollToContactWithTopic(currentRoiRecommendationTopic);
}

/* ==========================================================================
   Linus Classic Strategy: Interactive Q&A Game (Potenzial-Finder)
   ========================================================================== */

const qaState = {
  currentStep: 1,
  answers: {
    pain: null,
    system: null,
    goal: null
  }
};

const qaResultsData = {
  tier1: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 1',
    title: 'Smart Frontdesk-Agent (24/7 Kundenanfragen)',
    desc: 'Für Ihren Betrieb ist die direkte Entlastung von Telefonunterbrechungen und die lückenlose Erreichbarkeit nach Feierabend der effektivste Hebel. Der Agent filtert, qualifiziert und vergibt Termine vollautomatisch.',
    timeSaved: 'Ø 8 – 15 Stunden wöchentlich',
    serviceKey: 'tier1',
    topicName: 'KI-Agent Stufe 1 (Smart Frontdesk)'
  },
  tier2: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 2 • OPTIMAL FÜR DEN MITTELSTAND',
    title: 'Wissens- & Büro-Agent (Firmenspeicher & Dokumente)',
    desc: 'Ihr größter Hebel liegt in der automatisierten Bearbeitung von Dokumenten, E-Mails und dem Durchsuchen Ihrer Firmenakten. Der Agent greift geschützt auf Ihre PDF-, Datei- und Preisdaten zu und bereitet Angebote vor.',
    timeSaved: 'Ø 14 – 24 Stunden wöchentlich',
    serviceKey: 'tier2',
    topicName: 'KI-Agent Stufe 2 (Wissens- & Büro-Agent)'
  },
  tier3: {
    badge: 'EMPFOHLENE LÖSUNG: STUFE 3 • MAXIMALE AUTOMATION',
    title: 'Autonomer Unternehmens- & Netzwerk-Agent',
    desc: 'Ihre Anforderungen erfordern eine nahtlose Vernetzung zwischen bestehendem ERP, Handwerker-Software, Dateisystem und Terminkalender für durchgängige Prozesse ohne manuelle Medienbrüche.',
    timeSaved: 'Ø 20 – 35+ Stunden wöchentlich',
    serviceKey: 'tier3',
    topicName: 'KI-Agent Stufe 3 (Vollintegrierter Netzwerk-Agent)'
  },
  website: {
    badge: 'EMPFOHLENE LÖSUNG: WEBAUFTRITT & DIGITALES FUNDAMENT',
    title: 'Moderner Website-Relaunch mit digitaler Anfragenlogik',
    desc: 'Ihr Betrieb benötigt vor allem einen zeitgemäßen, mobiloptimierten Webauftritt, der Vertrauen schafft und Kundenanfragen sofort vorqualifiziert. Die perfekte Basis, um später stufenweise KI anzudocken.',
    timeSaved: 'Ø 10 – 18 Stunden wöchentlich + mehr Neukunden',
    serviceKey: 'website',
    topicName: 'Website-Relaunch & Modernisierung'
  },
  custom: {
    badge: 'EMPFOHLENE LÖSUNG: INDIVIDUELLE SPEZIALLÖSUNG',
    title: 'Maßgeschneiderte KI- & Schnittstellen-Architektur',
    desc: 'Aufgrund Ihrer speziellen Software-Landschaft oder Arbeitsabläufe konzipieren wir eine punktgenaue KI-Lösung mit maßgeschneiderten Schnittstellen und Workflows.',
    timeSaved: 'Individuell kalkulierbar',
    serviceKey: 'custom',
    topicName: 'Individuelle KI-Speziallösung'
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
        stepEl.classList.add('animate-fade-slide');
      } else {
        stepEl.classList.add('hidden');
      }
    }
    if (dotEl) {
      if (i <= stepNum) {
        dotEl.classList.add('bg-blue-600', 'text-white');
        dotEl.classList.remove('bg-slate-200', 'text-slate-600');
      } else {
        dotEl.classList.remove('bg-blue-600', 'text-white');
        dotEl.classList.add('bg-slate-200', 'text-slate-600');
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
    resultContainer.classList.add('animate-fade-slide');
  }
}

function resetQaGame() {
  qaState.answers = { pain: null, system: null, goal: null };
  document.querySelectorAll('.qa-option-card').forEach((c) => c.classList.remove('qa-active'));
  goToQaStep(1);
}

/* ==========================================================================
   Dynamic Service Deep-Dive View Switcher
   ========================================================================== */

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
      panel.classList.add('animate-fade-slide');
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


/* ==========================================================================
   Scroll-Reveal Observer
   ========================================================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Initialize default states on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  selectSimulatorTier('tier2', 0);
  updateHiddenFormSummary();
  updateRoiCalculator();
  initScrollReveal();
});
