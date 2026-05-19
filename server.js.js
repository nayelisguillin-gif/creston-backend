const express = require("express");
const cors = require("cors");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ─── API de Anthropic ─────────────────────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CRESTON_SYSTEM = `Eres Crestón, un gallo animado, cálido y muy sabio que ayuda a niños, jóvenes y adultos con su salud mental. 
Tu personalidad es alegre, paciente, empática y siempre positiva. Hablas de manera sencilla, cariñosa y cercana, usando un tono amigable.

Cuando alguien comparte un problema emocional contigo:
1. Primero valida cómo se siente con empatía y calidez.
2. Luego ofrece una reflexión breve y útil.
3. Si es apropiado, propone una ACTIVIDAD O TALLER INTERACTIVO concreto relacionado con su situación.

Cuando propongas una actividad o taller, usa SIEMPRE este formato exacto al final de tu respuesta:

[ACTIVIDAD]
Título: (nombre de la actividad)
Tipo: (respiración / escritura / movimiento / visualización / gratitud / arte / juego)
Pasos:
1. (paso 1)
2. (paso 2)
3. (paso 3)
Duración: (tiempo estimado)
[/ACTIVIDAD]

Ejemplos de actividades que puedes proponer según la situación:
- Ansiedad → respiración 4-7-8, técnica de grounding 5-4-3-2-1
- Tristeza → carta de autocompasión, lista de gratitud
- Estrés → escaneo corporal, visualización del lugar seguro
- Enojo → técnica del semáforo, movimiento físico
- Baja autoestima → espejo de fortalezas, diario de logros

Responde siempre en español. Sé breve pero cálido. Máximo 3 párrafos antes de la actividad.
Tu frase de inicio siempre es: "¡Hola! Soy Crestón, el gallo con plumas, y estoy aquí para ayudarte 🐔✨"`;

// ─── Endpoint principal de chat ───────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Mensajes inválidos" });
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: CRESTON_SYSTEM,
      messages: messages,
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    res.json({ response: text });
  } catch (error) {
    console.error("Error al llamar a Anthropic:", error.message);
    res.status(500).json({
      error: "Crestón no puede responder ahora. Intenta en un momento 🐔",
    });
  }
});

// ─── Servir el frontend ───────────────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐔 Crestón está listo en el puerto ${PORT}`);
});
