# Business Point verkoopregistratie

Webpagina waarop het salesteam van Business Point Roosendaal offertes, boekingen en campagnes invult, met een KPI-dashboard dat realisatie tegen de doelen zet. Gemaakt door LMG strategie+creatie.

- De pagina bestaat uit `index.html` (opmaak), `app.js` (werking) en `read-excel-file.min.js` (Excel inlezen, MIT-licentie). Er is geen bouwstap en de pagina laadt geen scripts van andere sites.
- Gegevens worden opgeslagen via een Make-koppeling. De pagina bevat geen wachtwoorden of toegangscodes: die worden in Make gecontroleerd. Iedere persoon heeft een eigen code; LMG beheert die in de Make-gegevensopslag "Business Point toegang (codes)".
- Wijzigen: pas `index.html` of `app.js` aan en push naar `main`. Verhoog na een wijziging in `app.js` ook het nummer achter `app.js?v=` in `index.html`, anders kan de browser nog even de oude versie gebruiken. GitHub Pages zet de nieuwe versie binnen een minuut online.
