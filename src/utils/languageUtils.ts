
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
      title: "Responde estas preguntas e indica si estás de acuerdo o no con las siguientes afirmaciones y podrás verte a ti misma desde tus propios ojos.",
      processing: "Procesando resultados...",
      confirmTitle: "Confirmar",
      confirmDescription: "¿Está seguro que desea finalizar y calcular su resultado?",
      confirmCancel: "Cancelar",
      confirmAction: "Calcular resultado"
    },
    en: {
      title: "Answer these questions and indicate whether you agree or disagree with the following statements and you will be able to see yourself through your own eyes.",
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
      standard: [
        "Totalmente en desacuerdo",
        "En desacuerdo",
        "Más o menos de acuerdo",
        "De acuerdo",
        "Totalmente de acuerdo"
      ]
    },
    en: {
      standard: [
        "Strongly disagree",
        "Disagree",
        "Somewhat agree",
        "Agree",
        "Strongly agree"
      ]
    }
  },
  
  // Questions translations
  questions: {
    es: [
      { id: 1, text: "Cuando me miro al espejo me gusta lo que veo porque reconozco y sé quién soy." },
      { id: 2, text: "No permito que me falten el respeto y me humillen." },
      { id: 3, text: "Tengo claro cuáles son mis talentos y los uso con seguridad." },
      { id: 4, text: "Sé lo que no vuelvo a permitir en mi vida, conozco mis no negociables." },
      { id: 5, text: "Tengo buena relación con mi familia (padre, madre, hermanos)." },
      { id: 6, text: "Tengo muy buena relación con mis hijos." },
      { id: 7, text: "Creo que mi pareja es el amor de mi vida, tenemos una muy buena relación." },
      { id: 8, text: "Soy autosuficiente e independiente económicamente." },
      { id: 9, text: "Mi alimentación es sana, ordenada y suficiente." },
      { id: 10, text: "Tengo el hábito de hacer ejercicios regularmente." }
    ],
    en: [
      { id: 1, text: "When I look in the mirror I like what I see because I recognize and know who I am." },
      { id: 2, text: "I do not allow myself to be disrespected and humiliated." },
      { id: 3, text: "I am clear about what my talents are and I use them with confidence." },
      { id: 4, text: "I know what I will no longer allow in my life, I know my non-negotiables." },
      { id: 5, text: "I have a good relationship with my family (father, mother, siblings)." },
      { id: 6, text: "I have a very good relationship with my children." },
      { id: 7, text: "I believe my partner is the love of my life, we have a very good relationship." },
      { id: 8, text: "I am self-sufficient and financially independent." },
      { id: 9, text: "My diet is healthy, orderly and sufficient." },
      { id: 10, text: "I have the habit of exercising regularly." }
    ]
  }
};
