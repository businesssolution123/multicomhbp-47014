
// Language utility for handling translations
export const getLanguage = (): 'es' | 'en' => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  return lang === 'en' ? 'en' : 'es';
};

// Translation dictionaries
export const translations = {
  // NavigationButtons translations
  navigationButtons: {
    es: {
      back: "Volver",
      previous: "Anterior",
      next: "Siguiente"
    },
    en: {
      back: "Back",
      previous: "Previous",
      next: "Next"
    }
  },
  progress:{
    es:{
      text:"Progreso"
    },
    en:{
      text:"Progress"
    }
  },
  // QuestionForm translations
  questionForm: {
    es: {
      title: "¿Su empresa tiene declarado, formalizado y comunicado las siguientes políticas y protocolos?",
      processing: "Procesando resultados...",
      confirmTitle: "Confirmar",
      confirmDescription: "¿Está seguro que desea finalizar y calcular su resultado?",
      confirmCancel: "Cancelar",
      confirmAction: "Calcular resultado"
    },
    en: {
      title: "Has your company declared, formalized, and communicated the following policies and protocols?",
      processing: "Processing results...",
      confirmTitle: "Confirm",
      confirmDescription: "Are you sure you want to finish and calculate your result?",
      confirmCancel: "Cancel",
      confirmAction: "Calculate result"
    }
  },
  
  // Index page translations
  index: {
    es: {
      formTitle: "Rellena tus datos antes de continuar",
      companyName: "Nombre de la empresa",
      country: "País",
      selectCountry: "Selecciona tu país",
      city: "Ciudad",
      contactName: "Nombre de contacto",
      email: "Correo",
      phone: "Teléfono",
      startButton: "Iniciar",
      verifying: "Verificando..."
    },
    en: {
      formTitle: "Fill in your details before continuing",
      companyName: "Company name",
      country: "Country",
      selectCountry: "Select your country",
      city: "City",
      contactName: "Contact name",
      email: "Email",
      phone: "Phone",
      startButton: "Start",
      verifying: "Verifying..."
    }
  },
  
  // ResultScreen translations
  resultScreen: {
    es: {
      title: "Nivel de vulnerabilidad",
      vulnerabilityLevels: [
        "Nivel total de vulnerabilidad. Se recomienda implementar protocolos de prevención de inmediato.",
        "Alto nivel de vulnerabilidad. Se recomienda revisar los protocolos e iniciar un proceso de implementación sistematizado. Asimismo, se sugiere fomentar una cultura de prevención.",
        "Nivel de vulnerabilidad medio. Aunque la empresa cuenta con protocolos, no todos se implementan adecuadamente. Se recomienda revisarlos e iniciar un proceso de implementación sistematizado, además de promover una cultura de prevención.",
        "Nivel de vulnerabilidad bajo. Se recomienda fortalecer la cultura de prevención mediante entrenamientos y campañas de comunicación interna.",
        "Nivel de vulnerabilidad mínimo. Sin embargo, se recomienda reforzar la cultura de prevención y comunicar, a través de campañas internas, cómo esta impacta positivamente en la productividad de la empresa y en el clima organizacional."
      ],
      contactMessage: "En un plazo de 48 horas nos contactaremos contigo para brindarte un análisis más detallado a través de tu correo ",
      orCall: " o te llamaremos al número ",
      purchaseMessage: "Por un precio de 250 $us, en un plazo de 48 horas recibirás una descripción de los riesgos que enfrenta tu empresa en cada una de las 16 variables contenidas en este formulario. ¿Deseas adquirir este diagnóstico?",
      buyButton: "Comprar diagnóstico de riesgo",
      changeAnswers: "Cambiar respuestas",
      processing: "Procesando...",
      verifyingPayment: "Verificando el estado del pago...",
      paymentFailed: "El pago no se pudo completar. Por favor, intenta de nuevo.",
      paymentError: "Hubo un error al procesar el pago. Por favor, contacta al soporte.",
      thankYouTitle: "¡Gracias por tu compra!",
      thankYouMessage: "En un plazo de 48 horas nos contactaremos contigo para brindarte un análisis más detallado a través de tu correo ",
      acceptButton: "Aceptar"
    },
    en: {
      title: "Vulnerability Level",
      vulnerabilityLevels: [
        "Total vulnerability level. It is recommended to implement prevention protocols immediately.",
        "High vulnerability level. It is recommended to review protocols and start a systematic implementation process. It is also suggested to promote a culture of prevention.",
        "Medium vulnerability level. Although the company has protocols, not all are adequately implemented. It is recommended to review them and start a systematic implementation process, in addition to promoting a culture of prevention.",
        "Low vulnerability level. It is recommended to strengthen the prevention culture through training and internal communication campaigns.",
        "Minimal vulnerability level. However, it is recommended to reinforce the prevention culture and communicate, through internal campaigns, how this positively impacts the company's productivity and organizational climate."
      ],
      contactMessage: "Within 48 hours we will contact you to provide a more detailed analysis via your email ",
      orCall: " or we will call you at ",
      purchaseMessage: "For a price of $250, within 48 hours you will receive a description of the risks your company faces in each of the 16 variables contained in this form. Would you like to purchase this diagnosis?",
      buyButton: "Buy risk diagnosis",
      changeAnswers: "Change answers",
      processing: "Processing...",
      verifyingPayment: "Verifying payment status...",
      paymentFailed: "The payment could not be completed. Please try again.",
      paymentError: "There was an error processing the payment. Please contact support.",
      thankYouTitle: "Thank you for your purchase!",
      thankYouMessage: "Within 48 hours we will contact you to provide a more detailed analysis via your email ",
      acceptButton: "Accept"
    }
  },
  
  // Question options translations
  questionOptions: {
    es: {
      // Options for questions 1-11 and 16
      standard: [
        "No",
        "Si, pero no se gestiona",
        "Si, pero mal gestionado",
        "Si, solo lo básico",
        "Si, adecuadamente"
      ],
      // Options for question 12
      security: [
        "No",
        "Solo de seguridad y medio ambiente",
        "Solo ciberseguridad",
        "Solo seguridad civil",
        "Solo crisis mediáticas"
      ],
      // Options for questions 13-15
      training: [
        "Nunca",
        "Solo una vez",
        "Solo casos específicos",
        "Si, solo para el lider (Gerente o dueño)",
        "Si, regularmente para el equipo gerencial"
      ]
    },
    en: {
      // Options for questions 1-11 and 16
      standard: [
        "No",
        "Yes, but not managed",
        "Yes, but poorly managed",
        "Yes, just the basics",
        "Yes, adequately"
      ],
      // Options for question 12
      security: [
        "No",
        "Only safety and environment",
        "Only cybersecurity",
        "Only civil security",
        "Only media crises"
      ],
      // Options for questions 13-15
      training: [
        "Never",
        "Only once",
        "Only specific cases",
        "Yes, only for the leader (Manager or owner)",
        "Yes, regularly for the management team"
      ]
    }
  },
  
  // Questions translations
  questions: {
    es: [
      { id: 1, text: "Relación con los accionistas" },
      { id: 2, text: "Principios y políticas del gobierno Corporativo?" },
      { id: 3, text: "Principios y políticas de transparencia" },
      { id: 4, text: "Principios de Gestión Humana (RRHH)" },
      { id: 5, text: "Principios y políticas de HSE (Health, Safety and Environment)" },
      { id: 6, text: "Seguridad y Salud Ocupacional (OSHA)" },
      { id: 7, text: "Marco de Seguridad cibernética (CSF)" },
      { id: 8, text: "Cuenta con un Blue Print del servicio o producto?" },
      { id: 9, text: "Cuenta con un protocolo de gestión de información en redes sociales?" },
      { id: 10, text: "Cuenta con una Dirección de Comunicación estratégica (DIRCOM)?" },
      { id: 11, text: "Cuenta con Plan de Comunicación Estratégico?" },
      { id: 12, text: "Manual de Gestión de Crisis" },
      { id: 13, text: "Ha entrenado a su equipo gerencial en Vocería y gestiónde medios?" },
      { id: 14, text: "Ha entrenado a su equipo en Manejo de conflictos?" },
      { id: 15, text: "Su equipo gerencial tiene un entrenamiento en Alta Gerencia?" },
      { id: 16, text: "Cuenta con protocolos de gestión de información en medios de comunicación?" }
    ],
    en: [
      { id: 1, text: "Relationship with shareholders" },
      { id: 2, text: "Corporate governance principles and policies?" },
      { id: 3, text: "Transparency principles and policies" },
      { id: 4, text: "Human Resource Management principles (HR)" },
      { id: 5, text: "HSE principles and policies (Health, Safety and Environment)" },
      { id: 6, text: "Occupational Safety and Health (OSHA)" },
      { id: 7, text: "Cybersecurity Framework (CSF)" },
      { id: 8, text: "Do you have a Blue Print of the service or product?" },
      { id: 9, text: "Do you have a protocol for managing information on social networks?" },
      { id: 10, text: "Do you have a Strategic Communication Direction (DIRCOM)?" },
      { id: 11, text: "Do you have a Strategic Communication Plan?" },
      { id: 12, text: "Crisis Management Manual" },
      { id: 13, text: "Have you trained your management team in Spokesperson and media management?" },
      { id: 14, text: "Have you trained your team in Conflict Management?" },
      { id: 15, text: "Does your management team have Senior Management training?" },
      { id: 16, text: "Do you have protocols for managing information in the media?" }
    ]
  }
};
