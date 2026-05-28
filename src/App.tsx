import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Calendar, 
  Compass, 
  BookOpen, 
  HelpCircle, 
  Info, 
  RefreshCw, 
  Clock, 
  MapPin, 
  Waves,
  Heart,
  Eye,
  Star,
  Sun
} from "lucide-react";
import SelloGlifo from "./components/SelloGlifo";
import OraculoView from "./components/OraculoView";
import { KinData, GeminiReading, TODOS_SELLOS } from "./types";

export default function App() {
  const [birthdate, setBirthdate] = useState("1990-08-15");
  const [currentdate, setCurrentdate] = useState(() => new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ birth: KinData; current: KinData } | null>(null);
  const [reading, setReading] = useState<GeminiReading | null>(null);
  const [readingMode, setReadingMode] = useState<"online" | "offline" | "fallback-error" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"portal" | "oraculo">("portal");
  const [showExplanation, setShowExplanation] = useState(false);

  // Suggested famous dates of cosmic discovery/synchronicity
  const FAMOUS_DATES = [
    { label: "Águila Espectral (Mockup birthdate)", date: "1990-08-15" },
    { label: "Pacal Votan (Sarcófago Palenque)", date: "1952-06-15" },
    { label: "José Argüelles (Ley del Tiempo)", date: "1939-01-24" },
    { label: "Portal Convergencia Armónica", date: "1987-08-16" },
  ];

  // Fetch full calculation & reading
  const fetchReading = async (bDate: string, cDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/mayan/reading?birthdate=${bDate}&currentdate=${cDate}`);
      if (!response.ok) {
        throw new Error("Failed to consult the Galactic oracle.");
      }
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }
      setData({
        birth: json.calculations.birth,
        current: json.calculations.current,
      });
      setReading(json.reading);
      setReadingMode(json.mode);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unidentified cosmic misalignment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReading(birthdate, currentdate);
  }, [birthdate, currentdate]);

  // Formatter to turn "1990-08-15" into "15 · AGO · 1990"
  const formatThemedDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const day = parseInt(parts[2], 10);
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const monthLabel = months[monthIdx] || "AGO";
    return `${day} · ${monthLabel} · ${year}`;
  };

  const getSelloColorDetails = (color: string) => {
    switch (color.toLowerCase()) {
      case "rojo":
        return {
          text: "text-red-400",
          border: "border-red-500/40",
          bg: "bg-red-500/5",
          hex: "#ef4444",
          lightHex: "#F87171",
          element: "Agua",
          direction: "Este (Inicia)",
          glow: "shadow-[0_0_80px_rgba(239,68,68,0.12)]",
        };
      case "blanco":
        return {
          text: "text-slate-300",
          border: "border-slate-400/40",
          bg: "bg-slate-400/5",
          hex: "#f3f4f6",
          lightHex: "#E2E8F0",
          element: "Aire",
          direction: "Norte (Purifica)",
          glow: "shadow-[0_0_80px_rgba(255,255,255,0.08)]",
        };
      case "azul":
        return {
          text: "text-blue-400",
          border: "border-blue-500/40",
          bg: "bg-blue-500/5",
          hex: "#3b82f6",
          lightHex: "#60A5FA",
          element: "Fuego Interior",
          direction: "Oeste (Transforma)",
          glow: "shadow-[0_0_80px_rgba(59,130,246,0.12)]",
        };
      case "amarillo":
        return {
          text: "text-amber-400",
          border: "border-amber-500/40",
          bg: "bg-amber-500/5",
          hex: "#eab308",
          lightHex: "#FBBF24",
          element: "Tierra",
          direction: "Sur (Madura)",
          glow: "shadow-[0_0_80px_rgba(234,179,8,0.12)]",
        };
      default:
        return {
          text: "text-[#c5a35d]",
          border: "border-[#c5a35d]/40",
          bg: "bg-[#c5a35d]/5",
          hex: "#c5a35d",
          lightHex: "#c5a35d",
          element: "Espíritu",
          direction: "Centro",
          glow: "shadow-[0_0_80px_rgba(197,163,93,0.12)]",
        };
    }
  };

  // Helper variables for birth
  let birthSello = data?.birth?.sello;
  let birthTono = data?.birth?.tono;
  let birthKin = data?.birth?.kin;
  let birthColor = birthSello ? getSelloColorDetails(birthSello.color) : getSelloColorDetails("amarillo");

  // Helper variables for current
  let curSello = data?.current?.sello;
  let curTono = data?.current?.tono;
  let curKin = data?.current?.kin;
  let curColor = curSello ? getSelloColorDetails(curSello.color) : getSelloColorDetails("rojo");

  return (
    <div className="min-h-screen bg-[#0c0e0c] text-[#d4c7b0] font-serif relative overflow-x-hidden flex flex-col justify-between" id="app-root">
      {/* Background Starry / Dotted grid overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0" 
        style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, #c5a35d 1px, transparent 0)", 
          backgroundSize: "40px 40px" 
        }}
        id="dotted-overlay"
      ></div>

      {/* Header component */}
      <header className="relative z-10 px-4 py-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#2d2d2d]" id="header-section">
        <div className="text-center md:text-left">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7d7d7d] mb-1">Calendario Sincrónico Galáctico</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter" id="header-title">
            TZOLKIN <span className="italic font-serif text-[#c5a35d]">Cosmos</span>
          </h1>
        </div>

        {/* Inputs and selectors inside header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right w-full sm:w-auto" id="date-pickers-panel">
          {/* Birth Date Picker Box */}
          <div className="inline-block border border-[#c5a35d] px-4 py-2 bg-[#141614] rounded w-full sm:w-auto" id="birthdate-card">
            <label className="block text-[9px] uppercase tracking-widest text-[#7d7d7d] mb-1">
              Fecha de Nacimiento
            </label>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#c5a35d]" />
              <input 
                type="date" 
                value={birthdate}
                onChange={(e) => {
                  if (e.target.value) {
                    setBirthdate(e.target.value);
                  }
                }}
                className="bg-transparent border-none text-[#f0e6d2] font-mono text-sm focus:outline-none cursor-pointer [color-scheme:dark]"
                id="birthdate-picker"
              />
            </div>
            <div className="text-[10px] text-[#c5a35d] tracking-wide mt-1 font-mono">
              {formatThemedDate(birthdate)}
            </div>
          </div>

          {/* Current Date Picker Box */}
          <div className="inline-block border border-[#2d2d2d] px-4 py-2 bg-[#0c0e0c]/90 rounded w-full sm:w-auto" id="currentdate-card">
            <label className="block text-[9px] uppercase tracking-widest text-stone-500 mb-1">
              Energía del Día (Sintonía)
            </label>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#7d7d7d]" />
              <input 
                type="date" 
                value={currentdate}
                onChange={(e) => {
                  if (e.target.value) {
                    setCurrentdate(e.target.value);
                  }
                }}
                className="bg-transparent border-none text-[#a19989] font-mono text-xs focus:outline-none cursor-pointer [color-scheme:dark]"
                id="currentdate-picker"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-12 min-h-[500px]" id="main-content">
        
        {/* LEFT COLUMN: INTERPRETACIÓN (Birth Kin Profile) */}
        <section className="lg:col-span-3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#2d2d2d] flex flex-col justify-between" id="section-left">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-4">
              <h3 className="text-[#c5a35d] text-xs uppercase tracking-[0.3em]">Interpretación</h3>
              {readingMode && (
                <span className="text-[9px] uppercase tracking-widest text-stone-500 font-mono px-2 py-0.5 border border-[#2d2d2d] rounded bg-[#101210]">
                  ORÁCULO: {readingMode.toUpperCase()}
                </span>
              )}
            </div>

            {loading ? (
              <div className="space-y-4 py-8 animate-pulse" id="left-loading">
                <div className="h-6 bg-stone-800 rounded w-2/3"></div>
                <div className="h-4 bg-stone-800 rounded w-full"></div>
                <div className="h-4 bg-stone-800 rounded w-full"></div>
                <div className="h-4 bg-stone-800 rounded w-4/5"></div>
              </div>
            ) : birthSello && birthTono ? (
              <div className="space-y-6" id="left-loaded-content">
                <div>
                  <p className="text-[#c5a35d] text-[10px] tracking-widest uppercase mb-1 font-mono">
                    La Gran Firma Galáctica
                  </p>
                  <h2 className="text-3xl leading-tight mb-2 italic">
                    El Vuelo de {birthSello.nombre}
                  </h2>
                  <p className="text-sm text-stone-400 font-mono italic mb-4">
                    Arquetipo: {birthSello.arquetipo}
                  </p>
                  
                  {reading?.interpretacionPersonalizada ? (
                    <p 
                      className="text-[#a19989] leading-relaxed whitespace-pre-line bg-[#101210]/60 p-4 border border-[#2d2d2d] rounded"
                      style={{ fontSize: "13px", fontFamily: "Arial", lineHeight: "17.5px" }}
                    >
                      {reading.interpretacionPersonalizada.replace(/\*\*/g, "")}
                    </p>
                  ) : (
                    <p 
                      className="text-[#a19989] leading-relaxed"
                      style={{ fontSize: "13px", fontFamily: "Arial", lineHeight: "17.5px" }}
                    >
                      {birthSello.descripcionCorta}
                    </p>
                  )}
                </div>

                {/* Símbolos del sello */}
                <div className="pt-4 border-t border-[#2d2d2d]">
                  <p className="text-xs uppercase tracking-widest text-[#7d7d7d] mb-3">Simbología del Sello</p>
                  <div className="grid grid-cols-3 gap-2">
                    {birthSello.palabrasClave.map((keyword, idx) => (
                      <div key={idx} className="text-center bg-[#151715] p-2 border border-[#2d2d2d] rounded">
                        <div className="text-[#c5a35d] text-sm mb-1">
                          {idx === 0 ? "◈" : idx === 1 ? "✺" : "✵"}
                        </div>
                        <span className="text-[9px] uppercase tracking-tighter block truncate text-[#d4c7b0]">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-stone-500 py-12 text-center text-xs" id="left-no-data">
                Selecciona tu fecha para calcular.
              </div>
            )}
          </div>

          {/* Golden Tono block at bottom of Left Column */}
          <div className="mt-8 rounded overflow-hidden shadow-md" id="left-footer-tone-block">
            {birthTono && (
              <div className="bg-[#c5a35d] text-[#0c0e0c] p-6">
                <p className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-80">Tono Galáctico Nacimiento</p>
                <h4 className="text-2xl font-bold italic tracking-tighter">
                  {birthTono.nombre} · {birthTono.id}
                </h4>
                <p className="text-[10px] mt-1 font-mono uppercase bg-[#0c0e0c] text-[#c5a35d] inline-block px-1.5 py-0.5 rounded">
                  Poder: {birthTono.poder}
                </p>
                <p className="text-[11px] mt-2 opacity-95 leading-relaxed font-sans">
                  {birthTono.descripcionCorta}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* MIDDLE COLUMN: SACRED TRANSITIONS & THE CENTRAL PORTAL GLYPH OR ORACULO */}
        <section className="lg:col-span-5 relative flex flex-col items-center justify-between p-6 md:p-8 bg-[#0a0a0a]" id="section-middle">
          
          {/* Orbital background opacity effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden z-0">
            <div className="w-[500px] h-[500px] border-[40px] border-[#c5a35d] rounded-full animate-cosmic-orbit"></div>
          </div>

          {/* Interactive tabs to swap between Sello Glifo & Oraculo Cross */}
          <div className="flex gap-2 bg-[#121412] p-1 border border-[#2d2d2d] rounded z-10 w-full max-w-sm" id="middle-view-tabs">
            <button
              onClick={() => setActiveTab("portal")}
              className={`flex-1 py-1.5 text-xs tracking-wider uppercase font-sans transition-all rounded ${
                activeTab === "portal" 
                  ? "bg-[#c5a35d] text-[#0c0e0c] font-semibold" 
                  : "text-stone-400 hover:text-white"
              }`}
              id="tab-view-portal"
            >
              Portal Sello
            </button>
            <button
              onClick={() => setActiveTab("oraculo")}
              className={`flex-1 py-1.5 text-xs tracking-wider uppercase font-sans transition-all rounded ${
                activeTab === "oraculo" 
                  ? "bg-[#c5a35d] text-[#0c0e0c] font-semibold" 
                  : "text-stone-400 hover:text-white"
              }`}
              id="tab-view-oraculo"
            >
              Oráculo Destino
            </button>
          </div>

          {/* Dynamic Render according to selection tab */}
          <div className="flex-1 w-full flex items-center justify-center py-6 min-h-[380px] z-10" id="middle-main-view">
            {loading ? (
              <div className="flex flex-col items-center gap-4 animate-pulse" id="middle-pulse-loading">
                <div className="w-64 h-64 rounded-full border-4 border-dashed border-[#c5a35d]/40 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-[#2d2d2d] flex items-center justify-center">
                    <RefreshCw className="w-10 h-10 text-[#c5a35d] animate-spin" />
                  </div>
                </div>
                <span className="text-xs uppercase tracking-widest text-[#c5a35d] font-mono">Trazando alineaciones...</span>
              </div>
            ) : activeTab === "portal" ? (
              birthSello && birthTono ? (
                <div className="relative flex flex-col items-center justify-center" id="glowing-portal-sello">
                  
                  {/* Orbit circle wrapper */}
                  <div className={`w-72 h-72 rounded-full border-4 border-[#c5a35d] flex items-center justify-center bg-gradient-to-br from-[#1a1c1a] to-[#0c0e0c] glowing-orbit ${birthColor.glow}`}>
                    <SelloGlifo 
                      selloId={birthSello.id} 
                      className="w-48 h-48 stroke-[1.5]" 
                      colorHex={birthColor.lightHex} 
                    />
                  </div>
                  
                  {/* Rotating badge displaying the calculated KIN */}
                  <div className="absolute -top-6 -right-6 bg-[#c5a35d] text-[#0c0e0c] px-4 py-2 rotate-12 font-bold font-mono text-sm tracking-widest shadow-md">
                    KIN {birthKin}
                  </div>
                </div>
              ) : null
            ) : (
              data?.birth?.oraculo ? (
                <OraculoView oraculo={data.birth.oraculo} title="Tus Energías de la Quinta Fuerza" />
              ) : null
            )}
          </div>

          {/* Outer label of central seal */}
          <div className="text-center z-10 mt-2" id="middle-bottom-labels">
            {birthSello ? (
              <>
                <h2 className="text-3xl tracking-[0.4em] font-light uppercase text-white hover:text-[#c5a35d] transition-colors">
                  {birthSello.nombre}
                </h2>
                <p className="text-[#c5a35d] tracking-[0.2em] text-xs uppercase mt-2 font-mono">
                  {birthSello.nombreMaya} · {birthSello.direccion} · {birthSello.color}
                </p>
                <p className="text-stone-500 text-[10px] tracking-widest uppercase mt-1 font-sans">
                  Elemento: {birthColor.element} · Onda Encantada del {data?.birth?.ondaEncantadaSello.nombre}
                </p>
              </>
            ) : null}
          </div>
        </section>

        {/* RIGHT COLUMN: ENERGÍA DEL DÍA & SPARK ADVICE */}
        <section className="lg:col-span-4 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-[#2d2d2d] flex flex-col justify-between space-y-8" id="section-right-column">
          
          {/* Quick presets component */}
          <div className="space-y-3" id="famous-dates-preset">
            <h3 className="text-[#c5a35d] text-xs uppercase tracking-[0.3em] font-light">Efemérides Cósmicas</h3>
            <div className="grid grid-cols-2 gap-2">
              {FAMOUS_DATES.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setBirthdate(f.date)}
                  className={`text-left p-2 border rounded transition-all text-[11px] focus:outline-none cursor-pointer ${
                    birthdate === f.date 
                      ? "border-[#c5a35d] bg-[#c5a35d]/10 text-[#f0e6d2]" 
                      : "border-[#2d2d2d] bg-[#101210]/40 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                  }`}
                  id={`famous-date-btn-${idx}`}
                >
                  <span className="block font-mono text-[9px] text-[#c5a35d]">{f.date}</span>
                  <span className="block font-sans truncate">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Today's planetary transit energy */}
          <div id="todays-planetary-energy">
            <h3 className="text-[#c5a35d] text-xs uppercase tracking-[0.3em] mb-4">Sintonía del Día</h3>
            
            {loading ? (
              <div className="h-28 bg-[#101210] border border-[#2d2d2d] rounded animate-pulse p-4">
                <div className="h-4 bg-stone-800 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-stone-800 rounded w-full"></div>
                <div className="h-3 bg-stone-800 rounded w-4/5 pt-2"></div>
              </div>
            ) : curSello && curTono ? (
              <div className="bg-[#151715] border border-[#333] p-5 rounded relative overflow-hidden" id="transit-energy-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#c5a35d] tracking-widest block">
                      Alineación Hoy
                    </span>
                    <p className="text-lg italic font-sans font-medium text-white">
                      {curSello.nombre} {curTono.nombre}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#1e201e] border border-[#333] px-2 py-1 rounded text-stone-300">
                    KIN {curKin}
                  </span>
                </div>
                
                <div className="w-full h-[1px] bg-[#2d2d2d] my-3"></div>

                <p className="text-xs text-stone-400 leading-relaxed italic">
                  {reading?.energiaDelDia 
                    ? reading.energiaDelDia 
                    : `Sintoniza con las cualidades del sello ${curSello.nombre}. Hoy es un día idóneo para sintonizarse bajo la acción de ${curSello.accion} y dejar florecer la esencia del tono ${curTono.nombre}.`
                  }
                </p>

                <div className="flex gap-2 mt-4 items-center">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: curColor.hex }}></div>
                  <span className="text-[9px] uppercase tracking-widest text-[#7d7d7d] font-mono">
                    Color: {curSello.color} · Regente: {curSello.direccion}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Sincronicidad advice card */}
          <div className="flex-1 flex flex-col justify-end" id="spiritual-advice-block">
            <h3 className="text-[#c5a35d] text-xs uppercase tracking-[0.3em] mb-4">Guía y Sincronicidad</h3>
            
            {loading ? (
              <div className="space-y-2 py-4 animate-pulse">
                <div className="h-3 bg-stone-800 rounded w-full"></div>
                <div className="h-3 bg-stone-800 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="relative pl-6" id="spiritual-advice-holder">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#c5a35d]"></div>
                
                {reading?.misionDeVida ? (
                  <>
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1 font-mono">Consejo de Vida</p>
                    <p className="text-base text-stone-300 leading-relaxed italic mb-4">
                      {reading.misionDeVida.substring(0, 190).replace(/\*\*/g, "")}...
                    </p>
                  </>
                ) : (
                  <p className="text-base text-stone-300 leading-relaxed italic mb-4">
                    "Hoy, expande tu mirada cósmica. Eleva tus intenciones por encima del laberinto material; vuela de prisa pero alto para ver los portales y senderos divinos que siempre estuvieron allí."
                  </p>
                )}

                {reading?.prediccionSincronicidad && (
                  <p className="text-[11px] text-[#c5a35d] leading-normal font-sans italic bg-[#101210]/40 p-3 border border-[#2d2d2d] rounded">
                    Sincronía: {reading.prediccionSincronicidad}
                  </p>
                )}
              </div>
            )}
            
            {/* Horizontal decoration block columns */}
            <div className="grid grid-cols-4 gap-1 mt-6 opacity-40" id="cosmic-decoration-bars">
              <div className="h-3 bg-[#c5a35d]"></div>
              <div className="h-3 bg-[#c5a35d]"></div>
              <div className="h-3 bg-[#c5a35d]"></div>
              <div className="h-3 border border-[#c5a35d]"></div>
            </div>
          </div>

        </section>
      </main>

      {/* Footer bar */}
      <footer className="relative z-10 border-t border-[#2d2d2d] bg-[#0c0e0c]/90 px-4 py-6 md:px-8 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[10px] tracking-[0.2em] text-[#555] uppercase" id="footer-section">
        <div>Sincronario de 13 Lunas · Quinta Fuerza Armónica</div>
        
        {birthSello && birthTono ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px]" id="footer-kin-details">
            <span>Sello Solar: {birthSello.id} · {birthSello.nombreMaya.toUpperCase()}</span>
            <span>Tono: {birthTono.id} ({birthTono.nombre.toUpperCase()})</span>
            <span className="text-[#c5a35d] font-semibold font-serif">In Lak'ech Ala K'in</span>
          </div>
        ) : (
          <span className="text-[#c5a35d]">In Lak'ech Ala K'in</span>
        )}
      </footer>
    </div>
  );
}
