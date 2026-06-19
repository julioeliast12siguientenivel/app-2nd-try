import { useState, useEffect } from "react";

const PRIMARY = "#DF4142";
const ACCENT = "#3C8786";
const DARK = "#171717";
const LIGHT_BG = "#f6f7f9";
const WHITE = "#ffffff";
const MILITARY_GREEN = "#3B5323";
const MILITARY_DARK = "#2C3E1F";
const MILITARY_LIGHT = "#6B8C42";

const questions = [
  {
    id: 1,
    type: "single",
    title: "¿Cuál es tu objetivo principal?",
    subtitle: "Selecciona la opción que mejor te describe",
    icon: "🎯",
    options: [
      { id: "a", label: "Perder grasa corporal", emoji: "🔥" },
      { id: "b", label: "Ganar músculo y fuerza", emoji: "💪" },
      { id: "c", label: "Mejorar resistencia militar", emoji: "🪖" },
      { id: "d", label: "Dominar el peso corporal", emoji: "⚡" },
    ],
  },
  {
    id: 2,
    type: "single",
    title: "¿Cuál es tu nivel actual de condición física?",
    subtitle: "Sé honesto para obtener el mejor plan",
    icon: "📊",
    options: [
      { id: "a", label: "Principiante — Menos de 6 meses", emoji: "🌱" },
      { id: "b", label: "Intermedio — 6 meses a 2 años", emoji: "🌿" },
      { id: "c", label: "Avanzado — Más de 2 años", emoji: "🌳" },
      { id: "d", label: "Atleta — Entrenamiento de élite", emoji: "🏆" },
    ],
  },
  {
    id: 3,
    type: "single",
    title: "¿Cuántos días por semana puedes entrenar?",
    subtitle: "Diseñaremos tu plan según tu disponibilidad",
    icon: "📅",
    options: [
      { id: "a", label: "2–3 días por semana", emoji: "🕐" },
      { id: "b", label: "4–5 días por semana", emoji: "🕑" },
      { id: "c", label: "6–7 días por semana", emoji: "🕒" },
      { id: "d", label: "Cada día, sin excusas", emoji: "⚔️" },
    ],
  },
  {
    id: 4,
    type: "single",
    title: "¿Cuánto tiempo tienes por sesión?",
    subtitle: "Optimizaremos cada minuto de tu entrenamiento",
    icon: "⏱️",
    options: [
      { id: "a", label: "15–20 minutos", emoji: "⚡" },
      { id: "b", label: "30–45 minutos", emoji: "💥" },
      { id: "c", label: "45–60 minutos", emoji: "🔥" },
      { id: "d", label: "Más de 60 minutos", emoji: "🪖" },
    ],
  },
  {
    id: 5,
    type: "single",
    title: "¿Dónde realizas tu entrenamiento?",
    subtitle: "Adaptamos los ejercicios a tu entorno",
    icon: "📍",
    options: [
      { id: "a", label: "En casa sin equipamiento", emoji: "🏠" },
      { id: "b", label: "Al aire libre / parque", emoji: "🌲" },
      { id: "c", label: "Gimnasio o instalación militar", emoji: "🏋️" },
      { id: "d", label: "Cualquier lugar, soy adaptable", emoji: "🗺️" },
    ],
  },
  {
    id: 6,
    type: "single",
    title: "¿Qué ejercicio de calistenia te resulta más desafiante?",
    subtitle: "Identificamos tus áreas de mejora",
    icon: "🏋️",
    options: [
      { id: "a", label: "Flexiones (Push-ups)", emoji: "🤸" },
      { id: "b", label: "Dominadas (Pull-ups)", emoji: "🔝" },
      { id: "c", label: "Fondos (Dips)", emoji: "💪" },
      { id: "d", label: "Pistol Squats", emoji: "🦵" },
    ],
  },
  {
    id: 7,
    type: "single",
    title: "¿Has seguido algún programa de entrenamiento militar antes?",
    subtitle: "Esto nos ayuda a calibrar la intensidad",
    icon: "🪖",
    options: [
      { id: "a", label: "No, es mi primera vez", emoji: "🆕" },
      { id: "b", label: "Sí, pero lo dejé", emoji: "🔄" },
      { id: "c", label: "Sí, lo completé con éxito", emoji: "✅" },
      { id: "d", label: "Tengo experiencia militar real", emoji: "🎖️" },
    ],
  },
  {
    id: 8,
    type: "single",
    title: "¿Qué te motiva más a entrenar?",
    subtitle: "La motivación correcta impulsa resultados reales",
    icon: "🔥",
    options: [
      { id: "a", label: "Disciplina y superación personal", emoji: "⚔️" },
      { id: "b", label: "Verse y sentirse mejor", emoji: "🪞" },
      { id: "c", label: "Salud y longevidad", emoji: "❤️" },
      { id: "d", label: "Competición y desafíos", emoji: "🏅" },
    ],
  },
  {
    id: 9,
    type: "single",
    title: "¿Tienes alguna limitación física o lesión?",
    subtitle: "Tu seguridad es nuestra prioridad",
    icon: "🩺",
    options: [
      { id: "a", label: "No, estoy en perfectas condiciones", emoji: "💯" },
      { id: "b", label: "Lesión en hombros o espalda alta", emoji: "🔴" },
      { id: "c", label: "Lesión en rodillas o piernas", emoji: "🟠" },
      { id: "d", label: "Otras limitaciones menores", emoji: "🟡" },
    ],
  },
  {
    id: 10,
    type: "input",
    title: "¿Cuál es tu edad?",
    subtitle: "Personalizamos la intensidad según tu etapa de vida",
    icon: "🎂",
    placeholder: "Ingresa tu edad",
    inputType: "number",
  },
];

const plans = [
  {
    id: "basic",
    name: "Soldado",
    price: "9.99",
    period: "mes",
    color: MILITARY_GREEN,
    features: [
      "Plan de 4 semanas personalizado",
      "30+ ejercicios de calistenia",
      "Seguimiento de progreso básico",
      "Videos demostrativos",
      "Soporte por email",
    ],
    badge: null,
  },
  {
    id: "elite",
    name: "Élite",
    price: "19.99",
    period: "mes",
    color: PRIMARY,
    features: [
      "Plan de 12 semanas adaptativo",
      "100+ ejercicios militares",
      "IA de seguimiento avanzado",
      "Nutrición militar incluida",
      "Coach virtual 24/7",
      "Comunidad exclusiva",
      "Acceso de por vida a actualizaciones",
    ],
    badge: "MÁS POPULAR",
  },
  {
    id: "commander",
    name: "Comandante",
    price: "49.99",
    period: "mes",
    color: ACCENT,
    features: [
      "Todo en Élite +",
      "Sesiones 1:1 con entrenador",
      "Plan 100% personalizado",
      "Análisis biomecánico",
      "Acceso anticipado a novedades",
      "Certificado de completación",
    ],
    badge: "PREMIUM",
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    age: 28,
    result: "Perdí 12 kg en 3 meses",
    text: "El programa militar calisténico cambió mi vida. Nunca pensé que podría hacer 50 dominadas seguidas.",
    avatar: "💪",
    stars: 5,
  },
  {
    name: "Ana R.",
    age: 34,
    result: "Ganó 8 kg de músculo",
    text: "Como madre de dos hijos, entreno 30 minutos al día y los resultados son increíbles. ¡Metodología élite!",
    avatar: "🔥",
    stars: 5,
  },
  {
    name: "Miguel T.",
    age: 22,
    result: "De 0 a 100 flexiones",
    text: "Vine sin saber hacer una dominada. En 8 semanas completé mi primer muscle-up. Brutal el sistema.",
    avatar: "⚡",
    stars: 5,
  },
];

const stats = [
  { value: "250K+", label: "Usuarios activos" },
  { value: "4.9★", label: "Calificación media" },
  { value: "89%", label: "Alcanzan su meta" },
  { value: "12 sem", label: "Para ver resultados" },
];

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | result | plans | success
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputVal, setInputVal] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [selectedPlan, setSelectedPlan] = useState("elite");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = ((currentQ + 1) / questions.length) * 100;

  useEffect(() => {
    if (screen === "success") {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers({});
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setTimeout(() => {
      const newAnswers = { ...answers, [questions[currentQ].id]: optionId };
      setAnswers(newAnswers);
      goNext(newAnswers);
    }, 300);
  };

  const goNext = (newAnswers) => {
    if (animating) return;
    setDirection("forward");
    setAnimating(true);
    setTimeout(() => {
      setSelectedOption(null);
      setInputVal("");
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setScreen("result");
      }
      setAnimating(false);
    }, 350);
  };

  const goBack = () => {
    if (animating || currentQ === 0) return;
    setDirection("back");
    setAnimating(true);
    setTimeout(() => {
      setCurrentQ((q) => q - 1);
      setSelectedOption(null);
      setInputVal("");
      setAnimating(false);
    }, 350);
  };

  const handleInputNext = () => {
    if (!inputVal || isNaN(inputVal) || inputVal < 10 || inputVal > 100) return;
    const newAnswers = { ...answers, [questions[currentQ].id]: inputVal };
    setAnswers(newAnswers);
    goNext(newAnswers);
  };

  const handleEmailSubmit = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor ingresa un email válido");
      return;
    }
    setEmailError("");
    setScreen("success");
  };

  const getResultProfile = () => {
    const goal = answers[1];
    const level = answers[2];
    if (goal === "c" || goal === "d") {
      return {
        title: "Perfil: Guerrero Calisténico",
        description:
          "Estás listo para el entrenamiento de élite. Tu mentalidad y objetivos coinciden perfectamente con el programa Military Calisthenics Elite.",
        icon: "🪖",
        color: MILITARY_GREEN,
        weeks: 12,
        intensity: "Alta",
        focus: "Dominio del peso corporal + Resistencia militar",
      };
    }
    if (level === "c" || level === "d") {
      return {
        title: "Perfil: Atleta Avanzado",
        description:
          "Tu experiencia te permite acceder al protocolo avanzado de calistenia militar. Prepárate para superar tus límites.",
        icon: "⚡",
        color: PRIMARY,
        weeks: 10,
        intensity: "Muy alta",
        focus: "Fuerza + Potencia explosiva",
      };
    }
    return {
      title: "Perfil: Recluta de Élite",
      description:
        "Tienes las bases para transformarte. El programa está diseñado para llevarte desde tu punto actual hasta el nivel de élite en tiempo récord.",
      icon: "🔥",
      color: ACCENT,
      weeks: 8,
      intensity: "Progresiva",
      focus: "Fundamentos militares + Composición corporal",
    };
  };

  const profile = getResultProfile();

  const styles = {
    app: {
      minHeight: "100vh",
      background: WHITE,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
    },
    container: {
      width: "100%",
      maxWidth: "480px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      background: WHITE,
    },
    // INTRO SCREEN
    introWrapper: {
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${MILITARY_DARK} 0%, ${MILITARY_GREEN} 50%, ${MILITARY_LIGHT} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 0 40px 0",
      position: "relative",
      overflow: "hidden",
    },
    introPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(223,65,66,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(60,135,134,0.15) 0%, transparent 50%)`,
      pointerEvents: "none",
    },
    logoBar: {
      width: "100%",
      padding: "52px 24px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 2,
    },
    logoText: {
      fontSize: "13px",
      fontWeight: "700",
      color: "rgba(255,255,255,0.6)",
      letterSpacing: "3px",
      textTransform: "uppercase",
    },
    introContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 28px 0",
      position: "relative",
      zIndex: 2,
      textAlign: "center",
    },
    introBadge: {
      background: "rgba(223,65,66,0.2)",
      border: "1px solid rgba(223,65,66,0.5)",
      borderRadius: "20px",
      padding: "6px 16px",
      marginBottom: "20px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    introBadgeText: {
      color: "#FF8A8A",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
    introTitle: {
      fontSize: "36px",
      fontWeight: "900",
      color: WHITE,
      lineHeight: "1.1",
      marginBottom: "8px",
      textShadow: "0 2px 20px rgba(0,0,0,0.3)",
    },
    introTitleAccent: {
      color: "#FF6B6B",
      display: "block",
    },
    introSubtitle: {
      fontSize: "16px",
      color: "rgba(255,255,255,0.8)",
      lineHeight: "1.5",
      marginBottom: "28px",
      maxWidth: "320px",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      width: "100%",
      marginBottom: "28px",
    },
    statCard: {
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      padding: "14px",
      border: "1px solid rgba(255,255,255,0.15)",
      textAlign: "center",
    },
    statValue: {
      fontSize: "22px",
      fontWeight: "900",
      color: WHITE,
      display: "block",
    },
    statLabel: {
      fontSize: "11px",
      color: "rgba(255,255,255,0.65)",
      marginTop: "2px",
      display: "block",
    },
    introBottom: {
      width: "100%",
      padding: "0 28px",
      position: "relative",
      zIndex: 2,
    },
    primaryBtn: {
      width: "100%",
      background: `linear-gradient(135deg, ${PRIMARY} 0%, #FF5252 100%)`,
      color: WHITE,
      border: "none",
      borderRadius: "24px",
      padding: "18px 48px",
      fontSize: "17px",
      fontWeight: "800",
      cursor: "pointer",
      letterSpacing: "0.5px",
      boxShadow: `0 8px 32px rgba(223,65,66,0.4)`,
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    introNote: {
      textAlign: "center",
      color: "rgba(255,255,255,0.5)",
      fontSize: "12px",
      marginTop: "12px",
    },
    // QUIZ SCREEN
    quizHeader: {
      padding: "52px 20px 16px",
      background: WHITE,
      position: "sticky",
      top: 0,
      zIndex: 10,
      borderBottom: `1px solid rgba(23,23,23,0.06)`,
    },
    quizHeaderTop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "14px",
    },
    backBtn: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: LIGHT_BG,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      color: DARK,
      transition: "background 0.2s",
    },
    progressText: {
      fontSize: "13px",
      fontWeight: "600",
      color: "rgba(23,23,23,0.56)",
    },
    skipBtn: {
      fontSize: "13px",
      fontWeight: "600",
      color: ACCENT,
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    progressBarTrack: {
      height: "4px",
      background: "rgba(23,23,23,0.08)",
      borderRadius: "2px",
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      background: `linear-gradient(90deg, ${MILITARY_GREEN}, ${MILITARY_LIGHT})`,
      borderRadius: "2px",
      transition: "width 0.4s ease",
    },
    quizBody: {
      flex: 1,
      padding: "24px 20px 40px",
      overflowY: "auto",
    },
    questionIconWrap: {
      width: "64px",
      height: "64px",
      borderRadius: "20px",
      background: `${LIGHT_BG}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      marginBottom: "16px",
    },
    questionTitle: {
      fontSize: "22px",
      fontWeight: "800",
      color: DARK,
      lineHeight: "1.25",
      marginBottom: "6px",
    },
    questionSubtitle: {
      fontSize: "14px",
      color: "rgba(23,23,23,0.56)",
      marginBottom: "24px",
      lineHeight: "1.4",
    },
    optionsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    optionCard: (isSelected) => ({
      background: isSelected ? "#eff1f4" : WHITE,
      border: `2px solid ${isSelected ? MILITARY_GREEN : "#eff1f4"}`,
      borderRadius: "14px",
      padding: "16px 18px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      transition: "all 0.2s ease",
      transform: isSelected ? "scale(1.01)" : "scale(1)",
    }),
    optionEmoji: {
      fontSize: "24px",
      width: "40px",
      height: "40px",
      background: "rgba(23,23,23,0.04)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    optionLabel: (isSelected) => ({
      fontSize: "15px",
      fontWeight: isSelected ? "700" : "500",
      color: isSelected ? MILITARY_DARK : DARK,
      flex: 1,
    }),
    optionCheck: (isSelected) => ({
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      border: `2px solid ${isSelected ? MILITARY_GREEN : "rgba(23,23,23,0.2)"}`,
      background: isSelected ? MILITARY_GREEN : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.2s",
    }),
    inputWrap: {
      marginTop: "8px",
    },
    inputField: {
      width: "100%",
      padding: "16px 18px",
      borderRadius: "14px",
      border: `2px solid rgba(23,23,23,0.08)`,
      background: LIGHT_BG,
      fontSize: "18px",
      fontWeight: "600",
      color: DARK,
      outline: "none",
      boxSizing: "border-box",
      transition: "border 0.2s",
    },
    nextBtn: (disabled) => ({
      width: "100%",
      background: disabled
        ? "rgba(23,23,23,0.12)"
        : `linear-gradient(135deg, ${MILITARY_GREEN} 0%, ${MILITARY_LIGHT} 100%)`,
      color: disabled ? "rgba(23,23,23,0.4)" : WHITE,
      border: "none",
      borderRadius: "24px",
      padding: "17px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: disabled ? "not-allowed" : "pointer",
      marginTop: "24px",
      transition: "all 0.2s",
      boxShadow: disabled ? "none" : "0 6px 20px rgba(59,83,35,0.35)",
    }),
    // Animaciones quiz
    slideEnter: (dir) => ({
      opacity: 1,
      transform: "translateX(0)",
      transition: "all 0.35s ease",
    }),
    slideExit: (dir) => ({
      opacity: 0,
      transform: dir === "forward" ? "translateX(-40px)" : "translateX(40px)",
      transition: "all 0.35s ease",
    }),
    // RESULT SCREEN
    resultWrapper: {
      minHeight: "100vh",
      background: WHITE,
      display: "flex",
      flexDirection: "column",
    },
    resultHero: {
      background: `linear-gradient(135deg, ${MILITARY_DARK} 0%, ${MILITARY_GREEN} 100%)`,
      padding: "52px 24px 40px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    resultHeroPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle at 70% 30%, rgba(223,65,66,0.2) 0%, transparent 60%)`,
      pointerEvents: "none",
    },
    resultBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(255,255,255,0.15)",
      borderRadius: "20px",
      padding: "6px 14px",
      marginBottom: "16px",
    },
    resultBadgeText: {
      color: WHITE,
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
    resultIcon: {
      fontSize: "56px",
      marginBottom: "16px",
      display: "block",
    },
    resultTitle: {
      fontSize: "24px",
      fontWeight: "900",
      color: WHITE,
      marginBottom: "10px",
      lineHeight: "1.2",
    },
    resultDesc: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.8)",
      lineHeight: "1.55",
      maxWidth: "340px",
      margin: "0 auto",
    },
    resultBody: {
      padding: "24px 20px 40px",
    },
    resultMetrics: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
      marginBottom: "28px",
    },
    metricCard: {
      background: LIGHT_BG,
      borderRadius: "14px",
      padding: "16px 10px",
      textAlign: "center",
    },
    metricValue: {
      fontSize: "20px",
      fontWeight: "900",
      color: MILITARY_GREEN,
      display: "block",
    },
    metricLabel: {
      fontSize: "11px",
      color: "rgba(23,23,23,0.56)",
      marginTop: "4px",
      display: "block",
      lineHeight: "1.3",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "800",
      color: DARK,
      marginBottom: "14px",
    },
    featureList: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "28px",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      background: LIGHT_BG,
      borderRadius: "12px",
    },
    featureCheck: {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: `rgba(59,83,35,0.12)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "14px",
    },
    featureText: {
      fontSize: "14px",
      fontWeight: "500",
      color: DARK,
    },
    ctaSection: {
      padding: "0 0 16px",
    },
    // PLANS SCREEN
    plansWrapper: {
      minHeight: "100vh",
      background: LIGHT_BG,
      display: "flex",
      flexDirection: "column",
    },
    plansHeader: {
      background: WHITE,
      padding: "52px 24px 24px",
      borderBottom: "1px solid rgba(23,23,23,0.06)",
    },
    plansTitle: {
      fontSize: "26px",
      fontWeight: "900",
      color: DARK,
      textAlign: "center",
      marginBottom: "8px",
    },
    plansSubtitle: {
      fontSize: "14px",
      color: "rgba(23,23,23,0.56)",
      textAlign: "center",
    },
    plansBody: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      flex: 1,
    },
    planCard: (isSelected, planColor) => ({
      background: WHITE,
      borderRadius: "20px",
      border: `2px solid ${isSelected ? planColor : "transparent"}`,
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: isSelected
        ? `0 8px 30px rgba(0,0,0,0.12)`
        : "0 2px 8px rgba(0,0,0,0.05)",
      transform: isSelected ? "scale(1.01)" : "scale(1)",
    }),
    planCardHeader: (planColor) => ({
      background: planColor,
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    planBadge: {
      background: "rgba(255,255,255,0.25)",
      borderRadius: "10px",
      padding: "3px 10px",
      fontSize: "10px",
      fontWeight: "800",
      color: WHITE,
      letterSpacing: "1px",
    },
    planName: {
      fontSize: "18px",
      fontWeight: "800",
      color: WHITE,
    },
    planPrice: {
      fontSize: "28px",
      fontWeight: "900",
      color: WHITE,
    },
    planPeriod: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.75)",
    },
    planBody: {
      padding: "16px 20px",
    },
    planFeature: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "6px 0",
      fontSize: "13px",
      color: "rgba(23,23,23,0.72)",
    },
    planCheck: (color) => ({
      color: color,
      fontWeight: "700",
      fontSize: "15px",
    }),
    plansFooter: {
      padding: "20px",
      background: WHITE,
      borderTop: "1px solid rgba(23,23,23,0.06)",
    },
    emailInputWrap: {
      marginBottom: "16px",
    },
    emailLabel: {
      fontSize: "13px",
      fontWeight: "600",
      color: "rgba(23,23,23,0.72)",
      marginBottom: "8px",
      display: "block",
    },
    emailInput: {
      width: "100%",
      padding: "15px 18px",
      borderRadius: "14px",
      border: `2px solid rgba(23,23,23,0.08)`,
      background: LIGHT_BG,
      fontSize: "15px",
      color: DARK,
      outline: "none",
      boxSizing: "border-box",
    },
    emailError: {
      color: PRIMARY,
      fontSize: "12px",
      marginTop: "6px",
    },
    guarantee: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      marginTop: "12px",
    },
    guaranteeText: {
      fontSize: "12px",
      color: "rgba(23,23,23,0.5)",
    },
    // SUCCESS SCREEN
    successWrapper: {
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${MILITARY_DARK} 0%, ${MILITARY_GREEN} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    confetti: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
    },
    successIcon: {
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "44px",
      marginBottom: "28px",
      border: "3px solid rgba(255,255,255,0.3)",
    },
    successTitle: {
      fontSize: "30px",
      fontWeight: "900",
      color: WHITE,
      marginBottom: "16px",
      lineHeight: "1.2",
    },
    successSubtitle: {
      fontSize: "16px",
      color: "rgba(255,255,255,0.8)",
      marginBottom: "36px",
      lineHeight: "1.55",
      maxWidth: "320px",
    },
    successCard: {
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "24px",
      marginBottom: "32px",
      border: "1px solid rgba(255,255,255,0.2)",
      width: "100%",
      maxWidth: "380px",
    },
    successCardTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "rgba(255,255,255,0.7)",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    successStep: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "14px",
    },
    successStepNum: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "800",
      color: WHITE,
      flexShrink: 0,
    },
    successStepText: {
      fontSize: "14px",
      color: WHITE,
      textAlign: "left",
      lineHeight: "1.4",
    },
    // TESTIMONIALS
    testimonialsSection: {
      padding: "28px 20px",
      background: WHITE,
    },
    testimonialCard: {
      background: LIGHT_BG,
      borderRadius: "16px",
      padding: "18px",
      marginBottom: "12px",
    },
    testimonialHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "10px",
    },
    testimonialAvatar: {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${MILITARY_GREEN}, ${MILITARY_LIGHT})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    testimonialName: {
      fontSize: "15px",
      fontWeight: "700",
      color: DARK,
    },
    testimonialResult: {
      fontSize: "12px",
      color: MILITARY_GREEN,
      fontWeight: "600",
    },
    testimonialStars: {
      color: "#F5A623",
      fontSize: "13px",
      marginLeft: "auto",
    },
    testimonialText: {
      fontSize: "13px",
      color: "rgba(23,23,23,0.7)",
      lineHeight: "1.5",
      fontStyle: "italic",
    },
  };

  const renderIntro = () => (
    <div style={styles.introWrapper}>
      <div style={styles.introPattern} />
      <div style={styles.logoBar}>
        <span style={styles.logoText}>Military Calisthenics Elite</span>
      </div>

      <div style={styles.introContent}>
        <div style={styles.introBadge}>
          <span>🪖</span>
          <span style={styles.introBadgeText}>Entrenamiento de Élite</span>
        </div>
        <h1 style={styles.introTitle}>
          Transforma tu cuerpo
          <span style={styles.introTitleAccent}>como un soldado</span>
        </h1>
        <p style={styles.introSubtitle}>
          Responde 10 preguntas y obtén tu plan de calistenia militar
          personalizado. Sin equipamiento. Sin excusas.
        </p>

        <div style={styles.statsRow}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.introBottom}>
        <button
          style={styles.primaryBtn}
          onClick={handleStart}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 12px 40px rgba(223,65,66,0.5)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 8px 32px rgba(223,65,66,0.4)`;
          }}
        >
          <span>Comenzar Test Gratuito</span>
          <span>→</span>
        </button>
        <p style={styles.introNote}>
          🔒 100% gratis · Sin tarjeta de crédito · 2 minutos
        </p>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const q = questions[currentQ];
    return (
      <div style={styles.container}>
        <div style={styles.quizHeader}>
          <div style={styles.quizHeaderTop}>
            <button
              style={styles.backBtn}
              onClick={goBack}
              disabled={currentQ === 0}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e8e8e8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = LIGHT_BG;
              }}
            >
              ←
            </button>
            <span style={styles.progressText}>
              {currentQ + 1} / {questions.length}
            </span>
            <button style={styles.skipBtn} onClick={() => goNext(answers)}>
              Saltar
            </button>
          </div>
          <div style={styles.progressBarTrack}>
            <div
              style={{ ...styles.progressBarFill, width: `${progress}%` }}
            />
          </div>
        </div>

        <div style={styles.quizBody}>
          <div
            style={
              animating
                ? styles.slideExit(direction)
                : styles.slideEnter(direction)
            }
          >
            <div style={styles.questionIconWrap}>
              <span>{q.icon}</span>
            </div>
            <h2 style={styles.questionTitle}>{q.title}</h2>
            <p style={styles.questionSubtitle}>{q.subtitle}</p>

            {q.type === "single" && (
              <div style={styles.optionsGrid}>
                {q.options.map((opt) => {
                  const isSel = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      style={styles.optionCard(isSel)}
                      onClick={() => handleOptionSelect(opt.id)}
                      onMouseEnter={(e) => {
                        if (!isSel)
                          e.currentTarget.style.background = "#fafafa";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSel)
                          e.currentTarget.style.background = WHITE;
                      }}
                    >
                      <div style={styles.optionEmoji}>{opt.emoji}</div>
                      <span style={styles.optionLabel(isSel)}>{opt.label}</span>
                      <div style={styles.optionCheck(isSel)}>
                        {isSel && (
                          <span style={{ color: WHITE, fontSize: "12px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "input" && (
              <div style={styles.inputWrap}>
                <input
                  style={styles.inputField}
                  type={q.inputType}
                  placeholder={q.placeholder}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  min={10}
                  max={100}
                  onFocus={(e) => {
                    e.target.style.border = `2px solid ${MILITARY_GREEN}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `2px solid rgba(23,23,23,0.08)`;
                  }}
                />
                <button
                  style={styles.nextBtn(!inputVal || inputVal < 10 || inputVal > 100)}
                  onClick={handleInputNext}
                  disabled={!inputVal || inputVal < 10 || inputVal > 100}
                >
                  Continuar →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div style={styles.resultWrapper}>
      <div style={styles.resultHero}>
        <div style={styles.resultHeroPattern} />
        <div style={styles.resultBadge}>
          <span style={{ color: "#FFD700" }}>⭐</span>
          <span style={styles.resultBadgeText}>Tu Perfil Personalizado</span>
        </div>
        <span style={styles.resultIcon}>{profile.icon}</span>
        <h1 style={styles.resultTitle}>{profile.title}</h1>
        <p style={styles.resultDesc}>{profile.description}</p>
      </div>

      <div style={styles.resultBody}>
        <div style={styles.resultMetrics}>
          <div style={styles.metricCard}>
            <span style={styles.metricValue}>{profile.weeks}</span>
            <span style={styles.metricLabel}>Semanas de plan</span>
          </div>
          <div style={styles.metricCard}>
            <span style={{ ...styles.metricValue, fontSize: "14px" }}>
              {profile.intensity}
            </span>
            <span style={styles.metricLabel}>Intensidad</span>
          </div>
          <div style={styles.metricCard}>
            <span style={{ ...styles.metricValue, fontSize: "13px" }}>
              100%
            </span>
            <span style={styles.metricLabel}>Personalizado</span>
          </div>
        </div>

        <p style={{ ...styles.sectionTitle }}>Tu programa incluye</p>
        <div style={styles.featureList}>
          {[
            "Plan de ejercicios militares adaptado a tu nivel",
            "Progresión semanal automática inteligente",
            "Videos HD de cada ejercicio con forma correcta",
            `Enfoque principal: ${profile.focus}`,
            "Seguimiento diario de calorías y macros",
            "Comunidad de guerreros calisténicos",
          ].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <div style={styles.featureCheck}>✓</div>
              <span style={styles.featureText}>{f}</span>
            </div>
          ))}
        </div>

        <div style={styles.testimonialsSection}>
          <p style={{ ...styles.sectionTitle, marginBottom: "16px" }}>
            Lo que dicen nuestros usuarios
          </p>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.testimonialHeader}>
                <div style={styles.testimonialAvatar}>{t.avatar}</div>
                <div>
                  <div style={styles.testimonialName}>
                    {t.name}, {t.age} años
                  </div>
                  <div style={styles.testimonialResult}>{t.result}</div>
                </div>
                <div style={styles.testimonialStars}>
                  {"★".repeat(t.stars)}
                </div>
              </div>
              <p style={styles.testimonialText}>"{t.text}"</p>
            </div>
          ))}
        </div>

        <div style={styles.ctaSection}>
          <button
            style={{
              ...styles.primaryBtn,
              background: `linear-gradient(135deg, ${MILITARY_GREEN} 0%, ${MILITARY_LIGHT} 100%)`,
              boxShadow: `0 8px 32px rgba(59,83,35,0.35)`,
            }}
            onClick={() => setScreen("plans")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>Ver Mi Plan Personalizado</span>
            <span>→</span>
          </button>
          <p
            style={{
              textAlign: "center",
              color: "rgba(23,23,23,0.45)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            🔒 Garantía de devolución de 30 días
          </p>
        </div>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div style={styles.plansWrapper}>
      <div style={styles.plansHeader}>
        <h2 style={styles.plansTitle}>Elige tu Plan de Élite</h2>
        <p style={styles.plansSubtitle}>
          Únete a más de 250,000 guerreros calisténicos
        </p>
      </div>

      <div style={styles.plansBody}>
        {plans.map((plan) => {
          const isSel = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              style={styles.planCard(isSel, plan.color)}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div style={styles.planCardHeader(plan.color)}>
                <div>
                  <div style={styles.planName}>{plan.name}</div>
                  <div style={styles.planPeriod}>por mes</div>
                </div>
                <div>
                  {plan.badge && (
                    <div style={{ ...styles.planBadge, marginBottom: "6px" }}>
                      {plan.badge}
                    </div>
                  )}
                  <div style={styles.planPrice}>${plan.price}</div>
                </div>
              </div>
              <div style={styles.planBody}>
                {plan.features.map((f, i) => (
                  <div key={i} style={styles.planFeature}>
                    <span style={styles.planCheck(plan.color)}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.plansFooter}>
        <div style={styles.emailInputWrap}>
          <label style={styles.emailLabel}>Tu email para recibir el plan:</label>
          <input
            style={styles.emailInput}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = `2px solid ${MILITARY_GREEN}`;
            }}
            onBlur={(e) => {
              e.target.style.border = `2px solid rgba(23,23,23,0.08)`;
            }}
          />
          {emailError && <p style={styles.emailError}>{emailError}</p>}
        </div>
        <button
          style={{
            ...styles.primaryBtn,
            background: `linear-gradient(135deg, ${MILITARY_GREEN} 0%, ${MILITARY_LIGHT} 100%)`,
            boxShadow: `0 8px 32px rgba(59,83,35,0.35)`,
          }}
          onClick={handleEmailSubmit}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>
            Empezar con Plan{" "}
            {plans.find((p) => p.id === selectedPlan)?.name}
          </span>
        </button>
        <div style={styles.guarantee}>
          <span style={{ fontSize: "16px" }}>🛡️</span>
          <span style={styles.guaranteeText}>
            Garantía de devolución de 30 días · Sin preguntas
          </span>
        </div>
        {/* TODO: Conectar pasarela de pago (Stripe, PayPal, etc.) */}
        {/* TODO: Implementar sistema de autenticación real */}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div style={styles.successWrapper}>
      {showConfetti && (
        <div style={styles.confetti}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: ["#FFD700", "#FF6B6B", WHITE, "#6B8C42"][
                  Math.floor(Math.random() * 4)
                ],
                animation: `fall ${1 + Math.random() * 2}s ease-in forwards`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.successIcon}>🎖️</div>
      <h1 style={styles.successTitle}>
        ¡Bienvenido al Regimiento Elite!
      </h1>
      <p style={styles.successSubtitle}>
        Tu plan personalizado de Military Calisthenics Elite está siendo
        preparado. Revisa tu email en los próximos minutos.
      </p>

      <div style={styles.successCard}>
        <div style={styles.successCardTitle}>Próximos pasos</div>
        {[
          "Revisa tu email — te enviamos el acceso en 5 minutos",
          "Descarga la app Military Calisthenics Elite",
          "Completa tu perfil y empieza el Día 1",
        ].map((step, i) => (
          <div key={i} style={styles.successStep}>
            <div style={styles.successStepNum}>{i + 1}</div>
            <div style={styles.successStepText}>{step}</div>
          </div>
        ))}
      </div>

      <button
        style={{
          ...styles.primaryBtn,
          maxWidth: "380px",
          width: "100%",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,0.4)",
          boxShadow: "none",
        }}
        onClick={() => setScreen("intro")}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.2)";
        }}
      >
        Volver al Inicio
      </button>
      {/* TODO: Implementar redirección a app store real */}
      {/* TODO: Integrar sistema de emails transaccionales (SendGrid, Resend, etc.) */}
    </div>
  );

  return (
    <div style={styles.app}>
      {screen === "intro" && renderIntro()}
      {screen === "quiz" && renderQuiz()}
      {screen === "result" && renderResult()}
      {screen === "plans" && renderPlans()}
      {screen === "success" && renderSuccess()}
    </div>
  );
}