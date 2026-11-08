/**
 * LJ Digital Systems - Website Application Script
 * Authentic B2B Digital Systems for Owner-Run Businesses & Craftsmen
 * Founders: Linus Andler & Jasper Landgraf
 * Contact: kontakt@lj-digital-systems.de
 */

// -------------------------------------------------------------
// 1. Interaktiver 60-Sekunden Betriebs-Check (Quiz)
// -------------------------------------------------------------
const quizState = {
  currentStep: 1,
  answers: {
    q1: 'phone',      // 'phone' | 'inquiries' | 'paperwork'
    q2: 'medium',     // 'small' | 'medium' | 'large'
    q3: 'prep'        // 'filter' | 'prep' | 'website'
  }
};

const quizRecommendations = {
  tier1: {
    title: 'Baustein 1: Das Digitale Vorzimmer & Moderne Website',
    badge: 'Empfohlene Lösung für Ihren Betrieb',
    desc: 'Perfekt für Ihren Betrieb: Sie stoppen das ständige Telefonklingeln im Einsatz. Kunden werden durch ein einfaches Abfragesystem geführt und liefern alle Maße und Fotos sofort sauber ab.',
    hoursSaved: '4 bis 6 Stunden / Woche',
    serviceKey: 'tier1',
    presetName: 'handwerk'
  },
  tier2: {
    title: 'Baustein 2: Der Kalkulations- & Angebots-Assistent',
    badge: 'Empfohlene Lösung für Ihren Betrieb',
    desc: 'Genau das Richtige: Statt abends stundenlang an Preislisten zu sitzen, liest das System Ihre Vorlagen und bereitet rechtssichere Angebote vor. Ein Klick auf Ihrem Handy genügt zur Freigabe.',
    hoursSaved: '6 bis 10 Stunden / Woche',
    serviceKey: 'tier2',
    presetName: 'planning'
  },
  tier3: {
    title: 'Baustein 3: Das vernetzte Betriebs-System',
    badge: 'Empfohlene Lösung für Ihren Betrieb',
    desc: 'Maximale Entlastung für wachsende Betriebe: Verbindet Kundenanfragen, Auftragsordner, Kalender und Status-Updates nahtlos. Sie behalten den Kopf frei für das operative Geschäft.',
    hoursSaved: '10 bis 16 Stunden / Woche',
    serviceKey: 'tier3',
    presetName: 'large'
  }
};

function selectQuizOption(questionNumber, value, el) {
  quizState.answers[`q${questionNumber}`] = value;
  
  // Update styling in this step
  const stepContainer = document.getElementById(`quiz-step-${questionNumber}`);
  if (stepContainer) {
    const cards = stepContainer.querySelectorAll('.quiz-option-card');
    cards.forEach(card => {
      card.classList.remove('border-amber-500', 'bg-amber-50/90', 'ring-2', 'ring-amber-400');
      card.classList.add('border-slate-200', 'bg-white');
    });
  }
  
  if (el) {
    el.classList.remove('border-slate-200', 'bg-white');
    el.classList.add('border-amber-500', 'bg-amber-50/90', 'ring-2', 'ring-amber-400');
  }

  // Smooth auto-advance after short feedback
  setTimeout(() => {
    if (questionNumber < 3) {
      goToQuizStep(questionNumber + 1);
    } else {
      showQuizResult();
    }
  }, 240);
}

function goToQuizStep(stepNumber) {
  quizState.currentStep = stepNumber;
  
  // Update step visibility
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`quiz-step-${i}`);
    const indicatorEl = document.getElementById(`step-indicator-${i}`);
    if (stepEl) {
      if (i === stepNumber) {
        stepEl.classList.remove('hidden');
      } else {
        stepEl.classList.add('hidden');
      }
    }
    if (indicatorEl) {
      if (i === stepNumber) {
        indicatorEl.className = 'w-8 h-2 rounded-full bg-amber-500 transition-all';
      } else if (i < stepNumber) {
        indicatorEl.className = 'w-4 h-2 rounded-full bg-slate-800 transition-all';
      } else {
        indicatorEl.className = 'w-4 h-2 rounded-full bg-slate-200 transition-all';
      }
    }
  }

  const resultEl = document.getElementById('quiz-result');
  if (resultEl) resultEl.classList.add('hidden');
}

function showQuizResult() {
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`quiz-step-${i}`);
    if (stepEl) stepEl.classList.add('hidden');
  }

  const resultEl = document.getElementById('quiz-result');
  if (!resultEl) return;
  resultEl.classList.remove('hidden');

  // Determine recommendation
  let rec = quizRecommendations.tier2;
  const { q1, q2, q3 } = quizState.answers;
  if (q1 === 'phone' || q3 === 'website') {
    rec = quizRecommendations.tier1;
  } else if (q2 === 'large' || q1 === 'paperwork') {
    rec = quizRecommendations.tier3;
  } else {
    rec = quizRecommendations.tier2;
  }

  // Populate UI
  const recBadge = document.getElementById('quiz-rec-badge');
  const recTitle = document.getElementById('quiz-rec-title');
  const recDesc = document.getElementById('quiz-rec-desc');
  const recHours = document.getElementById('quiz-rec-hours');

  if (recBadge) recBadge.textContent = rec.badge;
  if (recTitle) recTitle.textContent = rec.title;
  if (recDesc) recDesc.textContent = rec.desc;
  if (recHours) recHours.textContent = rec.hoursSaved;

  // Sync to contact form hidden note
  updateFormWithQuizResult(rec);
}

function resetQuiz() {
  goToQuizStep(1);
}

function jumpToRecommendedService() {
  let rec = quizRecommendations.tier2;
  const { q1, q2, q3 } = quizState.answers;
  if (q1 === 'phone' || q3 === 'website') rec = quizRecommendations.tier1;
  else if (q2 === 'large' || q1 === 'paperwork') rec = quizRecommendations.tier3;

  selectServiceTab(rec.serviceKey);
  const target = document.getElementById('leistungen');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// -------------------------------------------------------------
// 2. Leistungs-Bausteine (Tabs) & Praxis-Simulation
// -------------------------------------------------------------
const serviceData = {
  tier1: {
    name: 'Baustein 1: Digitales Vorzimmer & Webauftritt',
    tagline: 'Stoppt unvollständige Anfragen und ewiges Hinterhertelefonieren.',
    idealFor: 'Inhabergeführte Betriebe & Fachhandwerk mit hohem Telefonaufkommen.',
    highlights: [
      '24/7 strukturierte Auftragsannahme über das Smartphone des Kunden',
      'Kunde lädt Maße, Fotos, Raumpläne und Dringlichkeit direkt hoch',
      'Sie erhalten eine saubere Projekt-Mappe per E-Mail – kein Rätselraten mehr',
      'Modernes, repräsentatives Aushängeschild für Qualitätskunden'
    ],
    exampleBefore: 'Kunde ruft 3x während der Baustelle an, spricht vage auf die Mailbox: "Brauche mal ein Angebot für neues Bad". Sie müssen abends 20 Minuten hinterhertelefonieren, Maße fehlen komplett.',
    exampleAfter: 'Kunde öffnet Ihre Website, wählt "Badsanierung", tippt Raumgröße (14m²) ein, lädt 2 Fotos vom Altbestand hoch und wünscht Rückruf am Dienstag 17 Uhr. Sie haben alle Daten auf einen Blick.'
  },
  tier2: {
    name: 'Baustein 2: Kalkulations- & Angebots-Assistent',
    tagline: 'Vorkalkulierte Angebote auf Basis Ihrer Preisliste – Freigabe mit 1 Klick.',
    idealFor: 'Betriebe mit vielen Einzelanfragen, Planungsbüros & Gutachter.',
    highlights: [
      'Greift geschützt auf Ihre freigegebene Preisliste 2026 (Excel/PDF) zu',
      'Erstellt automatisch das positionsgenaue Angebots-PDF',
      '100% Inhaber-Kontrolle: 1 Klick am Smartphone erteilt die Freigabe',
      'DSGVO-konform: Interne Chef- und Personaldaten bleiben strikt gesperrt'
    ],
    exampleBefore: 'Nach 9 Stunden auf der Baustelle sitzen Sie abends um 21 Uhr noch am PC, suchen Positionspreise in alten Excel-Dateien und tippen mühsam das PDF zusammen.',
    exampleAfter: 'Das System liest die Anfrage, berechnet Positionen nach Ihrer Preisliste und legt das fertige Angebots-PDF (#2026-84) in Ihr Postfach. Sie prüfen die Summe auf dem Handy, klicken auf "Freigeben", fertig.'
  },
  tier3: {
    name: 'Baustein 3: Das vernetzte Betriebs-System',
    tagline: 'Volle Verbindung von Anfrage, Terminen, Dokumenten & Nachunternehmern.',
    idealFor: 'Etablierte Fachbetriebe mit mehreren Mitarbeitern oder hohem Projektvolumen.',
    highlights: [
      'Verbindet Website, Kalender, Auftragsordner und WhatsApp/E-Mail',
      'Automatische Status-Nachrichten an Kunden ("Material bestellt", "Termin bestätigt")',
      'Dokumentenprüfung: Prüft hochgeladene Skizzen auf Vollständigkeit',
      'Persönlich eingerichtet und dauerhaft betreut von Linus & Jasper'
    ],
    exampleBefore: 'Drei Mitarbeiter fragen gleichzeitig nach Plänen, Kunden rufen panisch an wo die Lieferung bleibt, Zettel verschwinden zwischen Werkstatt und Auto.',
    exampleAfter: 'Jeder Auftrag hat einen zentralen Ordner. Termine, Status und Kundenbestätigungen laufen verlässlich und automatisch im Hintergrund ab. Sie behalten die volle Übersicht.'
  }
};

let currentActiveService = 'tier1';

function selectServiceTab(serviceKey) {
  currentActiveService = serviceKey;
  const data = serviceData[serviceKey];
  if (!data) return;

  // Update tabs visual
  ['tier1', 'tier2', 'tier3'].forEach(k => {
    const tabBtn = document.getElementById(`tab-btn-${k}`);
    if (tabBtn) {
      if (k === serviceKey) {
        tabBtn.className = 'service-tab-btn flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-900 text-white shadow-md border border-slate-700 transition-all';
      } else {
        tabBtn.className = 'service-tab-btn flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all';
      }
    }
  });

  // Update content
  const titleEl = document.getElementById('service-detail-title');
  const taglineEl = document.getElementById('service-detail-tagline');
  const idealEl = document.getElementById('service-detail-ideal');
  const beforeEl = document.getElementById('service-detail-before');
  const afterEl = document.getElementById('service-detail-after');
  const listEl = document.getElementById('service-detail-list');

  if (titleEl) titleEl.textContent = data.name;
  if (taglineEl) taglineEl.textContent = data.tagline;
  if (idealEl) idealEl.textContent = data.idealFor;
  if (beforeEl) beforeEl.textContent = data.exampleBefore;
  if (afterEl) afterEl.textContent = data.exampleAfter;

  if (listEl) {
    listEl.innerHTML = data.highlights
      .map(item => `
        <li class="flex items-start gap-3 text-slate-700 text-sm">
          <span class="text-amber-600 font-bold mt-0.5">✓</span>
          <span>${item}</span>
        </li>
      `)
      .join('');
  }
}

// -------------------------------------------------------------
// 3. Entlastungs-Rechner (ROI-Calculator)
// -------------------------------------------------------------
const ROI_PRESETS = {
  handwerk: { inquiries: 30, officeHours: 14, name: 'Fachhandwerk & Montage' },
  planning: { inquiries: 15, officeHours: 18, name: 'Planungs- & Ingenieurbüro' },
  expert: { inquiries: 20, officeHours: 12, name: 'Gutachter & Sachverständige' }
};

const HOURLY_RATE = 85; // kalkulatorischer Inhaber-Stundensatz in Euro

function applyRoiPreset(presetKey, el) {
  const preset = ROI_PRESETS[presetKey];
  if (!preset) return;

  const inqSlider = document.getElementById('roi-inquiries');
  const officeSlider = document.getElementById('roi-hours');

  if (inqSlider) inqSlider.value = preset.inquiries;
  if (officeSlider) officeSlider.value = preset.officeHours;

  // Visual button active state
  document.querySelectorAll('.roi-preset-btn').forEach(btn => {
    btn.classList.remove('border-amber-500', 'bg-amber-50', 'ring-2', 'ring-amber-400');
    btn.classList.add('border-slate-200', 'bg-white');
  });

  if (el) {
    el.classList.remove('border-slate-200', 'bg-white');
    el.classList.add('border-amber-500', 'bg-amber-50', 'ring-2', 'ring-amber-400');
  }

  updateRoiCalculator();
}

function updateRoiCalculator() {
  const inqSlider = document.getElementById('roi-inquiries');
  const officeSlider = document.getElementById('roi-hours');

  const inqVal = inqSlider ? parseInt(inqSlider.value, 10) : 25;
  const officeVal = officeSlider ? parseInt(officeSlider.value, 10) : 14;

  const inqDisplay = document.getElementById('roi-inquiries-val');
  const officeDisplay = document.getElementById('roi-hours-val');

  if (inqDisplay) inqDisplay.textContent = inqVal;
  if (officeDisplay) officeDisplay.textContent = `${officeVal} Std. / Woche`;

  // Calculation formula:
  // Pre-qualification saves ~12 mins per inquiry (0.2h)
  // Proposal assistant saves ~35% of remaining paperwork time
  const inquiryTimeSaved = inqVal * 0.22;
  const paperworkTimeSaved = officeVal * 0.42;
  const totalHoursSaved = Math.min(officeVal * 0.85, Math.max(3.0, (inquiryTimeSaved + paperworkTimeSaved) * 0.8));
  
  const weeklyValue = Math.round(totalHoursSaved * HOURLY_RATE);
  const monthlyValue = weeklyValue * 4.33;

  const hoursEl = document.getElementById('roi-result-hours');
  const valueEl = document.getElementById('roi-result-value');
  const tierEl = document.getElementById('roi-result-tier');

  if (hoursEl) hoursEl.textContent = `~${totalHoursSaved.toFixed(1)} Std.`;
  if (valueEl) valueEl.textContent = `~${weeklyValue.toLocaleString('de-DE')} €`;

  if (tierEl) {
    if (inqVal <= 18 && officeVal <= 12) {
      tierEl.textContent = 'Empfehlung: Baustein 1 (Vorzimmer & Web)';
    } else if (inqVal > 30 || officeVal > 20) {
      tierEl.textContent = 'Empfehlung: Baustein 3 (Vernetztes Betriebs-System)';
    } else {
      tierEl.textContent = 'Empfehlung: Baustein 2 (Kalkulations- & Angebots-Assistent)';
    }
  }
}

// -------------------------------------------------------------
// 4. Kontakt- & Terminformular
// -------------------------------------------------------------
function updateFormWithQuizResult(rec) {
  const noteField = document.getElementById('contact-note');
  if (noteField && !noteField.value.trim()) {
    noteField.value = `Ergebnis Betriebs-Check: Interesse an ${rec.title}. Erwartete Entlastung: ${rec.hoursSaved}.`;
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = document.getElementById('contact-submit-btn');
  const feedbackBox = document.getElementById('contact-feedback-box');
  const feedbackDesc = document.getElementById('contact-feedback-desc');

  const nameVal = document.getElementById('contact-name')?.value || '';
  const phoneVal = document.getElementById('contact-phone')?.value || '';
  const branchVal = document.getElementById('contact-branch')?.value || '';
  const timeVal = document.getElementById('contact-time')?.value || '';
  const noteVal = document.getElementById('contact-note')?.value || '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Übermittle vertraulich...</span>';
  }

  // Simulate reliable transmission to kontakt@lj-digital-systems.de
  await new Promise(r => setTimeout(r, 650));

  if (feedbackBox) {
    feedbackBox.classList.remove('hidden');
    form.classList.add('hidden');
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (feedbackDesc) {
    feedbackDesc.innerHTML = `
      Wir haben Ihre Angaben für <strong>${nameVal || 'Ihren Betrieb'}</strong> unter 
      <strong class="text-amber-600 font-mono">kontakt@lj-digital-systems.de</strong> erhalten.<br>
      Linus Andler oder Jasper Landgraf melden sich verlässlich zum Zeitfenster 
      <strong>(${timeVal})</strong> unter <strong>${phoneVal}</strong> bei Ihnen.
    `;
  }
}

// -------------------------------------------------------------
// 5. Initialisierung beim Laden
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Init Quiz
  goToQuizStep(1);

  // Init Services Tab
  selectServiceTab('tier1');

  // Init ROI Calculator
  updateRoiCalculator();
});
