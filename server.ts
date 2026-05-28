import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { TODOS_SELLOS, TONOS, KinData, Sello, Tono, OraculoDestino } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const api_key = process.env.GEMINI_API_KEY;

if (api_key) {
  try {
    ai = new GoogleGenAI({
      apiKey: api_key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API:", err);
  }
} else {
  console.log("GEMINI_API_KEY not found in environment; running in offline/static reading mode.");
}

// -------------------------------------------------------------------------
// Helper: Mayan Math
// -------------------------------------------------------------------------

// Helper to find a Sello by ID
function getSelloById(id: number): Sello {
  let adjustedId = id;
  if (id === 0) adjustedId = 20;
  const s = TODOS_SELLOS.find((item) => item.id === adjustedId);
  if (!s) return TODOS_SELLOS[0]; // fallback
  return s;
}

// Helper to find a Tono by ID
function getTonoById(id: number): Tono {
  const t = TONOS.find((item) => item.id === id);
  if (!t) return TONOS[0]; // fallback
  return t;
}

// Helper to get index within same color group (0 to 4)
function getSelloColorGroupIndex(sello: Sello): number {
  // Let's filter other sellos of same color and find current index
  const group = TODOS_SELLOS.filter((s) => s.color === sello.color);
  return group.findIndex((s) => s.id === sello.id);
}

// Helper to get Sello by color and index in group (0 to 4)
function getSelloByColorAndGroupIndex(color: string, groupIdx: number): Sello {
  const group = TODOS_SELLOS.filter((s) => s.color === color);
  const idx = (groupIdx % 5 + 5) % 5;
  return group[idx];
}

// Calculated Guide Seal (Sello Guía) based on Law of Time (Dreamspell)
// Mathematically, the color matches, and the group index is shifted by Tone:
// - Tone 1, 6, 11 (Magnetic, Rhythmic, Spectral) -> Shift = 0
// - Tone 2, 7, 12 (Lunar, Resonant, Crystal) -> Shift = +1 (i.e. next)
// - Tone 3, 8, 13 (Electric, Galactic, Cosmic) -> Shift = +2 (i.e. +2)
// - Tone 4, 9 (Self-Existing, Solar) -> Shift = +3 (i.e. +3)
// - Tone 5, 10 (Overtone, Planetary) -> Shift = +4 (i.e. +4 / -1)
function getGuideSello(sello: Sello, toneId: number): Sello {
  let shift = 0;
  if (toneId === 1 || toneId === 6 || toneId === 11) {
    shift = 0;
  } else if (toneId === 2 || toneId === 7 || toneId === 12) {
    shift = 1;
  } else if (toneId === 3 || toneId === 8 || toneId === 13) {
    shift = 2;
  } else if (toneId === 4 || toneId === 9) {
    shift = 3;
  } else if (toneId === 5 || toneId === 10) {
    shift = 4;
  }

  const currentIdx = getSelloColorGroupIndex(sello);
  return getSelloByColorAndGroupIndex(sello.color, currentIdx + shift);
}

// Math for Mayan Oracle (Antipode, Analog, Occult)
// - Antipode: opposite sign (+10 seals, same tone group, polar channel)
// - Analog: partner in balance (19 - Sello_ID_0_Indexed)
// - Occult: hidden helper (21 - Sello_ID)
function calculateOracle(sello: Sello, tono: Tono): OraculoDestino {
  // Analog: same color pair, sum of 0-based ids is 19
  // Where Sol is 19 (or 20), Dragon is 0 (or 1)
  const destId0 = (sello.id === 20) ? 19 : (sello.id - 1);
  const analogId0 = (19 - destId0) % 20;
  const analogId = analogId0 + 1;

  // Antipode: opposite (+10)
  const antipodeId = ((sello.id - 1 + 10) % 20) + 1;

  // Occult: sum is 21
  const occultId = 21 - sello.id;

  return {
    destino: sello,
    tonoDestino: tono,
    guia: getGuideSello(sello, tono.id),
    analogo: getSelloById(analogId),
    antipoda: getSelloById(antipodeId),
    oculto: getSelloById(occultId),
  };
}

// Full Kin calculation from sequential day count reference
// Anchor: July 26, 2013 -> Kin 164 (Yellow Galactic Seed)
// Dreamspell year has 365 days, skipping Feb 29 (Hunab Ku 0.0) from the count.
export function getKinFromDate(dateStr: string): KinData {
  const parts = dateStr.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid birth date format. Must be YYYY-MM-DD.");
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const targetUTC = new Date(Date.UTC(year, month, day));

  if (isNaN(targetUTC.getTime())) {
    throw new Error("Invalid birth date format.");
  }

  const anchorDate = new Date(Date.UTC(2013, 6, 26)); // July 26, 2013 UTC

  let daysDiff = 0;
  if (targetUTC.getTime() >= anchorDate.getTime()) {
    let current = new Date(anchorDate.getTime());
    while (current.getTime() < targetUTC.getTime()) {
      current.setUTCDate(current.getUTCDate() + 1);
      // Skip Feb 29 in Dreamspell day counts
      if (current.getUTCMonth() === 1 && current.getUTCDate() === 29) {
        continue;
      }
      daysDiff++;
    }
  } else {
    let current = new Date(anchorDate.getTime());
    while (current.getTime() > targetUTC.getTime()) {
      // Step backwards by 1 day
      current.setUTCDate(current.getUTCDate() - 1);
      
      // If the day we landed on is Feb 29, skip it (Hunab Ku) by stepping back another day
      if (current.getUTCMonth() === 1 && current.getUTCDate() === 29) {
        current.setUTCDate(current.getUTCDate() - 1);
      }
      
      // Since Feb 29 doesn't count in Tzolkin, we only decrement daysDiff for valid Dreamspell days
      daysDiff--;
    }
  }

  // Kin calculation: Kin 164 was at daysDiff = 0
  let kIdx = (163 + daysDiff) % 260;
  if (kIdx < 0) kIdx += 260;
  const kin = kIdx + 1;

  const tIdx = (kin - 1) % 13;
  const sIdx = (kin - 1) % 20;

  const tono = getTonoById(tIdx + 1);
  const sello = getSelloById(sIdx + 1);

  // Onda Encantada: Sello that initiated the current wavespell (the Sello on Tone 1)
  // Let's trace back (tono.id - 1) days back in Kin
  let oeKinIdx = (kin - tono.id + 1 + 260) % 260;
  if (oeKinIdx === 0) oeKinIdx = 260;
  const oeSelloIdx = (oeKinIdx - 1) % 20;
  const oeSello = getSelloById(oeSelloIdx + 1);
  const oeNum = (oeKinIdx - 1) % 13 + 1; // Always Tono 1, but we can report its number

  const oraculo = calculateOracle(sello, tono);

  return {
    kin,
    sello,
    tono,
    oraculo,
    ondaEncantadaNum: oeNum,
    ondaEncantadaSello: oeSello,
  };
}

// -------------------------------------------------------------------------
// Off-line / Static Interpretations (Beautiful & Deep Translation fallbacks)
// -------------------------------------------------------------------------
function getStaticReading(kinData: KinData, curKinData?: KinData): any {
  const { seal, tone, oraculo } = { seal: kinData.sello, tone: kinData.tono, oraculo: kinData.oraculo };

  let interpretacionPersonalizada = `Tu firma galáctica es **Kin ${kinData.kin}: ${seal.nombre} ${tone.nombre}**. Como portador de esta signatura cósmica, tu misión en este plano terrestre está profundamente ligada al poder del sello **${seal.nombreMaya}** guiado por el tono **${tone.nombreMaya}**.\n\nSientes el llamado sagrado de **${seal.palabrasClave.join(", ")}** en todas tus empresas. Eres una fuerza de tipo **${seal.direccion}**, lo que indica que diriges tu energía cardinalmente hacia metas de iniciación y consolidación en el plano físico e invisible.`;

  let misionDeVida = `Tu arquetipo cósmico es **${seal.arquetipo}**. Tu camino evolutivo consiste en integrar la acción de **"${seal.accion}"** con el fin de manifestar plenamente **"${seal.poder}"** en armonía con tu esencia más profunda, que es **"${seal.esencia}"**.\n\nUsa la vibración del Tono **${tone.nombre}** para **${tone.descripcionCorta}** Puedes superar los desafíos espirituales alineándote con tu Sello Guía: **${oraculo.guia.nombre}**, que te orienta hacia la maestría emocional y cósmica.`;

  let consejoSignatura = `Aprovecha la energía de tu Sello Análogo (**${oraculo.analogo.nombre}**), que te brinda un balance natural y te apoya de manera intuitiva compartiendo tu mismo tono de creación. Recuerda integrar las lecciones de tu Sello Antípoda (**${oraculo.antipoda.nombre}**), el cual representa tu mayor polo de aprendizaje, tu zona de fricción saludable que te obliga a madurar espiritualmente. Ríndete ante los regalos alquímicos de tu Sello Oculto (**${oraculo.oculto.nombre}**), cuyas cualidades mágicas florecen cuando estás en alineamiento silencioso.`;

  let diario = "Sintoniza tu respiración hoy con la respiración cósmica. Dedica unos minutos de silencio a visualizar el glifo de tu sello en el centro de tu pecho.";

  let result: any = {
    interpretacionPersonalizada,
    misionDeVida,
    consejoSignatura,
    oraculoInsighs: {
      guia: `El Sello Guía **${oraculo.guia.nombre}** actúa como tu protector espiritual y tu faro de alineamiento para tomar decisiones.`,
      analogo: `El Sello Análogo **${oraculo.analogo.nombre}** es tu compañero cósmico que te nutre en tus momentos de duda o estancamiento.`,
      antipoda: `El Sello Antípoda **${oraculo.antipoda.nombre}** te desafía para que despiertes tu verdadero potencial. No es un enemigo, sino tu maestro de balance.`,
      oculto: `El Sello Oculto **${oraculo.oculto.nombre}** te regala el factor sorpresa y las habilidades inconscientes mágicas que emergen espontáneamente.`
    },
    consejosDiarios: diario
  };

  if (curKinData) {
    result.energiaDelDia = `La energía del día de hoy está dominada por el **Kin ${curKinData.kin}: ${curKinData.sello.nombre} ${curKinData.tono.nombre}**. Es un día para centrarse en **"${curKinData.sello.accion}"** y permitirnos **"${curKinData.tono.accion}"** en todo lo que hagamos.`;
    result.prediccionSincronicidad = `Hoy la sabiduría maya te aconseja sintonizarte con la Onda Encantada del **${curKinData.ondaEncantadaSello.nombre}**. Presta atención a las señales numéricas y a los encuentros sincrónicos casuales.`;
  }

  return result;
}

// -------------------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------------------

// Endpoint 1: Purely local mathematical calculation
app.get("/api/mayan/calculate", (req, res) => {
  try {
    const { birthdate, currentdate } = req.query;
    if (!birthdate) {
      return res.status(400).json({ error: "birthdate query parameter is required (YYYY-MM-DD)." });
    }

    const birthData = getKinFromDate(birthdate as string);
    let currentData = null;

    if (currentdate) {
      currentData = getKinFromDate(currentdate as string);
    } else {
      const todayStr = new Date().toISOString().split("T")[0];
      currentData = getKinFromDate(todayStr);
    }

    res.json({
      birth: birthData,
      current: currentData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "An error occurred during calculation." });
  }
});

// Endpoint 2: Full personalized spiritual reading using Gemini
app.get("/api/mayan/reading", async (req, res) => {
  try {
    const { birthdate, currentdate } = req.query;
    if (!birthdate) {
      return res.status(400).json({ error: "birthdate parameter is required (YYYY-MM-DD)." });
    }

    const birthData = getKinFromDate(birthdate as string);
    let currentData = getKinFromDate((currentdate as string) || new Date().toISOString().split("T")[0]);

    if (!ai) {
      // Graceful fallback if no Gemini credentials or load fails
      console.log("No Gemini API client configured. Serving detailed offline astrology fallback.");
      const staticRes = getStaticReading(birthData, currentData);
      return res.json({
        calculations: { birth: birthData, current: currentData },
        reading: staticRes,
        mode: "offline"
      });
    }

    // Build absolute high-quality prompt for Mayan Calendar Cosmovision reading
    const prompt = `Eres un sabio astrólogo experto en la Ley del Tiempo y el sincronario galáctico Maya (el sistema Dreamspell). El usuario ha cargado su fecha de nacimiento y desea un análisis espiritual sagrado.

Firma Galáctica del Usuario:
- Kin Nacimiento: Kin ${birthData.kin}
- Sello Destino: ${birthData.sello.nombre} (${birthData.sello.nombreMaya}) - Color: ${birthData.sello.color}, Dirección: ${birthData.sello.direccion}
- Tono Galáctico: ${birthData.tono.nombre} (${birthData.tono.nombreMaya}) - Acción: ${birthData.tono.accion}, Poder: ${birthData.tono.poder}, Esencia: ${birthData.tono.esencia}
- Oráculo del Destino:
  * Guía: de la misma familia de color, actuando como el timonel del ser: ${birthData.oraculo.guia.nombre} (${birthData.oraculo.guia.nombreMaya})
  * Análogo: compañero cósmico: ${birthData.oraculo.analogo.nombre} (${birthData.oraculo.analogo.nombreMaya})
  * Antípoda: desafío de aprendizaje de vida: ${birthData.oraculo.antipoda.nombre} (${birthData.oraculo.antipoda.nombreMaya})
  * Oculto: regalos de magia interna: ${birthData.oraculo.oculto.nombre} (${birthData.oraculo.oculto.nombreMaya})

Energía del Día Hoy:
- Kin de Hoy: Kin ${currentData.kin}
- Sello del Día: ${currentData.sello.nombre} (${currentData.sello.nombreMaya})
- Tono del Día: ${currentData.tono.nombre} (${currentData.tono.nombreMaya})

Por favor, genera una lectura personalizada poética, inspiradora, mística y sumamente seria en idioma español. El tono debe ser el de un lector sagrado de códices mayas, ofreciendo consuelo y revelación profunda del destino cósmico de la persona.

DEBES responder estrictamente con un objeto JSON formateado según el siguiente esquema (no metas textos antes ni después de la sección JSON, solo el JSON puro):
{
  "interpretacionPersonalizada": "Una interpretación profunda y detallada del Kin de nacimiento, lo que significa vibrar bajo el glifo del ${birthData.sello.nombreMaya}. Usa formato Markdown para que se vea elegante con negrita.",
  "misionDeVida": "Detalla la misión de vida del usuario guiándose por el Tono ${birthData.tono.nombre} y el Sello ${birthData.sello.nombre}. Integra de manera poética las palabras clave de su sello: ${birthData.sello.palabrasClave.join(', ')}.",
  "consejoSignatura": "Consejos espirituales prácticos para encarnar el poder de su arquetipo: ${birthData.sello.arquetipo}.",
  "oraculoInsighs": {
    "guia": "Explicación poética del rol del Sello Guía (${birthData.oraculo.guia.nombre}) en su vida diaria.",
    "analogo": "Explicación poética de su Sello Análogo (${birthData.oraculo.analogo.nombre}) y cómo complementa su bienestar.",
    "antipoda": "Explicación de cómo integrar saludablemente el Sello Antípoda (${birthData.oraculo.antipoda.nombre}) en lugar de huir de él.",
    "oculto": "Cómo rescatar la magia secreta de su Sello Oculto (${birthData.oraculo.oculto.nombre}) en la noche del alma."
  },
  "consejosDiarios": "Recomendaciones específicas para meditar o actuar hoy considerando su oráculo planetario.",
  "energiaDelDia": "Descripción de la sinergia entre el Kin del usuario y la energía del día de hoy (${currentData.sello.nombre} ${currentData.tono.nombre}). ¿Cómo debe actuar el usuario frente al portal de hoy?",
  "prediccionSincronicidad": "Un mensaje o predicción de sincronía para hoy enfocado en expandir su consciencia de la Ley del Tiempo."
}`;

    // Generate output with Gemini using structured or clean response formats
    // Ensure User-Agent header or standard parameters are set to 'aistudio-build'
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Eres un astrólogo experto en la Ley del Tiempo Cósmica Maya. Respondes exclusivamente JSON de lectura sincrónica.",
      }
    });

    const responseText = result.text || "";
    const readingJson = JSON.parse(responseText);

    res.json({
      calculations: { birth: birthData, current: currentData },
      reading: readingJson,
      mode: "online"
    });

  } catch (error: any) {
    console.error("Gemini call or parsing failed. Falling back to static reading.", error);
    try {
      const { birthdate, currentdate } = req.query;
      const birthData = getKinFromDate(birthdate as string);
      const currentData = getKinFromDate((currentdate as string) || new Date().toISOString().split("T")[0]);
      const staticRes = getStaticReading(birthData, currentData);
      res.json({
        calculations: { birth: birthData, current: currentData },
        reading: staticRes,
        mode: "fallback-error"
      });
    } catch (innerErr: any) {
      res.status(500).json({ error: innerErr.message || "Failed to generate reading." });
    }
  }
});

// Configure Vite or Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve index.html and assets compiled in dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer();
