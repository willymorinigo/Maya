export interface Sello {
  id: number; // 1 to 20
  nombre: string; // e.g. "Dragón Rojo"
  nombreMaya: string; // e.g. "Imix"
  color: "rojo" | "blanco" | "azul" | "amarillo";
  colorHex: string; // Tailwind color or custom hex
  direccion: "Este" | "Norte" | "Oeste" | "Sur";
  palabrasClave: string[]; // e.g. ["Nutrir", "Nacimiento", "Ser"]
  accion: string; // e.g. "Nutre"
  poder: string; // e.g. "El Nacimiento"
  esencia: string; // e.g. "El Ser"
  arquetipo: string; // e.g. "La Fuerza Primordial"
  descripcionCorta: string;
}

export interface Tono {
  id: number; // 1 to 13
  nombre: string; // e.g. "Magnético"
  nombreMaya: string; // e.g. "Hun"
  accion: string; // e.g. "Atraer"
  poder: string; // e.g. "Unificar"
  esencia: string; // e.g. "El Propósito"
  descripcionCorta: string;
}

export interface OraculoDestino {
  destino: Sello;
  tonoDestino: Tono;
  guia: Sello;
  analogo: Sello;
  antipoda: Sello;
  oculto: Sello;
}

export interface KinData {
  kin: number;
  sello: Sello;
  tono: Tono;
  oraculo: OraculoDestino;
  ondaEncantadaNum: number;
  ondaEncantadaSello: Sello;
}

export interface GeminiReading {
  interpretacionPersonalizada: string;
  misionDeVida: string;
  consejoSignatura: string;
  oraculoInsighs: {
    guia: string;
    analogo: string;
    antipoda: string;
    oculto: string;
  };
  consejosDiarios: string;
  energiaDelDia?: string;
  prediccionSincronicidad?: string;
}

// Static Definitions
export const SELLOS: Sello[] = [
  {
    id: 1,
    nombre: "Dragón Rojo",
    nombreMaya: "Imix",
    color: "rojo",
    colorHex: "#EF4444",
    direccion: "Este",
    palabrasClave: ["Nutrir", "Nacimiento", "Ser"],
    accion: "Nutre",
    poder: "El Nacimiento",
    esencia: "El Ser",
    arquetipo: "El Iniciador Primordial o Madre Ancestral",
    descripcionCorta: "Fuerza originaria creadora de vida. Simboliza el inicio, la nutrición materna y la memoria de nuestras raíces cósmicas."
  },
  {
    id: 2,
    nombre: "Viento Blanco",
    nombreMaya: "Ik",
    color: "blanco",
    colorHex: "#71717A",
    direccion: "Norte",
    palabrasClave: ["Comunicar", "Espíritu", "Aliento"],
    accion: "Comunica",
    poder: "El Espíritu",
    esencia: "El Aliento",
    arquetipo: "El Comunicador Galáctico o Poeta de la Verdad",
    descripcionCorta: "Poder de la comunicación sagrada y el flujo de energía. Representa la purificación del aire del alma y el aliento creador."
  },
  {
    id: 3,
    nombre: "Noche Azul",
    nombreMaya: "Akbal",
    color: "azul",
    colorHex: "#3B82F6",
    direccion: "Oeste",
    palabrasClave: ["Soñar", "Abundancia", "Intuición"],
    accion: "Sueña",
    poder: "La Abundancia",
    esencia: "La Intuición",
    arquetipo: "El Soñador del Cosmos o Guardián del Templo",
    descripcionCorta: "Acceso al santuario interno del subconsciente. Representa la intuición, los sueños lúcidos y la abundancia espiritual inagotable."
  },
  {
    id: 4,
    nombre: "Semilla Amarilla",
    nombreMaya: "Kan",
    color: "amarillo",
    colorHex: "#EAB308",
    direccion: "Sur",
    palabrasClave: ["Atinar", "Florecimiento", "Atención"],
    accion: "Atina",
    poder: "El Florecimiento",
    esencia: "La Atención (Consciencia)",
    arquetipo: "El Sembrador de Estrellas o El Sabio Paciente",
    descripcionCorta: "La semilla que rompe su cáscara con pura consciencia para florecer. Representa el potencial latente, la puntería, y el desarrollo."
  },
  {
    id: 5,
    nombre: "Serpiente Roja",
    nombreMaya: "Chicchan",
    color: "rojo",
    colorHex: "#EF4444",
    direccion: "Este",
    palabrasClave: ["Sobrevivir", "Fuerza Vital", "Instinto"],
    accion: "Sobrevive",
    poder: "La Fuerza Vital",
    esencia: "El Instinto (Cuerpo)",
    arquetipo: "La Sabiduría del Cuerpo o Kundalini Sagrada",
    descripcionCorta: "La energía de la pasión, el instinto de supervivencia física y divina. Simboliza la transmutación y la regeneración celular."
  },
  {
    id: 6,
    nombre: "Enlazador de Mundos Blanco",
    nombreMaya: "Cimi",
    color: "blanco",
    colorHex: "#71717A",
    direccion: "Norte",
    palabrasClave: ["Igualar", "Muerte", "Oportunidad"],
    accion: "Ecuanimiza (Iguala)",
    poder: "La Muerte (Trascendencia)",
    esencia: "La Oportunidad (Puente)",
    arquetipo: "El Conector de Planos o Sanador Desapegado",
    descripcionCorta: "El puente de paso entre dimensiones. Simboliza la transmutación a través del desapego y el renacimiento espiritual."
  },
  {
    id: 7,
    nombre: "Mano Azul",
    nombreMaya: "Manik",
    color: "azul",
    colorHex: "#3B82F6",
    direccion: "Oeste",
    palabrasClave: ["Conocer", "Realización", "Sanación"],
    accion: "Conoce",
    poder: "La Realización",
    esencia: "La Sanación (Hacer)",
    arquetipo: "El Sanador con las Manos o Avatar de la Creación",
    descripcionCorta: "El poder creador del dar y del hacer que sana y realiza los planos espirituales. Representa la destreza y el fin de los ciclos."
  },
  {
    id: 8,
    nombre: "Estrella Amarilla",
    nombreMaya: "Lamat",
    color: "amarillo",
    colorHex: "#EAB308",
    direccion: "Sur",
    palabrasClave: ["Embellecer", "Arte", "Elegancia"],
    accion: "Embellece",
    poder: "El Arte",
    esencia: "La Elegancia",
    arquetipo: "El Artista Cósmico o Estrella Radiante",
    descripcionCorta: "Sintonía cósmico-estética que embellece la Tierra. Inspira el arte, la elegancia fluida del ser y la armonía cósmica."
  },
  {
    id: 9,
    nombre: "Luna Roja",
    nombreMaya: "Muluc",
    color: "rojo",
    colorHex: "#EF4444",
    direccion: "Este",
    palabrasClave: ["Purificar", "Agua Universal", "Flujo"],
    accion: "Purifica",
    poder: "El Agua Universal",
    esencia: "El Flujo",
    arquetipo: "La Guardiana de las Aguas o El Canal Puro",
    direccionSignos: "Guía de la corriente emocional y el despertar espiritual a través de la purificación continua."
  } as unknown as Sello, // Satisfy shape but we can clean next
];

// Let's create a robust version of SELLOS with exactly 20 elements
export const TODOS_SELLOS: Sello[] = [
  {
    id: 1,
    nombre: "Dragón Rojo",
    nombreMaya: "Imix",
    color: "rojo",
    colorHex: "#F87171",
    direccion: "Este",
    palabrasClave: ["Nutrir", "Nacimiento", "Ser"],
    accion: "Nutre",
    poder: "El Nacimiento",
    esencia: "El Ser",
    arquetipo: "La Gran Madre Celeste",
    descripcionCorta: "Fuerza primordial creadora. Simboliza el origen, el cuidado incondicional, la nutrición materna de las ideas y proyectos, y la memoria cósmica."
  },
  {
    id: 2,
    nombre: "Viento Blanco",
    nombreMaya: "Ik",
    color: "blanco",
    colorHex: "#E2E8F0",
    direccion: "Norte",
    palabrasClave: ["Comunicar", "Espíritu", "Aliento"],
    accion: "Comunica",
    poder: "El Espíritu",
    esencia: "El Aliento",
    arquetipo: "El Mensajero Alado",
    descripcionCorta: "Poder de la comunicación sagrada y el flujo de energía. Representa la voz interior, el aliento vital de las ideas y la inspiración del espíritu."
  },
  {
    id: 3,
    nombre: "Noche Azul",
    nombreMaya: "Akbal",
    color: "azul",
    colorHex: "#60A5FA",
    direccion: "Oeste",
    palabrasClave: ["Soñar", "Abundancia", "Intuición"],
    accion: "Sueña",
    poder: "La Abundancia",
    esencia: "La Intuición",
    arquetipo: "El Soñador del Templo",
    descripcionCorta: "El santuario de la psique interna y el misterio. Fomenta los sueños vívidos, la autoconsciencia a través de la introspección y la abundancia inagotable."
  },
  {
    id: 4,
    nombre: "Semilla Amarilla",
    nombreMaya: "Kan",
    color: "amarillo",
    colorHex: "#FBBF24",
    direccion: "Sur",
    palabrasClave: ["Atinar", "Florecimiento", "Atención"],
    accion: "Atina",
    poder: "El Florecimiento",
    esencia: "La Atención (Consciencia)",
    arquetipo: "El Sembrador Cósmico",
    descripcionCorta: "El despertar de los potenciales ocultos a través del enfoque. Fomenta el crecimiento intencional, la fertilidad espiritual y la manifestación de metas."
  },
  {
    id: 5,
    nombre: "Serpiente Roja",
    nombreMaya: "Chicchan",
    color: "rojo",
    colorHex: "#F87171",
    direccion: "Este",
    palabrasClave: ["Sobrevivir", "Fuerza Vital", "Instinto"],
    accion: "Sobrevive",
    poder: "La Fuerza Vital",
    esencia: "El Instinto",
    arquetipo: "La Sabiduría de la Kundalini",
    descripcionCorta: "Energía instintiva vital, sabiduría carnal y mística. Enseña a escuchar los mensajes sutiles de la corporeidad y favorece la regeneración."
  },
  {
    id: 6,
    nombre: "Enlazador de Mundos Blanco",
    nombreMaya: "Cimi",
    color: "blanco",
    colorHex: "#E2E8F0",
    direccion: "Norte",
    palabrasClave: ["Igualar", "Muerte", "Oportunidad"],
    accion: "Ecuanimiza (Iguala)",
    poder: "La Muerte (Trascendencia)",
    esencia: "La Oportunidad",
    arquetipo: "El Puente entre Modos",
    descripcionCorta: "Capacidad de dejar ir lo estancado para abrir espacio a lo nuevo. Enseña a cerrar ciclos elegantemente y a conectar mundos diversos."
  },
  {
    id: 7,
    nombre: "Mano Azul",
    nombreMaya: "Manik",
    color: "azul",
    colorHex: "#60A5FA",
    direccion: "Oeste",
    palabrasClave: ["Conocer", "Realización", "Sanación"],
    accion: "Conoce",
    poder: "La Realización (Ejecución)",
    esencia: "La Sanación (Hacer)",
    arquetipo: "El Sanador de Almas",
    descripcionCorta: "El don supremo de la sanación creativa mediante las manos. Representa completar tareas, el conocimiento empírico y la restauración de la salud entera."
  },
  {
    id: 8,
    nombre: "Estrella Amarilla",
    nombreMaya: "Lamat",
    color: "amarillo",
    colorHex: "#FBBF24",
    direccion: "Sur",
    palabrasClave: ["Embellecer", "Arte", "Elegancia"],
    accion: "Embellece",
    poder: "El Arte",
    esencia: "La Elegancia",
    arquetipo: "El Artista de Dimensiones",
    descripcionCorta: "La vibración armónica del universo hecha geometría divina. Fomenta la expresión artística, el sentido de la elegancia pura y el orden estético del alma."
  },
  {
    id: 9,
    nombre: "Luna Roja",
    nombreMaya: "Muluc",
    color: "rojo",
    colorHex: "#F87171",
    direccion: "Este",
    palabrasClave: ["Purificar", "Agua Universal", "Flujo"],
    accion: "Purifica",
    poder: "El Agua Universal",
    esencia: "El Flujo",
    arquetipo: "La Flautista Divina (El Canal)",
    descripcionCorta: "Acceso al torrente de la emoción pura. Representa el flujo dinámico de la vida y el agua portadora de sabiduría espiritual."
  },
  {
    id: 10,
    nombre: "Perro Blanco",
    nombreMaya: "Oc",
    color: "blanco",
    colorHex: "#E2E8F0",
    direccion: "Norte",
    palabrasClave: ["Amar", "Corazón", "Lealtad"],
    accion: "Ama",
    poder: "El Corazón",
    esencia: "La Lealtad",
    arquetipo: "El Compañero Fiel",
    descripcionCorta: "El amor incondicional libre de juicios y la lealtad grupal. Fomenta el respeto a la verdad afectiva íntima y la fuerza colectiva fraterna."
  },
  {
    id: 11,
    nombre: "Mono Azul",
    nombreMaya: "Chuen",
    color: "azul",
    colorHex: "#60A5FA",
    direccion: "Oeste",
    palabrasClave: ["Jugar", "Magia", "Ilusión"],
    accion: "Juega",
    poder: "La Magia",
    esencia: "La Ilusión (Humor)",
    arquetipo: "El Alquimista Travieso",
    descripcionCorta: "El bufón sagrado que deconstruye la rigidez con humor. Enseña a ver la vida como un juego espiritual ligero y desactiva la pesadez mental."
  },
  {
    id: 12,
    nombre: "Humano Amarillo",
    nombreMaya: "Eb",
    color: "amarillo",
    colorHex: "#FBBF24",
    direccion: "Sur",
    palabrasClave: ["Influenciar", "Sabiduría", "Libre Albedrío"],
    accion: "Influencia",
    poder: "El Libre Albedrío",
    esencia: "La Sabiduría",
    arquetipo: "El Cáliz Vacío (El Sabio)",
    descripcionCorta: "Contenedor de la sabiduría superior que decide conscientemente. Fomenta el respeto a las decisiones propias y la autolimitación iluminada."
  },
  {
    id: 13,
    nombre: "Caminante del Cielo Rojo",
    nombreMaya: "Ben",
    color: "rojo",
    colorHex: "#F87171",
    direccion: "Este",
    palabrasClave: ["Explorar", "Espacio", "Vigilancia"],
    accion: "Explora",
    poder: "El Espacio",
    esencia: "La Vigilancia",
    arquetipo: "El Arqueólogo Cósmico",
    descripcionCorta: "El viajero estelar que enlaza el cielo con la tierra física. Propicia la salida de las zonas de confort, la exploración osada de límites y el despertar."
  },
  {
    id: 14,
    nombre: "Mago Blanco",
    nombreMaya: "Ix",
    color: "blanco",
    colorHex: "#E2E8F0",
    direccion: "Norte",
    palabrasClave: ["Encantar", "Receptividad", "Atemporalidad"],
    accion: "Encanta",
    poder: "La Atemporalidad",
    esencia: "La Receptividad",
    arquetipo: "El Chamán del Universo",
    descripcionCorta: "El alineamiento con el presente eterno (el aquí y ahora). Despierta el magnetismo del corazón, los poderes psíquicos y la magia receptiva meditativa."
  },
  {
    id: 15,
    nombre: "Águila Azul",
    nombreMaya: "Men",
    color: "azul",
    colorHex: "#60A5FA",
    direccion: "Oeste",
    palabrasClave: ["Crear", "Mente", "Visión"],
    accion: "Crea",
    poder: "La Visión",
    esencia: "La Mente (Mente global)",
    arquetipo: "El Visionario del Plan",
    descripcionCorta: "La perspectiva del vuelo de altura que todo lo comprende. Fomenta el poder mental de creación, los proyectos amplios y el liderazgo agudo."
  },
  {
    id: 16,
    nombre: "Guerrero Amarillo",
    nombreMaya: "Cib",
    color: "amarillo",
    colorHex: "#FBBF24",
    direccion: "Sur",
    palabrasClave: ["Cuestionar", "Inteligencia", "Osadía"],
    accion: "Cuestiona",
    poder: "La Inteligencia",
    esencia: "La Osadía",
    arquetipo: "El Guerrero de Luz Sutil",
    descripcionCorta: "La osadía del corazón alineado con la sabiduría del silencio. Fomenta el cuestionamiento sagrado del status quo y la valentía inteligente."
  },
  {
    id: 17,
    nombre: "Tierra Roja",
    nombreMaya: "Caban",
    color: "rojo",
    colorHex: "#F87171",
    direccion: "Este",
    palabrasClave: ["Evolucionar", "Navegación", "Sincronicidad"],
    accion: "Evoluciona",
    poder: "La Navegación (Centramiento)",
    esencia: "La Sincronicidad",
    arquetipo: "El Navegante Terrestre",
    descripcionCorta: "El centramiento en los ritmos sanos de la Madre Tierra (Gaia). Atrae señales, sintoniza sincronicidades cósmicas y cultiva la evolución cíclica."
  },
  {
    id: 18,
    nombre: "Espejo Blanco",
    nombreMaya: "Etznab",
    color: "blanco",
    colorHex: "#E2E8F0",
    direccion: "Norte",
    palabrasClave: ["Reflejar", "Orden", "Sin Fin"],
    accion: "Refleja",
    poder: "El Sin Fin (Claridad)",
    esencia: "El Orden (Rigurosidad)",
    arquetipo: "El Cortador de Purificación / El Espejo Sagrado",
    descripcionCorta: "El reflejo impecable de la verdad cósmica, que corta toda ilusión perversa. Enseña a verse en los demás sin juzgar y a estructurar templos puros."
  },
  {
    id: 19,
    nombre: "Tormenta Azul",
    nombreMaya: "Cauac",
    color: "azul",
    colorHex: "#60A5FA",
    direccion: "Oeste",
    palabrasClave: ["Catalizar", "Autogeneración", "Energía"],
    accion: "Cataliza",
    poder: "La Autogeneración",
    esencia: "La Energía",
    arquetipo: "El Transformador Cósmico",
    descripcionCorta: "La purificación mediante el fuego eléctrico del catalizador. Fomenta la renovación profunda, la autotransformación radical y aporta inmensa fuerza activa."
  },
  {
    id: 20,
    nombre: "Sol Amarillo",
    nombreMaya: "Ahau",
    color: "amarillo",
    colorHex: "#FBBF24",
    direccion: "Sur",
    palabrasClave: ["Iluminar", "Fuego Universal", "Vida"],
    accion: "Ilumina",
    poder: "El Fuego Universal",
    esencia: "La Vida (Luz primordial)",
    arquetipo: "El Ser Iluminado",
    descripcionCorta: "La iluminación solar del cristo encarnado. Representa la conclusión cósmica de las metas, el amor incondicional, la felicidad alegre y la luz que sana."
  }
];

export const TONOS: Tono[] = [
  {
    id: 1,
    nombre: "Magnético",
    nombreMaya: "Hun",
    accion: "Atraer",
    poder: "Unificar",
    esencia: "El Propósito",
    descripcionCorta: "Unifica las intenciones del ser. Es el inicio, la atracción magnética que convoca las fuerzas primarias hacia una gran meta."
  },
  {
    id: 2,
    nombre: "Lunar",
    nombreMaya: "Ka",
    accion: "Estabilizar",
    poder: "Polarizar",
    esencia: "El Desafío",
    descripcionCorta: "La tensión sagrada de la polaridad creadora. Estabiliza el ser a través del reconocimiento de la luz y la sombra como complementos íntegros."
  },
  {
    id: 3,
    nombre: "Eléctrico",
    nombreMaya: "Ox",
    accion: "Vincular",
    poder: "Activar",
    esencia: "El Servicio",
    descripcionCorta: "Activa e imanta el servicio de la vida. Teje redes de sintonía fina con los demás para activar la sinergia constructora."
  },
  {
    id: 4,
    nombre: "Autoexistente",
    nombreMaya: "Kan",
    accion: "Medir",
    poder: "Definir",
    esencia: "La Forma",
    descripcionCorta: "Otorga estructura práctica y cimientos lógicos. Mide y delimita la forma idónea en que la intención cósmica se ancla materialmente."
  },
  {
    id: 5,
    nombre: "Entonado",
    nombreMaya: "Ho",
    accion: "Comandar",
    poder: "Reunir Recursos",
    esencia: "El Radicar (Esplendor)",
    descripcionCorta: "El centro empoderador que asume el mando. Fomenta el resurgimiento del liderazgo de autogobierno y reúne las herramientas para el éxito entero."
  },
  {
    id: 6,
    nombre: "Rítmico",
    nombreMaya: "Uac",
    accion: "Organizar",
    poder: "Equilibrar",
    esencia: "La Igualdad",
    descripcionCorta: "Orden orgánico fluente que imita el latido de la biosfera. Equilibra la acción mediante la alternancia y el pulso cíclico justo."
  },
  {
    id: 7,
    nombre: "Resonante",
    nombreMaya: "Uac", // Uuc (7)
    accion: "Canalizar",
    poder: "Inspirar",
    esencia: "La Sintonía",
    descripcionCorta: "El puente místico de receptividad limpia. Canaliza la voz del Espíritu sintonizando la mente individual con el Corazón del Universo (Hunab Ku)."
  },
  {
    id: 8,
    nombre: "Galáctico",
    nombreMaya: "Uaxac",
    accion: "Modelar",
    poder: "Armonizar",
    esencia: "La Integridad",
    descripcionCorta: "La congruencia divina reflejada en el diario vivir. Nos invita a vivir de acuerdo a nuestra más alta ética espiritual integral."
  },
  {
    id: 9,
    nombre: "Solar",
    nombreMaya: "Bolon",
    accion: "Realizar",
    poder: "Pulsar",
    esencia: "La Intención",
    descripcionCorta: "La pulsación activa permanente del astro rey. Moviliza la fuerza de voluntad suprema hacia la materialización de los grandes ideales."
  },
  {
    id: 10,
    nombre: "Planetario",
    nombreMaya: "Lahun",
    accion: "Producir",
    poder: "Perfeccionar",
    esencia: "La Manifestación",
    descripcionCorta: "El aterrizaje definitivo de la forma divina en los frutos tangibles de la tierra. Manifiesta el fruto óptimo del plan soñado."
  },
  {
    id: 11,
    nombre: "Espectral",
    nombreMaya: "Buluc",
    accion: "Divulgar",
    poder: "Disolver",
    esencia: "La Liberación",
    descripcionCorta: "El desmantelamiento liberador de la estructura inútil. Disuelve ataduras físicas o mentales del ser mediante un profundo desapego."
  },
  {
    id: 12,
    nombre: "Cristal",
    nombreMaya: "Lahca",
    accion: "Universalizar",
    poder: "Cooperar",
    esencia: "La Cooperación",
    descripcionCorta: "La asamblea cósmica de las almas purificadas. Invita al intercambio dialogado sincero y al amor de la reciprocidad comunitaria."
  },
  {
    id: 13,
    nombre: "Cósmico",
    nombreMaya: "Oxlahun",
    accion: "Trascender",
    poder: "Perdurar",
    esencia: "La Presencia",
    descripcionCorta: "El vuelo final de retorno al Uno cósmico. Disfruta de la suprema trascendencia, imbuido en la absoluta presencia atemporal duradera."
  }
];
