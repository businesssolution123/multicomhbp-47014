
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QuestionForm } from "@/components/QuestionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResultScreen } from "../components/ResultScreen";
import { getLanguage, translations } from "@/utils/languageUtils";

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

const Home = () => {
  const lang = getLanguage();
  const t = translations.index[lang];
  
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    companyName: '',
    country: '',
    city: '',
    contactName: '',
    email: '',
    phone: '',
    phonePrefix: '',
    score: 0,
    paid: false,
  });
  const [userData, setUserData] = useState<ContactForm>(formData);
  const [phonePrefix, setPhonePrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  const additionalParam = query.get('additional_param');
  const hasSessionId = !!sessionId;

  useEffect(() => {
    const storedData = localStorage.getItem('contactFormData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      setPhonePrefix(parsedData.phonePrefix || '');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      localStorage.setItem('contactFormData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleCountryChange = (value) => {
    const selectedCountry = countries.find((c) => c.name === value);
    const newPhonePrefix = selectedCountry ? selectedCountry.code : '';
    setPhonePrefix(newPhonePrefix);
    setFormData((prev) => {
      const newData = {
        ...prev,
        country: value,
        phonePrefix: newPhonePrefix,
      };
      localStorage.setItem('contactFormData', JSON.stringify(newData));
      return newData;
    });
  };

  const isFormValid = () => {
    return Object.values(formData)
      .filter((_, index) => index < 6)
      .every((value) => value.trim() !== '');
  };

  const checkUserPayment = async (email: string) => {
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://crisismanagement.multicomhbp.com/.netlify/functions/check-user-payment?email=${encodeURIComponent(email)}`;
      const urlWithParams = additionalParam 
        ? `${apiUrl}&additional_param=${encodeURIComponent(additionalParam)}`
        : apiUrl;

      const response = await fetch(urlWithParams);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.paid) {
        const updatedData = data.userData;
        setFormData(updatedData);
        setUserData(updatedData);
        localStorage.setItem('contactFormData', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error al verificar el pago del usuario:', error);
      setError('No se pudo verificar el estado del pago. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    await checkUserPayment(formData.email);

    if (formData.paid) {
      return;
    }

    setUserData({
      ...formData,
      phone: phonePrefix + formData.phone,
    });
    setShowQuestionForm(true);
  };

  const handleCloseResultScreen = () => {
    const updatedFormData = { ...formData, paid: false };
    setFormData(updatedFormData);
    localStorage.setItem('contactFormData', JSON.stringify(updatedFormData));
    setShowQuestionForm(false);
  };

  const countries = [
    { name: "Argentina", code: "+54" },
    { name: "Australia", code: "+61" },
    { name: "Belize", code: "+501" },
    { name: "Bolivia", code: "+591" },
    { name: "Canada", code: "+1" },
    { name: "Chile", code: "+56" },
    { name: "Colombia", code: "+57" },
    { name: "Costa Rica", code: "+506" },
    { name: "Cuba", code: "+53" },
    { name: "Dominican Republic", code: "+1" },
    { name: "Ecuador", code: "+593" },
    { name: "El Salvador", code: "+503" },
    { name: "Equatorial Guinea", code: "+240" },
    { name: "España", code: "+34" },
    { name: "Guatemala", code: "+502" },
    { name: "Honduras", code: "+504" },
    { name: "Ireland", code: "+353" },
    { name: "Jamaica", code: "+1" },
    { name: "Mexico", code: "+52" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Panama", code: "+507" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Puerto Rico", code: "+1" },
    { name: "Trinidad and Tobago", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Venezuela", code: "+58" },
  ];

  if (formData.paid || hasSessionId) {
    return (
      <div className="min-h-screen w-full bg-neutral-900">
        <div className="px-[20px] md:px-[60px] py-[30px] min-h-screen overflow-y-auto">
          <ResultScreen 
            score={formData.score || 0} 
            onClose={handleCloseResultScreen} 
            additionalParam={additionalParam}
          />
        </div>
      </div>
    );
  }

  if (showQuestionForm) {
    return (
      <div className="min-h-screen w-full bg-neutral-900">
        <div className="px-[20px] md:px-[60px] py-[30px] min-h-screen overflow-y-auto">
          <QuestionForm 
            userData={userData} 
            onClose={() => setShowQuestionForm(false)} 
            additionalParam={additionalParam}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          {t.formTitle}
        </h2>

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-1">
            {t.companyName} *
          </label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder={t.companyName}
            required
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            {t.country} *
          </label>
          <Select onValueChange={handleCountryChange} value={formData.country}>
            <SelectTrigger>
              <SelectValue placeholder={t.selectCountry} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            {t.city} *
          </label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder={t.city}
            required
          />
        </div>

        <div>
          <label htmlFor="contactName" className="block text-sm font-medium mb-1">
            {t.contactName} *
          </label>
          <Input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder={t.contactName}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t.email} *
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.email}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            {t.phone} *
          </label>
          <div className="flex items-center">
            {phonePrefix && (
              <span className="inline-block mr-2 text-gray-500">
                ({phonePrefix})
              </span>
            )}
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t.phone}
              required
              className="flex-1"
            />
          </div>
        </div>

        <Button
          disabled={!isFormValid() || loading}
          onClick={handleStart}
          className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
        >
          {loading ? t.verifying : t.startButton}
        </Button>
      </div>
    </div>
  );
};

export default Home;
