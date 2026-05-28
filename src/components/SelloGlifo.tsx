import React from "react";

interface SelloGlifoProps {
  selloId: number;
  className?: string;
  colorHex?: string;
}

export default function SelloGlifo({ selloId, className = "w-24 h-24", colorHex = "#c5a35d" }: SelloGlifoProps) {
  // We render beautiful abstract sacred geometry symbols for the 20 seals.
  // Each path highlights the artistic mood of the system with golden or colored accents.
  const strokeColor = colorHex;
  const secondaryColor = "#0c0e0c";

  switch (selloId) {
    case 1: // Dragón Rojo (Imix) - Spirals of nutrition/life source
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 15 C30 15, 20 30, 20 50 C20 70, 35 85, 50 85 C65 85, 80 70, 80 50" fill="none" stroke={strokeColor} strokeWidth="3" />
          <circle cx="50" cy="50" r="15" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="6" fill={strokeColor} />
          <path d="M25 50 Q50 20 75 50" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 2: // Viento Blanco (Ik) - Aliento, Spirit. A beautiful split design with spiritual wind vectors
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 10 L50 90" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M25 35 Q50 15 75 35" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M20 50 Q50 35 80 50" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="35" cy="65" r="5" fill={strokeColor} />
          <circle cx="65" cy="65" r="5" fill={strokeColor} />
          <circle cx="50" cy="45" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 3: // Noche Azul (Akbal) - Sanctuary, Dream. Deep crescent and dark inner stars
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M20 50 A30 30 0 1 0 80 50 Z" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="40" r="4" fill={strokeColor} />
          <circle cx="35" cy="60" r="4" fill={strokeColor} />
          <circle cx="65" cy="60" r="4" fill={strokeColor} />
          <path d="M25 40 Q50 75 75 40" fill="none" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 4: // Semilla Amarilla (Kan) - Seed, target, sprout
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 80 Q30 50 50 20 Q70 50 50 80 Z" fill="none" stroke={strokeColor} strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M30 40 Q50 35 70 40" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M30 60 Q50 65 70 60" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="15" r="4" fill={strokeColor} />
        </svg>
      );

    case 5: // Serpiente Roja (Chicchan) - Force/Instinct, Slithering wave and flame
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M25 50 C25 25, 45 25, 45 50 C45 75, 75 75, 75 50" fill="none" stroke={strokeColor} strokeWidth="3" />
          <circle cx="25" cy="50" r="4" fill={strokeColor} />
          <circle cx="75" cy="50" r="4" fill={strokeColor} />
          <path d="M45 40 Q50 20 55 40" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="55" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 6: // Enlazador de Mundos Blanco (Cimi) - Death/Transcendence cross and portals
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <line x1="20" y1="50" x2="80" y2="50" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="15" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <path d="M30 30 L40 40 M70 30 L60 40 M30 70 L40 60 M70 70 L60 60" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill={strokeColor} />
        </svg>
      );

    case 7: // Mano Azul (Manik) - Healing star and dynamic eye
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill={secondaryColor} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3" fill={strokeColor} />
          <path d="M30 30 Q50 20 70 30" fill="none" stroke={strokeColor} strokeWidth="1" />
          <path d="M30 70 Q50 80 70 70" fill="none" stroke={strokeColor} strokeWidth="1" />
        </svg>
      );

    case 8: // Estrella Amarilla (Lamat) - Beautiful concentric star coordinates (Arte)
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 12 L50 88 M12 50 L88 50" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M23 23 L77 77 M77 23 L23 77" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="22" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="10" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="4" fill={strokeColor} />
          <circle cx="50" cy="25" r="3" fill={strokeColor} />
          <circle cx="50" cy="75" r="3" fill={strokeColor} />
          <circle cx="25" cy="50" r="3" fill={strokeColor} />
          <circle cx="75" cy="50" r="3" fill={strokeColor} />
        </svg>
      );

    case 9: // Luna Roja (Muluc) - Flujo, drop of water inside a crescent basin
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M20 40 Q50 80 80 40" fill="none" stroke={strokeColor} strokeWidth="3" />
          <path d="M50 20 C35 45, 50 65, 50 65 C50 65, 65 45, 50 20 Z" fill={strokeColor} opacity="0.8" />
          <circle cx="50" cy="72" r="5" fill={strokeColor} />
          <line x1="15" y1="40" x2="85" y2="40" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      );

    case 10: // Perro Blanco (Oc) - Heart of Loyalty inside geometric triangular companion rings
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M18 35 L50 82 L82 35 Z" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 30 C50 30, 32 15, 32 35 C32 50, 50 65, 50 65 C50 65, 68 50, 68 35 C68 15, 50 30, 50 30 Z" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="40" r="4" fill={strokeColor} />
        </svg>
      );

    case 11: // Mono Azul (Chuen) - Magic, optical concentric rotating illusion
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="none" stroke={strokeColor} strokeWidth="2" />
          <rect x="30" y="30" width="40" height="40" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="12" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill={strokeColor} />
          <circle cx="50" cy="18" r="3.5" fill={strokeColor} />
          <circle cx="50" cy="82" r="3.5" fill={strokeColor} />
          <circle cx="18" cy="50" r="3.5" fill={strokeColor} />
          <circle cx="82" cy="50" r="3.5" fill={strokeColor} />
        </svg>
      );

    case 12: // Humano Amarillo (Eb) - Sacred chalice cup with spark of stellar decision above
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M25 35 L75 35 C75 55, 65 72, 50 72 C35 72, 25 55, 25 35 Z" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="50" y1="72" x2="50" y2="85" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="35" y1="85" x2="65" y2="85" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="20" r="6" fill={strokeColor} />
          <line x1="50" y1="10" x2="50" y2="30" stroke={strokeColor} strokeWidth="1" />
          <line x1="40" y1="20" x2="60" y2="20" stroke={strokeColor} strokeWidth="1" />
        </svg>
      );

    case 13: // Caminante del Cielo Rojo (Ben) - Sky traveler columns and portal
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <line x1="30" y1="20" x2="30" y2="80" stroke={strokeColor} strokeWidth="3" />
          <line x1="70" y1="20" x2="70" y2="80" stroke={strokeColor} strokeWidth="3" />
          <path d="M15 30 L85 30" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 70 L85 70" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="7" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M40 50 L60 50" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 14: // Mago Blanco (Ix) - Triangle of timelessness, wizard receptivity
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <polygon points="50,18 82,75 18,75" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="8" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="4" fill={strokeColor} />
          <circle cx="50" cy="32" r="3" fill={strokeColor} />
          <circle cx="38" cy="65" r="3" fill={strokeColor} />
          <circle cx="62" cy="65" r="3" fill={strokeColor} />
        </svg>
      );

    case 15: // Águila Azul (Men) - Spread wings, vision
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 50 L35 40 L50 20 L65 40 L85 50" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M20 60 Q50 40 80 60" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="60" r="10" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="60" r="4" fill={strokeColor} />
          <line x1="50" y1="20" x2="50" y2="40" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 16: // Guerrero Amarillo (Cib) - intelligence staff, shield & question
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 15 L50 85" stroke={strokeColor} strokeWidth="3" />
          <path d="M30 40 A20 20 0 1 1 70 40" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="40" r="8" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="40" r="3" fill={strokeColor} />
          <line x1="30" y1="60" x2="70" y2="60" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="72" r="4.5" fill={strokeColor} />
        </svg>
      );

    case 17: // Tierra Roja (Caban) - Earth navigation, beautiful spiral and concentric patterns
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          // Dynamic spiral of evolution
          <path d="M50 50 A 10 10 0 0 1 40 40 A 15 15 0 0 1 55 25 A 20 20 0 0 1 70 50 A 25 25 0 0 1 45 75 A 30 30 0 0 1 15 45" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" fill={strokeColor} />
          <line x1="50" y1="5" x2="50" y2="20" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="50" y1="80" x2="50" y2="95" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 18: // Espejo Blanco (Etznab) - Facing reflecting triangles (infinity clarity)
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <polygon points="50,15 80,45 20,45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <polygon points="50,85 80,55 20,55" fill="none" stroke={strokeColor} strokeWidth="2" />
          <line x1="15" y1="50" x2="85" y2="50" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="6" fill={strokeColor} />
        </svg>
      );

    case 19: // Tormenta Azul (Cauac) - Spark points, electric lightning rings
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 15 L35 45 L55 45 L40 85 M60 15 M45 15 L70 50 L50 50 L65 85" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="16" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" fill={strokeColor} />
        </svg>
      );

    case 20: // Sol Amarillo (Ahau) - ultimate light, perfect solar geometry with radial rays
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="22" fill="none" stroke={strokeColor} strokeWidth="3" />
          <circle cx="50" cy="50" r="8" fill={strokeColor} />
          {/* Radial light rays around */}
          <line x1="50" y1="12" x2="50" y2="20" stroke={strokeColor} strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="88" stroke={strokeColor} strokeWidth="2" />
          <line x1="12" y1="50" x2="20" y2="50" stroke={strokeColor} strokeWidth="2" />
          <line x1="80" y1="50" x2="88" y2="50" stroke={strokeColor} strokeWidth="2" />
          <line x1="23" y1="23" x2="29" y2="29" stroke={strokeColor} strokeWidth="2" />
          <line x1="71" y1="71" x2="77" y2="77" stroke={strokeColor} strokeWidth="2" />
          <line x1="77" y1="23" x2="71" y2="29" stroke={strokeColor} strokeWidth="2" />
          <line x1="29" y1="71" x2="23" y2="77" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} id={`sello-glifo-${selloId}`}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M50 10 L65 40 L90 50 L65 60 L50 90 L35 60 L10 50 L35 40 Z" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill={secondaryColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
      );
  }
}
