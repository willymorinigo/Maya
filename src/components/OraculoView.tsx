import React, { useState } from "react";
import SelloGlifo from "./SelloGlifo";
import { Sello, OraculoDestino } from "../types";

interface OraculoViewProps {
  oraculo: OraculoDestino;
  title?: string;
  key?: number;
}

export default function OraculoView({ oraculo, title = "Oráculo del Destino" }: OraculoViewProps) {
  const [selectedDetail, setSelectedDetail] = useState<{
    role: string;
    sello: Sello;
    meaning: string;
  } | null>({
    role: "Destino (Centro)",
    sello: oraculo.destino,
    meaning: "Tu vibración central, el arquetipo de tu alma y tu vehículo de manifestación en esta tierra.",
  });

  const seals = [
    {
      role: "Guía (Arriba)",
      sello: oraculo.guia,
      pos: "top",
      meaning: "El timonel de tu ser. Es la fuerza espiritual de tu misma familia de color que guía tu toma de decisiones y el propósito de tu vida.",
      bgColor: "border-[#c5a35d]"
    },
    {
      role: "Antípoda (Izquierda)",
      sello: oraculo.antipoda,
      pos: "left",
      meaning: "Tu mayor desafío y punto de tensión creativo. Saca a la luz tus puntos ciegos para forzarte a madurar y transformarte espiritualmente.",
      bgColor: "border-red-900/40"
    },
    {
      role: "Destino (Centro)",
      sello: oraculo.destino,
      pos: "center",
      meaning: "Tu esencia pura, el arquetipo primordial que gobierna tu energía cósmica y tus propósitos vitales.",
      bgColor: "border-[#c5a35d]"
    },
    {
      role: "Análogo (Derecha)",
      sello: oraculo.analogo,
      pos: "right",
      meaning: "Tu socio cósmico y mente gemela. Te brinda soporte silencioso, sincrónico y nutritivo, vibrando en perfecta compatibilidad elemental.",
      bgColor: "border-sky-900/40"
    },
    {
      role: "Oculto (Abajo)",
      sello: oraculo.oculto,
      pos: "bottom",
      meaning: "La magia secreta e inconsciente. Emerge espontáneamente en tus momentos críticos o espirituales profundos, revelando tus dones innatos.",
      bgColor: "border-purple-900/40"
    },
  ];

  // Helper to resolve tailwind text colors for seals
  const getColorHex = (colorString: string) => {
    switch (colorString.toLowerCase()) {
      case "rojo":
        return "#ef4444";
      case "azul":
        return "#3b82f6";
      case "blanco":
        return "#f3f4f6";
      case "amarillo":
        return "#eab308";
      default:
        return "#c5a35d";
    }
  };

  return (
    <div className="bg-[#101210] border border-[#2d2d2d] p-6 rounded shadow-lg max-w-lg mx-auto" id="oraculo-container">
      <h3 className="text-[#c5a35d] text-xs uppercase tracking-[0.2em] font-light mb-6 text-center">
        {title} <span className="italic text-[10px] text-stone-500">(Quinta Fuerza)</span>
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
        {/* The Sacred Cross Grid */}
        <div className="relative w-64 h-64 flex items-center justify-center select-none shrink-0" id="sacred-cross">
          {/* Vertical & Horizontal Cross Guideline lines */}
          <div className="absolute w-[2px] h-48 bg-[#2d2d2d] z-0"></div>
          <div className="absolute h-[2px] w-48 bg-[#2d2d2d] z-0"></div>

          {/* Guía (Top) */}
          <button
            onClick={() => setSelectedDetail({ role: "Guía (Arriba)", sello: oraculo.guia, meaning: seals[0].meaning })}
            className="absolute top-0 w-16 h-16 rounded-full bg-[#121412] border border-[#c5a35d] flex flex-col items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer shadow-md focus:outline-none"
            title="Sello Guía"
            id="button-oraculo-guia"
          >
            <SelloGlifo selloId={oraculo.guia.id} className="w-10 h-10" colorHex={getColorHex(oraculo.guia.color)} />
            <span className="text-[8px] uppercase tracking-tighter text-stone-400 mt-1">{oraculo.guia.nombre}</span>
          </button>

          {/* Antípoda (Left) */}
          <button
            onClick={() => setSelectedDetail({ role: "Antípoda (Izquierda)", sello: oraculo.antipoda, meaning: seals[1].meaning })}
            className="absolute left-0 w-16 h-16 rounded-full bg-[#121412] border border-[#521313] flex flex-col items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer shadow-md focus:outline-none"
            title="Sello Antípoda"
            id="button-oraculo-antipoda"
          >
            <SelloGlifo selloId={oraculo.antipoda.id} className="w-10 h-10" colorHex={getColorHex(oraculo.antipoda.color)} />
            <span className="text-[8px] uppercase tracking-tighter text-stone-400 mt-1">{oraculo.antipoda.nombre}</span>
          </button>

          {/* Destino (Center) */}
          <button
            onClick={() => setSelectedDetail({ role: "Destino (Centro)", sello: oraculo.destino, meaning: seals[2].meaning })}
            className="absolute w-20 h-20 rounded-full bg-[#201e18] border-2 border-[#c5a35d] flex flex-col items-center justify-center hover:scale-105 transition-all z-20 cursor-pointer shadow-xl focus:outline-none"
            title="Sello Destino"
            id="button-oraculo-destino"
          >
            <SelloGlifo selloId={oraculo.destino.id} className="w-12 h-12" colorHex={getColorHex(oraculo.destino.color)} />
            <span className="text-[9px] uppercase font-bold tracking-tight text-[#c5a35d] mt-1">{oraculo.destino.nombre}</span>
          </button>

          {/* Análogo (Right) */}
          <button
            onClick={() => setSelectedDetail({ role: "Análogo (Derecha)", sello: oraculo.analogo, meaning: seals[3].meaning })}
            className="absolute right-0 w-16 h-16 rounded-full bg-[#121412] border border-[#1d3c5c] flex flex-col items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer shadow-md focus:outline-none"
            title="Sello Análogo"
            id="button-oraculo-analogo"
          >
            <SelloGlifo selloId={oraculo.analogo.id} className="w-10 h-10" colorHex={getColorHex(oraculo.analogo.color)} />
            <span className="text-[8px] uppercase tracking-tighter text-stone-400 mt-1">{oraculo.analogo.nombre}</span>
          </button>

          {/* Oculto (Bottom) */}
          <button
            onClick={() => setSelectedDetail({ role: "Oculto (Abajo)", sello: oraculo.oculto, meaning: seals[4].meaning })}
            className="absolute bottom-0 w-16 h-16 rounded-full bg-[#121412] border border-[#3e1b5c] flex flex-col items-center justify-center hover:scale-105 transition-all z-10 cursor-pointer shadow-md focus:outline-none"
            title="Sello Oculto"
            id="button-oraculo-oculto"
          >
            <SelloGlifo selloId={oraculo.oculto.id} className="w-10 h-10" colorHex={getColorHex(oraculo.oculto.color)} />
            <span className="text-[8px] uppercase tracking-tighter text-stone-400 mt-1">{oraculo.oculto.nombre}</span>
          </button>
        </div>

        {/* Informative description block */}
        <div className="flex-1 bg-[#151715] p-4 border border-[#2d2d2d] rounded flex flex-col justify-between min-h-[16rem]">
          {selectedDetail ? (
            <div id="selection-panel">
              <span className="text-[9px] uppercase tracking-widest text-[#c5a35d] block mb-1">
                {selectedDetail.role}
              </span>
              <h4 className="text-xl font-light italic text-[#f3f4f6]" id="oracle-seal-title">
                {selectedDetail.sello.nombre} · {selectedDetail.sello.nombreMaya}
              </h4>
              <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">
                Color: <span style={{ color: getColorHex(selectedDetail.sello.color) }}>{selectedDetail.sello.color}</span> · Dirección: {selectedDetail.sello.direccion}
              </p>

              <div className="h-[1px] bg-[#2d2d2d] my-3"></div>

              <div className="grid grid-cols-3 gap-2 my-2 text-center">
                <div className="bg-[#0c0e0c] p-1.5 border border-[#222]">
                  <span className="block text-[8px] uppercase text-stone-500">Poder</span>
                  <span className="text-[10px] text-stone-300 capitalize">{selectedDetail.sello.poder}</span>
                </div>
                <div className="bg-[#0c0e0c] p-1.5 border border-[#222]">
                  <span className="block text-[8px] uppercase text-stone-500">Acción</span>
                  <span className="text-[10px] text-stone-300 capitalize">{selectedDetail.sello.accion}</span>
                </div>
                <div className="bg-[#0c0e0c] p-1.5 border border-[#222]">
                  <span className="block text-[8px] uppercase text-stone-500">Esencia</span>
                  <span className="text-[10px] text-stone-300 capitalize">{selectedDetail.sello.esencia}</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed italic mt-3" id="oracle-seal-desc">
                {selectedDetail.meaning}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-stone-500 text-xs py-10" id="oracle-placeholder">
              Selecciona cualquier sello del oráculo para explorar su significado trascendente.
            </div>
          )}

          <div className="text-[9px] uppercase tracking-wider text-stone-500 text-right mt-4 mt-auto">
            Quinta Fuerza Sagrada
          </div>
        </div>
      </div>
    </div>
  );
}
