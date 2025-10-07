
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { QuestionForm } from "@/components/QuestionForm";
import Swal from 'sweetalert2';
import { getLanguage, translations } from "@/utils/languageUtils";
import logoImage from "@/assets/logo-mi-dulce-valiente.jpeg";

// Carga Stripe.js con tu clave pública
const stripePromise = loadStripe('pk_live_51R5DwlGGFTbfvYzkNUhIFLBwk2ZcBKSrO7Ij69odcyYJFLo8dDxBbbNhiS0XulGYSjMzpsvzQXGgBOtEEdOID56S00DF3D33xt');

interface ContactForm {
  companyName: string;
  country: string;
  city: string;
  contactName: string;
  email: string;
  phone: string;
  phonePrefix: string;
  score: number;
  paid: boolean;
}

export const ResultScreen = ({ score, onClose, additionalParam = null }) => {
  const lang = getLanguage();
  const t = translations.resultScreen[lang];
  
  const [formData, setFormData] = useState<ContactForm>(() => {
    const storedData = localStorage.getItem('contactFormData');
    const initialData = storedData
      ? JSON.parse(storedData)
      : {
          companyName: '',
          country: '',
          city: '',
          contactName: '',
          email: '',
          phone: '',
          phonePrefix: '',
          score: score || 0,
          paid: false
        };
    return { ...initialData, lang }
  });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const location = useLocation();

  const roundedScore = Math.round(score);
  const currentStage = { 
    number: roundedScore,
    description: t.vulnerabilityLevels[roundedScore - 1] || t.vulnerabilityLevels[0]
  };
  
  const answers = JSON.parse(localStorage.getItem('answers') || '[]');
  
  // Define radar labels in both languages
  const radarLabels = {
    es: [
      "Accionistas",
      "Gobierno Corporativo",
      "Transparencia",
      "Gestion Humana",
      "HSE",
      "OSHA",
      "CSF",
      "Blue Print",
      "G. Redes Sociales",
      "DIRCOM",
      "Plan de Com. Estratégica",
      "Manual de Gestión de Crisis",
      "Vocería y medios",
      "Manejo de conflictos",
      "Entrenamiento en Alta Gerencia",
      "Medios de Com."
    ],
    en: [
      "Shareholders",
      "Corporate Governance",
      "Transparency",
      "Human Management",
      "HSE",
      "OSHA",
      "CSF",
      "Blue Print",
      "Social Media Management",
      "DIRCOM",
      "Strategic Comm. Plan",
      "Crisis Management Manual",
      "Spokesperson & Media",
      "Conflict Management",
      "Senior Management Training",
      "Media Management"
    ]
  };
  
  // Use the correct language for labels
  const currentLabels = radarLabels[lang];
  
  const radarData = currentLabels.map((label, index) => ({
    subject: label,
    value: getAnswerValue(answers[index]?.answer || ''),
  }));

  const handleClose = () => {
    onClose();
  };

  const handlePayment = async () => {
    
    if (!formData.email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`https://crisismanagement.multicomhbp.com/.netlify/functions/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { id } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error('Error al redirigir a Checkout:', error);
        setPaymentStatus('error');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al crear la sesión de Checkout:', error);
      setPaymentStatus('error');
      setLoading(false);
    }
  };

  const handleChangeAnswers = () => {
    setShowQuestionForm(true);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    const urlAdditionalParam = query.get('additional_param') || additionalParam;

    if (sessionId) {
      setLoading(true);
      
      const apiUrl = `https://crisismanagement.multicomhbp.com/.netlify/functions/check-payment?session_id=${sessionId}`;
      const urlWithParams = urlAdditionalParam 
        ? `${apiUrl}&additional_param=${encodeURIComponent(urlAdditionalParam)}` 
        : apiUrl;
        
      fetch(urlWithParams)
        .then((response) => response.json())
        .then((data) => {
          if (data.payment_status === 'paid') {
            setPaymentStatus('success');
            Swal.fire({
              title: t.thankYouTitle,
              text: `${t.thankYouMessage}${formData.email}${t.orCall}${formData.phone}.`,
              icon: 'success',
              confirmButtonText: t.acceptButton,
              confirmButtonColor: '#d33',
            }).then(() => {
              setFormData((prev) => {
                const newData = { ...prev, paid: true };
                localStorage.setItem('contactFormData', JSON.stringify(newData));
                return newData;
              });
              window.location.href = 'https://multicomhbp.com/es';
            });
          } else {
            setPaymentStatus('failed');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al verificar el pago:', error);
          setPaymentStatus('error');
          setLoading(false);
        });
    }
  }, [location, additionalParam, formData.email, formData.phone, t]);

  if (showQuestionForm) {
    return (
      <div className="min-h-screen w-full bg-neutral-900">
        <div className="px-[20px] md:px-[60px] py-[30px] min-h-screen overflow-y-auto">
          <QuestionForm
            userData={formData}
            onClose={() => setShowQuestionForm(false)}
            additionalParam={additionalParam}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen max-h-screen overflow-y-auto pl-3 md:pl-[30px] bg-neutral-900">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 text-white text-xl font-bold bg-primary hover:bg-primary/90 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <div className="w-full md:w-[30%] pr-4 flex flex-col items-center">
        <div className="flex justify-center mb-4 mt-8">
          <img src={logoImage} alt="Mi Dulce Valiente" className="h-20 md:h-24 object-contain" />
        </div>
        <h2 className="text-5xl font-bold mb-4 text-white text-center">
          {t.title}
        </h2>
        <div className="text-8xl font-bold mb-6 text-white text-center">
          {roundedScore}
        </div>
        <p className="text-xl text-gray-300 text-center mb-8">
          {currentStage.description}
        </p>

        {formData.country !== 'Bolivia' && formData.country !== 'Venezuela' && formData.country !== 'Cuba' && (
          <div className="md:hidden w-full flex flex-col items-center">
            <p className="text-md text-gray-300 text-center mb-4 px-4">
              {formData.paid
                ? `${t.contactMessage}${formData.email}${t.orCall}${formData.phone}.`
                : t.purchaseMessage}
            </p>
            <div className="flex justify-center mb-4">
              <Button
                className="py-4 px-6 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center"
                onClick={formData.paid ? handleChangeAnswers : handlePayment}
                disabled={loading}
              >
                {loading ? t.processing : formData.paid ? t.changeAnswers : t.buyButton}
              </Button>
            </div>

            {loading && !paymentStatus && (
              <p className="text-center text-white">{t.verifyingPayment}</p>
            )}
            {paymentStatus === 'failed' && (
              <p className="text-center text-red-500">
                {t.paymentFailed}
              </p>
            )}
            {paymentStatus === 'error' && (
              <p className="text-center text-red-500">
                {t.paymentError}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 mr-4 flex flex-col">
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart data={radarData} startAngle={-270} endAngle={90}>
            <PolarGrid gridType="polygon" stroke="rgba(255, 255, 0, 0.25)" strokeWidth={1} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 14 }} style={{ fontSize: 14 }} />
            <PolarRadiusAxis domain={[0, 6]} tickCount={0} tick={{ fill: 'transparent', fontSize: 0 }} />
            <Radar
              name="Valores"
              dataKey="value"
              stroke="DarkRed"
              fill="Crimson"
              strokeWidth={4}
              fillOpacity={0.7}
              label={{
                fill: 'white',
                fontSize: 16,
                position: 'center',
                offset: 16,
                formatter: (value) => value,
                angle: 0,
                background: { fill: 'rgba(0, 0, 0, 0.72)', padding: 2 },
              }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {formData.country !== 'Bolivia' && formData.country !== 'Venezuela' && formData.country !== 'Cuba' && (
          <div className="hidden md:flex flex-col items-center mt-4">
            <p className="text-md text-gray-300 text-center mb-4 px-16">
              {formData.paid
                ? `${t.contactMessage}${formData.email}${t.orCall}${formData.phone}.`
                : t.purchaseMessage}
            </p>
            <div className="flex justify-center mb-4">
              <Button
                className="py-4 px-6 text-xl md:text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center"
                onClick={formData.paid ? handleChangeAnswers : handlePayment}
                disabled={loading}
              >
                {loading ? t.processing : formData.paid ? t.changeAnswers : t.buyButton}
              </Button>
            </div>

            {loading && !paymentStatus && (
              <p className="text-center text-white">{t.verifyingPayment}</p>
            )}
            {paymentStatus === 'failed' && (
              <p className="text-center text-red-500">
                {t.paymentFailed}
              </p>
            )}
            {paymentStatus === 'error' && (
              <p className="text-center text-red-500">
                {t.paymentError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get answer value for radar chart
const getAnswerValue = (answer: string): number => {
  // Using the values from 1-5 based on option position
  const optionValues: Record<string, number> = {
    // Standard options - Spanish
    "No": 1,
    "Si, pero no se gestiona": 2,
    "Si, pero mal gestionado": 3,
    "Si, solo lo básico": 4,
    "Si, adecuadamente": 5,
    
    // Standard options - English
    "Yes, but not managed": 2,
    "Yes, but poorly managed": 3, 
    "Yes, just the basics": 4,
    "Yes, adequately": 5,
    
    // Question 12 Security options - Spanish
    "Solo de seguridad y medio ambiente": 2,
    "Solo ciberseguridad": 3,
    "Solo seguridad civil": 4,
    "Solo crisis mediáticas": 5,
    
    // Question 12 Security options - English
    "Only safety and environment": 2,
    "Only cybersecurity": 3,
    "Only civil security": 4,
    "Only media crises": 5,
    
    // Questions 13-15 Training options - Spanish
    "Nunca": 1,
    "Solo una vez": 2,
    "Solo casos específicos": 3,
    "Si, solo para el lider (Gerente o dueño)": 4,
    "Si, regularmente para el equipo gerencial": 5,
    
    // Questions 13-15 Training options - English
    "Never": 1,
    "Only once": 2,
    "Only specific cases": 3,
    "Yes, only for the leader (Manager or owner)": 4,
    "Yes, regularly for the management team": 5
  };

  const value = optionValues[answer] || 0;
  console.log('Answer:', answer, 'Value:', value); // Debug log
  return value;
};
