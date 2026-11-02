"use strict";
/* ===== Vaste lijsten (uit het tabblad Lijsten) ===== */
const STATUS = ['Uitgebracht', 'Optie', 'Afgewezen', 'Definitief'];
const DOELGROEP = ['Trainers, coaches & consultants', 'HR-managers & office managers', 'Directie & management', 'Corporates & industrie', 'Overheid, zorg & onderwijs', 'Projecten en sportteams'];
const ARRANGEMENT = ['8-uurs vergaderarrangement incl. lunch', '4-uurs vergaderarrangement (middag) - exclusief lunch', '24-uurs vergaderarrangement incl. diner en overnachting + ontbijt', '4-uurs vergaderarrangement (ochtend) - exclusief lunch', '12-uurs vergaderarrangement incl. lunch en diner', 'Overig / maatwerk'];
const ARR_KORT = {
  '8-uurs vergaderarrangement incl. lunch': '8-uurs incl. lunch',
  '4-uurs vergaderarrangement (middag) - exclusief lunch': '4-uurs middag',
  '24-uurs vergaderarrangement incl. diner en overnachting + ontbijt': '24-uurs Meet, Eat & Sleep',
  '4-uurs vergaderarrangement (ochtend) - exclusief lunch': '4-uurs ochtend',
  '12-uurs vergaderarrangement incl. lunch en diner': '12-uurs lunch/diner',
  'Overig / maatwerk': 'Overig / maatwerk',
};
const HERKOMST = ['All Stars landingpagina', 'Intern / salesmanager', 'Otium website door gast', 'Telefonisch', 'E-mail', 'Netwerk / relatie', 'Social media', 'Partner / intermediair', 'Terugkerende gast', 'Anders'];
const ACTIVITEIT = ['Vergadering', 'Voetbalkamp'];
const KLANTTYPE = ['Nieuwe klant', 'Herhaalboeking'];
const ACCOUNT = ['Topaccount', 'Middelgroot account', 'Klein account'];
const JANEE = ['Ja', 'Nee'];
const KANAAL = ['LinkedIn', 'Meta', 'Google Display / Search', 'Nieuwsbrief', 'Organisch', 'Partner / intermediair', 'Direct / intern'];
const MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
const MKORT = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

/* Velden van één regel, in de volgorde van het invoerscherm */
const FIELDS = [
  { k: 'offertedatum', l: 'Offertedatum', t: 'date', g: 'Offerte', req: true },
  { k: 'offertenummer', l: 'Offertenummer', t: 'text', g: 'Offerte' },
  { k: 'salesmedewerker', l: 'Salesmedewerker', t: 'text', g: 'Offerte', req: true, list: 'lijst-sales' },
  { k: 'status', l: 'Status', t: 'select', g: 'Offerte', req: true, opts: STATUS },
  { k: 'organisatie', l: 'Organisatie', t: 'text', g: 'Klant', req: true, list: 'lijst-org' },
  { k: 'contactpersoon', l: 'Contactpersoon', t: 'text', g: 'Klant' },
  { k: 'doelgroep', l: 'Bron / doelgroep', t: 'select', g: 'Klant', opts: DOELGROEP },
  { k: 'herkomst', l: 'Herkomst lead', t: 'select', g: 'Klant', opts: HERKOMST },
  { k: 'campagnecode', l: 'Campagnecode', t: 'text', g: 'Klant', list: 'lijst-codes', hint: 'Precies zoals in Marketing' },
  { k: 'klanttype', l: 'Nieuwe / herhaalboeking', t: 'select', g: 'Klant', opts: KLANTTYPE },
  { k: 'accountcategorie', l: 'Accountcategorie', t: 'select', g: 'Klant', opts: ACCOUNT },
  { k: 'bijeenkomst', l: 'Datum bijeenkomst', t: 'date', g: 'Bijeenkomst' },
  { k: 'activiteitstype', l: 'Activiteitstype', t: 'select', g: 'Bijeenkomst', opts: ACTIVITEIT, hint: 'Nodig om mee te tellen in het dashboard' },
  { k: 'arrangement', l: 'Arrangement', t: 'select', g: 'Bijeenkomst', opts: ARRANGEMENT, wide: true },
  { k: 'personen', l: 'Aantal personen', t: 'int', g: 'Bijeenkomst' },
  { k: 'dagdelen', l: 'Aantal dagdelen', t: 'int', g: 'Bijeenkomst' },
  { k: 'overnachtingen', l: 'Aantal overnachtingen', t: 'int', g: 'Bijeenkomst' },
  { k: 'offertewaarde', l: 'Offertewaarde', t: 'eur', g: 'Bedragen' },
  { k: 'zaalhuur', l: 'Zaalhuur', t: 'eur', g: 'Bedragen' },
  { k: 'fb', l: 'F&B', t: 'eur', g: 'Bedragen' },
  { k: 'omzet_overnachtingen', l: 'Omzet overnachtingen', t: 'eur', g: 'Bedragen' },
  { k: 'upsell', l: 'Upsell', t: 'select', g: 'Opvolging', opts: JANEE },
  { k: 'vervolg_verstuurd', l: 'Vervolgaanbod verstuurd', t: 'select', g: 'Opvolging', opts: JANEE },
  { k: 'vervolg_datum', l: 'Datum vervolgaanbod', t: 'date', g: 'Opvolging' },
  { k: 'reden', l: 'Reden afwijzing / toelichting', t: 'textarea', g: 'Opvolging', wide: true },
  { k: 'kpi_notitie', l: 'KPI-notitie', t: 'textarea', g: 'Opvolging', wide: true },
];

/* Doelen 2027 uit het tabblad KPI-dashboard en KPI-plan, als startpunt */
function legeDoelen() {
  return {
    maanden: Array.from({ length: 12 }, () => ({ verhuur: 0, kampen: 0, boekingen: 0, gasten: 0, dagdelen: 0, budget: 0, zaalhuur: 0, fb: 0 })),
    jaar: { herhaal: 0, arr24: 0, attributie: 0, budget_plafond: 0 },
    arrangementen: {},
  };
}

/* ===== Rekenen ===== */
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const ym = (d) => (typeof d === 'string' && d.length >= 7 ? d.slice(0, 7) : '');
const jaarVan = (d) => (typeof d === 'string' && d.length >= 4 ? Number(d.slice(0, 4)) : null);
const maandVan = (d) => (typeof d === 'string' && d.length >= 7 ? Number(d.slice(5, 7)) : null);
const omzetVan = (r) => num(r.zaalhuur) + num(r.fb) + num(r.omzet_overnachtingen);
/* Omzet die meetelt voor de doelen: zaalhuur en F&B, zonder hotelovernachtingen */
const omzetDoel = (r) => num(r.zaalhuur) + num(r.fb);
const isDef = (r) => r.status === 'Definitief';
const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);

function isoWeek(dstr) {
  const d = new Date(dstr + 'T00:00:00Z');
  if (isNaN(d)) return null;
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const wy = d.getUTCFullYear();
  const first = new Date(Date.UTC(wy, 0, 4));
  const w = 1 + Math.round(((d - first) / 864e5 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
  return { jaar: wy, week: w };
}

function werkdagenTussen(a, b) {
  const s = new Date(a + 'T00:00:00Z'), e = new Date(b + 'T00:00:00Z');
  if (isNaN(s) || isNaN(e)) return null;
  const sign = e >= s ? 1 : -1;
  let n = 0; const d = new Date(sign > 0 ? s : e); const end = sign > 0 ? e : s;
  while (d < end) { d.setUTCDate(d.getUTCDate() + 1); const wd = d.getUTCDay(); if (wd !== 0 && wd !== 6) n++; }
  return n * sign;
}

/* Wat er aan een regel ontbreekt om goed mee te tellen */
function signalen(r, vandaag) {
  const s = [];
  if (isDef(r)) {
    if (!r.activiteitstype) s.push('Activiteitstype ontbreekt, telt niet mee in het dashboard');
    if (!r.bijeenkomst) s.push('Datum bijeenkomst ontbreekt');
    if (omzetVan(r) === 0) s.push('Omzet niet uitgesplitst in zaalhuur, F&B en overnachtingen');
    if (r.activiteitstype === 'Vergadering' && !num(r.dagdelen)) s.push('Aantal dagdelen ontbreekt');
    if (!r.klanttype) s.push('Nieuwe / herhaalboeking ontbreekt');
    if ((r.accountcategorie === 'Topaccount' || r.accountcategorie === 'Middelgroot account') && r.bijeenkomst && r.bijeenkomst <= vandaag && r.vervolg_verstuurd !== 'Ja') {
      const wd = werkdagenTussen(r.bijeenkomst, vandaag);
      if (wd != null && wd > 10) s.push('Vervolgaanbod nog niet verstuurd, ' + wd + ' werkdagen na de bijeenkomst');
    }
  }
  return s;
}

/* KPI-dashboard: op datum bijeenkomst, alleen definitief */
function dashboardMaanden(regels, jaar) {
  const out = Array.from({ length: 12 }, (_, i) => ({ maand: i + 1, verhuur: 0, zaalhuur: 0, fb: 0, kampen: 0, boekingen: 0, gasten: 0, dagdelen: 0, events20: 0, nachten: 0, hotel: 0 }));
  regels.forEach((r) => {
    if (!isDef(r) || jaarVan(r.bijeenkomst) !== jaar) return;
    const m = out[maandVan(r.bijeenkomst) - 1];
    if (!m) return;
    // Hotelovernachtingen: alleen ter inzicht, voor elke definitieve boeking
    m.nachten += num(r.overnachtingen); m.hotel += num(r.omzet_overnachtingen);
    if (r.activiteitstype === 'Vergadering') {
      m.verhuur += omzetDoel(r); m.zaalhuur += num(r.zaalhuur); m.fb += num(r.fb); m.boekingen += 1; m.gasten += num(r.personen); m.dagdelen += num(r.dagdelen);
      if (num(r.personen) >= 20) m.events20 += 1;
    } else if (r.activiteitstype === 'Voetbalkamp') {
      m.kampen += omzetDoel(r);
    }
  });
  return out;
}

function jaarKpi(regels, campagnes, jaar) {
  const def = regels.filter((r) => isDef(r) && jaarVan(r.bijeenkomst) === jaar);
  const maanden = dashboardMaanden(regels, jaar);
  return {
    verhuur: sum(maanden, (m) => m.verhuur),
    zaalhuur: sum(maanden, (m) => m.zaalhuur),
    fb: sum(maanden, (m) => m.fb),
    nachten: sum(maanden, (m) => m.nachten),
    hotel: sum(maanden, (m) => m.hotel),
    kampen: sum(maanden, (m) => m.kampen),
    totaal: sum(maanden, (m) => m.verhuur + m.kampen),
    boekingen: sum(maanden, (m) => m.boekingen),
    gasten: sum(maanden, (m) => m.gasten),
    dagdelen: sum(maanden, (m) => m.dagdelen),
    herhaal: def.filter((r) => r.klanttype === 'Herhaalboeking').length,
    arr24: def.filter((r) => r.arrangement === ARRANGEMENT[2]).length,
    attributie: sum(def.filter((r) => String(r.campagnecode || '').trim() !== ''), omzetDoel),
    marketingkosten: sum(campagnes.filter((c) => num(c.jaar) === jaar), (c) => num(c.kosten)),
    zonderType: regels.filter((r) => isDef(r) && jaarVan(r.bijeenkomst) === jaar && !r.activiteitstype).length,
  };
}

/* Zijn zaalhuur en F&B als losse doelen ingevuld? Anders geldt nog het oude totaal Verhuur en F&B */
const maandGesplitst = (m) => num(m.zaalhuur) + num(m.fb) > 0;
const nogNietVerdeeld = (D) => (D.maanden || []).filter((m) => !maandGesplitst(m) && num(m.verhuur) > 0).length;
const doelGesplitst = (D) => (D.maanden || []).some(maandGesplitst) && nogNietVerdeeld(D) === 0;

/* Doel tot en met vandaag (maanden pro rata) */
function doelTotNu(doelen, jaar, veld, vandaag) {
  const vj = jaarVan(vandaag);
  if (vj < jaar) return 0;
  const m = doelen.maanden;
  if (vj > jaar) return sum(m, (x) => num(x[veld]));
  const mi = maandVan(vandaag) - 1;
  const dag = Number(vandaag.slice(8, 10));
  const dagen = new Date(Date.UTC(jaar, mi + 1, 0)).getUTCDate();
  return sum(m.slice(0, mi), (x) => num(x[veld])) + num(m[mi][veld]) * (dag / dagen);
}

/* Arrangementen: definitieve boekingen en personen per maand */
function arrangementen(regels, jaar) {
  const res = {};
  ARRANGEMENT.forEach((a) => { res[a] = { boekingen: Array(12).fill(0), personen: Array(12).fill(0) }; });
  regels.forEach((r) => {
    if (!isDef(r) || jaarVan(r.bijeenkomst) !== jaar || !res[r.arrangement]) return;
    const i = maandVan(r.bijeenkomst) - 1;
    res[r.arrangement].boekingen[i] += 1;
    res[r.arrangement].personen[i] += num(r.personen);
  });
  return res;
}

/* Accountdoelen uit het KPI-plan */
function accounts(regels, jaar, vandaag) {
  return ACCOUNT.map((cat) => {
    const def = regels.filter((r) => isDef(r) && r.accountcategorie === cat && jaarVan(r.bijeenkomst) === jaar);
    const orgs = new Map();
    def.forEach((r) => { const k = String(r.organisatie || '').trim().toLowerCase(); if (k) orgs.set(k, (orgs.get(k) || 0) + 1); });
    const geweest = def.filter((r) => r.bijeenkomst && r.bijeenkomst <= vandaag);
    const opTijd = geweest.filter((r) => r.vervolg_verstuurd === 'Ja' && r.vervolg_datum && werkdagenTussen(r.bijeenkomst, r.vervolg_datum) <= 10).length;
    return {
      categorie: cat,
      accounts: orgs.size,
      boekingen: def.length,
      perAccount: orgs.size ? def.length / orgs.size : null,
      herhaal: def.filter((r) => r.klanttype === 'Herhaalboeking').length,
      upsell: def.length ? def.filter((r) => r.upsell === 'Ja').length / def.length : null,
      vervolgOpTijd: geweest.length ? opTijd / geweest.length : null,
      geweest: geweest.length,
    };
  });
}

/* Salesactiviteit: op offertedatum, per maand of per week */
function activiteit(regels, jaar, perWeek) {
  const rows = new Map();
  regels.forEach((r) => {
    if (!r.offertedatum) return;
    let key;
    if (perWeek) { const w = isoWeek(r.offertedatum); if (!w || w.jaar !== jaar) return; key = w.week; }
    else { if (jaarVan(r.offertedatum) !== jaar) return; key = maandVan(r.offertedatum); }
    if (!rows.has(key)) rows.set(key, { periode: key, totaal: 0, Uitgebracht: 0, Optie: 0, Afgewezen: 0, Definitief: 0, offertewaarde: 0, omzet: 0, overnachtingen: 0, personen: 0 });
    const x = rows.get(key);
    x.totaal += 1;
    if (x[r.status] != null) x[r.status] += 1;
    x.offertewaarde += num(r.offertewaarde);
    if (isDef(r)) { x.omzet += omzetVan(r); x.overnachtingen += num(r.overnachtingen); x.personen += num(r.personen); }
  });
  return [...rows.values()].sort((a, b) => a.periode - b.periode);
}

function perGroep(regels, jaar, veld, lijst) {
  const sel = regels.filter((r) => jaarVan(r.offertedatum) === jaar);
  const namen = [...lijst, ...new Set(sel.map((r) => r[veld]).filter((v) => v && !lijst.includes(v)))];
  const out = namen.map((n) => {
    const g = sel.filter((r) => r[veld] === n);
    const def = g.filter(isDef);
    const besl = g.filter((r) => r.status === 'Definitief' || r.status === 'Afgewezen').length;
    return { naam: n, offertes: g.length, definitief: def.length, conversie: besl ? def.length / besl : null, omzet: sum(def, omzetVan) };
  });
  const leeg = sel.filter((r) => !r[veld]);
  if (leeg.length) { const def = leeg.filter(isDef); const besl = leeg.filter((r) => r.status === 'Definitief' || r.status === 'Afgewezen').length; out.push({ naam: 'Niet ingevuld', offertes: leeg.length, definitief: def.length, conversie: besl ? def.length / besl : null, omzet: sum(def, omzetVan) }); }
  return out;
}

/* Marketing per campagneregel, zoals het tabblad Marketing */
function campagneCijfers(c, regels) {
  const code = String(c.campagnecode || '').trim();
  const j = num(c.jaar), m = num(c.maand);
  if (!code || !j || !m) return { leads: 0, boekingen: 0, omzet: 0, cpl: null, cpb: null, roas: null };
  const inMaand = (d) => jaarVan(d) === j && maandVan(d) === m;
  const leads = regels.filter((r) => String(r.campagnecode || '').trim() === code && inMaand(r.offertedatum)).length;
  const def = regels.filter((r) => String(r.campagnecode || '').trim() === code && isDef(r) && inMaand(r.bijeenkomst));
  const omzet = sum(def, omzetVan);
  const k = num(c.kosten);
  return { leads, boekingen: def.length, omzet, cpl: leads ? k / leads : null, cpb: def.length ? k / def.length : null, roas: k ? omzet / k : null };
}

/* CSV-export (puntkomma, zoals Excel in het Nederlands verwacht) */
function naarCsv(kolommen, rijen) {
  const esc = (v) => { if (v == null) return ''; let s = typeof v === 'number' ? String(v).replace('.', ',') : String(v); if (typeof v !== 'number' && /^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return '﻿' + [kolommen.map((k) => esc(k.l)).join(';'), ...rijen.map((r) => kolommen.map((k) => esc(r[k.k])).join(';'))].join('\r\n');
}

/* ===== Opmaak ===== */
const fEur = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const fEur2 = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
const fInt = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });
const fDec = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 });
const fPct = new Intl.NumberFormat('nl-NL', { style: 'percent', maximumFractionDigits: 0 });
const fDatum = (s) => { if (!s) return ''; const d = new Date(s + 'T00:00:00'); return isNaN(d) ? s : d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' }); };
const eurK = (v) => (Math.abs(v) >= 10000 ? '€ ' + new Intl.NumberFormat('nl-NL', { notation: 'compact', maximumFractionDigits: 1 }).format(v) : fEur.format(v));
const vandaag = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'style') el.setAttribute('style', v);
    else if (k in el && typeof v !== 'string') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  kids.flat(Infinity).forEach((c) => { if (c == null || c === false) return; el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c); });
  return el;
}
const $ = (s) => document.querySelector(s);

/* ===== Toestand ===== */
const S = {
  db: null, user: null, canWrite: null, ready: false, failed: false,
  regels: [], campagnes: [], doelen: {}, doelenGeladen: false,
  tab: 'invoer', perWeek: false, editing: null,
};
const JAREN = [2026, 2027, 2028];
const NU_JAAR = new Date().getFullYear();

function toast(t) {
  const root = $('#toast-root'); root.replaceChildren(h('div', { class: 'toast', role: 'status', text: t }));
  clearTimeout(toast._t); toast._t = setTimeout(() => root.replaceChildren(), 2600);
}
function schrijfFout(e) {
  if (e && e.code === 'invalid_argument') { S.canWrite = false; renderAll(); toast('Je hebt alleen leesrechten op deze pagina.'); return; }
  if (e && e.code === 'quota_exceeded') { toast('De opslag is vol. Verwijder oude regels of neem contact op met LMG.'); return; }
  toast('Opslaan lukte niet. Probeer het zo nog eens.');
}
const magSchrijven = () => S.db && S.canWrite !== false;

/* ===== Tabbladen ===== */
const tabs = [...document.querySelectorAll('nav.tabs button')];
function toonTab(t) {
  if (!document.getElementById(t)) return;
  S.tab = t;
  tabs.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === t)));
  document.querySelectorAll('.page').forEach((p) => { p.hidden = p.id !== t; });
  try { history.replaceState(null, '', '#' + t); } catch (e) { /* niet erg */ }
  renderAll();
}
tabs.forEach((b) => b.addEventListener('click', () => toonTab(b.dataset.tab)));

function vulJaren(sel, standaard) {
  sel.replaceChildren(...JAREN.map((j) => h('option', { value: String(j), text: String(j) })));
  sel.value = String(standaard);
  sel.addEventListener('change', renderAll);
}
vulJaren($('#f-jaar'), NU_JAAR); $('#f-jaar').prepend(h('option', { value: '', text: 'Alle jaren' })); $('#f-jaar').value = '';
vulJaren($('#d-jaar'), 2027);
vulJaren($('#a-jaar'), NU_JAAR);
vulJaren($('#m-jaar'), 2027);
vulJaren($('#g-jaar'), 2027);
$('#f-status').append(...STATUS.map((s) => h('option', { value: s, text: s })));
['#zoek', '#f-status', '#f-aandacht'].forEach((s) => $(s).addEventListener('input', renderInvoer));
$('#a-maand').addEventListener('click', () => { S.perWeek = false; renderAll(); });
$('#a-week').addEventListener('click', () => { S.perWeek = true; renderAll(); });

/* ===== Invoer: lijst ===== */
function zichtbareRegels() {
  const q = $('#zoek').value.trim().toLowerCase();
  const st = $('#f-status').value, jr = $('#f-jaar').value, aand = $('#f-aandacht').checked;
  const nu = vandaag();
  return S.regels.filter((r) => {
    if (st && r.status !== st) return false;
    if (jr && String(jaarVan(r.offertedatum)) !== jr) return false;
    if (aand && !signalen(r, nu).length) return false;
    if (q) { const hay = [r.organisatie, r.contactpersoon, r.offertenummer, r.salesmedewerker, r.campagnecode].join(' ').toLowerCase(); if (!hay.includes(q)) return false; }
    return true;
  }).sort((a, b) => String(b.offertedatum || '').localeCompare(String(a.offertedatum || '')) || String(b.gewijzigd || '').localeCompare(String(a.gewijzigd || '')));
}

function renderInvoer() {
  $('#nieuw').disabled = !magSchrijven();
  $('#import').disabled = !magSchrijven();
  const tb = $('#t-regels tbody'); const leeg = $('#regels-leeg');
  tb.replaceChildren(); leeg.replaceChildren();
  if (!S.ready) { leeg.append(h('div', { class: 'empty' }, S.failed ? h('strong', { text: 'Gegevens konden niet worden geladen' }) : h('span', { text: 'Gegevens laden…' }), S.failed ? h('span', { text: 'Controleer de internetverbinding en klik op Vernieuwen.' }) : null)); return; }
  const rows = zichtbareRegels();
  if (!S.regels.length) {
    leeg.append(h('div', { class: 'empty' }, h('strong', { text: 'Nog geen offertes ingevoerd' }), h('span', { text: 'Elke offerte of boeking wordt hier één regel. Begin met de eerste.' }), magSchrijven() ? h('button', { class: 'btn primary', type: 'button', text: 'Eerste offerte invoeren', onclick: () => openSheet(null) }) : null));
    return;
  }
  if (!rows.length) { leeg.append(h('div', { class: 'empty' }, h('span', { text: 'Geen regels die passen bij deze filters.' }))); return; }
  const nu = vandaag();
  rows.forEach((r) => {
    const sig = signalen(r, nu);
    const bedrag = isDef(r) && omzetVan(r) ? omzetVan(r) : num(r.offertewaarde);
    const stCel = magSchrijven()
      ? h('select', { class: 'stsel st ' + (r.status || ''), 'aria-label': 'Status van ' + (r.organisatie || 'regel'), onclick: (e) => e.stopPropagation(), onchange: (e) => zetStatus(r, e.target.value) }, STATUS.map((s) => h('option', { value: s, text: s, selected: s === r.status })))
      : h('span', { class: 'st ' + (r.status || ''), text: r.status || '' });
    tb.append(h('tr', { class: 'click', tabindex: '0', onclick: () => openSheet(r), onkeydown: (e) => { if (e.key === 'Enter') openSheet(r); } },
      h('td', null, fDatum(r.offertedatum), r.offertenummer ? h('div', { class: 'sm', text: '#' + r.offertenummer }) : null),
      h('td', null, h('span', { text: r.organisatie || '' }), sig.length ? h('span', { class: 'flag', title: sig.join('\n'), 'aria-label': sig.length + ' aandachtspunten', text: '!' }) : null, r.contactpersoon ? h('div', { class: 'sm', text: r.contactpersoon }) : null),
      h('td', { class: 'hide-s', text: r.salesmedewerker || '' }),
      h('td', null, stCel),
      h('td', { class: 'hide-s', text: fDatum(r.bijeenkomst) }),
      h('td', { class: 'hide-s sm', text: ARR_KORT[r.arrangement] || r.arrangement || '' }),
      h('td', { class: 'n hide-s', text: r.personen ? fInt.format(r.personen) : '' }),
      h('td', { class: 'n' }, bedrag ? fEur.format(bedrag) : '', h('div', { class: 'sm', text: isDef(r) && omzetVan(r) ? 'omzet' : bedrag ? 'offerte' : '' })),
    ));
  });
}

async function zetStatus(r, status) {
  if (!magSchrijven() || r.status === status) return;
  try { await S.db.collection('regels').doc(r.id).update({ status, gewijzigd: new Date().toISOString(), gewijzigd_door: S.uid || null }); toast('Status is nu ' + status); }
  catch (e) { schrijfFout(e); renderInvoer(); }
}

/* ===== Invoer: paneel ===== */
function veldWaarde(f, r) {
  const v = r ? r[f.k] : null;
  if (v == null) return '';
  if (f.t === 'eur') return String(v).replace('.', ',');
  return String(v);
}
function leesVeld(f, raw) {
  const s = String(raw == null ? '' : raw).trim();
  if (s === '') return null;
  if (f.t === 'int') { const n = Math.round(Number(s.replace(',', '.'))); return Number.isFinite(n) ? n : NaN; }
  if (f.t === 'eur') { let t = s.replace(/[€\s]/g, ''); if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.'); const n = Number(t); return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN; }
  return s;
}

function openSheet(r) {
  S.editing = r ? r.id : 'nieuw';
  const ro = !magSchrijven();
  const root = $('#sheet-root');
  const groepen = [...new Set(FIELDS.map((f) => f.g))];
  const start = r || { offertedatum: vandaag(), status: 'Uitgebracht' };
  const inputs = {};
  const sigBox = h('div');
  const msg = h('p', { class: 'msg', 'aria-live': 'polite' });
  const toonSignalen = () => {
    const tmp = {}; FIELDS.forEach((f) => { tmp[f.k] = leesVeld(f, inputs[f.k].value); });
    const sig = signalen(tmp, vandaag());
    sigBox.replaceChildren(sig.length ? h('ul', { class: 'sigs' }, sig.map((s) => h('li', { text: s }))) : '');
  };
  const veld = (f) => {
    const id = 'v-' + f.k; let inp;
    if (f.t === 'select') inp = h('select', { id }, h('option', { value: '', text: '' }), f.opts.map((o) => h('option', { value: o, text: o })));
    else if (f.t === 'textarea') inp = h('textarea', { id });
    else if (f.t === 'date') inp = h('input', { id, type: 'date', min: '2000-01-01', max: '2099-12-31' });
    else if (f.t === 'int') inp = h('input', { id, type: 'number', min: '0', step: '1', inputmode: 'numeric' });
    else if (f.t === 'eur') inp = h('input', { id, type: 'text', inputmode: 'decimal', placeholder: '€' });
    else inp = h('input', { id, type: 'text', list: f.list || null, autocomplete: 'off' });
    inp.value = veldWaarde(f, start);
    if (f.t === 'select' && start[f.k] && !f.opts.includes(start[f.k])) { inp.append(h('option', { value: start[f.k], text: start[f.k] })); inp.value = start[f.k]; }
    inp.disabled = ro;
    inp.addEventListener('change', toonSignalen);
    inputs[f.k] = inp;
    return h('div', { class: 'field' + (f.wide ? ' wide' : '') }, h('label', { for: id, text: f.l + (f.req ? ' *' : '') }), inp, f.hint ? h('span', { class: 'hint', text: f.hint }) : null);
  };
  const sluit = () => { S.editing = null; root.replaceChildren(); document.removeEventListener('keydown', esc); };
  const esc = (e) => { if (e.key === 'Escape') sluit(); };
  document.addEventListener('keydown', esc);

  let bevestig = false;
  const delBtn = r && !ro ? h('button', { class: 'btn danger', type: 'button', text: 'Verwijderen' }) : null;
  if (delBtn) delBtn.addEventListener('click', async () => {
    if (!bevestig) { bevestig = true; delBtn.textContent = 'Zeker weten? Klik nog eens'; delBtn.classList.add('confirm'); return; }
    try { await S.db.collection('regels').doc(r.id).delete(); toast('Regel verwijderd. LMG kan hem zo nodig terugzetten.'); sluit(); } catch (e) { schrijfFout(e); }
  });
  const opslaan = h('button', { class: 'btn primary', type: 'submit', text: r ? 'Wijzigingen opslaan' : 'Offerte opslaan', disabled: ro });

  const form = h('form', { style: 'display:contents', novalidate: true },
    h('header', null, h('h2', { text: r ? (r.organisatie || 'Regel') : 'Nieuwe offerte' }), h('button', { class: 'btn', type: 'button', text: 'Sluiten', onclick: sluit })),
    h('div', { class: 'body' },
      ro ? h('div', { class: 'note', text: 'Je kunt deze regel bekijken, maar niet wijzigen.' }) : null,
      sigBox,
      groepen.map((g) => h('fieldset', null, h('legend', { text: g }), FIELDS.filter((f) => f.g === g).map(veld))),
      r && r.gewijzigd ? h('p', { class: 'sm', text: 'Laatst gewijzigd ' + new Date(r.gewijzigd).toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' }) + (r.gewijzigd_door ? ' door ' + r.gewijzigd_door : '') }) : null,
    ),
    h('footer', null, h('div', { class: 'bar' }, opslaan, h('button', { class: 'btn', type: 'button', text: 'Annuleren', onclick: sluit }), msg), delBtn),
  );
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (ro) return;
    const doc = {}; const fout = [];
    FIELDS.forEach((f) => {
      const v = leesVeld(f, inputs[f.k].value);
      if (Number.isNaN(v)) fout.push(f.l + ' is geen geldig getal');
      if (f.req && (v == null || v === '')) fout.push(f.l + ' is verplicht');
      doc[f.k] = Number.isNaN(v) ? null : v;
    });
    if (fout.length) { msg.className = 'msg err'; msg.textContent = fout[0]; inputs[FIELDS.find((f) => fout[0].startsWith(f.l)).k].focus(); return; }
    const nu = new Date().toISOString();
    doc.gewijzigd = nu; doc.gewijzigd_door = S.uid || null;
    doc.aangemaakt = r && r.aangemaakt ? r.aangemaakt : nu;
    doc.aangemaakt_door = r && r.aangemaakt_door ? r.aangemaakt_door : (S.uid || null);
    opslaan.disabled = true; msg.className = 'msg'; msg.textContent = 'Opslaan…';
    try {
      const ref = r ? S.db.collection('regels').doc(r.id) : S.db.collection('regels').doc();
      await ref.set(doc);
      toast(r ? 'Wijzigingen opgeslagen' : 'Offerte opgeslagen');
      sluit();
    } catch (err) { opslaan.disabled = false; msg.textContent = ''; schrijfFout(err); }
  });
  root.replaceChildren(h('div', { class: 'sheet-bg', onclick: sluit }), h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': r ? 'Regel bewerken' : 'Nieuwe offerte' }, form));
  toonSignalen();
  setTimeout(() => { const f = inputs[r ? 'status' : 'offertedatum']; if (f && !f.disabled) f.focus(); }, 30);
}
$('#nieuw').addEventListener('click', () => openSheet(null));

function vulLijsten() {
  const uniek = (k) => [...new Set(S.regels.map((r) => r[k]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'nl'));
  $('#lijst-sales').replaceChildren(...uniek('salesmedewerker').map((v) => h('option', { value: v })));
  $('#lijst-org').replaceChildren(...uniek('organisatie').map((v) => h('option', { value: v })));
  const codes = new Set([...uniek('campagnecode'), ...S.campagnes.map((c) => c.campagnecode).filter(Boolean)]);
  $('#lijst-codes').replaceChildren(...[...codes].sort().map((v) => h('option', { value: v })));
}

/* ===== Export ===== */
$('#export').addEventListener('click', async () => {
  const rows = zichtbareRegels();
  if (!rows.length) { toast('Er zijn geen regels om te exporteren.'); return; }
  const url = URL.createObjectURL(new Blob([naarCsv(FIELDS, rows)], { type: 'text/csv;charset=utf-8' }));
  const a = h('a', { href: url, download: 'verkoopregistratie-' + vandaag() + '.csv' });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
});

/* ===== KPI-dashboard ===== */
function doelenVoor(j) { return S.doelen[String(j)] || null; }

function prog(real, doel, doelNu, goedLaag) {
  const p = doel ? Math.min(1, real / doel) : 0;
  const bar = h('div', { class: 'prog' }, h('i', { style: 'width:' + (p * 100).toFixed(1) + '%;background:' + (goedLaag ? (real > doel ? 'var(--bad)' : 'var(--accent)') : 'var(--accent)') }));
  if (doelNu != null && doel) bar.append(h('b', { style: 'left:calc(' + Math.min(100, doelNu / doel * 100).toFixed(1) + '% - 1px)', title: 'Doel tot vandaag' }));
  return bar;
}

function renderDashboard() {
  const j = Number($('#d-jaar').value);
  const D = doelenVoor(j) || legeDoelen();
  const k = jaarKpi(S.regels, S.campagnes, j);
  const nu = vandaag();
  const som = (veld) => sum(D.maanden, (m) => num(m[veld]));
  const tn = (veld) => doelTotNu(D, j, veld, nu);
  const note = $('#d-note'); note.replaceChildren();
  if (!doelenVoor(j)) note.append(h('div', { class: 'note', text: 'Er zijn nog geen doelen voor ' + j + '. Vul ze in bij Doelen.' }));
  if (k.zonderType) note.append(h('div', { class: 'note', text: k.zonderType + (k.zonderType === 1 ? ' definitieve boeking telt' : ' definitieve boekingen tellen') + ' niet mee omdat Activiteitstype ontbreekt. Zet in Invoer het filter Alleen aandachtspunten aan om ze te vinden.' }));

  const kaart = (lbl, real, doel, doelNu, fmt, extra = {}) => {
    if (extra.deel != null) {
      const aandeel = extra.deel ? real / extra.deel : null;
      return h('div', { class: 'kpi' },
        h('span', { class: 'lbl', text: lbl }),
        h('span', { class: 'val', text: fmt(real) }),
        h('span', { class: 'sub', text: (aandeel != null ? fPct.format(aandeel) + ' van verhuur en F&B · ' : '') + 'samen doel ' + fmt(doel) + (doel ? ' · ' + fPct.format(extra.deel / doel) : '') }));
    }
    const pct = doel ? real / doel : null;
    const voor = doelNu != null && doelNu > 0 && doel ? real - doelNu : null;
    let sub = (extra.laag ? 'Plafond ' : 'Doel ') + fmt(doel);
    if (pct != null) sub += ' · ' + fPct.format(pct);
    const st = voor == null ? '' : extra.laag ? (real <= doelNu ? 'good' : 'badt') : (voor >= 0 ? 'good' : real >= doelNu * 0.9 ? 'warnt' : 'badt');
    return h('div', { class: 'kpi' + (extra.hero ? ' hero' : '') },
      h('span', { class: 'lbl', text: lbl }),
      h('span', { class: 'val', text: fmt(real) }),
      prog(real, doel, doelNu, extra.laag),
      h('span', { class: 'sub' }, sub, voor != null && doel ? h('span', { class: st, text: ' · ' + (extra.laag ? (real <= doelNu ? 'binnen budget' : 'boven budget tot nu') : (voor >= 0 ? 'voor op schema' : (extra.eur ? eurK(-voor) : fInt.format(-voor)) + ' achter op schema')) }) : null),
    );
  };
  const infoKaart = (lbl, val, sub) => h('div', { class: 'kpi info' }, h('span', { class: 'lbl', text: lbl }), h('span', { class: 'val', text: val }), h('span', { class: 'sub', text: sub }));
  const tnTot = tn('verhuur') + tn('kampen');
  $('#d-kpis').replaceChildren(
    kaart('Totale omzet', k.totaal, som('verhuur') + som('kampen'), tnTot, eurK, { hero: true, eur: true }),
    ...(doelGesplitst(D)
      ? [kaart('Zaalhuur', k.zaalhuur, som('zaalhuur'), tn('zaalhuur'), eurK, { eur: true }), kaart('F&B', k.fb, som('fb'), tn('fb'), eurK, { eur: true })]
      : [kaart('Zaalhuur', k.zaalhuur, som('verhuur'), tn('verhuur'), eurK, { eur: true, deel: k.verhuur }), kaart('F&B', k.fb, som('verhuur'), tn('verhuur'), eurK, { eur: true, deel: k.verhuur })]),
    kaart('Voetbalkampen', k.kampen, som('kampen'), tn('kampen'), eurK, { eur: true }),
    kaart('Vergaderboekingen', k.boekingen, som('boekingen'), tn('boekingen'), (v) => fInt.format(v)),
    kaart('Vergadergasten', k.gasten, som('gasten'), tn('gasten'), (v) => fInt.format(v)),
    kaart('Dagdelen', k.dagdelen, som('dagdelen'), tn('dagdelen'), (v) => fInt.format(v)),
    kaart('Herhaalboekingen', k.herhaal, num(D.jaar.herhaal), null, (v) => fInt.format(v)),
    kaart('24-uurs Meet, Eat & Sleep', k.arr24, num(D.jaar.arr24), null, (v) => fInt.format(v)),
    kaart('Omzet via campagnes', k.attributie, num(D.jaar.attributie), null, eurK, { eur: true }),
    kaart('Marketingkosten', k.marketingkosten, num(D.jaar.budget_plafond), tn('budget'), eurK, { laag: true }),
    infoKaart('Hotelovernachtingen', fInt.format(k.nachten), 'Ter inzicht, geen doel'),
    infoKaart('Omzet overnachtingen', eurK(k.hotel), 'Ter inzicht, telt niet mee in de doelen'),
  );

  const maanden = dashboardMaanden(S.regels, j);
  tekenOmzet(maanden, D);

  const t = $('#d-maanden');
  const hd = h('tr', null, h('th', { text: 'Maand' }), ['Zaalhuur', 'F&B'].map((x) => [h('th', { class: 'n', text: x }), h('th', { class: 'n hide-s', text: 'doel' })]), ['Verhuur/F&B', 'Kampen', 'Boekingen', 'Gasten', 'Dagdelen'].map((x) => [h('th', { class: 'n', text: x }), h('th', { class: 'n hide-s', text: 'doel' })]), h('th', { class: 'n hide-s', text: 'Events 20+' }), h('th', { class: 'n info', text: 'Overnachtingen' }), h('th', { class: 'n info', text: 'Omzet hotel' }));
  const inz = (v, fmt) => h('td', { class: 'n info', text: fmt(v) });
  const cel = (real, doel, fmt) => [h('td', { class: 'n ' + (doel && real >= doel ? 'good' : ''), text: fmt(real) }), h('td', { class: 'n sm hide-s', text: fmt(doel) })];
  const tot = { verhuur: 0, zaalhuur: 0, fb: 0, kampen: 0, boekingen: 0, gasten: 0, dagdelen: 0, events20: 0, nachten: 0, hotel: 0 };
  const body = maanden.map((m, i) => {
    const d = D.maanden[i];
    Object.keys(tot).forEach((x) => { tot[x] += m[x]; });
    return h('tr', null, h('td', { text: MAANDEN[i] }), cel(m.zaalhuur, num(d.zaalhuur), fEur.format), cel(m.fb, num(d.fb), fEur.format), cel(m.verhuur, num(d.verhuur), fEur.format), cel(m.kampen, num(d.kampen), fEur.format), cel(m.boekingen, num(d.boekingen), fInt.format), cel(m.gasten, num(d.gasten), fInt.format), cel(m.dagdelen, num(d.dagdelen), fInt.format), h('td', { class: 'n hide-s', text: fInt.format(m.events20) }), inz(m.nachten, fInt.format), inz(m.hotel, fEur.format));
  });
  body.push(h('tr', { class: 'tot' }, h('td', { text: 'Totaal' }), cel(tot.zaalhuur, som('zaalhuur'), fEur.format), cel(tot.fb, som('fb'), fEur.format), cel(tot.verhuur, som('verhuur'), fEur.format), cel(tot.kampen, som('kampen'), fEur.format), cel(tot.boekingen, som('boekingen'), fInt.format), cel(tot.gasten, som('gasten'), fInt.format), cel(tot.dagdelen, som('dagdelen'), fInt.format), h('td', { class: 'n hide-s', text: fInt.format(tot.events20) }), inz(tot.nachten, fInt.format), inz(tot.hotel, fEur.format)));
  t.replaceChildren(h('thead', null, hd), h('tbody', null, body));

  const arr = arrangementen(S.regels, j);
  $('#d-arr').replaceChildren(
    h('thead', null, h('tr', null, h('th', { text: 'Arrangement' }), h('th', { class: 'n', text: 'Boekingen' }), h('th', { class: 'n', text: 'Doel' }), h('th', { class: 'n', text: '%' }), h('th', { class: 'n hide-s', text: 'Personen' }))),
    h('tbody', null, ARRANGEMENT.map((a) => {
      const b = sum(arr[a].boekingen, (x) => x); const d = num((D.arrangementen || {})[a]);
      return h('tr', null, h('td', { text: ARR_KORT[a] }), h('td', { class: 'n', text: fInt.format(b) }), h('td', { class: 'n sm', text: d ? fInt.format(d) : '' }), h('td', { class: 'n', text: d ? fPct.format(b / d) : '' }), h('td', { class: 'n hide-s', text: fInt.format(sum(arr[a].personen, (x) => x)) }));
    })),
  );

  const acc = accounts(S.regels, j, nu);
  $('#d-acc').replaceChildren(
    h('thead', null, h('tr', null, h('th', { text: 'Categorie' }), h('th', { class: 'n', text: 'Accounts' }), h('th', { class: 'n', text: 'Boekingen per account' }), h('th', { class: 'n', text: 'Upsell' }), h('th', { class: 'n', text: 'Vervolg binnen 10 werkdagen' }))),
    h('tbody', null, acc.map((a) => h('tr', null,
      h('td', { text: a.categorie }), h('td', { class: 'n', text: fInt.format(a.accounts) }),
      h('td', { class: 'n ' + (a.categorie === 'Topaccount' && a.perAccount != null ? (a.perAccount >= 4 ? 'good' : '') : ''), text: a.perAccount == null ? '' : fDec.format(a.perAccount) }),
      h('td', { class: 'n', text: a.upsell == null ? '' : fPct.format(a.upsell) }),
      h('td', { class: 'n ' + (a.vervolgOpTijd == null || a.categorie === 'Klein account' ? '' : a.vervolgOpTijd >= 1 ? 'good' : 'badt'), text: a.vervolgOpTijd == null || a.categorie === 'Klein account' ? '' : fPct.format(a.vervolgOpTijd) + ' van ' + a.geweest }),
    ))),
  );
}

function tekenOmzet(maanden, D) {
  const box = $('#d-chart');
  $('#d-legend').replaceChildren(
    h('span', null, h('i', { class: 'sw', style: 'background:var(--accent)' }), 'Zaalhuur'),
    h('span', null, h('i', { class: 'sw', style: 'background:var(--c3)' }), 'F&B'),
    h('span', null, h('i', { class: 'sw', style: 'background:var(--c2)' }), 'Voetbalkampen'),
    h('span', null, h('i', { class: 'dashsw' }), 'Doel totaal'),
  );
  const W = box.clientWidth; if (!W) return;
  const H = 260, mb = 24, mt = 10;
  const data = maanden.map((m, i) => ({ i, v: m.verhuur, z: m.zaalhuur, f: m.verhuur - m.zaalhuur, k: m.kampen, d: num(D.maanden[i].verhuur) + num(D.maanden[i].kampen) }));
  const max = Math.max(1, ...data.map((x) => Math.max(x.v + x.k, x.d))) * 1.08;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('width', '100%'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Omzet per maand tegen doel');
  const el = (n, a, txt) => { const e = document.createElementNS(ns, n); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); if (txt != null) e.textContent = txt; svg.appendChild(e); return e; };
  const stap = (() => { const raw = max / 4; const p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 2.5, 5, 10].map((m) => m * p).find((s) => s >= raw); })();
  const ticks = []; for (let v = 0; v <= max; v += stap) ticks.push(v);
  box.replaceChildren(svg);
  let ml = 0; ticks.forEach((v) => { const t = el('text', { x: 0, y: 0 }, eurK(v)); ml = Math.max(ml, t.getComputedTextLength ? t.getComputedTextLength() : 40); t.remove(); });
  ml += 10;
  const y = (v) => H - mb - (v / (ticks[ticks.length - 1] || 1)) * (H - mb - mt);
  const bandW = (W - ml - 4) / 12; const bw = Math.min(32, bandW * 0.62);
  ticks.forEach((v) => { el('line', { x1: ml, x2: W - 4, y1: y(v), y2: y(v), stroke: 'var(--line)' }); el('text', { x: ml - 6, y: y(v), dy: '0.32em', 'text-anchor': 'end' }, eurK(v)); });
  const smal = bandW < 26;
  data.forEach((x) => {
    const cx = ml + bandW * x.i + bandW / 2;
    if (!smal || x.i % 2 === 0) el('text', { x: cx, y: H - 6, 'text-anchor': 'middle' }, MKORT[x.i]);
    if (x.z > 0) el('rect', { x: cx - bw / 2, y: y(x.z), width: bw, height: Math.max(0, y(0) - y(x.z)), fill: 'var(--accent)', rx: 3 });
    if (x.f > 0) el('rect', { x: cx - bw / 2, y: y(x.v), width: bw, height: Math.max(0, y(x.z) - y(x.v)), fill: 'var(--c3)', rx: 3 });
    if (x.k > 0) el('rect', { x: cx - bw / 2, y: y(x.v + x.k), width: bw, height: Math.max(0, y(x.v) - y(x.v + x.k)), fill: 'var(--c2)', rx: 3 });
    if (x.d > 0) el('line', { x1: cx - bw / 2 - 4, x2: cx + bw / 2 + 4, y1: y(x.d), y2: y(x.d), stroke: 'var(--fg)', 'stroke-width': 2, 'stroke-dasharray': '4 3' });
  });
  el('line', { x1: ml, x2: W - 4, y1: y(0), y2: y(0), stroke: 'var(--muted)' });
  const tip = h('div', { class: 'tip', hidden: true }); box.appendChild(tip);
  data.forEach((x) => {
    const r = el('rect', { x: ml + bandW * x.i, y: 0, width: bandW, height: H - mb, fill: 'transparent' });
    r.addEventListener('mousemove', () => {
      tip.replaceChildren(h('div', { class: 't', text: MAANDEN[x.i] }), h('div', { text: 'Zaalhuur: ' + fEur.format(x.z) }), h('div', { text: 'F&B: ' + fEur.format(x.f) }), h('div', { text: 'Voetbalkampen: ' + fEur.format(x.k) }), h('div', { text: 'Doel: ' + fEur.format(x.d) }), x.d ? h('div', { text: 'Gerealiseerd: ' + fPct.format((x.v + x.k) / x.d) }) : null);
      tip.hidden = false;
      const scale = box.clientWidth / W;
      const left = (ml + bandW * x.i + bandW / 2) * scale - tip.offsetWidth / 2;
      tip.style.left = Math.max(0, Math.min(box.clientWidth - tip.offsetWidth, left)) + 'px';
      tip.style.top = Math.max(0, y(Math.max(x.v + x.k, x.d)) * scale - tip.offsetHeight - 8) + 'px';
    });
    r.addEventListener('mouseleave', () => { tip.hidden = true; });
  });
}

/* ===== Salesactiviteit ===== */
function renderActiviteit() {
  $('#a-maand').setAttribute('aria-pressed', String(!S.perWeek));
  $('#a-week').setAttribute('aria-pressed', String(S.perWeek));
  const j = Number($('#a-jaar').value);
  const rows = activiteit(S.regels, j, S.perWeek);
  const t = $('#a-tabel');
  const kol = [['Uitgebracht', 'Uitgebracht'], ['Optie', 'Optie'], ['Afgewezen', 'Afgewezen'], ['Definitief', 'Definitief']];
  const head = h('tr', null, h('th', { text: S.perWeek ? 'Week' : 'Maand' }), h('th', { class: 'n', text: 'Offertes' }), kol.map(([, l]) => h('th', { class: 'n hide-s', text: l })), h('th', { class: 'n', text: 'Offertewaarde' }), h('th', { class: 'n', text: 'Definitieve omzet' }), h('th', { class: 'n hide-s', text: 'Overnachtingen' }), h('th', { class: 'n hide-s', text: 'Personen def.' }));
  if (!rows.length) { t.replaceChildren(h('thead', null, head), h('tbody', null, h('tr', null, h('td', { colspan: 10, class: 'sm', text: 'Geen offertes met een offertedatum in ' + j + '.' })))); }
  else {
    const tot = rows.reduce((a, r) => { Object.keys(r).forEach((k) => { if (k !== 'periode') a[k] = (a[k] || 0) + r[k]; }); return a; }, {});
    const lijn = (lbl, r, cls) => h('tr', { class: cls || null }, h('td', { text: lbl }), h('td', { class: 'n', text: fInt.format(r.totaal) }), kol.map(([k]) => h('td', { class: 'n hide-s', text: fInt.format(r[k]) })), h('td', { class: 'n', text: fEur.format(r.offertewaarde) }), h('td', { class: 'n', text: fEur.format(r.omzet) }), h('td', { class: 'n hide-s', text: fInt.format(r.overnachtingen) }), h('td', { class: 'n hide-s', text: fInt.format(r.personen) }));
    t.replaceChildren(h('thead', null, head), h('tbody', null, rows.map((r) => lijn(S.perWeek ? 'Week ' + r.periode : MAANDEN[r.periode - 1], r)), lijn('Totaal', tot, 'tot')));
  }
  const groep = (sel, veld, lijst, kop) => {
    const g = perGroep(S.regels, j, veld, lijst).filter((x) => x.offertes > 0);
    $(sel).replaceChildren(
      h('thead', null, h('tr', null, h('th', { text: kop }), h('th', { class: 'n', text: 'Offertes' }), h('th', { class: 'n', text: 'Definitief' }), h('th', { class: 'n', text: 'Conversie' }), h('th', { class: 'n', text: 'Omzet' }))),
      h('tbody', null, g.length ? g.map((x) => h('tr', null, h('td', { text: x.naam }), h('td', { class: 'n', text: fInt.format(x.offertes) }), h('td', { class: 'n', text: fInt.format(x.definitief) }), h('td', { class: 'n', text: x.conversie == null ? '' : fPct.format(x.conversie) }), h('td', { class: 'n', text: fEur.format(x.omzet) }))) : h('tr', null, h('td', { colspan: 5, class: 'sm', text: 'Nog niets in ' + j + '.' }))),
    );
  };
  groep('#a-doel', 'doelgroep', DOELGROEP, 'Doelgroep');
  groep('#a-herk', 'herkomst', HERKOMST, 'Herkomst');
}

/* ===== Marketing ===== */
function renderMarketing() {
  const j = Number($('#m-jaar').value);
  $('#m-nieuw').disabled = !magSchrijven();
  const D = doelenVoor(j) || legeDoelen();
  const camp = S.campagnes.filter((c) => num(c.jaar) === j).sort((a, b) => num(a.maand) - num(b.maand) || String(a.campagnecode || '').localeCompare(String(b.campagnecode || '')));
  const cijfers = new Map(camp.map((c) => [c.id, campagneCijfers(c, S.regels)]));
  const k = jaarKpi(S.regels, S.campagnes, j);
  const omzetCamp = sum(camp, (c) => cijfers.get(c.id).omzet);
  const kpi = (lbl, val, sub, cls) => h('div', { class: 'kpi' }, h('span', { class: 'lbl', text: lbl }), h('span', { class: 'val ' + (cls || ''), text: val }), sub ? h('span', { class: 'sub', text: sub }) : null);
  $('#m-kpis').replaceChildren(
    kpi('Marketingkosten ' + j, eurK(k.marketingkosten), num(D.jaar.budget_plafond) ? 'Plafond ' + eurK(num(D.jaar.budget_plafond)) + ' · ' + fPct.format(k.marketingkosten / num(D.jaar.budget_plafond)) + ' gebruikt' : null, num(D.jaar.budget_plafond) && k.marketingkosten > num(D.jaar.budget_plafond) ? 'badt' : ''),
    kpi('Omzet via campagnes', eurK(k.attributie), num(D.jaar.attributie) ? 'Doel ' + eurK(num(D.jaar.attributie)) : null),
    kpi('ROAS', k.marketingkosten ? fDec.format(omzetCamp / k.marketingkosten) + '×' : '–', 'Geboekte omzet per euro marketing, doel minimaal 3,0×'),
  );
  const codesMetRegel = new Set(S.campagnes.map((c) => String(c.campagnecode || '').trim()).filter(Boolean));
  const los = [...new Set(S.regels.filter((r) => jaarVan(r.offertedatum) === j || jaarVan(r.bijeenkomst) === j).map((r) => String(r.campagnecode || '').trim()).filter((c) => c && !codesMetRegel.has(c)))];
  $('#m-los').replaceChildren(los.length ? h('div', { class: 'note', text: 'Deze campagnecodes staan bij offertes, maar hebben nog geen campagneregel: ' + los.join(', ') + '. Voeg ze toe, of controleer de schrijfwijze.' }) : '');

  const tbl = $('#m-tabel');
  if (tbl.contains(document.activeElement)) return;
  const ro = !magSchrijven();
  const upd = (c, veld, parse) => async (e) => {
    const v = parse ? parse(e.target.value) : e.target.value.trim() || null;
    if (Number.isNaN(v)) { toast('Vul een geldig getal in.'); return; }
    try { await S.db.collection('campagnes').doc(c.id).update({ [veld]: v, gewijzigd: new Date().toISOString() }); } catch (err) { schrijfFout(err); }
  };
  const eurIn = (s) => leesVeld({ t: 'eur' }, s);
  const sel = (c, veld, opts, lbl) => h('select', { 'aria-label': lbl, disabled: ro, onchange: upd(c, veld, veld === 'maand' ? (v) => Number(v) : null) }, h('option', { value: '', text: '' }), opts.map(([v, l]) => h('option', { value: String(v), text: l, selected: String(c[veld] ?? '') === String(v) })));
  tbl.replaceChildren(
    h('thead', null, h('tr', null, ['Maand', 'Campagnecode', 'Kanaal', 'Doelgroep', 'Kosten'].map((x) => h('th', { text: x })), ['Leads', 'Boekingen', 'Omzet', '€ per lead', '€ per boeking', 'ROAS'].map((x) => h('th', { class: 'n', text: x })), h('th', { text: 'Notitie' }), h('th', { text: '' }))),
    h('tbody', null, camp.map((c) => {
      const x = cijfers.get(c.id);
      let bev = false;
      const del = ro ? null : h('button', { class: 'btn danger', type: 'button', text: 'Verwijder', 'aria-label': 'Verwijder campagneregel' });
      if (del) del.addEventListener('click', async () => { if (!bev) { bev = true; del.textContent = 'Zeker?'; del.classList.add('confirm'); return; } try { await S.db.collection('campagnes').doc(c.id).delete(); } catch (e) { schrijfFout(e); } });
      return h('tr', null,
        h('td', null, sel(c, 'maand', MKORT.map((m, i) => [i + 1, m]), 'Maand')),
        h('td', null, h('input', { type: 'text', value: c.campagnecode || '', list: 'lijst-codes', 'aria-label': 'Campagnecode', disabled: ro, style: 'min-width:110px', onchange: upd(c, 'campagnecode') })),
        h('td', null, sel(c, 'kanaal', KANAAL.map((v) => [v, v]), 'Kanaal')),
        h('td', null, sel(c, 'doelgroep', DOELGROEP.map((v) => [v, v]), 'Doelgroep')),
        h('td', null, h('input', { type: 'text', inputmode: 'decimal', value: c.kosten == null ? '' : String(c.kosten).replace('.', ','), 'aria-label': 'Werkelijke kosten', disabled: ro, style: 'min-width:90px;text-align:right', onchange: upd(c, 'kosten', eurIn) })),
        h('td', { class: 'n', text: fInt.format(x.leads) }), h('td', { class: 'n', text: fInt.format(x.boekingen) }), h('td', { class: 'n', text: fEur.format(x.omzet) }),
        h('td', { class: 'n', text: x.cpl == null ? '' : fEur2.format(x.cpl) }), h('td', { class: 'n', text: x.cpb == null ? '' : fEur.format(x.cpb) }),
        h('td', { class: 'n ' + (x.roas == null ? '' : x.roas >= 3 ? 'good' : 'warnt'), text: x.roas == null ? '' : fDec.format(x.roas) + '×' }),
        h('td', null, h('input', { type: 'text', value: c.notitie || '', 'aria-label': 'Notitie', disabled: ro, style: 'min-width:140px', onchange: upd(c, 'notitie') })),
        h('td', null, del));
    })),
  );
  $('#m-leeg').replaceChildren(camp.length ? '' : h('div', { class: 'empty' }, h('strong', { text: 'Nog geen campagnes voor ' + j }), h('span', { text: 'Voeg per campagne per maand een regel toe met de kosten. Leads en boekingen worden er automatisch bij gezocht.' })));
}
$('#m-nieuw').addEventListener('click', async () => {
  if (!magSchrijven()) return;
  const j = Number($('#m-jaar').value);
  const m = j === NU_JAAR ? new Date().getMonth() + 1 : 1;
  try { await S.db.collection('campagnes').doc().set({ jaar: j, maand: m, campagnecode: null, kanaal: null, doelgroep: null, kosten: null, notitie: null, gewijzigd: new Date().toISOString() }); toast('Campagneregel toegevoegd'); }
  catch (e) { schrijfFout(e); }
});

/* ===== Doelen ===== */
const DOELKOL = [['zaalhuur', 'Zaalhuur', 'eur'], ['fb', 'F&B', 'eur'], ['kampen', 'Voetbalkampen', 'eur'], ['boekingen', 'Vergaderboekingen', 'int'], ['gasten', 'Vergadergasten', 'int'], ['dagdelen', 'Dagdelen', 'int'], ['budget', 'Marketingbudget', 'eur']];
const JAARKOL = [['herhaal', 'Herhaalboekingen', 'int'], ['arr24', '24-uurs arrangementen', 'int'], ['attributie', 'Omzet via campagnes', 'eur'], ['budget_plafond', 'Marketingbudget jaarplafond', 'eur']];
let doelenVuil = false;
function renderDoelen() {
  const box = $('#g-inhoud');
  if (box.contains(document.activeElement) || doelenVuil) return;
  const j = Number($('#g-jaar').value);
  const D = doelenVoor(j);
  const ro = !magSchrijven();
  $('#g-opslaan').disabled = ro || !D;
  $('#g-uitleg').textContent = ro ? 'Dit zijn de vaste doelstellingen. Alleen wie mag bewerken kan ze aanpassen.' : 'Pas hier de vaste doelstellingen aan en klik op Doelen opslaan. Het dashboard rekent er direct mee.';
  if (!S.ready) { box.replaceChildren(h('div', { class: 'empty', text: 'Gegevens laden…' })); return; }
  if (!D) {
    box.replaceChildren(h('div', { class: 'card' }, h('div', { class: 'empty' }, h('strong', { text: 'Nog geen doelen voor ' + j }), ro ? null : h('button', { class: 'btn primary', type: 'button', text: 'Doelen voor ' + j + ' aanmaken', onclick: async () => { try { await S.db.collection('doelen').doc(String(j)).set(legeDoelen()); } catch (e) { schrijfFout(e); } } }))));
    return;
  }
  const inp = (v, t, lbl, pad) => h('input', { class: 'doel-in', type: 'text', inputmode: 'decimal', value: v ? (t === 'eur' ? String(v).replace('.', ',') : String(v)) : '', 'aria-label': lbl, disabled: ro, 'data-pad': pad, 'data-t': t, oninput: () => { doelenVuil = true; } });
  const maandTabel = h('table', null,
    h('thead', null, h('tr', null, h('th', { text: 'Maand' }), DOELKOL.slice(0, 2).map(([, l]) => h('th', { class: 'n', text: l })), h('th', { class: 'n', text: 'Samen' }), DOELKOL.slice(2).map(([, l]) => h('th', { class: 'n', text: l })))),
    h('tbody', null, MAANDEN.map((m, i) => {
      const samen = h('td', { class: 'n sm', text: fEur.format(num(D.maanden[i].verhuur)) });
      const rij = h('tr', null, h('td', { text: m }), DOELKOL.slice(0, 2).map(([k, l, t]) => h('td', null, inp(D.maanden[i][k], t, l + ' ' + m, 'maanden.' + i + '.' + k))), samen, DOELKOL.slice(2).map(([k, l, t]) => h('td', null, inp(D.maanden[i][k], t, l + ' ' + m, 'maanden.' + i + '.' + k))));
      // Samen rekent mee tijdens het typen
      rij.addEventListener('input', () => { const w = (k) => { const v = leesVeld({ t: 'eur' }, rij.querySelector('[data-pad="maanden.' + i + '.' + k + '"]').value); return Number.isNaN(v) ? 0 : num(v); }; const s = w('zaalhuur') + w('fb'); samen.textContent = fEur.format(s || num(D.maanden[i].verhuur)); });
      return rij;
    }),
      h('tr', { class: 'tot' }, h('td', { text: 'Totaal' }), DOELKOL.slice(0, 2).map(([k]) => h('td', { class: 'n', text: fEur.format(sum(D.maanden, (x) => num(x[k]))) })), h('td', { class: 'n', text: fEur.format(sum(D.maanden, (x) => num(x.verhuur))) }), DOELKOL.slice(2).map(([k, , t]) => h('td', { class: 'n', text: (t === 'eur' ? fEur : fInt).format(sum(D.maanden, (x) => num(x[k]))) })))));
  const open = nogNietVerdeeld(D);
  const oud = open
    ? h('div', { class: 'note', text: (open === 12 ? 'Het doel voor verhuur en F&B is nog één bedrag per maand (kolom Samen). ' : 'In ' + open + (open === 1 ? ' maand' : ' maanden') + ' is het doel voor verhuur en F&B nog niet verdeeld (kolom Samen). ') + 'Verdeel het over zaalhuur en F&B en klik op Doelen opslaan. Een maand die nog niet verdeeld is, houdt het oude bedrag. Zodra alle maanden verdeeld zijn, krijgen Zaalhuur en F&B op het dashboard elk hun eigen doel.' })
    : null;
  const jaarVelden = h('fieldset', null, h('legend', { text: 'Jaardoelen' }), JAARKOL.map(([k, l, t]) => h('div', { class: 'field' }, h('label', { text: l }), inp(D.jaar[k], t, l, 'jaar.' + k))));
  const arrVelden = h('fieldset', null, h('legend', { text: 'Arrangementen (boekingen per jaar)' }), ARRANGEMENT.map((a) => h('div', { class: 'field' }, h('label', { text: ARR_KORT[a] }), inp((D.arrangementen || {})[a], 'int', ARR_KORT[a], 'arr.' + ARRANGEMENT.indexOf(a)))));
  box.replaceChildren(h('div', { class: 'card' }, h('h3', { text: 'Maanddoelen ' + j }), oud, h('div', { class: 'tbl-wrap' }, maandTabel)), jaarVelden, arrVelden);
}
$('#g-jaar').addEventListener('change', () => { doelenVuil = false; renderDoelen(); });
$('#g-opslaan').addEventListener('click', async () => {
  const j = Number($('#g-jaar').value);
  const D = JSON.parse(JSON.stringify(doelenVoor(j) || legeDoelen()));
  D.arrangementen = D.arrangementen || {};
  let fout = null;
  document.querySelectorAll('#g-inhoud input[data-pad]').forEach((el) => {
    const v = leesVeld({ t: el.dataset.t === 'eur' ? 'eur' : 'int' }, el.value);
    if (Number.isNaN(v)) { fout = fout || el; return; }
    const val = v == null ? 0 : v;
    const p = el.dataset.pad.split('.');
    if (p[0] === 'maanden') D.maanden[Number(p[1])][p[2]] = val;
    else if (p[0] === 'jaar') D.jaar[p[1]] = val;
    else if (p[0] === 'arr') D.arrangementen[ARRANGEMENT[Number(p[1])]] = val;
  });
  if (fout) { fout.focus(); toast('Er staat een ongeldig getal in ' + fout.getAttribute('aria-label') + '.'); return; }
  D.maanden.forEach((m) => { if (maandGesplitst(m)) m.verhuur = num(m.zaalhuur) + num(m.fb); });
  D.gewijzigd = new Date().toISOString();
  try { await S.db.collection('doelen').doc(String(j)).set(D); doelenVuil = false; toast('Doelen ' + j + ' opgeslagen'); renderAll(); }
  catch (e) { schrijfFout(e); }
});

/* ===== Alles tekenen ===== */
function renderStatus() {
  const c = $('#conn');
  if (S.failed) { c.className = 'badge warn'; c.textContent = 'Niet verbonden'; return; }
  if (!S.ready) { c.className = 'badge'; c.textContent = 'Gegevens laden…'; return; }
  const tijd = S.geladen ? ' · bijgewerkt ' + S.geladen.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '';
  const wie = S.naam ? 'Ingelogd als ' + S.naam + ' · ' : '';
  if (S.canWrite === false) { c.className = 'badge'; c.textContent = wie + 'Alleen lezen' + tijd; }
  else { c.className = 'badge ok'; c.textContent = wie + 'Opgeslagen' + tijd; }
}
function renderAll() {
  renderStatus();
  if (S.tab === 'invoer') renderInvoer();
  if (S.tab === 'dashboard') renderDashboard();
  if (S.tab === 'activiteit') renderActiviteit();
  if (S.tab === 'marketing') renderMarketing();
  if (S.tab === 'doelen') renderDoelen();
}
let rzT; window.addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(() => { if (S.tab === 'dashboard') renderDashboard(); }, 150); });

/* ===== Start ===== */
const begin = document.getElementById(location.hash.slice(1));
if (begin && begin.classList.contains('page')) toonTab(begin.id); else renderAll();

/* ===== Importeren uit Excel of CSV ===== */
/* Excel lezen met het meegeleverde read-excel-file.min.js, CSV met een eigen lezer */
function leesCsv(tekst) {
  const rijen = []; let rij = []; let veld = ''; let q = false;
  const sep = (tekst.split(/\r?\n/)[0] || '').split(';').length >= (tekst.split(/\r?\n/)[0] || '').split(',').length ? ';' : ',';
  for (let i = 0; i < tekst.length; i++) {
    const ch = tekst[i];
    if (q) { if (ch === '"') { if (tekst[i + 1] === '"') { veld += '"'; i++; } else q = false; } else veld += ch; continue; }
    if (ch === '"' && veld === '') q = true;
    else if (ch === sep) { rij.push(veld); veld = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && tekst[i + 1] === '\n') i++; rij.push(veld); rijen.push(rij); rij = []; veld = ''; }
    else veld += ch;
  }
  if (veld !== '' || rij.length) { rij.push(veld); rijen.push(rij); }
  // Waarden die bij export een ' kregen tegen formules: die weer weghalen. Komma-getallen naar getal.
  return rijen.filter((r) => r.some((v) => v !== '')).map((r) => r.map((v) => {
    if (v === '') return null;
    if (/^'[=+\-@\t\r]/.test(v)) return v.slice(1);
    if (/^-?\d+(,\d+)?$/.test(v)) return Number(v.replace(',', '.'));
    return v;
  }));
}
async function leesWerkboek(f) {
  if (/\.csv$/i.test(f.name)) {
    const tekst = new TextDecoder('utf-8').decode(await f.arrayBuffer()).replace(/^﻿/, '');
    return { SheetNames: ['CSV'], rijen: { CSV: leesCsv(tekst) } };
  }
  if (typeof window.readXlsxFile !== 'function') throw new Error('laden mislukt');
  const bladen = await window.readXlsxFile(f);
  const wb = { SheetNames: [], rijen: {} };
  (Array.isArray(bladen) ? bladen : []).forEach((b) => { wb.SheetNames.push(b.sheet); wb.rijen[b.sheet] = (b.data || []).filter((r) => r && r.some((v) => v != null && v !== '')); });
  return wb;
}

const norm = (s) => String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();
const KOP_NAAR_VELD = new Map(FIELDS.map((f) => [norm(f.l), f]));

function naarDatum(v) {
  if (v == null || v === '') return null;
  const iso = (d) => d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
  if (typeof v === 'number') { if (v > 20000 && v < 80000) return iso(new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 864e5)); return NaN; }
  if (v instanceof Date) return isNaN(v) ? NaN : iso(new Date(v.getTime() + 12 * 36e5));
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return m[1] + '-' + m[2].padStart(2, '0') + '-' + m[3].padStart(2, '0');
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (m) return m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0');
  return NaN;
}
function naarWaarde(f, v) {
  if (v == null || (typeof v === 'string' && v.trim() === '')) return null;
  if (f.t === 'date') return naarDatum(v);
  if (f.t === 'int' || f.t === 'eur') { if (typeof v === 'number') return f.t === 'int' ? Math.round(v) : Math.round(v * 100) / 100; return leesVeld(f, v); }
  return String(v).trim();
}
const regelSleutel = (r) => (r.offertenummer != null && String(r.offertenummer).trim() !== '' ? 'nr:' + norm(r.offertenummer) : 'x:' + norm(r.organisatie) + '|' + (r.offertedatum || '') + '|' + num(r.offertewaarde));
const campSleutel = (c) => num(c.jaar) + '|' + num(c.maand) + '|' + norm(c.campagnecode);

function zoekKopRij(rijen, moetHebben) {
  for (let i = 0; i < Math.min(rijen.length, 30); i++) {
    const n = (rijen[i] || []).map(norm);
    if (moetHebben.every((k) => n.includes(k))) return i;
  }
  return -1;
}

function leesBestand(wb) {
  const res = { regels: [], campagnes: [], fouten: [], waarschuwingen: [], bladen: [] };
  // Offertes: het blad met de kolommen Offertedatum en Organisatie
  for (const naam of wb.SheetNames) {
    const rijen = wb.rijen[naam];
    const k = zoekKopRij(rijen, ['offertedatum', 'organisatie']);
    if (k < 0) continue;
    res.bladen.push(naam);
    const kolommen = (rijen[k] || []).map((c) => KOP_NAAR_VELD.get(norm(c)) || null);
    const onbekend = (rijen[k] || []).filter((c, i) => c != null && String(c).trim() !== '' && !kolommen[i]);
    if (onbekend.length) res.waarschuwingen.push('Kolommen die niet worden ingelezen: ' + onbekend.join(', '));
    for (let i = k + 1; i < rijen.length; i++) {
      const rij = rijen[i] || [];
      const r = {}; const probl = [];
      kolommen.forEach((f, ci) => {
        if (!f) return;
        const v = naarWaarde(f, rij[ci]);
        if (Number.isNaN(v)) { probl.push(f.l + ' "' + rij[ci] + '" niet herkend'); r[f.k] = null; }
        else r[f.k] = v;
        if (f.t === 'select' && r[f.k] && !f.opts.includes(r[f.k])) res.waarschuwingen.push('Rij ' + (i + 1) + ': ' + f.l + ' "' + r[f.k] + '" staat niet in de keuzelijst');
      });
      if (!Object.values(r).some((v) => v != null && v !== '')) continue;
      if (!r.organisatie || !r.offertedatum) { res.fouten.push('Rij ' + (i + 1) + ' overgeslagen: ' + (!r.organisatie ? 'Organisatie' : 'Offertedatum') + ' ontbreekt'); continue; }
      if (!r.status) res.waarschuwingen.push('Rij ' + (i + 1) + ': geen status, ingelezen als Uitgebracht');
      FIELDS.forEach((f) => { if (!(f.k in r)) r[f.k] = null; });
      if (!r.status) r.status = 'Uitgebracht';
      probl.forEach((p) => res.waarschuwingen.push('Rij ' + (i + 1) + ': ' + p));
      r._rij = i + 1;
      res.regels.push(r);
    }
    break;
  }
  // Campagnes: het blad met Campagnecode en Werkelijke kosten
  for (const naam of wb.SheetNames) {
    const rijen = wb.rijen[naam];
    const k = zoekKopRij(rijen, ['campagnecode', 'werkelijke kosten']);
    if (k < 0) continue;
    const kop = (rijen[k] || []).map(norm);
    const idx = (n) => kop.indexOf(n);
    const kc = { jaar: idx('jaar'), maand: idx('maand'), code: idx('campagnecode'), kanaal: idx('kanaal'), doelgroep: idx('doelgroep'), kosten: idx('werkelijke kosten'), notitie: idx('notitie') };
    for (let i = k + 1; i < rijen.length; i++) {
      const rij = rijen[i] || [];
      const code = kc.code >= 0 && rij[kc.code] != null ? String(rij[kc.code]).trim() : '';
      const jaar = kc.jaar >= 0 ? Number(rij[kc.jaar]) : NaN;
      const maand = kc.maand >= 0 ? Number(rij[kc.maand]) : NaN;
      if (!code && !Number.isFinite(jaar)) continue;
      if (!code || !Number.isFinite(jaar) || !(maand >= 1 && maand <= 12)) { res.fouten.push(naam + ' rij ' + (i + 1) + ' overgeslagen: jaar, maand of campagnecode ontbreekt'); continue; }
      const kosten = kc.kosten >= 0 ? naarWaarde({ t: 'eur' }, rij[kc.kosten]) : null;
      res.campagnes.push({ jaar, maand, campagnecode: code, kanaal: kc.kanaal >= 0 && rij[kc.kanaal] ? String(rij[kc.kanaal]).trim() : null, doelgroep: kc.doelgroep >= 0 && rij[kc.doelgroep] ? String(rij[kc.doelgroep]).trim() : null, kosten: Number.isNaN(kosten) ? null : kosten, notitie: kc.notitie >= 0 && rij[kc.notitie] ? String(rij[kc.notitie]).trim() : null });
    }
    break;
  }
  return res;
}

async function schrijfMetRetry(fn) {
  try { return await fn(); }
  catch (e) {
    if (e && (e.code === 'unavailable' || e.code === 'resource_exhausted')) { await new Promise((r) => setTimeout(r, 800 + Math.random() * 800)); return fn(); }
    throw e;
  }
}

function openImport() {
  if (!magSchrijven()) return;
  const root = $('#sheet-root');
  let plan = null; let bezig = false;
  const sluit = () => { if (bezig) return; root.replaceChildren(); document.removeEventListener('keydown', esc); };
  const esc = (e) => { if (e.key === 'Escape') sluit(); };
  document.addEventListener('keydown', esc);
  const file = h('input', { type: 'file', id: 'imp-bestand', accept: '.xlsx,.xlsm,.csv' });
  const drop = h('label', { for: 'imp-bestand', class: 'card', style: 'border-style:dashed;text-align:center;cursor:pointer;justify-items:center;padding:28px 18px' },
    h('strong', { text: 'Kies het Excel-bestand of sleep het hierheen' }),
    h('span', { class: 'sm', text: 'Het verkoopbestand met het tabblad Invoer (.xlsx), of een CSV die van deze pagina komt.' }), file);
  const updBox = h('label', { class: 'sm', style: 'display:inline-flex;gap:6px;align-items:center' }, h('input', { type: 'checkbox', id: 'imp-bijwerken' }), 'Regels met een bestaand offertenummer bijwerken in plaats van overslaan');
  const uitkomst = h('div', { style: 'display:grid;gap:12px' });
  const msg = h('p', { class: 'msg', 'aria-live': 'polite' });
  const go = h('button', { class: 'btn primary', type: 'button', text: 'Importeren', disabled: true });

  const toonPlan = () => {
    uitkomst.replaceChildren();
    if (!plan) { go.disabled = true; return; }
    const bijwerken = $('#imp-bijwerken').checked;
    const bestaand = new Map(S.regels.map((r) => [regelSleutel(r), r]));
    const gezien = new Set();
    plan.nieuw = []; plan.update = []; plan.dubbel = 0; plan.inBestandDubbel = 0;
    plan.res.regels.forEach((r) => {
      const k = regelSleutel(r);
      if (gezien.has(k)) { plan.inBestandDubbel++; return; }
      gezien.add(k);
      const b = bestaand.get(k);
      if (!b) plan.nieuw.push(r);
      else if (bijwerken && k.startsWith('nr:')) plan.update.push({ id: b.id, oud: b, r });
      else plan.dubbel++;
    });
    const bestaandC = new Set(S.campagnes.map(campSleutel));
    plan.campNieuw = plan.res.campagnes.filter((c) => !bestaandC.has(campSleutel(c)));
    const totaal = plan.nieuw.length + plan.update.length + plan.campNieuw.length;
    const lijn = (n, t, t1) => h('li', null, h('strong', { text: fInt.format(n) }), ' ' + (n === 1 && t1 ? t1 : t));
    uitkomst.append(h('div', { class: 'card' },
      h('h3', { text: 'Gevonden in ' + plan.naam }),
      h('ul', { style: 'margin:0;padding-left:18px;display:grid;gap:4px' },
        lijn(plan.nieuw.length, 'nieuwe offertes', 'nieuwe offerte'),
        plan.update.length ? lijn(plan.update.length, 'bestaande offertes worden bijgewerkt', 'bestaande offerte wordt bijgewerkt') : null,
        plan.dubbel ? lijn(plan.dubbel, 'offertes staan er al en worden overgeslagen', 'offerte staat er al en wordt overgeslagen') : null,
        plan.inBestandDubbel ? lijn(plan.inBestandDubbel, 'dubbele regels in het bestand, alleen de eerste telt', 'dubbele regel in het bestand, alleen de eerste telt') : null,
        plan.res.campagnes.length ? lijn(plan.campNieuw.length, 'nieuwe campagneregels' + (plan.res.campagnes.length - plan.campNieuw.length ? ' (' + (plan.res.campagnes.length - plan.campNieuw.length) + ' bestaan al)' : ''), 'nieuwe campagneregel' + (plan.res.campagnes.length - plan.campNieuw.length ? ' (' + (plan.res.campagnes.length - plan.campNieuw.length) + ' bestaan al)' : '')) : null,
        plan.res.fouten.length ? lijn(plan.res.fouten.length, 'rijen overgeslagen', 'rij overgeslagen') : null)));
    if (plan.nieuw.length) {
      const vb = plan.nieuw.slice(0, 5);
      uitkomst.append(h('div', { class: 'card', style: 'padding:0' }, h('div', { class: 'tbl-wrap' }, h('table', null,
        h('thead', null, h('tr', null, ['Rij', 'Offertedatum', 'Organisatie', 'Status', 'Bijeenkomst'].map((x) => h('th', { text: x })), h('th', { class: 'n', text: 'Bedrag' }))),
        h('tbody', null, vb.map((r) => h('tr', null, h('td', { class: 'sm', text: String(r._rij) }), h('td', { text: fDatum(r.offertedatum) }), h('td', { text: r.organisatie }), h('td', null, h('span', { class: 'st ' + r.status, text: r.status })), h('td', { text: fDatum(r.bijeenkomst) }), h('td', { class: 'n', text: fEur.format(omzetVan(r) || num(r.offertewaarde)) }))),
          plan.nieuw.length > 5 ? h('tr', null, h('td', { colspan: 6, class: 'sm', text: 'en nog ' + (plan.nieuw.length - 5) + ' meer' })) : null)))));
    }
    const meld = [...plan.res.fouten, ...plan.res.waarschuwingen];
    if (meld.length) uitkomst.append(h('details', { class: 'note' }, h('summary', { text: meld.length + (meld.length === 1 ? ' opmerking' : ' opmerkingen') + ' over het bestand' }), h('ul', { class: 'sigs', style: 'color:var(--fg)' }, meld.slice(0, 40).map((m) => h('li', { text: m })), meld.length > 40 ? h('li', { text: 'en nog ' + (meld.length - 40) + ' meer' }) : null)));
    go.disabled = totaal === 0;
    go.textContent = totaal ? 'Importeer ' + fInt.format(totaal) + (totaal === 1 ? ' regel' : ' regels') : 'Niets te importeren';
  };

  const verwerk = async (f) => {
    if (!f) return;
    plan = null; toonPlan(); msg.className = 'msg'; msg.textContent = 'Bestand lezen…';
    try {
      const wb = await leesWerkboek(f);
      const res = leesBestand(wb);
      if (!res.bladen.length && !res.campagnes.length) { msg.className = 'msg err'; msg.textContent = 'Geen tabblad gevonden met de kolommen Offertedatum en Organisatie. Is dit het verkoopbestand?'; return; }
      plan = { res, naam: f.name };
      msg.textContent = '';
      toonPlan();
    } catch (e) {
      msg.className = 'msg err';
      msg.textContent = e && e.message === 'laden mislukt' ? 'Het onderdeel om Excel te lezen kon niet laden. Ververs de pagina en probeer het opnieuw.' : 'Dit bestand kon niet worden gelezen. Sla het op als .xlsx (Excel-werkmap) en probeer het opnieuw.';
    }
  };
  file.addEventListener('change', () => verwerk(file.files[0]));
  drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.style.borderColor = 'var(--accent)'; });
  drop.addEventListener('dragleave', () => { drop.style.borderColor = ''; });
  drop.addEventListener('drop', (e) => { e.preventDefault(); drop.style.borderColor = ''; verwerk(e.dataTransfer.files[0]); });
  updBox.querySelector('input').addEventListener('change', toonPlan);

  go.addEventListener('click', async () => {
    if (!plan || bezig) return;
    bezig = true; go.disabled = true; file.disabled = true;
    // Alles wat weg moet, in blokken naar de opslag
    const B = { regels: '18437301543', campagnes: '18437302199' };
    const lit = (x) => JSON.stringify(String(x));
    const DOOR = '@@DOOR@@';
    let taken = [
      ...plan.nieuw.map((r) => ({ bord: 'regels', sleutel: regelSleutel(r), nieuw: true, naam: r.organisatie || '(geen naam)', vals: (() => { const w = regelWaarden(r); delete w.name; w.gewijzigd_door = DOOR; return w; })() })),
      ...plan.update.map((u) => ({ bord: 'regels', id: u.id, vals: { ...regelWaarden(u.r), gewijzigd_door: DOOR } })),
      ...plan.campNieuw.map((c) => ({ bord: 'campagnes', sleutel: 'c:' + campSleutel(c), nieuw: true, naam: c.campagnecode, vals: (() => { const w = campagneWaarden(c); delete w.name; w.gewijzigd_door = DOOR; return w; })() })),
    ];
    const totaal = taken.length;
    let klaar = 0, blok = 50, fouten = 0;
    const zin = (t, i) => (t.nieuw
      ? 'i' + i + ': create_item(board_id: ' + B[t.bord] + ', item_name: ' + lit(t.naam) + ', column_values: ' + lit(JSON.stringify(t.vals)) + ', create_labels_if_missing: true) { id }'
      : 'u' + i + ': change_multiple_column_values(board_id: ' + B[t.bord] + ', item_id: ' + t.id + ', column_values: ' + lit(JSON.stringify(t.vals)) + ', create_labels_if_missing: true) { id }');
    msg.className = 'msg';
    while (taken.length) {
      const deel = taken.slice(0, blok);
      msg.textContent = 'Bezig: ' + klaar + ' van ' + totaal + ' opgeslagen…';
      try {
        await api('bulk', { mutatie: deel.map(zin).join(' ') });
        taken = taken.slice(deel.length); klaar += deel.length; fouten = 0;
      } catch (e) {
        if (e && (e.code === 'invalid_argument' || e.code === 'geen_toegang')) { bezig = false; schrijfFout(e); sluit(); return; }
        fouten++;
        if (fouten > 4) break;
        // Een deel kan toch zijn opgeslagen: opnieuw inlezen en wat er al staat overslaan
        try { await laadAlles(); } catch (e2) { /* volgende poging */ }
        const er = new Set([...S.regels.map(regelSleutel), ...S.campagnes.map((c) => 'c:' + campSleutel(c))]);
        const voor = taken.length;
        taken = taken.filter((t) => !(t.nieuw && er.has(t.sleutel)));
        klaar += voor - taken.length;
        blok = Math.max(1, Math.floor(blok / 2));
      }
    }
    bezig = false;
    try { await laadAlles(); } catch (e) { /* toon wat er is */ }
    vulLijsten(); renderAll();
    if (taken.length) {
      msg.className = 'msg err';
      msg.textContent = klaar + ' regels opgeslagen, ' + taken.length + ' niet. Kies het bestand opnieuw: wat er al staat wordt dan overgeslagen.';
      file.disabled = false; file.value = ''; plan = null; toonPlan();
      return;
    }
    toast(klaar + (klaar === 1 ? ' regel' : ' regels') + ' geïmporteerd');
    sluit();
  });

  root.replaceChildren(h('div', { class: 'sheet-bg', onclick: sluit }), h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Importeren' },
    h('header', null, h('h2', { text: 'Importeren uit Excel' }), h('button', { class: 'btn', type: 'button', text: 'Sluiten', onclick: sluit })),
    h('div', { class: 'body' },
      h('p', { class: 'help', style: 'margin:0', text: 'Leest het tabblad Invoer, en als het er is ook het tabblad Marketing. Je ziet eerst wat er gevonden is; er wordt pas iets opgeslagen als je op Importeren klikt. Offertes die er al staan (zelfde offertenummer, of zelfde organisatie, datum en waarde) worden niet dubbel ingevoerd.' }),
      drop, updBox, uitkomst),
    h('footer', null, h('div', { class: 'bar' }, go, h('button', { class: 'btn', type: 'button', text: 'Annuleren', onclick: sluit }), msg))));
}
$('#import').addEventListener('click', openImport);

/* ===== Opslag via de koppeling ===== */
const API = 'https://hook.eu1.make.com/o18dr6qje67w26p3jbo6omt4h8mnbqu9';
const CAMP_NIEUW = 'Nieuwe campagne';
const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* geen opslag */ } } };

async function api(actie, velden) {
  const body = new URLSearchParams({ code: S.code || '', actie, ...(velden || {}) });
  let res, tekst;
  try { res = await fetch(API, { method: 'POST', body }); tekst = await res.text(); }
  catch (e) { throw { code: 'unavailable', message: 'Geen verbinding' }; }
  let json = null; try { json = JSON.parse(tekst); } catch (e) { /* geen json */ }
  if (res.status === 403) throw { code: json && json.fout === 'alleen lezen' ? 'invalid_argument' : 'geen_toegang', message: 'Geen toegang' };
  if (!res.ok || !json) throw { code: 'unavailable', message: 'Onverwacht antwoord: ' + String(tekst).slice(0, 120) };
  if (json.data && json.data.errors) throw { code: 'unavailable', message: (json.data.errors[0] || {}).message || 'Opslaan mislukt' };
  return json;
}

/* Item uit de opslag naar regel, campagne of doelen */
const cv = (it) => { const o = {}; (it.column_values || []).forEach((c) => { o[c.id] = c.text == null || c.text === '' ? null : c.text; }); return o; };
const getal = (t) => { if (t == null) return null; const n = Number(t); return Number.isFinite(n) ? n : null; };
function itemNaarRegel(it) {
  const c = cv(it); const r = { id: String(it.id), organisatie: it.name, gewijzigd: it.updated_at || null, gewijzigd_door: c.gewijzigd_door || null };
  FIELDS.forEach((f) => { if (f.k === 'organisatie') return; const v = c[f.k]; r[f.k] = (f.t === 'int' || f.t === 'eur') ? getal(v) : (v == null ? null : v); });
  return r;
}
function itemNaarCampagne(it) {
  const c = cv(it);
  return { id: String(it.id), campagnecode: it.name === CAMP_NIEUW ? null : it.name, jaar: getal(c.jaar), maand: getal(c.maand), kanaal: c.kanaal, doelgroep: c.doelgroep, kosten: getal(c.kosten), notitie: c.notitie };
}
function itemNaarDoelen(it) {
  const c = cv(it); let raw = null; try { raw = JSON.parse(c.doelen || ''); } catch (e) { raw = null; }
  const D = legeDoelen(); D._id = String(it.id);
  if (raw && Array.isArray(raw.m)) {
    raw.m.forEach((m, i) => { if (D.maanden[i]) ['verhuur', 'kampen', 'boekingen', 'gasten', 'dagdelen', 'budget', 'zaalhuur', 'fb'].forEach((k, j) => { D.maanden[i][k] = num(m[j]); }); });
    const j = raw.j || []; D.jaar = { herhaal: num(j[0]), arr24: num(j[1]), attributie: num(j[2]), budget_plafond: num(j[3]) };
    ARRANGEMENT.forEach((a, i) => { D.arrangementen[a] = num((raw.a || [])[i]); });
  }
  return D;
}
function doelenNaarTekst(D) {
  return JSON.stringify({ m: D.maanden.map((m) => ['verhuur', 'kampen', 'boekingen', 'gasten', 'dagdelen', 'budget', 'zaalhuur', 'fb'].map((k) => num(m[k]))), j: [num(D.jaar.herhaal), num(D.jaar.arr24), num(D.jaar.attributie), num(D.jaar.budget_plafond)], a: ARRANGEMENT.map((a) => num((D.arrangementen || {})[a])) });
}

/* Velden naar kolomwaarden */
function regelWaarden(d) {
  const w = {};
  FIELDS.forEach((f) => {
    if (f.k === 'organisatie' || !(f.k in d)) return;
    const v = d[f.k];
    if (v == null || v === '') { w[f.k] = ''; return; }
    if (f.t === 'date') w[f.k] = { date: v };
    else if (f.t === 'select') w[f.k] = { label: v };
    else if (f.t === 'textarea') w[f.k] = { text: v };
    else if (f.t === 'int' || f.t === 'eur') w[f.k] = String(v);
    else w[f.k] = String(v);
  });
  if ('organisatie' in d) w.name = d.organisatie || '(geen naam)';
  return w;
}
function campagneWaarden(d) {
  const w = {};
  ['jaar', 'maand', 'kosten'].forEach((k) => { if (k in d) w[k] = d[k] == null || d[k] === '' ? '' : String(d[k]); });
  ['kanaal', 'doelgroep'].forEach((k) => { if (k in d) w[k] = d[k] ? { label: d[k] } : ''; });
  if ('notitie' in d) w.notitie = d.notitie || '';
  if ('campagnecode' in d) w.name = d.campagnecode || CAMP_NIEUW;
  return w;
}

/* Kleine laag met dezelfde vorm als voorheen: collection().doc().set/update/delete */
function bewaarLokaal(col, it) {
  if (col === 'regels') { const r = itemNaarRegel(it); const i = S.regels.findIndex((x) => x.id === r.id); if (i >= 0) S.regels[i] = r; else S.regels.push(r); }
  if (col === 'campagnes') { const c = itemNaarCampagne(it); const i = S.campagnes.findIndex((x) => x.id === c.id); if (i >= 0) S.campagnes[i] = c; else S.campagnes.push(c); }
  if (col === 'doelen') { S.doelen[String(it.name)] = itemNaarDoelen(it); }
  S.regels = S.regels.slice(); S.campagnes = S.campagnes.slice();
  vulLijsten(); renderAll();
}
const itemUit = (json) => { const d = json.data && json.data.data; return d && (d.create_item || d.change_multiple_column_values); };
function maakDb() {
  const coll = (col) => ({
    doc(id) {
      const bestaand = id != null && (col !== 'doelen' || S.doelen[String(id)]);
      const itemId = col === 'doelen' ? (S.doelen[String(id)] || {})._id : id;
      const waarden = (d) => (col === 'regels' ? regelWaarden(d) : col === 'campagnes' ? campagneWaarden(d) : { doelen: { text: doelenNaarTekst(d) } });
      const schrijf = async (d) => {
        const w = waarden(d); w.gewijzigd_door = '';
        let json;
        if (bestaand && itemId) json = await api('wijzig', { bord: col, id: itemId, waarden: JSON.stringify(w) });
        else {
          const naam = col === 'doelen' ? String(id) : (w.name || (col === 'campagnes' ? CAMP_NIEUW : '(geen naam)'));
          delete w.name;
          json = await api('nieuw', { bord: col, naam, waarden: JSON.stringify(w) });
        }
        const it = itemUit(json); if (!it) throw { code: 'unavailable', message: 'Geen item terug' };
        bewaarLokaal(col, it);
      };
      return {
        id,
        set: schrijf,
        update: schrijf,
        async delete() {
          await api('verwijder', { bord: col, id: itemId });
          if (col === 'regels') S.regels = S.regels.filter((x) => x.id !== itemId);
          if (col === 'campagnes') S.campagnes = S.campagnes.filter((x) => x.id !== itemId);
          vulLijsten(); renderAll();
        },
      };
    },
  });
  return { collection: coll };
}

async function laadAlles() {
  const json = await api('lezen');
  const d = json.data && json.data.data;
  if (!d) throw { code: 'unavailable', message: 'Geen gegevens' };
  const pagina = (b) => (b && b[0] && b[0].items_page) || { items: [], cursor: null };
  let pr = pagina(d.r); let items = pr.items.slice(); let cursor = pr.cursor; let n = 0;
  while (cursor && n < 20) { const m = await api('meer', { cursor }); const p = m.data && m.data.data && m.data.data.next_items_page; if (!p) break; items = items.concat(p.items); cursor = p.cursor; n++; }
  let pc = pagina(d.c); let citems = pc.items.slice(); cursor = pc.cursor; n = 0;
  while (cursor && n < 10) { const m = await api('meer', { cursor }); const p = m.data && m.data.data && m.data.data.next_items_page; if (!p) break; citems = citems.concat(p.items); cursor = p.cursor; n++; }
  S.regels = items.map(itemNaarRegel);
  S.campagnes = citems.map(itemNaarCampagne);
  const dl = {}; pagina(d.d).items.forEach((it) => { dl[String(it.name).trim()] = itemNaarDoelen(it); });
  S.doelen = dl;
  S.rol = json.rol; S.naam = json.naam || null;
  S.canWrite = json.rol === 'invullen';
  S.geladen = new Date();
  S.ready = true; S.failed = false;
}

/* ===== Inloggen en verversen ===== */
function toonLogin(fout) {
  const root = $('#sheet-root');
  const inp = h('input', { type: 'password', id: 'login-code', autocomplete: 'current-password', 'aria-label': 'Toegangscode' });
  const msg = h('p', { class: 'msg' + (fout ? ' err' : ''), text: fout || '' });
  const knop = h('button', { class: 'btn primary', type: 'submit', text: 'Openen' });
  const form = h('form', { class: 'card', style: 'max-width:420px;margin:12vh auto 0;gap:14px', novalidate: true },
    h('h2', { text: 'Verkoopregistratie Business Point' }),
    h('p', { class: 'help', style: 'margin:0', text: 'Vul de toegangscode in die je van LMG hebt gekregen.' }),
    h('div', { class: 'field' }, h('label', { for: 'login-code', text: 'Toegangscode' }), inp), msg, h('div', { class: 'bar' }, knop));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = inp.value.trim(); if (!code) return;
    S.code = code; knop.disabled = true; msg.className = 'msg'; msg.textContent = 'Controleren…';
    try { await laadAlles(); bewaarLogin(code); root.replaceChildren(); vulLijsten(); renderAll(); }
    catch (err) { S.code = null; knop.disabled = false; msg.className = 'msg err'; msg.textContent = err.code === 'geen_toegang' ? 'Deze code klopt niet.' : 'Er ging iets mis bij het laden. Probeer het opnieuw.'; }
  });
  root.replaceChildren(h('div', { class: 'sheet-bg', style: 'background:var(--bg)' }), h('div', { style: 'position:fixed;inset:0;z-index:22;overflow:auto;padding:16px' }, form));
  setTimeout(() => inp.focus(), 30);
}

const LOGIN_DAGEN = 30;
function bewaarLogin(code) { ls.set('bp-login', JSON.stringify({ code, tot: Date.now() + LOGIN_DAGEN * 864e5 })); }
function leesLogin() {
  let o = null; try { o = JSON.parse(ls.get('bp-login') || 'null'); } catch (e) { o = null; }
  if (!o || typeof o.code !== 'string' || !(o.tot > Date.now())) { ls.set('bp-login', null); return null; }
  return o.code;
}
async function vernieuw(stil) {
  if (!S.code || vernieuw.bezig) return;
  vernieuw.bezig = true;
  if (!stil) { $('#conn').className = 'badge'; $('#conn').textContent = 'Vernieuwen…'; }
  try { await laadAlles(); vulLijsten(); }
  catch (e) {
    if (e.code === 'geen_toegang') { uitloggen('Deze code werkt niet meer. Vraag LMG om de nieuwe code.'); vernieuw.bezig = false; return; }
    toast('Vernieuwen lukte niet. Controleer de verbinding.');
  }
  vernieuw.bezig = false;
  renderAll();
}
function uitloggen(melding) {
  ls.set('bp-login', null); S.code = null; S.naam = null; S.ready = false; S.regels = []; S.campagnes = []; S.doelen = {};
  renderAll(); toonLogin(melding || '');
}
$('#vernieuw').addEventListener('click', () => vernieuw(false));
$('#uitloggen').addEventListener('click', () => uitloggen());

S.db = maakDb();
(async () => {
  ls.set('bp-code', null);
  const code = leesLogin();
  if (!code) { toonLogin(); return; }
  S.code = code;
  try { await laadAlles(); vulLijsten(); renderAll(); }
  catch (e) { S.code = null; toonLogin(e.code === 'geen_toegang' ? 'Deze code werkt niet meer. Vraag LMG om de nieuwe code.' : 'Laden lukte niet. Vul je code opnieuw in of probeer het later.'); }
})();
