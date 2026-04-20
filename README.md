# Zivildienst Job Bewertungsseite

Eine moderne Web-Anwendung zum Bewerten und Rezensieren von Zivildienst-Stellen. Nutzer können:
- Eine Jobnummer eingeben
- Bewertungen (1-5 Sterne) hinterlassen
- Kommentare zu ihren Erfahrungen schreiben
- Bewertungen und Kommentare von anderen Nutzern sehen

## Features

✨ **Benutzerfreundliche Oberfläche**
- Responsive Design für Desktop und Mobile
- Deutsche Benutzeroberfläche
- Intuitive Sternen-Bewertung (1-5)
- Echtzeit-Aktualisierung von Kommentaren

⚡ **Schnelle Verarbeitung**
- Express.js Backend
- SQLite Datenbank
- Einfache REST API
- CORS aktiviert

🔒 **Datenvalidierung**
- Minimale Kommentarlänge (10 Zeichen)
- Maximale Kommentarlänge (1000 Zeichen)
- Bewertungswerte zwischen 1-5
- HTML-Escaping für Sicherheit

## Installation

```bash
npm install
```

## Starten

```bash
npm start
```

Die Anwendung läuft dann auf `http://localhost:3000`

## API Endpoints

### GET /api/ratings/:jobNumber
Ruft alle Bewertungen für eine bestimmte Jobnummer ab.

**Beispiel:**
```bash
curl http://localhost:3000/api/ratings/12345
```

### POST /api/ratings
Erstellt eine neue Bewertung für eine Jobnummer.

**Request Body:**
```json
{
  "jobNumber": "12345",
  "rating": 5,
  "comment": "Großartige Erfahrung!"
}
```

**Beispiel:**
```bash
curl -X POST http://localhost:3000/api/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "jobNumber": "12345",
    "rating": 5,
    "comment": "Großartige Erfahrung!"
  }'
```

## Technologie-Stack

- **Backend:** Node.js, Express.js
- **Datenbank:** SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Styling:** CSS mit modernem Gradient Design

## Struktur

```
├── server.js           # Express-Server und API
├── public/
│   ├── index.html     # HTML Struktur
│   ├── style.css      # Styling
│   ├── script.js      # Frontend-Logik
├── package.json       # Abhängigkeiten
└── README.md          # Diese Datei
```

## Verwendung

1. Öffne die Website im Browser
2. Gib eine Jobnummer ein (z.B. "12345")
3. Klick auf "Bewertungen anzeigen"
4. Wähle eine Bewertung (1-5 Sterne)
5. Schreib einen Kommentar
6. Klick "Bewertung abschicken"
7. Sieh die Bewertung zusammen mit anderen Kommentaren für diese Jobnummer

## Datenschutz

Die Anwendung speichert:
- Jobnummer
- Bewertung (1-5)
- Kommentartext
- Erstellungsdatum

Es werden keine persönlichen Daten erfasst.
