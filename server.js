// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fetch from "node-fetch";

const app = express();

// Basic hardening + CORS so TaleSpire/Symbiote can call you from anywhere
app.use(helmet());
app.use(cors({ origin: "*", methods: ["GET"] }));
app.use(morgan("tiny"));

/**
 * GET /api?character=<id>
 * Forwards to:
 * https://character-service.dndbeyond.com/character/v5/character/<id>
 */
app.get("/api", async (req, res) => {
  const id = (req.query.character || "").toString().trim();

  // Validate the incoming character ID
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      error: "Invalid or missing ?character=<numeric id> query parameter."
    });
  }

  const target = `https://character-service.dndbeyond.com/character/v5/character/${id}`;

  try {
    const r = await fetch(target, {
      headers: {
        // Be polite; some services dislike the default UA
        "User-Agent": "TS-PartyView-LocalProxy/1.0",
        "Accept": "application/json"
      }
    });

    // Relay status codes from the upstream if possible
    const status = r.status;
    const contentType = r.headers.get("content-type") || "application/json";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "no-store"); // Always fetch fresh data
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Stream JSON (or text) back to the symbiote
    const body = await r.text();
    return res.status(status).send(body);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(502).json({
      error: "Failed to fetch from D&D Beyond character service.",
      detail: String(err)
    });
  }
});

// Health check (optional)
app.get("/healthz", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Party View proxy listening at http://localhost:${PORT}/api`);
  console.log(`Example: http://localhost:${PORT}/api?character=48690485`);
});
