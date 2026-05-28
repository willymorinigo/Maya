import { TODOS_SELLOS, TONOS, KinData, Sello, Tono, OraculoDestino } from "../types";

// Helper to find a Sello by ID
export function getSelloById(id: number): Sello {
  let adjustedId = id;
  if (id === 0) adjustedId = 20;
  const s = TODOS_SELLOS.find((item) => item.id === adjustedId);
  if (!s) return TODOS_SELLOS[0]; // fallback
  return s;
}

// Helper to find a Tono by ID
export function getTonoById(id: number): Tono {
  const t = TONOS.find((item) => item.id === id);
  if (!t) return TONOS[0]; // fallback
  return t;
}

// Helper to get index within same color group (0 to 4)
function getSelloColorGroupIndex(sello: Sello): number {
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
export function getGuideSello(sello: Sello, toneId: number): Sello {
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
export function calculateOracle(sello: Sello, tono: Tono): OraculoDestino {
  const destId0 = (sello.id === 20) ? 19 : (sello.id - 1);
  const analogId0 = (19 - destId0) % 20;
  const analogId = analogId0 + 1;

  const antipodeId = ((sello.id - 1 + 10) % 20) + 1;

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
      current.setUTCDate(current.getUTCDate() - 1);
      if (current.getUTCMonth() === 1 && current.getUTCDate() === 29) {
        current.setUTCDate(current.getUTCDate() - 1);
      }
      daysDiff--;
    }
  }

  let kIdx = (163 + daysDiff) % 260;
  if (kIdx < 0) kIdx += 260;
  const kin = kIdx + 1;

  const tIdx = (kin - 1) % 13;
  const sIdx = (kin - 1) % 20;

  const tono = getTonoById(tIdx + 1);
  const sello = getSelloById(sIdx + 1);

  let oeKinIdx = (kin - tono.id + 1 + 260) % 260;
  if (oeKinIdx === 0) oeKinIdx = 260;
  const oeSelloIdx = (oeKinIdx - 1) % 20;
  const oeSello = getSelloById(oeSelloIdx + 1);
  const oeNum = (oeKinIdx - 1) % 13 + 1;

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

// Client-side static fallback readings to match getStaticReading
export function getStaticReading(kinData: KinData, curKinData?: KinData) {
  const { seal, tone, oraculo } = { seal: kinData.sello, tone: kinData.tono, oraculo: kinData.oraculo };

  const interpretacionPersonalizada = `Tu firma galáctica es **Kin ${kinData.kin}: ${seal.nombre} ${tone.nombre}**. Como portador de esta signatura cósmica, tu misión en este plano terrestre está profundamente ligada al poder del sello **${seal.nombreMaya}** guiado por el tono **${tone.nombreMaya}**.\n\nSientes el llamado sagrado de **${seal.palabrasClave.join(", ")}** en todas tus empresas. Eres una fuerza de tipo **${seal.direccion}**, lo que indica que diriges tu energía cardinalmente hacia metas de iniciación y consolidación en el plano físico e invisible.`;

  const misionDeVida = `Tu arquetipo cósmico es **${seal.arquetipo}**. Tu camino evolutivo consiste en integrar la acción de **"${seal.accion}"** con el fin de manifestar plenamente **"${seal.poder}"** en armonía con tu esencia más profunda, que es **"${seal.esencia}"**.\n\nUsa la vibración del Tono **${tone.nombre}** para **${tone.descripcionCorta}** Puedes superar los desafíos espirituales alineándote con tu Sello Guía: **${oraculo.guia.nombre}**, que te orienta hacia la maestría emocional y cósmica.`;

  const consejoSignatura = `Aprovecha la energía de tu Sello Análogo (**${oraculo.analogo.nombre}**), que te brinda un balance natural y te apoya de manera intuitiva compartiendo tu mismo tono de creación. Recuerda integrar las lecciones de tu Sello Antípoda (**${oraculo.antipoda.nombre}**), el cual representa tu mayor polo de aprendizaje, tu zona de fricción saludable que te obliga a madurar espiritualmente. Ríndete ante los regalos alquímicos de tu Sello Oculto (**${oraculo.oculto.nombre}**), cuyas cualidades mágicas florecen cuando estás en alineamiento silencioso.`;

  const diario = "Sintoniza tu respiración hoy con la respiración cósmica. Dedica unos minutos de silencio a visualizar el glifo de tu sello en el centro de tu pecho.";

  const result: any = {
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
