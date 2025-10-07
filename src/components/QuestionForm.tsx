
import { FormProgress } from "./FormProgress";
import { QuestionStep } from "./QuestionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ResultScreen } from "./ResultScreen";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "./ui/alert-dialog";
import { getLanguage, translations } from "@/utils/languageUtils";
import { supabase } from "@/integrations/supabase/client";

export const QuestionForm = ({ userData, onClose, additionalParam = null }) => {
  const lang = getLanguage();
  const t = translations.questionForm[lang];
  const questionsTranslated = translations.questions[lang];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(questionsTranslated.map(q => ({ ...q, answer: "" })));
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    const newAnswers = answers.map(q => q.id === questionId ? {
      ...q,
      answer
    } : q);
    setAnswers(newAnswers);
    localStorage.setItem('answers', JSON.stringify(newAnswers));
    if (currentStep < questionsTranslated.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === questionsTranslated.length - 1) {
      setShowConfirmDialog(true);
    }
  };

  const getCurrentQuestion = () => {
    return [answers[currentStep]];
  };

  const canGoNext = () => {
    const currentQuestion = getCurrentQuestion()[0];
    return currentQuestion?.answer !== "";
  };

  const calculateProgress = () => {
    const answeredQuestions = answers.filter(q => q.answer !== "").length;
    return answeredQuestions / questionsTranslated.length * 100;
  };

  const processResults = async () => {
    setIsProcessing(true);
    const startTime = Date.now();
    const duration = 3000;

    const updateProgress = async() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setProcessingProgress(progress);
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        try {
          // Save answers to Supabase
          const answerValues = answers.map(q => ({
            user_id: userData.id,
            question_id: q.id,
            answer_value: getAnswerValue(q.answer, q.id)
          }));

          const { error } = await supabase
            .from('answers')
            .upsert(answerValues, { 
              onConflict: 'user_id,question_id',
              ignoreDuplicates: false 
            });

          if (error) {
            console.error('Error saving answers:', error);
          }
        } catch (error) {
          console.error('Error processing results:', error);
        }

        setIsProcessing(false);
        setShowResult(true);
      }
    };
    requestAnimationFrame(updateProgress);
  };

  const handleNext = () => {
    if (currentStep < questionsTranslated.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const formatDateInSpanish = () => {
    const date = new Date();
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} de ${month} de ${year}, ${hours}:${minutes}`;
  };

  const getAnswerValue = (answer: string, questionId: number): number => {
    const values: { [key: string]: number } = {
      [translations.questionOptions.es.standard[0]]: 1,
      [translations.questionOptions.es.standard[1]]: 2,
      [translations.questionOptions.es.standard[2]]: 3,
      [translations.questionOptions.es.standard[3]]: 4,
      [translations.questionOptions.es.standard[4]]: 5,
      [translations.questionOptions.en.standard[0]]: 1,
      [translations.questionOptions.en.standard[1]]: 2,
      [translations.questionOptions.en.standard[2]]: 3,
      [translations.questionOptions.en.standard[3]]: 4,
      [translations.questionOptions.en.standard[4]]: 5
    };
    return values[answer] || 0;
  };

  const calculateScore = () => {
    const sum = answers.reduce((acc, q) => acc + getAnswerValue(q.answer, q.id), 0);
    return sum / answers.length;
  };

  if (showResult) {
    const finalScore = calculateScore();
    const contactFormData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    
    const updatedContactFormData = {
      ...contactFormData,
      score: finalScore,
    };

    localStorage.setItem('contactFormData', JSON.stringify(updatedContactFormData));
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ResultScreen score={finalScore} onClose={onClose} additionalParam={additionalParam} />
      </motion.div>
    );
  }

  if (isProcessing) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <div className="relative">
          <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
            {Math.round(processingProgress)}%
          </motion.div>
        </div>
        <p className="mt-4 text-white">{t.processing}</p>
      </div>;
  }

  return (
    <div className="px-[20px] md:px-[60px] py-[30px] bg-neutral-900 overflow-y-auto">
      <h2 className="text-xl md:text-3xl font-bold mb-4 text-gray-100 text-center">
        {t.title}
      </h2>
      <FormProgress currentStep={currentStep} totalSteps={questionsTranslated.length} progress={calculateProgress()} />
      
      <NavigationButtons 
        canGoBack={true} 
        canGoNext={canGoNext()} 
        onBack={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : null} 
        onNext={handleNext}
        isFirstQuestion={currentStep === 0}
        onClose={onClose}
        className="h-10"
      />
      
      <AnimatePresence mode="wait">
        <QuestionStep 
          key={currentStep} 
          questions={getCurrentQuestion()} 
          onAnswer={handleAnswer} 
          autoAdvance={true}
        />
      </AnimatePresence>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.confirmCancel}</AlertDialogCancel>
            <AlertDialogAction onClick={processResults}>
              {t.confirmAction}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
