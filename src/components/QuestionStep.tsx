
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLanguage, translations } from "@/utils/languageUtils";

interface QuestionStepProps {
  questions: {
    id: number;
    text: string;
    answer: string;
  }[];
  onAnswer: (questionId: number, answer: string) => void;
  className?: string;
  autoAdvance?: boolean;
}

export const QuestionStep = ({
  questions,
  onAnswer,
  className,
  autoAdvance = false
}: QuestionStepProps) => {
  const lang = getLanguage();
  const t = translations.questionOptions[lang];

  const handleOptionClick = (questionId: number, option: string) => {
    onAnswer(questionId, option);
  };

  // Add a safety check for empty questions array
  if (!questions || questions.length === 0) {
    return null;
  }

  const getOptionsForQuestion = (questionId: number) => {
    if (questionId === 12) {
      return t.security;
    } else if (questionId >= 13 && questionId <= 15) {
      return t.training;
    } else {
      // Questions 1-11 and 16 use the same options
      return t.standard;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} 
      transition={{ duration: 0.3 }}
      className={cn("space-y-8", className)}
    >
      {questions.map(question => (
        <motion.div 
          key={question.id} 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.3 }} 
          className="w-full max-w-3xl mx-auto question-card"
        >
          <h3 className="text-lg font-medium text-gray-100 px-6 mb-6">{question.text}</h3>
          <div className="space-y-2 px-4 md:px-8">
            {getOptionsForQuestion(question.id).map((option, index) => (
              <motion.button 
                key={index} 
                onClick={() => handleOptionClick(question.id, option)} 
                className={cn("option-button text-white", question.answer === option && "selected")} 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
