const http = require('http'); // Importiere das HTTP-Modul
const url = require('url');   // Importiere das URL-Modul, um Anfragen zu parsen
const mariadb = require('mariadb'); // Importiere das MariaDB-Modul

// MariaDB Verbindungspool einrichten
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'schoolUser',
    password: 'passwort123',
    database: 'school',
    connectionLimit: 1
});

// Erstelle einen HTTP-Server
const server = http.createServer(async (req, res) => {
    // Setze die CORS-Header, um Cross-Origin-Anfragen zu erlauben
    res.setHeader('Access-Control-Allow-Origin', '*'); // Erlaube Anfragen von jeder Domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Erlaube GET, POST und OPTIONS-Anfragen
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Erlaube die Content-Type-Header

    // Überprüfe, ob die Anfrage eine 'OPTIONS'-Anfrage ist (CORS Preflight-Anfrage)
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // Sende eine leere Antwort für die Preflight-Anfrage
        res.end();
        return;
    }

    // Parse die URL der Anfrage
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Setze den Content-Type der Antwort auf JSON
    res.setHeader('Content-Type', 'application/json');

    // Überprüfe, ob der Pfad '/get-data' ist und die Methode 'GET' ist
    if (path === '/get-data' && req.method === 'GET') {
        let conn;
        try {
            // Verbindung zur MariaDB herstellen und Daten abrufen
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM kunden");

            // Sende die Daten als JSON zurück
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        } catch (err) {
            // Fehlerbehandlung
            console.error(err);
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Fehler beim Abrufen der Daten" }));
        } finally {
            if (conn) conn.release(); // Verbindung zurückgeben
        }
    } else {
        // 404 Not Found für unbekannte Routen
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Starte den Server auf Port 3000
server.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
